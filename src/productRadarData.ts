export type RadarLink = {
  label: string;
  href: string;
};

export type RadarImage = {
  src: string;
  alt: string;
  caption: string;
};

export type RadarLaneDetail = {
  eyebrow: string;
  description: string;
  images: RadarImage[];
  downloads: RadarLink[];
  highlights: string[];
};

export type RadarLane = {
  id: string;
  icon: string;
  title: string;
  status: string;
  phase: string;
  readiness: number;
  accent: string;
  summary: string;
  bullets: string[];
  nextAction: string;
  blocker: string;
  primaryLink?: RadarLink;
  secondaryLink?: RadarLink;
  detail: RadarLaneDetail;
  evidence?: {
    source: string;
    confidence: "low" | "medium" | "high";
    review: string;
  };
};

export type RadarSoftwareProject = {
  id: string;
  title: string;
  category: string;
  status: string;
  image: string;
  summary: string;
  description: string;
  tags: string[];
  live?: RadarLink;
  repo?: RadarLink;
  downloads: RadarLink[];
  testingFocus: string;
  testSteps: string[];
};

export const radarLanes: RadarLane[] = [
  {
    id: "sattari-audio",
    icon: "🥁",
    title: "Sattari Audio",
    status: "Building",
    phase: "Productization",
    readiness: 38,
    accent: "from-orange-500/30 via-amber-500/20 to-yellow-500/10",
    summary: "Music tools and Sattari-branded audio products moving toward real installable releases.",
    bullets: ["Auto Pitch is the lead product lane", "Sale-ready standard over demo hype", "Next: real-user audio tests and installer path"],
    nextAction: "Convert the strongest audio prototype into a repeatable install/test package.",
    blocker: "Needs realistic input testing and a clean installer path before sale-ready language.",
    primaryLink: { label: "Sattari site", href: "https://sattari.netlify.app" },
    secondaryLink: { label: "Auto Pitch pack", href: "/downloads/auto-pitch-preview-pack.zip" },
    detail: {
      eyebrow: "Audio product lane",
      description: "Sattari Audio is the lane for Armon's music tools: tuning, drum/audio utilities, and installable creative plugins. Auto Pitch is the lead direction, but the page keeps the status honest until installer, DAW validation, docs, and real-user listening gates pass.",
      images: [
        { src: "/photos/auto-pitch-example.svg", alt: "Auto Pitch interface concept", caption: "Auto Pitch lead product direction" },
        { src: "/photos/sattari-screenshot.png", alt: "Sattari website screenshot", caption: "Sattari public brand surface" },
      ],
      downloads: [
        { label: "Download Auto Pitch preview pack", href: "/downloads/auto-pitch-preview-pack.zip" },
        { label: "Open Sattari site", href: "https://sattari.netlify.app" },
      ],
      highlights: ["Audio plugin/product lane", "Preview pack available", "Needs installer + DAW/user validation before sale-ready language"],
    },
  },
  {
    id: "creator-tools",
    icon: "🎬",
    title: "ScenePilot Studio",
    status: "Live beta + concept",
    phase: "Creator workflow tools",
    readiness: 44,
    accent: "from-violet-500/30 via-fuchsia-500/20 to-sky-500/10",
    summary: "ScenePilot Studio is the public English beta for beat-aware edit plans, with Context Compositor remaining the next subject-aware smart-background concept.",
    bullets: ["ScenePilot public beta is live", "Accepts logos, voiceovers, videos, and effects", "Auto-arranges asset lanes around beat/cut maps"],
    nextAction: "Harden ScenePilot with rendered MP4/layer export, manual asset editing, BPM/grid polish, and Premiere import QA before broader creator-suite positioning.",
    blocker: "Not sale-ready yet: needs rendered asset/layer export, manual edit controls, installer/packaging, and real Premiere workflow validation.",
    primaryLink: { label: "ScenePilot beta", href: "https://sattari-auto-cut.netlify.app" },
    secondaryLink: { label: "Compositor preview", href: "/downloads/context-compositor-preview-pack.zip" },
    detail: {
      eyebrow: "Video creator tools",
      description: "ScenePilot Studio is becoming an auto-arranging editing assistant: add logos, voiceovers, extra videos, and effects, then let it build a beat-aware arrangement plan. Context Compositor remains the next concept for subject-aware scene/background compositing.",
      images: [
        { src: "/photos/context-compositor-example.svg", alt: "Context Compositor concept visual", caption: "Smart background and compositor concept" },
        { src: "/photos/auto-pitch-example.svg", alt: "Sattari software visual system", caption: "Shared Sattari software/product styling" },
      ],
      downloads: [
        { label: "Open ScenePilot beta", href: "https://sattari-auto-cut.netlify.app" },
        { label: "Download ScenePilot preview pack", href: "/downloads/auto-cut-preview-pack.zip" },
        { label: "Download Compositor preview pack", href: "/downloads/context-compositor-preview-pack.zip" },
      ],
      highlights: ["ScenePilot beta is public", "Creative-kit auto-arrangement is started", "Rendered/layered export is the next hardening gate"],
    },
    evidence: {
      source: "wiki/projects/video/index.md",
      confidence: "high",
      review: "Keep beta/concept wording; no sale-ready claim.",
    },
  },
  {
    id: "botanica",
    icon: "🌿",
    title: "Botanica Lab",
    status: "Live concept",
    phase: "Living research",
    readiness: 64,
    accent: "from-emerald-500/30 via-lime-500/20 to-teal-500/10",
    summary: "A botanical R&D interface for research-backed concept generation with careful claim boundaries.",
    bullets: ["Living research and article model", "Evidence-first wellness product exploration", "Next: formula cards with risk/evidence scoring"],
    nextAction: "Add formula cards that show source strength, safety flags, and review status.",
    blocker: "Consumer-facing language still needs claims review; keep outputs framed as R&D.",
    primaryLink: { label: "Live lab", href: "https://botanica-lab.netlify.app/" },
    secondaryLink: { label: "Source repo", href: "https://github.com/armonon/botanica-lab" },
    detail: {
      eyebrow: "Botanical R&D",
      description: "Botanica is a living research lab for botanical product concepts, ingredient signals, formula exploration, and safe wellness-product ideation. The lane emphasizes evidence boundaries and review before consumer-facing claims.",
      images: [
        { src: "/photos/botanica-example.svg", alt: "Botanica Lab concept visual", caption: "Botanica R&D product surface" },
        { src: "/photos/sattari-screenshot.png", alt: "Brand/product web example", caption: "Public product-site polish direction" },
      ],
      downloads: [
        { label: "Open Botanica Lab", href: "https://botanica-lab.netlify.app/" },
        { label: "Open source repo", href: "https://github.com/armonon/botanica-lab" },
      ],
      highlights: ["Live research surface", "Claims review required", "Formula cards and source strength are next"],
    },
  },
  {
    id: "trader",
    icon: "📈",
    title: "Trader Oracle",
    status: "Live beta",
    phase: "Signal refinement",
    readiness: 58,
    accent: "from-amber-500/30 via-orange-500/20 to-red-500/10",
    summary: "A research dashboard that turns watchlists, market news, and catalysts into educational trade-prep scenarios.",
    bullets: ["Watchlist + market pulse engine", "Scenario framing with risk and invalidation", "Next: better source trails and alert controls"],
    nextAction: "Add source trails and a watch/avoid board for the strongest daily setups.",
    blocker: "Must stay research/education only; no personalized financial advice or guaranteed-return copy.",
    primaryLink: { label: "Live dashboard", href: "https://armon-trader.netlify.app" },
    detail: {
      eyebrow: "Market research dashboard",
      description: "Trader Oracle is a research dashboard for watchlists, market pulse, ticker search, and risk-aware setup scenarios. It is framed as education/research only, with no personalized financial advice or guaranteed-return language.",
      images: [
        { src: "/photos/trader-oracle-example.svg", alt: "Trader Oracle dashboard visual", caption: "Oracle dashboard and signal surface" },
        { src: "/photos/botanica-example.svg", alt: "Research product visual language", caption: "Evidence-led research product pattern" },
      ],
      downloads: [
        { label: "Open Trader Oracle", href: "https://armon-trader.netlify.app" },
      ],
      highlights: ["Live beta dashboard", "Risk/invalidation framing", "Needs stronger source trails and alert controls"],
    },
  },
  {
    id: "librarian",
    icon: "📚",
    title: "Librarian",
    status: "Prototype",
    phase: "Trust layer",
    readiness: 46,
    accent: "from-stone-400/30 via-zinc-500/20 to-blue-500/10",
    summary: "A provenance-first book atlas for public-domain discovery, source inspection, and reading paths.",
    bullets: ["Source claims are the core edge", "Explore page and path model are started", "Next: richer book detail pages"],
    nextAction: "Deploy the richer Explore/source-inspection pass and add book/path deep links.",
    blocker: "Newest feature pass still needs production deployment and route-level polish.",
    primaryLink: { label: "Live atlas", href: "https://librarian-atlas.netlify.app" },
    detail: {
      eyebrow: "Knowledge + provenance",
      description: "Librarian is the source-first book atlas direction: public-domain discovery, provenance claims, authority links, reading paths, and source inspection. Spiritual Search now belongs near this lane as an older related spiritual/library discovery surface.",
      images: [
        { src: "/photos/librarian-example.svg", alt: "Librarian atlas concept visual", caption: "Open book atlas and source inspection" },
        { src: "/photos/context-compositor-example.svg", alt: "Structured research interface visual", caption: "Card-based discovery and inspection pattern" },
      ],
      downloads: [
        { label: "Open Librarian atlas", href: "https://librarian-atlas.netlify.app" },
        { label: "Open Spiritual Search", href: "https://spiritual-search-armon.netlify.app" },
      ],
      highlights: ["Provenance-first discovery", "Spiritual Search is Librarian-adjacent", "Next pass should add deeper book/path routes"],
    },
  },
  {
    id: "portfolio-downloads",
    icon: "✨",
    title: "Portfolio + Product Downloads",
    status: "Live",
    phase: "Public surface",
    readiness: 72,
    accent: "from-cyan-500/30 via-blue-500/20 to-white/10",
    summary: "The public surface for Armon's software, websites, AI experiences, and preview-pack product directions.",
    bullets: ["Product downloads are visible", "Work is grouped by product direction", "Next: make each serious product its own page"],
    nextAction: "Turn Product Radar into the top-level roadmap and link serious products into dedicated pages.",
    blocker: "Preview packs should stay clearly labeled until real installers/apps exist.",
    primaryLink: { label: "Portfolio home", href: "#" },
    detail: {
      eyebrow: "Portfolio hub",
      description: "The portfolio is the public surface for Armon's products and preview packs. Product Radar now acts as the top-level roadmap that turns each lane into a clickable product detail screen with images, status, links, and downloads.",
      images: [
        { src: "/photos/nasiri-screenshot.png", alt: "Nasiri site screenshot", caption: "Portfolio-quality web surface" },
        { src: "/photos/milk-room-screenshot.png", alt: "Milk Room app screenshot", caption: "Older personal app/project example" },
        { src: "/photos/sattari-screenshot.png", alt: "Sattari site screenshot", caption: "Sattari commerce/brand surface" },
      ],
      downloads: [
        { label: "Download ScenePilot preview pack", href: "/downloads/auto-cut-preview-pack.zip" },
        { label: "Download Auto Pitch preview pack", href: "/downloads/auto-pitch-preview-pack.zip" },
        { label: "Download Compositor preview pack", href: "/downloads/context-compositor-preview-pack.zip" },
      ],
      highlights: ["Public portfolio hub", "Preview downloads are labeled honestly", "Dedicated product detail pages are now the next structural layer"],
    },
  },
];

