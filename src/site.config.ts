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
      featured: true,
    },
    {
      id: "demon",
      src: "models/demon_mascotte.glb",
      poster: "models/demon_mascotte.png",
    },
    {
      id: "dragon",
      src: "models/dragon_gamer.glb",
      poster: "models/dragon_gamer.png",
    },
    {
      id: "azure",
      src: "models/azure_guardian.glb",
      poster: "models/azure_guardian.png",
    },
    {
      id: "renard_hacker",
      src: "models/renard_hacker.glb",
      poster: "models/renard_hacker.png",
    },
    {
      id: "hibou_streamer",
      src: "models/hibou_streamer.glb",
      poster: "models/hibou_streamer.png",
    },
    {
      id: "robot_compagnon",
      src: "models/robot_compagnon.glb",
      poster: "models/robot_compagnon.png",
    },
    {
      id: "phenix_createur",
      src: "models/phenix_createur.glb",
      poster: "models/phenix_createur.png",
    },
    {
      id: "loup_indie",
      src: "models/loup_indie.glb",
      poster: "models/loup_indie.png",
    },
    {
      id: "chat_barista",
      src: "models/chat_barista.glb",
      poster: "models/chat_barista.png",
    },
  ],
} as const
