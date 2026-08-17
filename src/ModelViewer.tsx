import "@google/model-viewer"
import { createElement } from "react"
import { assetUrl } from "./security"

type Props = {
  src: string
  poster?: string
  alt: string
  hint: string
}

export function ModelViewer({ src, poster, alt, hint }: Props) {
  return (
    <figure className="model-viewer-frame">
      {createElement("model-viewer", {
        src: assetUrl(src),
        poster: poster ? assetUrl(poster) : undefined,
        alt,
        loading: "eager",
        "camera-controls": true,
        "auto-rotate": true,
        "shadow-intensity": "1",
        exposure: "1.05",
        "interaction-prompt": "auto",
        "touch-action": "pan-y",
        "environment-image": "neutral",
      })}
      <figcaption className="model-viewer-hint">{hint}</figcaption>
    </figure>
  )
}
