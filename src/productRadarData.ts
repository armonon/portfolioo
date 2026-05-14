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
  primaryLink?: { label: string; href: string };
  secondaryLink?: { label: string; href: string };
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
  },
  {
    id: "creator-tools",
    icon: "🎬",
    title: "Auto Cut / Context Compositor",
    status: "Concept → Prototype",
    phase: "Workflow design",
    readiness: 32,
    accent: "from-violet-500/30 via-fuchsia-500/20 to-sky-500/10",
    summary: "Creator tools for faster editing, subject-aware masking, smart backgrounds, and timeline workflow speed.",
    bullets: ["Strong creator-tool bundle potential", "Clear portfolio download direction", "Next: clickable editor workflow prototype"],
    nextAction: "Ship a click-through workflow that shows import → select subject → generate edit/composite.",
    blocker: "Needs a visible prototype before it can feel like more than a product direction.",
    primaryLink: { label: "Auto Cut pack", href: "/downloads/auto-cut-preview-pack.zip" },
    secondaryLink: { label: "Compositor pack", href: "/downloads/context-compositor-preview-pack.zip" },
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
  },
];

export const radarMetrics = [
  { value: String(radarLanes.length), label: "product lanes" },
  { value: "4", label: "live surfaces" },
  { value: "52%", label: "avg readiness" },
  { value: "1", label: "daily idea loop" },
];

export const radarOpportunities = [
  "Turn Product Radar into the portfolio's command-center page for current products and next launches.",
  "Bundle Auto Cut, Context Compositor, and Sattari Audio as a creator software suite.",
  "Reuse Librarian-style provenance across Botanica and Trader so claims, ideas, and setups cite sources.",
  "Add an honest launch-readiness score to each product: build, proof, UX, docs, deploy, risk, and next blocker.",
];

export const radarNextBuildSteps = [
  { title: "Data-driven radar", body: "Cards now render from a typed data file instead of hard-coded JSX blocks.", state: "Started" },
  { title: "Product links", body: "Each serious lane has a live site, download, or source link so it behaves like a product page hub.", state: "Live in v0.2" },
  { title: "Readiness scores", body: "Every lane now shows a practical readiness percentage, next action, and blocker.", state: "Live in v0.2" },
  { title: "Daily idea feed", body: "The daily app-idea loop now has a visible intake area on the Radar page.", state: "Seeded" },
];

export const radarIdeaFeed = [
  {
    name: "Product Radar OS",
    theme: "Operating system for Armon's active products",
    mvp: "Auto-generate lane cards from wiki notes, deploy status, and GitHub activity.",
  },
  {
    name: "Creator Tool Bundle",
    theme: "One suite for editors, musicians, and content builders",
    mvp: "Unify Auto Cut, Context Compositor, and Auto Pitch into one product landing path.",
  },
  {
    name: "Evidence Engine",
    theme: "Reusable provenance layer for research-heavy products",
    mvp: "Bring Librarian-style source trails into Botanica and Trader cards.",
  },
];
