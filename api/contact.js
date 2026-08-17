/**
 * Secure contact endpoint (Vercel Serverless).
 * Env: CONTACT_TO_EMAIL, CONTACT_FORM_SECRET, optional RESEND_API_KEY / RESEND_FROM_EMAIL
 */

import { createHmac, randomInt, timingSafeEqual } from "node:crypto"

const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 5
const MIN_SUBMIT_MS = 2500
const MAX_NAME = 80
const MAX_EMAIL = 120
const MAX_MESSAGE = 2000

const hits = new Map()

function json(res, status, body) {
  res.status(status).setHeader("Cache-Control", "no-store")
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  return res.json(body)
}

function clientIp(req) {
  const xf = req.headers["x-forwarded-for"]
  if (typeof xf === "string" && xf.length > 0) return xf.split(",")[0].trim()
  if (Array.isArray(xf) && xf[0]) return String(xf[0]).split(",")[0].trim()
  return req.socket?.remoteAddress || "unknown"
}

function rateLimit(ip) {
  const now = Date.now()
  const prev = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (prev.length >= MAX_PER_WINDOW) {
    hits.set(ip, prev)
    return false
  }
  prev.push(now)
  hits.set(ip, prev)
  return true
}

function secret() {
  const s = process.env.CONTACT_FORM_SECRET || ""
  if (s.length >= 16) return s
  return "jom-dev-only-change-me-32chars!!"
}

function signChallenge(a, b, exp) {
  return createHmac("sha256", secret()).update(`${a}:${b}:${exp}`).digest("hex")
}

function encodeChallenge(a, b, exp) {
  const payload = { a, b, exp, sig: signChallenge(a, b, exp) }
  return Buffer.from(JSON.stringify(payload), "utf8").toString("base64url")
}

function decodeChallenge(token) {
  try {
    const raw = Buffer.from(token, "base64url").toString("utf8")
    const data = JSON.parse(raw)
    if (
      typeof data.a !== "number" ||
      typeof data.b !== "number" ||
      typeof data.exp !== "number" ||
      typeof data.sig !== "string"
    ) {
      return null
    }
    const expect = signChallenge(data.a, data.b, data.exp)
    const left = Buffer.from(expect)
    const right = Buffer.from(data.sig)
    if (left.length !== right.length || !timingSafeEqual(left, right)) return null
    return data
  } catch {
    return null
  }
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value)
}

function cleanText(value, max) {
  if (typeof value !== "string") return ""
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max)
}

async function deliverEmail(opts) {
  const to = (process.env.CONTACT_TO_EMAIL || "").trim()
  if (!to || !isEmail(to)) {
    return { ok: false, detail: "CONTACT_TO_EMAIL missing/invalid on server" }
  }

  const subject = `[Just One More] Message de ${opts.fromName}`
  const text = `De: ${opts.fromName} <${opts.fromEmail}>\n\n${opts.message}`

  const resendKey = (process.env.RESEND_API_KEY || "").trim()
  if (resendKey) {
    const from = (process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev").trim()
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Just One More <${from}>`,
        to: [to],
        reply_to: opts.fromEmail,
        subject,
        text,
      }),
    })
    if (!r.ok) {
      const err = await r.text()
      return { ok: false, detail: `Resend error: ${err.slice(0, 200)}` }
    }
    return { ok: true, detail: "resend" }
  }

  // Prefer Resend (works from Vercel). Web3Forms is often blocked by Cloudflare
  // on datacenter IPs — only used as last-resort client forward.
  const web3Key = (process.env.WEB3FORMS_ACCESS_KEY || "").trim()
  if (web3Key && process.env.FORCE_WEB3FORMS_CLIENT === "1") {
    return {
      ok: true,
      detail: "client_web3forms",
      clientForward: "web3forms",
      accessKey: web3Key,
      subject,
    }
  }

  return {
    ok: false,
    detail: "no_delivery_provider",
    userError: "setup_required",
  }
}

function allowOrigin(origin) {
  if (!origin) return null
  const allowed = new Set([
    "https://justonemorestudio.vercel.app",
    "https://justonemore-gamma.vercel.app",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
  ])
  if (allowed.has(origin)) return origin
  if (/^https:\/\/justonemore[-a-z0-9]+\.vercel\.app$/i.test(origin)) return origin
  return null
}

export default async function handler(req, res) {
  const origin = allowOrigin(typeof req.headers.origin === "string" ? req.headers.origin : undefined)
  if (origin) res.setHeader("Access-Control-Allow-Origin", origin)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.setHeader("Vary", "Origin")

  if (req.method === "OPTIONS") return res.status(204).end()

  if (req.method === "GET") {
    const a = randomInt(2, 12)
    const b = randomInt(2, 12)
    const exp = Date.now() + 10 * 60 * 1000
    return json(res, 200, {
      question: `${a} + ${b}`,
      token: encodeChallenge(a, b, exp),
      issuedAt: Date.now(),
    })
  }

  if (req.method !== "POST") {
    return json(res, 405, { ok: false, error: "method_not_allowed" })
  }

  const ip = clientIp(req)
  if (!rateLimit(ip)) {
    return json(res, 429, { ok: false, error: "rate_limited" })
  }

  let body = req.body || {}
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}")
    } catch {
      return json(res, 400, { ok: false, error: "invalid_json" })
    }
  }

  if (cleanText(body.company, 40)) {
    return json(res, 200, { ok: true })
  }

  const name = cleanText(body.name, MAX_NAME)
  const email = cleanText(body.email, MAX_EMAIL).toLowerCase()
  const message = cleanText(body.message, MAX_MESSAGE)
  const answer = cleanText(body.answer, 8)
  const token = cleanText(body.token, 500)
  const issuedAt = Number(body.issuedAt || 0)

  if (!name || name.length < 2) return json(res, 400, { ok: false, error: "invalid_name" })
  if (!isEmail(email)) return json(res, 400, { ok: false, error: "invalid_email" })
  if (!message || message.length < 10) return json(res, 400, { ok: false, error: "invalid_message" })
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt < MIN_SUBMIT_MS) {
    return json(res, 400, { ok: false, error: "too_fast" })
  }

  const challenge = decodeChallenge(token)
  if (!challenge || challenge.exp < Date.now()) {
    return json(res, 400, { ok: false, error: "challenge_expired" })
  }
  if (answer !== String(challenge.a + challenge.b)) {
    return json(res, 400, { ok: false, error: "bad_captcha" })
  }

  try {
    const sent = await deliverEmail({ fromName: name, fromEmail: email, message })
    if (!sent.ok) {
      console.error("[contact]", sent.detail)
      const err =
        sent.userError === "setup_required"
          ? "setup_required"
          : sent.userError === "activation_required"
            ? "activation_required"
            : "delivery_failed"
      return json(res, 503, { ok: false, error: err })
    }
    console.info("[contact] delivered via", sent.detail, "ip=", ip)
    return json(res, 200, {
      ok: true,
      clientForward: sent.clientForward || null,
      accessKey: sent.accessKey || null,
      subject: sent.subject || null,
    })
  } catch (e) {
    console.error("[contact] exception", e)
    return json(res, 500, { ok: false, error: "server_error" })
  }
}
