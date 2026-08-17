import { lazy, Suspense, useState, type KeyboardEvent } from "react"
import { assetUrl } from "./security"

const ModelViewer = lazy(() =>
  import("./ModelViewer").then((m) => ({ default: m.ModelViewer })),
)

type Model = {
  readonly id: string
  readonly src: string
  readonly poster: string
  readonly stats: readonly [number, number, number]
}

type Item = {
  role: string
  title: string
  lead: string
  alt: string
}

type Props = {
  models: readonly Model[]
  items: readonly Item[]
  statLabels: readonly string[]
  hint: string
  selectHint: string
  gridLabel: string
}

export function CharacterSelect({
  models,
  items,
  statLabels,
  hint,
  selectHint,
  gridLabel,
}: Props) {
  const [index, setIndex] = useState(0)
  const model = models[index]
  const item = items[index]
  if (!model || !item) return null

  const onGridKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      setIndex((i) => (i + 1) % models.length)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setIndex((i) => (i - 1 + models.length) % models.length)
    }
  }

  return (
    <div className="char-select">
      <article className="char-select-stage card card-glow" aria-live="polite">
        <div className="char-select-info" key={`info-${model.id}`}>
          <span className="character-role">{item.role}</span>
          <h3 className="char-select-name">{item.title}</h3>
          <p className="char-select-lead">{item.lead}</p>
          <ul className="char-stats">
            {statLabels.map((label, i) => (
              <li className="char-stat" key={label}>
                <span className="char-stat-head">
                  <span>{label}</span>
                  <span>{model.stats[i]}</span>
                </span>
                <span className="char-stat-track">
                  <span
                    className="char-stat-fill"
                    style={{ width: `${model.stats[i]}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
          <p className="char-select-hint">{selectHint}</p>
        </div>
        <div className="char-select-viewer" key={`stage-${model.id}`}>
          <Suspense
            fallback={
              <figure className="model-viewer-frame model-viewer-loading">
                <img
                  src={assetUrl(model.poster)}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            }
          >
            <ModelViewer
              src={model.src}
              poster={model.poster}
              alt={item.alt}
              hint={hint}
            />
          </Suspense>
        </div>
      </article>

      <div
        className="char-select-grid"
        role="listbox"
        aria-label={gridLabel}
        tabIndex={0}
        onKeyDown={onGridKeyDown}
      >
        {models.map((m, i) => {
          const thumb = items[i]
          if (!thumb) return null
          return (
            <button
              type="button"
              role="option"
              aria-selected={i === index}
              className={`char-thumb${i === index ? " is-selected" : ""}`}
              key={m.id}
              onClick={() => setIndex(i)}
            >
              <img
                src={assetUrl(m.poster)}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span>{thumb.title}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
