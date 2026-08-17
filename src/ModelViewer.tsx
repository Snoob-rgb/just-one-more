import { ModelViewerElement } from "@google/model-viewer"
import "@google/model-viewer"
import { createElement, useEffect, useRef, useState } from "react"
import { assetUrl } from "./security"

ModelViewerElement.dracoDecoderLocation = assetUrl("draco/")

type Props = {
  src: string
  poster?: string
  alt: string
  hint: string
}

export function ModelViewer({ src, poster, alt, hint }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onError = () => setFailed(true)
    el.addEventListener("error", onError)
    return () => el.removeEventListener("error", onError)
  }, [])

  return (
    <figure className="model-viewer-frame">
      {createElement("model-viewer", {
        ref,
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
      })}
      <figcaption className="model-viewer-hint">
        {failed ? "Chargement 3D impossible — réessaie dans un instant" : hint}
      </figcaption>
    </figure>
  )
}
