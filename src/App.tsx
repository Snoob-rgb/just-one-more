const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`

const pillars = [
  {
    index: "01",
    title: "Logiciels",
    text: "Apps et outils pensés pour être clairs, rapides, et agréables à utiliser au quotidien.",
  },
  {
    index: "02",
    title: "Jeux",
    text: "Des expériences jouables avec une vraie direction artistique et une boucle qui donne envie de revenir.",
  },
  {
    index: "03",
    title: "Contenu",
    text: "Process, coulisses et idées — on montre comment les choses se construisent, pas seulement le résultat.",
  },
] as const

export default function App() {
  return (
    <div className="site">
      <div className="atmosphere" aria-hidden="true" />
      <div className="shell">
        <header className="nav">
          <a className="nav-brand" href="#top" aria-label="Just One More — accueil">
            <img src={asset("brand/mark.png")} alt="" width={36} height={36} />
            <span>Just One More</span>
          </a>
          <nav className="nav-links" aria-label="Navigation">
            <a href="#studio">Studio</a>
            <a href="#work">Projets</a>
            <a className="btn btn-ghost" href="#contact">
              Contact
            </a>
          </nav>
        </header>

        <main id="top">
          <section className="hero" aria-labelledby="brand">
            <div className="hero-visual" aria-hidden="true">
              <img className="hero-mark" src={asset("brand/mark.png")} alt="" />
            </div>

            <div className="hero-copy">
              <p className="brand-lockup" id="brand">
                <span>Just</span>
                <span>One</span>
                <span>More</span>
                <span className="accent-line" aria-hidden="true" />
              </p>
              <h1>On construit. On montre.</h1>
              <p>
                Studio créateur — logiciels, jeux et contenu. Une session de plus,
                toujours.
              </p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#work">
                  Voir les projets
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Travailler avec nous
                </a>
              </div>
            </div>
          </section>

          <section className="section" id="studio" aria-labelledby="studio-title">
            <p className="section-label">Studio</p>
            <h2 id="studio-title">Trois terrains. Une exigence.</h2>
            <p className="section-lead">
              Just One More conçoit des produits numériques et le récit qui les
              accompagne — avec un goût pour le détail et le rythme.
            </p>
            <div className="pillars">
              {pillars.map((pillar) => (
                <article className="pillar" key={pillar.index}>
                  <span className="pillar-index">{pillar.index}</span>
                  <div>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="section" id="work" aria-labelledby="work-title">
            <p className="section-label">Projets</p>
            <h2 id="work-title">En cours & à venir</h2>
            <p className="section-lead">
              Le portfolio grandit. Voici ce qui est déjà en mouvement.
            </p>
            <div className="work-strip">
              <article className="work-item">
                <span className="work-tag">Jeu · PC</span>
                <h3>Idle Empire: Last CEO</h3>
                <p>
                  Idle empire management — progression, prestige, et boucles de
                  rétention. Build desktop en cours d’évolution.
                </p>
              </article>
              <article className="work-item">
                <span className="work-tag">Studio</span>
                <h3>Prochains builds</h3>
                <p>
                  Outils, expériences jouables et formats contenus — annoncés ici
                  au fur et à mesure.
                </p>
              </article>
            </div>
          </section>

          <section className="section" id="contact" aria-labelledby="contact-title">
            <p className="section-label">Contact</p>
            <h2 id="contact-title">Une idée ? Une collab ?</h2>
            <div className="contact-block">
              <p className="section-lead" style={{ marginBottom: 0 }}>
                Écris-nous. On lit tout — projets, partenariats, feedback.
              </p>
              <a className="mail" href="mailto:hello@justonemore.studio">
                hello@justonemore.studio
              </a>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Just One More</span>
          <span>Software · Games · Content</span>
        </footer>
      </div>
    </div>
  )
}