export const radarSoftwareProjects: RadarSoftwareProject[] = [
  {
    id: "scenepilot-studio",
    title: "ScenePilot Studio",
    category: "Video editing",
    status: "Public beta + preview pack",
    image: "/photos/context-compositor-example.svg",
    summary: "Beat-smart creator workflow for arranging logos, voiceovers, clips, and effects into a timeline plan.",
    description: "ScenePilot Studio is the most testable video-tool surface right now: a public beta that explores beat-aware edit planning, asset lanes, and creator-friendly arrangement logic. It should be tested as a workflow product rather than as a finished editor until rendered/layered export and manual editing controls are hardened.",
    tags: ["Video", "Creator tools", "Beat-aware editing"],
    live: { label: "Open ScenePilot beta", href: "https://sattari-auto-cut.netlify.app" },
    downloads: [
      { label: "Download ScenePilot preview pack", href: "/downloads/auto-cut-preview-pack.zip" },
    ],
    testingFocus: "Upload/arrangement flow, clarity of the edit plan, asset-lane UX, and whether the product direction feels useful for real creators.",
    testSteps: ["Open the live beta", "Try a simple creator-kit scenario with video/logo/voiceover assets", "Download the preview pack for the current product brief", "Record missing controls needed before sale-ready positioning"],
  },
  {
    id: "context-compositor",
    title: "Context Compositor",
    category: "Video compositing",
    status: "Concept + preview pack",
    image: "/photos/context-compositor-example.svg",
    summary: "Subject-aware smart-background and overlay direction for faster believable compositing.",
    description: "Context Compositor is the smart-background/overlay product direction for video creators. The current downloadable is an honest preview pack, not an installer, and the next technical gate is native app/editor integration with reliable subject/background behavior.",
    tags: ["Video", "Compositing", "Smart backgrounds"],
    downloads: [
      { label: "Download Context Compositor preview pack", href: "/downloads/context-compositor-preview-pack.zip" },
    ],
    testingFocus: "Evaluate the concept, desired editor workflow, and which examples would prove the compositing promise clearly.",
    testSteps: ["Download the preview pack", "Review the product direction", "Compare against real editing pain points", "List the first examples needed for a convincing native prototype"],
  },
  {
    id: "compositor-native",
    title: "COMPOSITOR",
    category: "Native video editor",
    status: "Native Qt foundation",
    image: "/photos/context-compositor-example.svg",
    summary: "Native-first frame/layer video editor foundation with SQLite sessions, import queues, timeline navigation, and recovery-safe project handling.",
    description: "COMPOSITOR is the serious native video-editor direction: frame-level control, layer-first editing, timeline-aware inspection, SQLite project/session storage, import queues, recovery-safe saves, backup restore paths, and safe missing-media relink flows. It is internal foundation work today, not a public installer yet.",
    tags: ["Native app", "Video editor", "Qt/C++"],
    downloads: [],
    testingFocus: "Internal validation should focus on project/session reliability, timeline navigation clarity, import/relink safety, and whether the native editor foundation feels credible before public packaging.",
    testSteps: ["Run the native CMake/CTest gate", "Open the Qt shell locally", "Verify SQLite project/session save and restore behavior", "Check that media probe/relink actions stay opt-in and fail closed"],
  },
  {
    id: "now-suite",
    title: "NOW Suite",
    category: "Identity platform",
    status: "Preview prototype",
    image: "/photos/digital-human-example.svg",
    summary: "Profile, identity, vault, avatar, and service hub direction for Armon's broader internet activity platform.",
    description: "NOW Suite is the platform layer for profiles, identity memory, vault-style private data, public profile surfaces, service navigation, and safe agent-assistance boundaries. Current work is preview/prototype and contract-backed rather than a production identity provider.",
    tags: ["Identity", "Profiles", "Platform"],
    live: { label: "Open NOW preview", href: "https://now-suite-preview.netlify.app" },
    downloads: [],
    testingFocus: "Check whether the profile/vault/identity flows make the platform thesis understandable while preserving privacy and approval boundaries.",
    testSteps: ["Open the NOW preview", "Review profile and vault surfaces", "Confirm private/public boundaries are clear", "Note what needs real auth/database approval before production positioning"],
  },
  {
    id: "market",
    title: "Market",
    category: "Marketplace platform",
    status: "Contract-backed prototype",
    image: "/photos/sattari-screenshot.png",
    summary: "Universal marketplace search and tenant-ready seller/listing system powered by NOW profiles.",
    description: "Market is the first NOW service direction: universal marketplace search, tenant-specific marketplace surfaces, NOW-backed seller cards, listing readiness labels, saved items, and safe inquiry prototypes. Current copy keeps no-scraping, no-checkout, no-live-message, and no-partnership guardrails visible.",
    tags: ["Marketplace", "NOW", "Seller profiles"],
    live: { label: "Open Market preview", href: "https://now-suite-preview.netlify.app/market/" },
    downloads: [],
    testingFocus: "Evaluate listing/search clarity, tenant configuration, seller profile connection, and whether marketplace limitations are obvious before live connectors or checkout.",
    testSteps: ["Open the Market preview", "Try tenant/source/search filters", "Inspect a listing and seller card", "Confirm checkout, scraping, and external messaging are not implied as live"],
  },
  {
    id: "stemdeck",
    title: "Sattari StemDeck",
    category: "Audio plugin",
    status: "Internal build",
    image: "/photos/auto-pitch-example.svg",
    summary: "Dual-deck remix/plugin direction for Sattari Audio, built toward stricter AU/VST3/Standalone validation.",
    description: "Sattari StemDeck is a newer Sattari Audio product candidate for dual-deck stem playback, remix control, and performance-oriented audio workflows. It stays internal until the JUCE/CMake/plugin validation path, UX, and audio proof are stronger.",
    tags: ["Audio", "Plugin", "Remix"],
    downloads: [],
    testingFocus: "Internal testing should validate the stem-deck interaction model, plugin build gates, and whether the product has a sharper use case than a generic loop deck.",
    testSteps: ["Run the local plugin build/validation gate", "Check dual-deck interaction behavior", "Compare against the Sattari plugin build standard", "List proof needed before preview or sale-ready language"],
  },
  {
    id: "auto-pitch",
    title: "Auto Pitch",
    category: "Audio plugin",
    status: "Prototype + preview pack",
    image: "/photos/auto-pitch-example.svg",
    summary: "Sattari vocal tuning product direction with auto key, adaptive song sections, and sale-ready plugin ambitions.",
    description: "Auto Pitch is the lead Sattari audio software direction. The public download stays labeled as a preview pack while the actual product work continues toward installer packaging, DAW validation, natural/modern/hard correction modes, and real-user listening tests.",
    tags: ["Audio", "Music production", "Vocal tuning"],
    downloads: [
      { label: "Download Auto Pitch preview pack", href: "/downloads/auto-pitch-preview-pack.zip" },
    ],
    testingFocus: "Clarity of the product promise, expected controls, installer expectations, and vocal workflow needs before DAW beta testing.",
    testSteps: ["Download the preview pack", "Review the tuning workflow direction", "Note which controls are mandatory for singers/producers", "Use those notes to prioritize the first installable build"],
  },
  {
    id: "botanica-lab",
    title: "Botanica Lab",
    category: "Research app",
    status: "Live concept + test pack",
    image: "/photos/botanica-example.svg",
    summary: "Botanical R&D surface for evidence-aware formula exploration and wellness-product concept work.",
    description: "Botanica Lab turns botanical/product research into a safer exploration interface. Testing should focus on source clarity, claim boundaries, formula-card usefulness, and whether the app helps generate reviewable ideas without overclaiming medical outcomes.",
    tags: ["Botanical R&D", "Research", "Compliance-aware UX"],
    live: { label: "Open Botanica Lab", href: "https://botanica-lab.netlify.app/" },
    repo: { label: "Source repo", href: "https://github.com/armonon/botanica-lab" },
    downloads: [
      { label: "Download Botanica test pack", href: "/downloads/botanica-lab-test-pack.zip" },
    ],
    testingFocus: "Source trails, safety wording, formula-card structure, and whether a reviewer can quickly separate ideas from claims.",
    testSteps: ["Open the live lab", "Review the research/formula surfaces", "Download the test pack", "Flag any copy that sounds like a consumer medical claim"],
  },
  {
    id: "trader-oracle",
    title: "Trader Oracle",
    category: "Market research",
    status: "Live beta + test pack",
    image: "/photos/trader-oracle-example.svg",
    summary: "Watchlist and catalyst dashboard for educational trade-prep scenarios with risk/invalidation framing.",
    description: "Trader Oracle is a research dashboard for ticker exploration, watchlists, market pulse, and scenario framing. It should be tested for speed, source visibility, risk language, and whether users can understand that it is research/education rather than personalized financial advice.",
    tags: ["Markets", "Research", "Risk framing"],
    live: { label: "Open Trader Oracle", href: "https://armon-trader.netlify.app" },
    downloads: [
      { label: "Download Trader Oracle test pack", href: "/downloads/trader-oracle-test-pack.zip" },
    ],
    testingFocus: "Watchlist flow, news/catalyst clarity, risk/invalidation copy, and speed of forming a research-only setup.",
    testSteps: ["Open the live dashboard", "Search or review a ticker/watchlist", "Check that risk and invalidation are visible", "Download the test pack and record missing source trails"],
  },
  {
    id: "librarian-atlas",
    title: "Librarian Atlas",
    category: "Knowledge tool",
    status: "Live prototype + test pack",
    image: "/photos/librarian-example.svg",
    summary: "Provenance-first public-domain book atlas for discovery, source inspection, and reading paths.",
    description: "Librarian Atlas is the trust/provenance software lane: a way to discover books, inspect source claims, follow reading paths, and keep public-domain availability grounded in evidence. Testing should focus on whether each important claim has a visible source trail.",
    tags: ["Books", "Provenance", "Research"],
    live: { label: "Open Librarian Atlas", href: "https://librarian-atlas.netlify.app" },
    downloads: [
      { label: "Download Librarian test pack", href: "/downloads/librarian-atlas-test-pack.zip" },
    ],
    testingFocus: "Book discovery, source inspection, authority links, and clarity of public-domain/readability claims.",
    testSteps: ["Open the atlas", "Search for a book or source path", "Check whether claims are backed by links", "Download the test pack and note where deeper detail pages are needed"],
  },
  {
    id: "digital-human-mvp",
    title: "Digital Human MVP",
    category: "AI avatar",
    status: "Live fallback demo + test pack",
    image: "/photos/digital-human-example.svg",
    summary: "Browser avatar/chat demo with visemes and hybrid animation readiness, pending true neural/photo engine approval.",
    description: "Digital Human MVP is a working fallback demo for avatar chat: browser-GLB responses, viseme metadata, and readiness reporting. The testing page keeps the truth clear: useful fallback demo now, not a true neural/photo talking-head product until the engine and persistence pieces are approved/configured.",
    tags: ["AI avatar", "Chat", "Animation"],
    live: { label: "Open Digital Human MVP", href: "https://digital-human-mvp.onrender.com" },
    downloads: [
      { label: "Download Digital Human test pack", href: "/downloads/digital-human-mvp-test-pack.zip" },
    ],
    testingFocus: "Chat response reliability, avatar readiness, viseme/animation quality, and honest fallback-vs-neural positioning.",
    testSteps: ["Open the live MVP", "Try a short chat prompt", "Watch avatar/viseme behavior", "Download the test pack and log blockers before neural/photo positioning"],
  },
  {
    id: "product-radar",
    title: "Project Radar Directory",
    category: "Portfolio OS",
    status: "Live directory + test pack",
    image: "/photos/nasiri-screenshot.png",
    summary: "The portfolio command center for software pages, downloadables, testing links, and product-status clarity.",
    description: "Project Radar is being upgraded from a roadmap into the software testing directory: every serious software project gets a clear card, a full page, live links when available, downloadable test/preview packs, and practical test steps.",
    tags: ["Portfolio", "Directory", "Testing hub"],
    live: { label: "Open portfolio home", href: "#" },
    downloads: [
      { label: "Download Project Radar test pack", href: "/downloads/project-radar-test-pack.zip" },
    ],
    testingFocus: "Can someone quickly find every product, understand what it is, download the right pack, and open a focused test page?",
    testSteps: ["Scan the software directory", "Open three product pages", "Download one pack", "Check whether the status language makes testing easier"],
  },
];

