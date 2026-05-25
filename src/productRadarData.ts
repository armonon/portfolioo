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

export type RadarEvidenceItem = {
  priority: number;
  projectName: string;
  softwareId?: string;
  readinessScore: number;
  promise: string;
  latestProof: string;
  blocker: string;
  nextStep: string;
  monetization: string;
};

export const radarLanes: RadarLane[] = [
  {
    id: "sattari-audio",
    icon: "🥁",
    title: "Sattari Audio",
    status: "Building",
    phase: "Productization",
    readiness: 40,
    accent: "from-orange-500/30 via-amber-500/20 to-yellow-500/10",
    summary: "Music tools and Sattari-branded audio products moving into proof-driven internal laptop testing.",
    bullets: ["Sattari Audio Suite internal test pack is available", "Auto Pitch remains blocked on real owned/cleared vocal WAVs", "StemDeck v0.3.6 pre-alpha b9f4909 package is available for DAW/listening tests"],
    nextAction: "Download the latest StemDeck v0.3.6 pre-alpha b9f4909 package from Product Radar and run laptop/DAW validation without beta/sale-ready claims.",
    blocker: "Suite has internal-alpha/prototype downloads, but still needs real vocal corpus, DAW import/listening validation, safe-volume UX proof, and visual export proof.",
    primaryLink: { label: "Sattari site", href: "https://sattari.netlify.app" },
    secondaryLink: { label: "Suite test pack", href: "/downloads/sattari-audio-suite-internal-test-pack-2026-05-25.zip" },
    detail: {
      eyebrow: "Audio product lane",
      description: "Sattari Audio is the lane for Armon's music tools: tuning, drum/audio utilities, and installable creative plugins. The suite test pack is available for Armon's laptop validation, but the page keeps the status honest: prototype/internal-alpha only until real vocal corpus tests, DAW import/listening checks, safe-volume UX proof, visual export proof, installer docs, and user validation pass.",
      images: [
        { src: "/photos/auto-pitch-example.svg", alt: "Auto Pitch interface concept", caption: "Auto Pitch lead product direction" },
        { src: "/photos/sattari-screenshot.png", alt: "Sattari website screenshot", caption: "Sattari public brand surface" },
      ],
      downloads: [
        { label: "Download Sattari Audio Suite internal test pack", href: "/downloads/sattari-audio-suite-internal-test-pack-2026-05-25.zip" },
        { label: "Download StemDeck v0.3.6 pre-alpha b9f4909", href: "/downloads/stemdeck-plugin-alpha-v0.3.6-prealpha-b9f4909.tar.gz" },
        { label: "Download Auto Pitch preview pack", href: "/downloads/auto-pitch-preview-pack.zip" },
        { label: "Open Sattari site", href: "https://sattari.netlify.app" },
      ],
      highlights: ["Audio suite internal test pack available", "Prototype/internal-alpha only", "Real validation still required before any beta or sale-ready language"],
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
        { label: "Download Sattari Audio Suite internal test pack", href: "/downloads/sattari-audio-suite-internal-test-pack-2026-05-25.zip" },
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
      { label: "Download ScenePilot export proof MP4", href: "/downloads/scenepilot-export-proof-2026-05-23.mp4" },
      { label: "Download ScenePilot preview pack", href: "/downloads/auto-cut-preview-pack.zip" },
      { label: "Download export proof manifest", href: "/downloads/scenepilot-export-proof-2026-05-23-manifest.json" },
    ],
    testingFocus: "Upload/arrangement flow, clarity of the edit plan, export proof quality, asset-lane UX, and whether the product direction feels useful for real creators.",
    testSteps: ["Open the live beta", "Download the 2026-05-23 export proof MP4 and manifest", "Try a simple creator-kit scenario with video/logo/voiceover assets", "Record missing controls needed before sale-ready positioning"],
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
    id: "sattari-audio-suite",
    title: "Sattari Audio Suite",
    category: "Audio suite",
    status: "Internal test pack",
    image: "/photos/auto-pitch-example.svg",
    summary: "Unified Sattari Audio prototype/internal-alpha pack for laptop validation across Auto Pitch, Rhythm Genie, Pure Tone, Cymatic, and current plugin builds.",
    description: "The Sattari Audio Suite internal test pack bundles the current validation docs, prototype tools, and internal-alpha plugin/app archives for Armon's laptop testing. It is explicitly not a beta, public release, DAW-validated build, professionally validated product, or sale-ready suite. Testing should focus on proof: real vocal corpus blockers for Auto Pitch, DAW MIDI import checks for Rhythm Genie, safe-volume UX notes for Pure Tone, visual/export proof for Cymatic, and DAW/listening notes for the plugin builds.",
    tags: ["Audio", "Internal testing", "Validation", "Sattari"],
    downloads: [
      { label: "Download Sattari Audio Suite internal test pack", href: "/downloads/sattari-audio-suite-internal-test-pack-2026-05-25.zip" },
      { label: "Download StemDeck v0.3.6 pre-alpha b9f4909", href: "/downloads/stemdeck-plugin-alpha-v0.3.6-prealpha-b9f4909.tar.gz" },
    ],
    testingFocus: "Laptop validation only: install/open what is included, run the checklists, and record blockers without treating the suite as beta or sale-ready.",
    testSteps: ["Download the suite test pack", "Read README_DOWNLOAD_FIRST.md", "Install or open only the internal-alpha/prototype tools you want to test", "Run the included validation checklists", "Record bugs, artifacts, mapping problems, safety concerns, and missing docs"],
  },
  {
    id: "stemdeck",
    title: "Sattari StemDeck",
    category: "Audio plugin",
    status: "Internal pre-alpha download",
    image: "/photos/auto-pitch-example.svg",
    summary: "Four-deck Sattari Audio remix plugin/app pre-alpha with external stem lanes, optional Demucs setup, beat sync, live key analysis, target-key matching, pads, mic monitor, recording, and DJ/DAW architecture seams.",
    description: "Sattari StemDeck v0.3.6 pre-alpha b9f4909 is available as a truth-labeled internal test package for DAW/listening tests. The build includes VST3 and Standalone artifacts, external Full/Drums/Bass/Music/Vocals stem lanes, optional Demucs setup scripts, host BPM sync, Beat Sync with per-deck Source BPM and Beat Grid Offset, LiveKey analysis, target-key matching/shifting, Preserve/key-lock routing, pads, mic monitoring, WAV recording, and the latest separator-path hardening. It is not sale-ready until known-BPM/key DAW tests prove sync, LiveKey accuracy, and audio quality.",
    tags: ["Audio", "Plugin", "Remix", "Internal pre-alpha"],
    downloads: [
      { label: "Download StemDeck v0.3.6 pre-alpha b9f4909", href: "/downloads/stemdeck-plugin-alpha-v0.3.6-prealpha-b9f4909.tar.gz" },
    ],
    testingFocus: "Install the VST3/Standalone pre-alpha, optionally run the included Demucs setup, load known-BPM/key tracks or prepared stems, then validate beat sync, LiveKey accuracy, Preserve/key-shift quality, recording, and DAW save/reopen behavior without treating it as sale-ready.",
    testSteps: ["Download the v0.3.6 pre-alpha b9f4909 package", "Run scripts/install_user_plugins.sh or copy the VST3/Standalone artifact manually", "Load two known-BPM/key loops or songs in a DAW", "Set each deck Source BPM, enable Host Sync + Beat Sync, and nudge Beat Grid Offset", "Enable Preserve + LiveKey, set a target key, and listen for matching quality/artifacts", "Record a 60-second WAV and document drift, clicks, false key readings, or crashes"],
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

export const radarEvidenceLedger: RadarEvidenceItem[] = [
  {
    priority: 1,
    projectName: "ScenePilot Studio",
    softwareId: "scenepilot-studio",
    readinessScore: 5.5,
    promise: "Turn creator assets into a beat-aware edit plan creators can understand and eventually export.",
    latestProof: "Public beta is live; deterministic cut-plan render produced a 3.6s MP4 proof, and the live ScenePilot UI now includes an MP4 render-helper export button.",
    blocker: "Next blocker is true one-click desktop/app export plus manual asset/timeline controls; the current UI helper still requires local FFmpeg/helper steps.",
    nextStep: "Wire the MP4 render helper into the desktop/app path so creators can export without editing a command script.",
    monetization: "Freemium creator beta, paid exports, then Pro desktop/plugin tier.",
  },
  {
    priority: 2,
    projectName: "NOW Suite auth/database/profile foundation",
    softwareId: "now-suite",
    readinessScore: 3,
    promise: "Provide the identity, profile, private vault, and service foundation for the product ecosystem.",
    latestProof: "Preview is live; fixture-safe staging smoke/runbook exists for auth/profile boundaries.",
    blocker: "Real auth/database/profile ownership needs approved provider, staging database, and secrets handling.",
    nextStep: "Refresh the fixture-mode staging smoke and attach the exact pass/fail output to the ledger.",
    monetization: "Account layer for paid NOW services, Market seller profiles, premium profiles, and subscriptions.",
  },
  {
    priority: 3,
    projectName: "Project Radar Directory",
    softwareId: "product-radar",
    readinessScore: 7,
    promise: "Give every serious application one truthful test page with status, proof, blockers, and next steps.",
    latestProof: "Live software directory, test pages, preview packs, and internal evidence ledger are active.",
    blocker: "More evidence fields still need generated sync from wiki/repo/deploy checks instead of manual copy.",
    nextStep: "Turn this evidence ledger into generated Radar input with proof paths, blockers, and readiness scores.",
    monetization: "Portfolio operating system for product conversion, services, and future reusable command-center tooling.",
  },
  {
    priority: 4,
    projectName: "Auto Pitch",
    softwareId: "auto-pitch",
    readinessScore: 3.5,
    promise: "Help singers and producers tune vocals with auto key, adaptive sections, and natural-to-hard correction.",
    latestProof: "Generated vocal-ish source/corrected/guide WAVs exist for internal listening review.",
    blocker: "Needs real vocal A/B listening tests, DAW validation, and an installer path.",
    nextStep: "Create one A/B listening pack with source, natural, modern, hard, and adapt outputs plus a score sheet.",
    monetization: "Paid Sattari Audio plugin/standalone app with presets, upgrades, and creator bundles.",
  },
  {
    priority: 5,
    projectName: "Context Compositor",
    softwareId: "context-compositor",
    readinessScore: 2.5,
    promise: "Make subject-aware background and overlay compositing faster for creators.",
    latestProof: "Local MVP merged-frame/video artifacts exist under sites/context-compositor-mvp/outputs.",
    blocker: "Needs a clear before/after proof set and a defined editor workflow before public positioning.",
    nextStep: "Create one before/after proof card from the existing MVP frames and attach it to the ledger.",
    monetization: "Creator-suite module or paid desktop/editor add-on bundled with ScenePilot/COMPOSITOR.",
  },
  {
    priority: 6,
    projectName: "COMPOSITOR native editor foundation",
    softwareId: "compositor-native",
    readinessScore: 4,
    promise: "Provide a native frame/layer/timeline editor foundation with reliable project persistence.",
    latestProof: "Qt/C++ SQLite session, import queue, recovery, and fail-closed relink logs are documented.",
    blocker: "Needs a visible alpha slice: import clip, view timeline/layers, save/reopen, then eventually render/export.",
    nextStep: "Capture one local alpha proof log for open project → import queue → save/reopen → relink preview readiness.",
    monetization: "Paid native creator app, pro license, and modules for compositing/ScenePilot workflows.",
  },
  {
    priority: 7,
    projectName: "Market seller profile/listing flow",
    softwareId: "market",
    readinessScore: 3,
    promise: "Let sellers present profile-backed listings with clear source/readiness labels before checkout.",
    latestProof: "NOW Suite Market preview and browser smoke screenshot are live/recorded.",
    blocker: "No live checkout, scraping, marketplace feed, or external seller/buyer messaging until approved.",
    nextStep: "Add a seller profile/listing fixture smoke: listing card → seller profile → saved item/inquiry placeholder.",
    monetization: "Seller subscriptions, listing boosts, transaction fees after compliance, and paid tenant marketplaces.",
  },
  {
    priority: 8,
    projectName: "Sattari StemDeck",
    softwareId: "stemdeck",
    readinessScore: 4.5,
    promise: "Give producers and performers a four-deck stem playback/remix tool that can become a validated Sattari Audio plugin.",
    latestProof: "StemDeck v0.3.6 pre-alpha b9f4909 package is downloadable with VST3/Standalone artifacts and optional Demucs setup scripts; validation passed build, codesign, granular/beat-sync/live-key/architecture/separator-command contract checks, Demucs wrapper smoke, and pluginval strictness 5.",
    blocker: "Still needs real DAW/listening validation with known BPM/key material; AI stem separation is optional local Demucs setup rather than bundled consumer install, no sale-grade time-stretch/key detector, and hosted-plugin routing remains scaffold-only.",
    nextStep: "Install the pre-alpha package from Project Radar and run the DAW/listening matrix for sync drift, LiveKey accuracy, Preserve/key-shift artifacts, optional Demucs stem-cache generation, recording, and save/reopen behavior.",
    monetization: "Paid Sattari Audio plugin/standalone app, creator bundle, and future sample/stem ecosystem.",
  },
  {
    priority: 9,
    projectName: "Botanica Lab",
    softwareId: "botanica-lab",
    readinessScore: 5.5,
    promise: "Turn botanical research into evidence-aware formula/concept cards with safety and review status.",
    latestProof: "Live concept app and public source repo are verified; test pack is listed in Product Radar.",
    blocker: "Consumer-facing claims require review; formula cards need citations, safety flags, and source strength.",
    nextStep: "Add one formula-card fixture with citations, safety flags, source strength, and claims-review status.",
    monetization: "Internal MNR R&D engine, then paid formulation workspace or compliance-aware content tool.",
  },
  {
    priority: 10,
    projectName: "Trader Oracle",
    softwareId: "trader-oracle",
    readinessScore: 5,
    promise: "Convert watchlists, market news, and catalysts into research-only setups with risk and invalidation.",
    latestProof: "Live beta dashboard and weekday watchlist/research automation are active.",
    blocker: "Needs stronger source trails, risk/invalidation display, and a watch/avoid board.",
    nextStep: "Add one ticker research card fixture with source links, risk note, invalidation point, and research-only label.",
    monetization: "Research dashboard subscription, premium watchlist tools, and educational market-intelligence reports.",
  },
  {
    priority: 11,
    projectName: "Librarian Atlas",
    softwareId: "librarian-atlas",
    readinessScore: 4.5,
    promise: "Help readers discover public-domain books and inspect the provenance behind source/readability claims.",
    latestProof: "Live prototype plus local SQLite/provenance backend artifacts and test pack.",
    blocker: "Needs richer book detail/source-inspection routes and provenance confidence on important claims.",
    nextStep: "Add or verify one book detail proof with source link, public-domain confidence, and reading-path link.",
    monetization: "Premium research library, curated reading paths, source API, and trust layer for Botanica/Trader.",
  },
];

export const radarMetrics = [
  { value: String(radarLanes.length), label: "product lanes" },
  { value: String(radarSoftwareProjects.length), label: "software pages" },
  { value: String(radarSoftwareProjects.reduce((sum, project) => sum + project.downloads.length, 0)), label: "downloadables" },
  { value: String(radarEvidenceLedger.length), label: "evidence rows" },
];

export const radarOpportunities = [
  "Make Product Radar answer one question fast: what proof exists, what is blocked, and what is the smallest useful next build?",
  "Convert the evidence ledger into generated input from wiki, GitHub, deploy checks, screenshots, demos, and build logs.",
  "Put live proof first: export, screenshot, demo video, test result, or build log before adding more concept copy.",
  "Keep regulated lanes safe: Market avoids checkout/scraping claims, Trader stays research-only, and Botanica carries citations/safety/review labels.",
];

export const radarNextBuildSteps = [
  { title: "ScenePilot export proof", body: "Produce one deterministic sample input → edit plan → rendered MP4 or structured timeline export, then attach the artifact to the ledger.", state: "P0" },
  { title: "NOW fixture smoke", body: "Refresh the fixture-mode auth/database/profile smoke output before any real provider, secret, or staging cutover work.", state: "P1" },
  { title: "Generated evidence ledger", body: "Move proof paths, blockers, readiness scores, and risk labels from manual notes into generated Radar input.", state: "P1" },
  { title: "Auto Pitch A/B pack", body: "Bundle source, natural, modern, hard, and adaptive vocal outputs with a listening score sheet before plugin claims.", state: "P2" },
  { title: "Safety-first proof cards", body: "Market, Trader, and Botanica must show proof with guardrails: no checkout/scraping, research-only, citations, safety flags, and review labels.", state: "Always" },
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
