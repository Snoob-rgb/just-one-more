import { useEffect, useState, type FormEvent } from "react"

type Copy = {
  name: string
  email: string
  message: string
  captcha: string
  send: string
  sending: string
  success: string
  error: string
  activation: string
  setup: string
  refreshCaptcha: string
}

type Props = {
  copy: Copy
}

type Challenge = {
  question: string
  token: string
  issuedAt: number
}

export function ContactForm({ copy }: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [answer, setAnswer] = useState("")
  const [company, setCompany] = useState("") // honeypot
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle")
  const [errorKey, setErrorKey] = useState("")

  const loadChallenge = async () => {
    try {
      const r = await fetch("/api/contact", { method: "GET", credentials: "same-origin" })
      if (!r.ok) throw new Error("challenge")
      const data = (await r.json()) as Challenge
      setChallenge(data)
      setAnswer("")
    } catch {
      setChallenge(null)
    }
  }

  useEffect(() => {
    void loadChallenge()
  }, [])

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!challenge || status === "sending") return
    setStatus("sending")
    setErrorKey("")
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          answer,
          token: challenge.token,
          issuedAt: challenge.issuedAt,
          company,
        }),
      })
      const data = (await r.json()) as {
        ok?: boolean
        error?: string
        clientForward?: string | null
        accessKey?: string | null
        subject?: string | null
      }
      if (!r.ok || !data.ok) {
        setStatus("err")
        setErrorKey(data.error || "server_error")
        await loadChallenge()
        return
      }

      // Optional browser forward (legacy). Prefer server Resend delivery.
      if (data.clientForward === "web3forms" && data.accessKey) {
        try {
          const w = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: data.accessKey,
              name,
              email,
              message,
              subject: data.subject || `[Just One More] ${name}`,
              from_name: "Just One More",
              replyto: email,
            }),
          })
          const raw = await w.text()
          let wData: { success?: boolean | string; message?: string } = {}
          try {
            wData = JSON.parse(raw) as typeof wData
          } catch {
            setStatus("err")
            setErrorKey("delivery_failed")
            await loadChallenge()
            return
          }
          const ok = w.ok && (wData.success === true || wData.success === "true")
          if (!ok) {
            setStatus("err")
            setErrorKey("delivery_failed")
            await loadChallenge()
            return
          }
        } catch {
          setStatus("err")
          setErrorKey("delivery_failed")
          await loadChallenge()
          return
        }
      }

      setStatus("ok")
      setName("")
      setEmail("")
      setMessage("")
      setAnswer("")
      await loadChallenge()
    } catch {
      setStatus("err")
      setErrorKey("server_error")
    }
  }

  const errorText =
    errorKey === "setup_required" || errorKey === "activation_required"
      ? copy.setup
      : copy.error

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label className="hp-field" aria-hidden="true">
        Company
        <input
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </label>

      <label className="field">
        <span>{copy.name}</span>
        <input
          name="name"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="field">
        <span>{copy.email}</span>
        <input
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="field">
        <span>{copy.message}</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>

      <label className="field captcha-field">
        <span>
          {copy.captcha}
          {challenge ? ` : ${challenge.question}` : " …"}
        </span>
        <div className="captcha-row">
          <input
            name="answer"
            inputMode="numeric"
            required
            maxLength={8}
            autoComplete="off"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button type="button" className="btn btn-ghost" onClick={() => void loadChallenge()}>
            {copy.refreshCaptcha}
          </button>
        </div>
      </label>

      <button className="btn btn-primary contact-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? copy.sending : copy.send}
      </button>

      {status === "ok" ? <p className="form-ok">{copy.success}</p> : null}
      {status === "err" ? (
        <p className="form-err" role="alert">
          {errorText}
        </p>
      ) : null}
    </form>
  )
}
