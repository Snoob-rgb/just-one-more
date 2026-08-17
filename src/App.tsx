import { lazy, Suspense, useEffect, useMemo, useState } from "react"
import { ContactForm } from "./ContactForm"
import { copy, type Lang } from "./i18n"
import {
  assetUrl,
  readLangPreference,
  safeExternalUrl,
  writeLangPreference,
} from "./security"
import { site } from "./site.config"
import { useReveal } from "./useReveal"

const ModelViewer = lazy(() =>
  import("./ModelViewer").then((m) => ({ default: m.ModelViewer })),
)

const EXT_REL = "noopener noreferrer"
const MASCOT = "models/demon_mascotte.png"

export default function App() {
  const [lang, setLang] = useState<Lang>(() => readLangPreference())
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [showTop, setShowTop] = useState(false)
  const t = copy[lang]

  const instagramUrl = useMemo(() => safeExternalUrl(site.instagram), [])
  const quietblockUrl = assetUrl(site.quietblockDownload)

  useReveal([lang])

  useEffect(() => {
    writeLangPreference(lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <div className="atmosphere" aria-hidden="true">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
      </div>
      <div className="shell">
        <header className={`nav${menuOpen ? " is-open" : ""}`}>
          <div className="nav-inner">
            <a
              className="nav-brand"
              href="#top"
              aria-label={`${site.name} — home`}
              onClick={closeMenu}
            >
              <img src={assetUrl(MASCOT)} alt="" width={40} height={40} />
              <span className="nav-brand-text">Just One More</span>
            </a>

            <nav
              id="site-menu"
              className={`nav-links${menuOpen ? " is-open" : ""}`}
              aria-label="Navigation"
            >
              <a href="#studio" onClick={closeMenu}>
                {t.navStudio}
              </a>
              <a href="#work" onClick={closeMenu}>
                {t.navWork}
              </a>
              <a href="#lab" onClick={closeMenu}>
                {t.navLab}
              </a>
              <a href="#services" onClick={closeMenu}>
                {t.navServices}
              </a>
              <a href="#contact" onClick={closeMenu}>
                {t.navContact}
              </a>
            </nav>

            <div className="nav-bar-actions">
              <div className="lang-switch lang-switch-desktop" role="group" aria-label="Language">
                <button
                  type="button"
                  className={lang === "fr" ? "is-active" : undefined}
                  onClick={() => setLang("fr")}
                >
                  FR
                </button>
                <button
                  type="button"
                  className={lang === "en" ? "is-active" : undefined}
                  onClick={() => setLang("en")}
                >
                  EN
                </button>
              </div>
              {instagramUrl ? (
                <a
                  className="btn btn-accent nav-cta"
                  href={instagramUrl}
                  target="_blank"
                  rel={EXT_REL}
                >
                  Instagram
                </a>
              ) : null}
              <button
                type="button"
                className="menu-toggle"
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>

          <div className={`nav-drawer${menuOpen ? " is-open" : ""}`}>
            <a href="#studio" onClick={closeMenu}>
              {t.navStudio}
            </a>
            <a href="#work" onClick={closeMenu}>
              {t.navWork}
            </a>
            <a href="#lab" onClick={closeMenu}>
              {t.navLab}
            </a>
            <a href="#services" onClick={closeMenu}>
              {t.navServices}
            </a>
            <a href="#method" onClick={closeMenu}>
              {t.navMethod}
            </a>
            <a href="#faq" onClick={closeMenu}>
              {t.navFaq}
            </a>
            <div className="lang-switch lang-switch-mobile" role="group" aria-label="Language">
              <button
                type="button"
                className={lang === "fr" ? "is-active" : undefined}
                onClick={() => setLang("fr")}
              >
                FR
              </button>
              <button
                type="button"
                className={lang === "en" ? "is-active" : undefined}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
            {instagramUrl ? (
              <a
                className="btn btn-accent"
                href={instagramUrl}
                target="_blank"
                rel={EXT_REL}
                onClick={closeMenu}
              >
                Instagram
              </a>
            ) : null}
            <a className="btn btn-ghost" href="#contact" onClick={closeMenu}>
              {t.navContact}
            </a>
          </div>
        </header>

        <main id="main">
          <section className="hero" id="top" aria-labelledby="brand">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="live-note">
                  <span className="live-dot" aria-hidden="true" />
                  {t.liveNote}
                </p>
                <p className="brand-lockup" id="brand">
                  Just <span className="brand-accent">One</span> More
                </p>
                <h1>{t.headline}</h1>
                <p className="hero-lead">{t.heroLead}</p>
                <div className="cta-row">
                  <a className="btn btn-primary" href="#work">
                    {t.ctaWork}
                  </a>
                  {instagramUrl ? (
                    <a
                      className="btn btn-ghost"
                      href={instagramUrl}
                      target="_blank"
                      rel={EXT_REL}
                    >
                      {t.ctaInstagram}
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="hero-visual" aria-hidden="true">
                <div className="hero-ring" />
                <img className="hero-mascot" src={assetUrl(MASCOT)} alt="" />
              </div>
            </div>
          </section>

          <section className="section" id="studio" aria-labelledby="studio-title" data-reveal>
            <div className="section-head">
              <p className="section-label">{t.studioLabel}</p>
              <h2 id="studio-title">{t.studioTitle}</h2>
              <p className="section-lead">{t.studioLead}</p>
            </div>
            <div className="card-grid card-grid-3">
              {t.pillars.map((pillar) => (
                <article className="card pillar-card" key={pillar.index}>
                  <span className="card-badge">{pillar.index}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section section-alt" id="work" aria-labelledby="work-title" data-reveal>
            <div className="section-head">
              <p className="section-label">{t.workLabel}</p>
              <h2 id="work-title">{t.workTitle}</h2>
              <p className="section-lead">{t.workLead}</p>
            </div>

            <div className="bento">
              <div className="bento-3d card card-glow">
                <p className="section-label">{t.model3dLabel}</p>
                <h3 className="bento-3d-title">{t.model3dTitle}</h3>
                <p className="bento-3d-lead">{t.model3dLead}</p>
                <Suspense
                  fallback={
                    <figure className="model-viewer-frame model-viewer-loading">
                      <img
                        src={assetUrl(site.model3d.poster)}
                        alt={t.model3dAlt}
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                  }
                >
                  <ModelViewer
                    src={site.model3d.src}
                    poster={site.model3d.poster}
                    alt={t.model3dAlt}
                    hint={t.model3dHint}
                  />
                </Suspense>
              </div>
            </div>

            <div className="card-grid card-grid-projects">
              {t.projects.map((project) => (
                <article
                  className={`card project-card${project.featured ? " is-featured" : ""}`}
                  key={project.title}
                >
                  <div className="work-meta">
                    <span className="work-tag">
                      {project.featured ? t.featuredLabel : project.tag}
                    </span>
                    <span className="work-status">{project.status}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                  {project.featured ? (
                    <div className="work-actions">
                      {instagramUrl ? (
                        <a
                          className="work-link"
                          href={instagramUrl}
                          target="_blank"
                          rel={EXT_REL}
                        >
                          {t.followBuild} →
                        </a>
                      ) : null}
                    </div>
                  ) : "download" in project && project.download ? (
                    <a className="btn btn-primary work-download" href={quietblockUrl} download>
                      {t.downloadQuietblock}
                    </a>
                  ) : (
                    <a className="work-link" href="#lab">
                      {t.navLab} →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="lab" aria-labelledby="lab-title" data-reveal>
            <div className="section-head">
              <p className="section-label">{t.labLabel}</p>
              <h2 id="lab-title">{t.labTitle}</h2>
              <p className="section-lead">{t.labLead}</p>
            </div>
            <ul className="card-grid card-grid-lab">
              {t.labItems.map((item, i) => (
                <li className="card lab-card" key={item.name}>
                  <span className="card-badge">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{item.name}</h3>
                  <p>{item.blurb}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="section section-alt" id="services" aria-labelledby="services-title" data-reveal>
            <div className="section-head">
              <p className="section-label">{t.servicesLabel}</p>
              <h2 id="services-title">{t.servicesTitle}</h2>
              <p className="section-lead">{t.servicesLead}</p>
            </div>
            <div className="card-grid card-grid-services">
              {t.services.map((service, i) => (
                <article className="card service-card" key={service.title}>
                  <span className="card-badge">0{i + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
            <div className="services-cta">
              <a className="btn btn-primary" href="#contact">
                {t.servicesCta}
              </a>
            </div>
          </section>

          <section className="section" id="method" aria-labelledby="method-title" data-reveal>
            <div className="section-head">
              <p className="section-label">{t.methodLabel}</p>
              <h2 id="method-title">{t.methodTitle}</h2>
              <p className="section-lead">{t.methodLead}</p>
            </div>
            <ol className="steps-row">
              {t.steps.map((step, i) => (
                <li className="card step-card" key={step.title}>
                  <span className="step-num">0{i + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="section section-alt" id="faq" aria-labelledby="faq-title" data-reveal>
            <div className="section-head">
              <p className="section-label">{t.faqLabel}</p>
              <h2 id="faq-title">{t.faqTitle}</h2>
              <p className="section-lead">{t.faqLead}</p>
            </div>
            <div className="faq-list">
              {t.faqs.map((item, index) => {
                const open = openFaq === index
                return (
                  <div className={`faq-item card${open ? " is-open" : ""}`} key={item.q}>
                    <button
                      type="button"
                      className="faq-q"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : index)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-icon" aria-hidden="true">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                    <div className="faq-a" hidden={!open}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="section contact-section" id="contact" aria-labelledby="contact-title" data-reveal>
            <div className="contact-wrap card card-glow">
              <div className="contact-intro">
                <p className="section-label">{t.contactLabel}</p>
                <h2 id="contact-title">{t.contactTitle}</h2>
                <p className="section-lead contact-lead">{t.contactLead}</p>
                {instagramUrl ? (
                  <a
                    className="btn btn-accent"
                    href={instagramUrl}
                    target="_blank"
                    rel={EXT_REL}
                  >
                    {t.ctaInstagram}
                  </a>
                ) : null}
              </div>
              <ContactForm
                copy={{
                  name: t.formName,
                  email: t.formEmail,
                  message: t.formMessage,
                  captcha: t.formCaptcha,
                  send: t.formSend,
                  sending: t.formSending,
                  success: t.formSuccess,
                  error: t.formError,
                  activation: t.formActivation,
                  setup: t.formSetup,
                  refreshCaptcha: t.formRefreshCaptcha,
                }}
              />
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-brand">
            <img src={assetUrl(MASCOT)} alt="" width={32} height={32} />
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
          </div>
          <div className="footer-links">
            <a href="#work">{t.navWork}</a>
            <a href="#lab">{t.navLab}</a>
            <a href="#services">{t.navServices}</a>
            {instagramUrl ? (
              <a href={instagramUrl} target="_blank" rel={EXT_REL}>
                Instagram
              </a>
            ) : null}
            <a href="#contact">{t.navContact}</a>
          </div>
          <p className="footer-tagline">{t.footerLine}</p>
        </footer>
      </div>

      <a
        className={`back-top${showTop ? " is-visible" : ""}`}
        href="#top"
        aria-label={t.backTop}
      >
        ↑
      </a>
    </div>
  )
}
