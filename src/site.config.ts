/** Public site config — never put secrets or private inbox here. */
export const site = {
  name: "Just One More",
  url: "https://justonemorestudio.vercel.app",
  instagram: "https://www.instagram.com/justonemore.exe/",
  quietblockDownload: "downloads/QuietBlock-1.0.0.zip",
  mascotImage: "models/mascotte.png",
  models3d: [
    {
      id: "mascotte",
      src: "models/mascotte.glb",
      poster: "models/mascotte.png",
    },
    {
      id: "demon",
      src: "models/demon_mascotte.glb",
      poster: "models/demon_mascotte.png",
    },
  ],
} as const
