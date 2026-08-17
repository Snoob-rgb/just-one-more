/** Public site config — never put secrets or private inbox here. */
export const site = {
  name: "Just One More",
  url: "https://justonemorestudio.vercel.app",
  instagram: "https://www.instagram.com/justonemore.exe/",
  /** Mets un lien itch/Drive/GitHub Releases quand le build est public */
  quietblockDownload: "downloads/QuietBlock-1.0.0.zip",
  model3d: {
    src: "models/demon_mascotte.glb",
    poster: "models/demon_mascotte.png",
  },
} as const
