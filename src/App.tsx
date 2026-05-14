import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ExternalLink, Code2, Mail, Sparkles, Download } from "lucide-react";
import { radarIdeaFeed, radarLanes, radarMetrics, radarNextBuildSteps, radarOpportunities } from "./productRadarData";

function ProductRadarPage({ onHome }: { onHome: () => void }) {
  const [selectedLaneId, setSelectedLaneId] = useState(() => {
    const match = window.location.hash.match(/^#\/product-radar\/([^/?#]+)/);
    return match?.[1] ?? null;
  });
  const selectedLane = radarLanes.find((lane) => lane.id === selectedLaneId);
  const linkTarget = (href: string) => href.startsWith("http") ? "_blank" : undefined;
  const openLane = (laneId: string) => {
    setSelectedLaneId(laneId);
    window.history.pushState(null, "", `#/product-radar/${laneId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closeLane = () => {
    setSelectedLaneId(null);
    window.history.pushState(null, "", "#/product-radar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const syncLane = () => {
      const match = window.location.hash.match(/^#\/product-radar\/([^/?#]+)/);
      setSelectedLaneId(match?.[1] ?? null);
    };
    window.addEventListener("hashchange", syncLane);
    window.addEventListener("popstate", syncLane);
    return () => {
      window.removeEventListener("hashchange", syncLane);
      window.removeEventListener("popstate", syncLane);
    };
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-10%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute right-[-14%] top-[5%] h-[34rem] w-[34rem] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[30%] h-[30rem] w-[30rem] rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={selectedLane ? closeLane : onHome}
            className="w-fit rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white"
          >
            {selectedLane ? "← Back to all Radar lanes" : "← Back to portfolio"}
          </button>
          <div className="rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-400">
            Product Radar · {selectedLane ? `${selectedLane.title} detail` : "v0.3 clickable roadmap"}
          </div>
        </div>

        {selectedLane ? (
          <>
            <section className={`overflow-hidden rounded-[2rem] border border-zinc-800 bg-gradient-to-br ${selectedLane.accent} p-[1px] shadow-2xl shadow-black/30`}>
              <div className="rounded-[2rem] bg-zinc-950/88 p-7 backdrop-blur md:p-10 lg:p-12">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                      <span className="text-lg">{selectedLane.icon}</span> {selectedLane.detail.eyebrow}
                    </div>
                    <h1 className="text-4xl font-black tracking-tight md:text-6xl">{selectedLane.title}</h1>
                    <p className="mt-5 text-lg leading-relaxed text-zinc-300 md:text-xl">{selectedLane.detail.description}</p>
                  </div>
                  <div className="w-full rounded-3xl border border-white/10 bg-black/25 p-5 lg:max-w-sm">
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold text-zinc-300">
                      <span>{selectedLane.status}</span>
                      <span>{selectedLane.readiness}% ready</span>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-white" style={{ width: `${selectedLane.readiness}%` }} />
                    </div>
                    <div className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{selectedLane.phase}</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-5 backdrop-blur md:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {selectedLane.detail.images.map((image) => (
                    <figure key={image.src} className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
                      <img src={image.src} alt={image.alt} className="h-64 w-full object-cover" />
                      <figcaption className="border-t border-white/10 px-4 py-3 text-sm text-zinc-300">{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <aside className="space-y-4">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                  <h2 className="text-2xl font-bold tracking-tight">Downloads + links</h2>
                  <div className="mt-5 space-y-3">
                    {selectedLane.detail.downloads.map((download) => (
                      <a
                        key={`${download.label}-${download.href}`}
                        href={download.href}
                        target={linkTarget(download.href)}
                        rel={download.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white hover:text-black"
                      >
                        <span>{download.label}</span>
                        <ExternalLink size={15} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                  <h2 className="text-2xl font-bold tracking-tight">Project notes</h2>
                  <ul className="mt-5 space-y-3">
                    {selectedLane.detail.highlights.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-zinc-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
                <h2 className="text-2xl font-bold tracking-tight">Next action</h2>
                <p className="mt-3 leading-relaxed text-zinc-300">{selectedLane.nextAction}</p>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
                <h2 className="text-2xl font-bold tracking-tight">Current blocker</h2>
                <p className="mt-3 leading-relaxed text-zinc-400">{selectedLane.blocker}</p>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-7 shadow-2xl shadow-black/30 backdrop-blur md:p-10 lg:p-12">
              <div className="max-w-4xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                  <Sparkles size={16} /> Build OS for products, apps, and ideas
                </div>
                <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                  Product Radar is the command center for what I'm building next.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                  A living portfolio page for active product directions. Click any big Radar box to open a deeper project screen with images, descriptions, blockers, links, and downloads.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
                {radarMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <div className="text-3xl font-black tracking-tight text-white">{metric.value}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {radarLanes.map((lane) => (
                <motion.article
                  key={lane.id}
                  role="button"
                  tabIndex={0}
                  whileHover={{ y: -5 }}
                  onClick={() => openLane(lane.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openLane(lane.id);
                    }
                  }}
                  className={`cursor-pointer overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br ${lane.accent} p-[1px] outline-none transition focus:ring-2 focus:ring-white/70`}
                >
                  <div className="flex h-full flex-col rounded-3xl bg-zinc-950/86 p-6 backdrop-blur">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
                        {lane.icon}
                      </div>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-zinc-300">
                        {lane.status}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight">{lane.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">{lane.summary}</p>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
                        <span>{lane.phase}</span>
                        <span className="text-zinc-200">{lane.readiness}%</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-white" style={{ width: `${lane.readiness}%` }} />
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2">
                      {lane.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2 text-sm text-zinc-400">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Next action</div>
                        <p className="mt-1 text-zinc-200">{lane.nextAction}</p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Blocker</div>
                        <p className="mt-1 text-zinc-400">{lane.blocker}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-zinc-200">
                        Open details <ExternalLink size={13} />
                      </span>
                      {[lane.primaryLink, lane.secondaryLink].filter(Boolean).map((link) => (
                        <a
                          key={link!.label}
                          href={link!.href}
                          target={linkTarget(link!.href)}
                          rel={link!.href.startsWith("http") ? "noreferrer" : undefined}
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white hover:text-black"
                        >
                          {link!.label} <ExternalLink size={13} />
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
                <h2 className="text-3xl font-bold tracking-tight">Opportunity radar</h2>
                <div className="mt-6 space-y-3">
                  {radarOpportunities.map((item, index) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Idea {index + 1}</div>
                      <p className="mt-2 text-zinc-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
                <h2 className="text-3xl font-bold tracking-tight">Next build sequence</h2>
                <div className="mt-6 space-y-4">
                  {radarNextBuildSteps.map((step, index) => (
                    <div key={step.title} className="grid grid-cols-[2.25rem_1fr_auto] gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-black">{index + 1}</div>
                      <div>
                        <h3 className="font-semibold text-white">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-400">{step.body}</p>
                      </div>
                      <span className="hidden h-fit rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-zinc-300 sm:inline-block">{step.state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">Daily app idea feed</h2>
                  <p className="mt-2 max-w-2xl text-zinc-400">
                    Seed lane for the daily visionary app ideas. The next pass can promote the best idea into a product ticket.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-zinc-300">
                  Daily loop active
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {radarIdeaFeed.map((idea) => (
                  <div key={idea.name} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                    <h3 className="text-xl font-bold text-white">{idea.name}</h3>
                    <p className="mt-2 text-sm text-zinc-300">{idea.theme}</p>
                    <div className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">MVP</div>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-400">{idea.mvp}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => window.location.hash.startsWith("#/product-radar") ? "product-radar" : "home");

  useEffect(() => {
    const syncPage = () => setCurrentPage(window.location.hash.startsWith("#/product-radar") ? "product-radar" : "home");
    window.addEventListener("hashchange", syncPage);
    return () => window.removeEventListener("hashchange", syncPage);
  }, []);

  const projects = [
    {
      id: 3,
      title: "Botanica Lab",
      subtitle: "Botanical R&D and formulation-intelligence site",
      description:
        "A living research lab for botanical product concepts, ingredient signals, formula exploration, and safe wellness-product ideation.",
      tech: ["AI Research", "Netlify", "Data Design", "Compliance-Aware UX"],
      points: [
        "Turns botanical research into readable product concepts and research pulses.",
        "Uses a lab-style interface for remedy ideas, ingredient watchlists, and deeper dives.",
        "Keeps product claims framed carefully so concepts can be reviewed before public use."
      ],
      live: "https://botanica-lab.netlify.app/",
      liveLabel: "Live Lab",
      github: "https://github.com/armonon/botanica-lab",
      label: "Botanical AI",
      image: "/photos/botanica-example.svg",
      status: "Live concept",
      accent: "from-emerald-500/30 via-lime-500/20 to-teal-500/30"
    },
    {
      id: 4,
      title: "Stock Trader Oracle",
      subtitle: "Market-intelligence dashboard for watchlists and catalysts",
      description:
        "A stock research dashboard that turns a watchlist into market radar, ticker news, scenario-based trade ideas, and risk-aware research briefs.",
      tech: ["Market APIs", "Netlify Functions", "AI Analysis", "Research UX"],
      points: [
        "Tracks company watchlists, catalysts, headlines, and adjacent market themes.",
        "Frames plays as research scenarios with risks and invalidation instead of guarantees.",
        "Includes an analyst-style chat/API layer for faster ticker exploration."
      ],
      live: "https://armon-trader.netlify.app",
      liveLabel: "Live Dashboard",
      github: "#",
      label: "Fintech Research",
      image: "/photos/trader-oracle-example.svg",
      status: "Live beta",
      accent: "from-amber-500/30 via-orange-500/20 to-red-500/30"
    },
    {
      id: 5,
      title: "Librarian",
      subtitle: "Provenance-first atlas for public-domain books",
      description:
        "A book discovery prototype that combines search, source inspection, public-domain availability, reading paths, and authority links into one research interface.",
      tech: ["Vite", "SQLite", "Open Library", "Wikidata", "Source Provenance"],
      points: [
        "Surfaces readable/free book leads with citations, source links, confidence, and retrieval notes.",
        "Adds exploration paths, source coverage dashboards, and stronger book-discovery flows.",
        "Built for research trust: every important claim should point back to a source."
      ],
      live: "https://librarian-atlas.netlify.app",
      liveLabel: "Live Atlas",
      github: "#",
      label: "Knowledge Tool",
      image: "/photos/librarian-example.svg",
      status: "Live prototype",
      accent: "from-stone-400/30 via-zinc-500/20 to-blue-500/30"
    },
    {
      id: 7,
      title: "Sattari Music",
      subtitle: "Brand-forward music and drum business website",
      description:
        "A custom web direction for a music business centered on drum gear, local services, rentals, and brand identity.",
      image: "/photos/sattari-screenshot.png",
      tech: ["React", "Stripe", "E-commerce", "Responsive Design"],
      points: [
        "Organized the site to highlight products while still making room for repair, rental, and local services.",
        "Built with a cleaner custom direction instead of a boxed-in template feel.",
        "Focused on making the homepage feel product-led, visual, and strong for a niche audience."
      ],
      live: "https://sattari.netlify.app",
      liveLabel: "Live Site",
      github: "#",
      label: "Commerce",
      status: "Live site",
      accent: "from-zinc-500/30 via-neutral-500/20 to-white/10"
    },
    {
      id: 8,
      title: "Nasiri Team Realty",
      subtitle: "Modern real estate platform with live property listings",
      description:
        "A responsive real estate website designed for property listings, agent profiles, and seamless client communication.",
      image: "/photos/nasiri-screenshot.png",
      tech: ["React", "Real Estate CMS", "Property Listings", "Responsive Design"],
      points: [
        "Organized property listings with filtering by price, location, and property type.",
        "Built with a modern design direction that feels professional and trustworthy.",
        "Integrated smooth flows for viewing property details, agent info, and contact options."
      ],
      live: "https://nasiriteam.netlify.app",
      liveLabel: "Live Site",
      github: "#",
      label: "Real Estate",
      status: "Live site",
      accent: "from-blue-500/30 via-slate-500/20 to-zinc-500/30"
    }
  ];

  const productDownloads = [
    {
      title: "Auto Cut",
      subtitle: "Smart editing workflow preview pack",
      description:
        "A creator-focused editing product direction for faster cuts, timeline flow, and AI-assisted video workflow.",
      image: "/photos/context-compositor-example.svg",
      href: "/downloads/auto-cut-preview-pack.zip",
      fileLabel: "Download Auto Cut Preview Pack",
      site: "https://sattari-auto-cut.netlify.app",
      siteLabel: "Open Auto Cut Site",
      status: "Preview pack",
      tags: ["Video Editing", "AI Workflow", "Creator Tools"]
    },
    {
      title: "Context Compositor",
      subtitle: "Smart background overlay preview pack",
      description:
        "A video-editor product direction for subject-aware masking, believable background overlays, and faster compositing workflows.",
      image: "/photos/context-compositor-example.svg",
      href: "/downloads/context-compositor-preview-pack.zip",
      fileLabel: "Download Context Compositor Preview Pack",
      status: "Preview pack",
      tags: ["Video Editing", "Compositing", "Creator Tools"]
    },
    {
      title: "Auto Pitch",
      subtitle: "Sattari audio plugin preview pack",
      description:
        "A vocal pitch workflow product for fast correction, creative vocal control, and cleaner music-production sessions.",
      image: "/photos/auto-pitch-example.svg",
      href: "/downloads/auto-pitch-preview-pack.zip",
      fileLabel: "Download Auto Pitch Preview Pack",
      status: "Preview pack",
      tags: ["Music Tech", "Audio Plugin", "Vocal Workflow"]
    }
  ];

  const skills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Vite",
    "Tailwind",
    "Node.js",
    "Netlify",
    "API Integrations",
    "AI Product Design",
    "Realtime Interfaces",
    "E-commerce",
    "Data Dashboards",
    "Responsive Design",
    "UI/UX",
    "Git"
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Downloads", id: "downloads" },
    { label: "Work", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  const navigateToHash = (hash: string) => {
    window.history.pushState(null, "", hash);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const scrollToSection = (id: string) => {
    if (id === "product-radar") {
      setCurrentPage("product-radar");
      setMobileMenuOpen(false);
      navigateToHash("#/product-radar");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (currentPage !== "home") {
      navigateToHash("#");
      setCurrentPage("home");
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }

    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  if (currentPage === "product-radar") {
    return <ProductRadarPage onHome={() => scrollToSection("hero")} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-0 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Sticky Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/80 border-b border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent"
            >
              Armon Nasiri
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-white border-b-2 border-white pb-1"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => scrollToSection("product-radar")}
                className="rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-white/10 transition-colors hover:bg-zinc-100"
              >
                Product Radar
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden pb-4 space-y-2"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("product-radar")}
                className="mt-2 block w-full rounded-lg bg-white px-4 py-3 text-left text-sm font-semibold text-black transition-colors hover:bg-zinc-100"
              >
                Product Radar
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section
          id="hero"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="min-h-[90vh] flex items-center justify-center px-4 py-20"
        >
          <div className="max-w-5xl w-full text-center space-y-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300"
            >
              <Sparkles size={16} /> Product builder • AI tools • creative software
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              I build software, websites, and AI experiences that turn ideas into live products.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
            >
              I'm Armon Nasiri, a digital builder focused on product strategy, modern web design, AI-powered workflows, and bold visual systems for music, research, commerce, finance, books, avatars, and creative tools.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12"
            >
              {[
                { label: "Product directions", value: "8+" },
                { label: "AI-integrated builds", value: "5" },
                { label: "Brand-forward design", value: "100%" }
              ].map((stat, idx) => (
                <motion.div key={idx} variants={fadeUp} className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("downloads")}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
              >
                View Product Downloads
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 bg-zinc-900 text-white font-semibold rounded-lg border border-zinc-700 hover:border-zinc-500 transition-colors"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="py-20 px-4"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold">About</h2>
              <div className="h-1 w-16 bg-white rounded-full"></div>
              
              <p className="text-lg text-zinc-300 leading-relaxed">
                I build across the full early-product loop: naming the idea, shaping the interface, connecting the data, testing the workflow, and turning rough concepts into usable digital products.
              </p>

              <p className="text-lg text-zinc-300 leading-relaxed">
                My current portfolio spans software downloads, AI music tools, botanical research, stock-market intelligence, book discovery, video-editor concepts, and business websites. The common thread is simple: make the product feel useful, sharp, and memorable.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Product Downloads Section */}
        <motion.section
          id="downloads"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Product Downloads</h2>
              <div className="h-1 w-16 bg-white rounded-full mt-4"></div>
              <p className="mt-5 max-w-2xl text-zinc-400">
                Early product preview packs for the tools I'm building. These are not full installers yet — they package the product direction, feature notes, and next-build outline.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {productDownloads.map((product) => (
                <motion.div
                  key={product.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur transition-all hover:border-zinc-700"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={`${product.title} preview`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {product.status}
                    </div>
                  </div>

                  <div className="p-6 md:p-7">
                    <h3 className="text-2xl font-bold">{product.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">{product.subtitle}</p>
                    <p className="mt-4 text-zinc-300 leading-relaxed">{product.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-lg bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      {"site" in product && product.site ? (
                        <motion.a
                          href={product.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-zinc-800"
                        >
                          <ExternalLink size={16} />
                          {product.siteLabel}
                        </motion.a>
                      ) : null}

                      <motion.a
                        href={product.href}
                        download
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-100"
                      >
                        <Download size={16} />
                        {product.fileLabel}
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Projects Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Featured Product Work</h2>
              <div className="h-1 w-16 bg-white rounded-full mt-4"></div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-8"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="group bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image / Visual */}
                    <div className={`relative h-64 md:h-full min-h-80 overflow-hidden bg-gradient-to-br ${project.accent}`}>
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center p-8">
                          <div className="text-center">
                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-white/10 text-3xl font-black text-white shadow-2xl shadow-black/30">
                              {project.title.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="text-2xl font-bold text-white">{project.title}</div>
                            <div className="mt-2 text-sm text-zinc-200">{project.status}</div>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {project.status}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-xs font-semibold text-zinc-400 mb-3 px-3 py-1 bg-zinc-800 rounded-full">
                          {project.label}
                        </span>
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm text-zinc-400 mb-4">{project.subtitle}</p>
                        <p className="text-zinc-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-medium text-zinc-300 bg-zinc-800/50 px-3 py-1 rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Points */}
                        <ul className="space-y-2 mb-6">
                          {project.points.map((point, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-zinc-400 flex gap-2"
                            >
                              <span className="text-white font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {project.live !== "#" && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-100 transition-colors text-sm"
                          >
                            {project.liveLabel ?? "Live Demo"} <ExternalLink size={16} />
                          </motion.a>
                        )}
                        {project.github !== "#" && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                          >
                            Code <Code2 size={16} />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="py-20 px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Skills & Tech</h2>
              <div className="h-1 w-16 bg-white rounded-full mt-4"></div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="flex flex-wrap gap-3"
            >
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white rounded-full font-medium hover:border-zinc-600 hover:bg-zinc-800 transition-all cursor-pointer text-sm"
                >
                  {skill}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="py-20 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Let's Build</h2>
              <div className="h-1 w-16 bg-white rounded-full mx-auto"></div>
              
              <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                I'm open to freelance work, collaborations, product builds, and creative technical projects. If you want to turn an idea into something people can actually use, reach out.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <motion.a
                  href="mailto:armonnasiri@gmail.com"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  <Mail size={20} />
                  Email Me
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent mb-1">
                Armon Nasiri
              </div>
              <p className="text-sm text-zinc-500">Digital Product Builder</p>
            </div>
            <p className="text-sm text-zinc-500">
              © 2026 All rights reserved. Crafted with React, Tailwind & Framer Motion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
