import type { ModelViewerElement } from "@google/model-viewer"
import "@google/model-viewer"
import { createElement, useEffect, useRef, useState } from "react"
import { assetUrl } from "./security"

type Props = {
  src: string
  poster?: string
  alt: string
  hint: string
}

export function ModelViewer({ src, poster, alt, hint }: Props) {
  const ref = useRef<ModelViewerElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.src = assetUrl(src)
    el.poster = poster ? assetUrl(poster) : ""
    el.alt = alt
    el.loading = "eager"
    el.cameraControls = true
    el.autoRotate = true
    el.shadowIntensity = 1
    el.exposure = 1.05
    el.interactionPrompt = "auto"

    const onError = () => setFailed(true)
    el.addEventListener("error", onError)
    return () => el.removeEventListener("error", onError)
  }, [src, poster, alt])

  return (
    <figure className="model-viewer-frame">
      {createElement("model-viewer", {
        ref,
        "touch-action": "pan-y",
      })}
      <figcaption className="model-viewer-hint">
        {failed ? "Chargement 3D impossible — réessaie dans un instant" : hint}
      </figcaption>
    </figure>
  )
}
