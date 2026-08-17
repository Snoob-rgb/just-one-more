/**
 * Front-end security helpers for a static marketing site.
 * No backend/auth/DB exists — these harden URL handling, assets, and storage.
 */

/** Hosts allowed for target=_blank navigations */
const ALLOWED_EXTERNAL_HOSTS = new Set([
  "www.instagram.com",
  "instagram.com",
  "justonemorestudio.vercel.app",
  "justonemore-gamma.vercel.app",
])

/** Optional download hosts when a build link is configured */
const ALLOWED_DOWNLOAD_HOSTS = new Set([
  ...ALLOWED_EXTERNAL_HOSTS,
  "itch.io",
  "www.itch.io",
  "drive.google.com",
  "github.com",
  "www.github.com",
  "objects.githubusercontent.com",
  "releases.githubusercontent.com",
])

export function safeAssetPath(path: string): string {
  return path
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter((segment) => segment.length > 0 && segment !== "." && segment !== "..")
    .join("/")
}

export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${safeAssetPath(path)}`
}

function isHttpUrl(value: string): boolean {
  try {
    const u = new URL(value)
    return u.protocol === "https:" || u.protocol === "http:"
  } catch {
    return false
  }
}

/** Returns a safe https URL or empty string if host is not allowlisted. */
export function safeExternalUrl(
  value: string,
  allowDownloadHosts = false,
): string {
  if (!value || !isHttpUrl(value)) return ""
  try {
    const u = new URL(value)
    // Force https for navigations (open-redirect / mixed-content hardening)
    if (u.protocol === "http:") u.protocol = "https:"
    const hosts = allowDownloadHosts ? ALLOWED_DOWNLOAD_HOSTS : ALLOWED_EXTERNAL_HOSTS
    if (!hosts.has(u.hostname.toLowerCase())) return ""
    return u.toString()
  } catch {
    return ""
  }
}

/** mailto: only for a simple email shape; blocks header injection CR/LF. */
export function safeMailto(email: string): string {
  const cleaned = email.trim()
  if (!/^[^\s@;:\\/\r\n]+@[^\s@;:\\/\r\n]+\.[^\s@;:\\/\r\n]+$/.test(cleaned)) {
    return ""
  }
  return `mailto:${cleaned}`
}

export function readLangPreference(): "fr" | "en" {
  try {
    const saved = localStorage.getItem("jom-lang")
    return saved === "en" || saved === "fr" ? saved : "fr"
  } catch {
    // private mode / blocked storage
    return "fr"
  }
}

export function writeLangPreference(lang: "fr" | "en"): void {
  try {
    localStorage.setItem("jom-lang", lang)
  } catch {
    // ignore quota / privacy errors
  }
}
