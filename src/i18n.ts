export type Lang = "fr" | "en"

export const copy = {
  fr: {
    skip: "Aller au contenu",
    navStudio: "Studio",
    navWork: "Projets",
    navLab: "Lab",
    navServices: "Services",
    navMethod: "Méthode",
    navFaq: "FAQ",
    navContact: "Contact",
    headline: "On construit. On montre.",
    heroLead:
      "Studio créateur — logiciels, jeux et contenu. Une session de plus, toujours.",
    ctaWork: "Voir les projets",
    ctaContact: "Travailler avec nous",
    ctaInstagram: "Instagram",
    liveNote: "Studio actif · builds publics",
    studioLabel: "Studio",
    studioTitle: "Trois terrains. Une exigence.",
    studioLead:
      "Just One More conçoit des produits numériques et le récit qui les accompagne — avec un goût pour le détail et le rythme.",
    pillars: [
      {
        index: "01",
        title: "Logiciels",
        text: "Apps et outils pensés pour être clairs, rapides, et agréables à utiliser au quotidien.",
      },
      {
        index: "02",
        title: "Jeux",
        text: "Des expériences jouables avec une vraie direction et une boucle qui donne envie de revenir.",
      },
      {
        index: "03",
        title: "Contenu",
        text: "Process, coulisses et idées — on montre comment les choses se construisent, pas seulement le résultat.",
      },
    ],
    methodLabel: "Méthode",
    methodTitle: "Peu de bruit. Beaucoup de finition.",
    methodLead:
      "On avance par itérations courtes : prototype, test, polish. Chaque build doit se sentir intentionnel.",
    steps: [
      { title: "Cadrer", text: "Une intention claire avant d’ouvrir l’éditeur." },
      { title: "Construire", text: "Une base solide, lisible, prête à évoluer." },
      { title: "Montrer", text: "Publier, recueillir, améliorer — en public." },
    ],
    workLabel: "Projets",
    workTitle: "En cours & à venir",
    workLead: "Le portfolio grandit. QuietBlock est déjà téléchargeable.",
    featuredLabel: "Projet phare",
    followBuild: "Suivre le build",
    model3dLabel: "Modélisation 3D",
    showcase3dLabel: "Vitrine",
    model3dTitle: "Personnages & assets en 3D",
    model3dLead:
      "Génération et texturage IA, puis livraison en GLB / FBX / OBJ — prêt pour le web, les jeux ou l’impression.",
    model3dHint: "Glisse ou pince pour tourner le modèle",
    model3dItems: [
      {
        title: "Mascotte studio",
        lead: "Panda roux — identité visuelle Just One More, prête pour le web et les réseaux.",
        alt: "Mascotte panda roux 3D — modèle interactif",
      },
      {
        title: "Démon entrepreneur",
        lead: "Personnage de marque premium — cartoon cinématique, déclinable en poses et expressions.",
        alt: "Mascotte démon entrepreneur 3D — modèle interactif",
      },
    ],
    downloadQuietblock: "Télécharger QuietBlock",
    projects: [
      {
        tag: "Extension · Chrome / Edge",
        status: "Dispo",
        title: "QuietBlock",
        text: "Bloqueur de pubs et de trackers, 100 % local. Un interrupteur, zéro télémétrie, zéro « pubs acceptables ».",
        featured: false,
        download: true,
      },
      {
        tag: "Utilitaire · Windows",
        status: "Prochain",
        title: "TidyDrop",
        text: "Trieur intelligent du dossier Téléchargements. Scan, groupes clairs, suppression Safe — des Go récupérés sans stress.",
        featured: false,
      },
    ],
    labLabel: "Lab",
    labTitle: "Utilitaires en préparation",
    labLead:
      "Une gamme d’outils Windows pensés pour un résultat visible — et du contenu qui se démontre tout seul.",
    labItems: [
      {
        name: "Who’s Loud",
        blurb: "Qui mange ton réseau, ton CPU, ton disque — en live.",
      },
      {
        name: "ParkBox",
        blurb: "Parking temporaire de fichiers : décider plus tard, ranger maintenant.",
      },
      {
        name: "DupliVision",
        blurb: "Doublons et photos similaires, face à face.",
      },
      {
        name: "ShotReady",
        blurb: "Capture → recadrage → export prêt à poster.",
      },
      {
        name: "ConvertFlash",
        blurb: "Conversions image / PDF / audio, 100 % local.",
      },
      {
        name: "ClipShelf",
        blurb: "Presse-papiers privé, cherchable, pinnable.",
      },
      {
        name: "BootSlim",
        blurb: "Démarrage allégé, chronométré, réversible.",
      },
    ],
    servicesLabel: "Services",
    servicesTitle: "On peut aussi construire pour toi",
    servicesLead:
      "Prestations claires pour sites, logiciels et identité — du cadrage au livrable, sans usine à gaz.",
    services: [
      {
        title: "Sites web",
        text: "Vitrine, landing, refonte. Rapide, lisible, prêt à publier.",
      },
      {
        title: "Logiciels & outils",
        text: "Apps Windows / web sur mesure, utilitaires, automatisations.",
      },
      {
        title: "Jeux & prototypes",
        text: "Prototype jouable, direction, polish — pour tester une idée vite.",
      },
      {
        title: "Identité & contenu",
        text: "Logo, charte, visuels et formats courts pour faire exister le produit.",
      },
      {
        title: "Modélisation 3D",
        text: "Personnages, props et mascottes — du prompt au modèle texturé, livrable multi-formats.",
      },
    ],
    servicesCta: "Demander un devis",
    faqLabel: "FAQ",
    faqTitle: "Questions fréquentes",
    faqLead: "Le minimum utile, sans jargon.",
    faqs: [
      {
        q: "Vous faites quoi exactement ?",
        a: "On crée des logiciels, des jeux, et le contenu qui montre le process — du prototype jusqu’au polish. On propose aussi des prestations (sites, outils, identité).",
      },
      {
        q: "On peut collaborer ?",
        a: "Oui. Utilise le formulaire de contact ou Instagram : idées, partenariats, feedback, devis — on lit tout.",
      },
      {
        q: "Les utilitaires sont déjà dispo ?",
        a: "QuietBlock (bloqueur de pubs Chrome / Edge) est téléchargeable dans Projets. TidyDrop arrive ensuite ; le reste du lab est annoncé ici au fur et à mesure.",
      },
      {
        q: "Où suivre les builds ?",
        a: "Sur Instagram @justonemore.exe et ici, sur ce site, à chaque sortie.",
      },
      {
        q: "Comment se passe un devis ?",
        a: "Tu décris le besoin (site, outil, prototype). On cadre le périmètre, le délai et un prix clair — pas de surprise.",
      },
    ],
    contactLabel: "Contact",
    contactTitle: "Une idée ? Une collab ?",
    contactLead:
      "Envoie un message via le formulaire sécurisé, ou suis le studio sur Instagram.",
    formName: "Nom",
    formEmail: "Email",
    formMessage: "Message",
    formCaptcha: "Anti-spam — combien font",
    formSend: "Envoyer",
    formSending: "Envoi…",
    formSuccess: "Message envoyé. Merci — on te répond vite.",
    formError: "Envoi impossible. Réessaie ou contacte-nous sur Instagram.",
    formActivation:
      "Le service mail n’est pas encore branché. Crée une clé gratuite sur web3forms.com et envoie-la ici.",
    formSetup:
      "Branchement mail requis : crée une clé gratuite sur resend.com (avec ton Gmail), puis envoie-moi la clé API.",
    formRefreshCaptcha: "Nouveau calcul",
    backTop: "Haut de page",
    footerLine: "Software · Games · Content",
  },
  en: {
    skip: "Skip to content",
    navStudio: "Studio",
    navWork: "Work",
    navLab: "Lab",
    navServices: "Services",
    navMethod: "Method",
    navFaq: "FAQ",
    navContact: "Contact",
    headline: "We build. We show.",
    heroLead:
      "Creator studio — software, games, and content. One more session, always.",
    ctaWork: "See projects",
    ctaContact: "Work with us",
    ctaInstagram: "Instagram",
    liveNote: "Active studio · public builds",
    studioLabel: "Studio",
    studioTitle: "Three fields. One standard.",
    studioLead:
      "Just One More crafts digital products and the story around them — with a taste for detail and pace.",
    pillars: [
      {
        index: "01",
        title: "Software",
        text: "Apps and tools designed to feel clear, fast, and good to use every day.",
      },
      {
        index: "02",
        title: "Games",
        text: "Playable experiences with real direction and loops that make you come back.",
      },
      {
        index: "03",
        title: "Content",
        text: "Process, behind-the-scenes, ideas — we show how things get made, not only the result.",
      },
    ],
    methodLabel: "Method",
    methodTitle: "Less noise. More finish.",
    methodLead:
      "We move in short loops: prototype, test, polish. Every build should feel intentional.",
    steps: [
      { title: "Frame", text: "A clear intention before opening the editor." },
      { title: "Build", text: "A solid, readable base ready to grow." },
      { title: "Show", text: "Ship, listen, improve — in public." },
    ],
    workLabel: "Work",
    workTitle: "In progress & next",
    workLead: "The portfolio is growing. QuietBlock is available to download.",
    featuredLabel: "Featured",
    followBuild: "Follow the build",
    model3dLabel: "3D modeling",
    showcase3dLabel: "Showcase",
    model3dTitle: "Characters & 3D assets",
    model3dLead:
      "AI mesh generation and texturing, delivered as GLB / FBX / OBJ — ready for web, games, or print.",
    model3dHint: "Drag or pinch to rotate the model",
    model3dItems: [
      {
        title: "Studio mascot",
        lead: "Red panda — Just One More visual identity, ready for web and social.",
        alt: "Red panda mascot 3D — interactive model",
      },
      {
        title: "Entrepreneur demon",
        lead: "Premium brand character — cinematic cartoon, easy to vary in poses and expressions.",
        alt: "Entrepreneur demon mascot 3D — interactive model",
      },
    ],
    downloadQuietblock: "Download QuietBlock",
    projects: [
      {
        tag: "Extension · Chrome / Edge",
        status: "Available",
        title: "QuietBlock",
        text: "Local ad & tracker blocker. One switch, zero telemetry, no “acceptable ads”.",
        featured: false,
        download: true,
      },
      {
        tag: "Utility · Windows",
        status: "Next",
        title: "TidyDrop",
        text: "Smart Downloads triage. Scan, clear groups, Safe delete — reclaim space without stress.",
        featured: false,
      },
    ],
    labLabel: "Lab",
    labTitle: "Utilities in the works",
    labLead:
      "A Windows tool lineup built for visible results — and content that demos itself.",
    labItems: [
      {
        name: "Who’s Loud",
        blurb: "Which app is eating network, CPU, disk — live.",
      },
      {
        name: "ParkBox",
        blurb: "Temporary file parking: decide later, tidy now.",
      },
      {
        name: "DupliVision",
        blurb: "Duplicates and lookalike photos, side by side.",
      },
      {
        name: "ShotReady",
        blurb: "Capture → crop → share-ready export.",
      },
      {
        name: "ConvertFlash",
        blurb: "Image / PDF / audio conversion, fully local.",
      },
      {
        name: "ClipShelf",
        blurb: "Private clipboard history — searchable, pinnable.",
      },
      {
        name: "BootSlim",
        blurb: "Leaner startup, timed, reversible.",
      },
    ],
    servicesLabel: "Services",
    servicesTitle: "We can build for you too",
    servicesLead:
      "Clear offers for sites, software, and identity — from framing to delivery, no bloat.",
    services: [
      {
        title: "Websites",
        text: "Brochure sites, landings, redesigns. Fast, readable, ready to ship.",
      },
      {
        title: "Software & tools",
        text: "Custom Windows / web apps, utilities, automation.",
      },
      {
        title: "Games & prototypes",
        text: "Playable prototype, direction, polish — to test an idea fast.",
      },
      {
        title: "Identity & content",
        text: "Logo, visual system, short formats that make the product exist.",
      },
      {
        title: "3D modeling",
        text: "Characters, props, and mascots — from prompt to textured model, multi-format delivery.",
      },
    ],
    servicesCta: "Request a quote",
    faqLabel: "FAQ",
    faqTitle: "Common questions",
    faqLead: "The useful minimum, no fluff.",
    faqs: [
      {
        q: "What do you actually do?",
        a: "We make software, games, and the content that shows the process — from prototype to polish. We also take on client work (sites, tools, identity).",
      },
      {
        q: "Can we collaborate?",
        a: "Yes. Use the contact form or Instagram: ideas, partnerships, feedback, quotes — we read everything.",
      },
      {
        q: "Are the utilities available yet?",
        a: "QuietBlock (Chrome / Edge ad blocker) is downloadable under Work. TidyDrop ships next; the rest of the lab is announced here as it lands.",
      },
      {
        q: "Where can I follow builds?",
        a: "On Instagram @justonemore.exe and here on this site as releases land.",
      },
      {
        q: "How does a quote work?",
        a: "You describe the need (site, tool, prototype). We frame scope, timeline, and a clear price — no surprises.",
      },
    ],
    contactLabel: "Contact",
    contactTitle: "An idea? A collab?",
    contactLead:
      "Send a message through the secure form, or follow the studio on Instagram.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formCaptcha: "Anti-spam — what is",
    formSend: "Send",
    formSending: "Sending…",
    formSuccess: "Message sent. Thanks — we’ll reply soon.",
    formError: "Could not send. Try again or reach us on Instagram.",
    formActivation:
      "Mail delivery isn’t connected yet. Create a free key on web3forms.com and send it here.",
    formSetup:
      "Mail setup required: create a free API key on resend.com (with your Gmail), then send me the key.",
    formRefreshCaptcha: "New challenge",
    backTop: "Back to top",
    footerLine: "Software · Games · Content",
  },
} as const
