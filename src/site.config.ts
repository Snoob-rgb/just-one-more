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
      stats: [95, 80, 88],
    },
    {
      id: "demon",
      src: "models/demon_mascotte.glb",
      poster: "models/demon_mascotte.png",
      stats: [85, 90, 60],
    },
    {
      id: "dragon",
      src: "models/dragon_gamer.glb",
      poster: "models/dragon_gamer.png",
      stats: [75, 95, 40],
    },
    {
      id: "azure",
      src: "models/azure_guardian.glb",
      poster: "models/azure_guardian.png",
      stats: [80, 70, 30],
    },
    {
      id: "renard_hacker",
      src: "models/renard_hacker.glb",
      poster: "models/renard_hacker.png",
      stats: [90, 85, 75],
    },
    {
      id: "hibou_streamer",
      src: "models/hibou_streamer.glb",
      poster: "models/hibou_streamer.png",
      stats: [78, 88, 95],
    },
    {
      id: "robot_compagnon",
      src: "models/robot_compagnon.glb",
      poster: "models/robot_compagnon.png",
      stats: [70, 100, 3],
    },
    {
      id: "phenix_createur",
      src: "models/phenix_createur.glb",
      poster: "models/phenix_createur.png",
      stats: [100, 92, 55],
    },
    {
      id: "loup_indie",
      src: "models/loup_indie.glb",
      poster: "models/loup_indie.png",
      stats: [88, 65, 100],
    },
    {
      id: "chat_barista",
      src: "models/chat_barista.glb",
      poster: "models/chat_barista.png",
      stats: [82, 75, 100],
    },
  ],
} as const