export const radarMetrics = [
  { value: String(radarLanes.length), label: "product lanes" },
  { value: String(radarSoftwareProjects.length), label: "software pages" },
  { value: String(radarSoftwareProjects.reduce((sum, project) => sum + project.downloads.length, 0)), label: "downloadables" },
  { value: String(radarLanes.filter((lane) => lane.primaryLink?.href.startsWith("http")).length), label: "live/beta surfaces" },
];

export const radarOpportunities = [
  "Turn Product Radar into the portfolio's command-center page for current products and next launches.",
  "Bundle ScenePilot Studio, COMPOSITOR, Context Compositor, StemDeck, and Sattari Audio as a creator software suite.",
  "Reuse Librarian-style provenance across Botanica and Trader so claims, ideas, and setups cite sources.",
  "Add an honest launch-readiness score to each product: build, proof, UX, docs, deploy, risk, and next blocker.",
];

export const radarNextBuildSteps = [
  { title: "Software testing directory", body: "Project Radar now has a dedicated software directory: every serious project gets a card, a full page, test steps, links, and downloadable packs.", state: "Live" },
  { title: "Clickable lane detail screens", body: "Each big Radar box still opens a focused project screen with images, deeper description, blockers, links, and downloads/resources.", state: "Live" },
  { title: "Safe public sync", body: "Radar copy reflects the live ScenePilot beta separately from the still-concept Context Compositor lane.", state: "Live" },
  { title: "Evidence-backed fields", body: "Lane cards carry source, confidence, and review notes so future hourly scans know what is safe to update.", state: "Started" },
  { title: "Generated inputs", body: "Next step: generate more software page fields from wiki/GitHub/Netlify evidence so new projects appear automatically; this pass added current NOW/Market, COMPOSITOR, and StemDeck pages manually.", state: "Next" },
];

export const radarIdeaFeed = [
  {
    name: "Product Radar Detail Pages",
    theme: "Clickable product screens inside the portfolio roadmap",
    mvp: "Open each lane into images, description, status, blockers, links, and downloads without leaving Product Radar.",
  },
  {
    name: "Product Radar OS",
    theme: "Operating system for Armon's active products",
    mvp: "Auto-sync safe lane copy from wiki evidence, then verify, commit, and push without supervision.",
  },
  {
    name: "Lane Evidence Ledger",
    theme: "Per-lane source map for safe autonomous updates",
    mvp: "Track live link, source page, confidence, blocker source, and review-needed flag for each Radar card.",
  },
];
