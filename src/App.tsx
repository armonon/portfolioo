import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, ExternalLink, Code2, Mail, Sparkles, Download, RefreshCw } from "lucide-react";
import { radarEvidenceLedger, radarIdeaFeed, radarLanes, radarMetrics, radarNextBuildSteps, radarOpportunities, radarSoftwareProjects } from "./productRadarData";

const readRadarRoute = () => {
  const productMatch = window.location.hash.match(/^#\/product-radar\/software\/([^/?#]+)/);
  if (productMatch) {
    return { laneId: null, softwareId: productMatch[1] };
  }

  const laneMatch = window.location.hash.match(/^#\/product-radar\/([^/?#]+)/);
  return { laneId: laneMatch?.[1] ?? null, softwareId: null };
};

function ProductRadarPage({ onHome }: { onHome: () => void }) {
  const [selectedLaneId, setSelectedLaneId] = useState(() => readRadarRoute().laneId);
  const [selectedSoftwareId, setSelectedSoftwareId] = useState(() => readRadarRoute().softwareId);
  const [isSweepRunning, setIsSweepRunning] = useState(false);
  const [sweepMessage, setSweepMessage] = useState("Ready to request a protected full-system sweep.");
  const selectedLane = radarLanes.find((lane) => lane.id === selectedLaneId);
  const selectedSoftware = radarSoftwareProjects.find((project) => project.id === selectedSoftwareId);
  const linkTarget = (href: string) => href.startsWith("http") ? "_blank" : undefined;
  const openLane = (laneId: string) => {
    setSelectedLaneId(laneId);
    setSelectedSoftwareId(null);
    window.history.pushState(null, "", `#/product-radar/${laneId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openSoftware = (softwareId: string) => {
    setSelectedLaneId(null);
    setSelectedSoftwareId(softwareId);
    window.history.pushState(null, "", `#/product-radar/software/${softwareId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const closeDetail = () => {
    setSelectedLaneId(null);
    setSelectedSoftwareId(null);
    window.history.pushState(null, "", "#/product-radar");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const requestFullSystemSweep = async () => {
    const adminToken = window.prompt("Enter the Product Radar admin token to request a full sweep.");

    if (!adminToken) {
      setSweepMessage("Sweep canceled. No admin token was provided.");
      return;
    }

    const payload = {
      requestedAt: new Date().toISOString(),
      source: "portfolio-product-radar",
      mode: "full-blocker-sweep",
      requestedActions: [
        "scan every Product Radar evidence row",
        "work safe blockers across all projects",
        "run verification before any push",
        "push verified safe changes",
        "generate one fresh next step for each product"
      ],
      projects: radarEvidenceLedger.map((project) => ({
        projectName: project.projectName,
        priority: project.priority,
        readinessScore: project.readinessScore,
        blocker: project.blocker,
        nextStep: project.nextStep,
        softwareId: project.softwareId ?? null,
      })),
      softwarePages: radarSoftwareProjects.map((project) => ({
        id: project.id,
        title: project.title,
        category: project.category,
        status: project.status,
        testingFocus: project.testingFocus,
      })),
    };

    setIsSweepRunning(true);
    setSweepMessage("Sending protected sweep request…");

    try {
      const response = await fetch("/.netlify/functions/product-sweep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Product-Sweep-Token": adminToken,
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setSweepMessage(result?.message ?? "Sweep request was not accepted. Check the protected webhook/token configuration.");
        return;
      }

      setSweepMessage(result?.message ?? "Sweep request accepted. The system should scan blockers, push verified changes, and generate next steps.");
    } catch {
      setSweepMessage("Sweep endpoint is not reachable yet. Deploy the Netlify function and configure the protected webhook/token to activate it.");
    } finally {
      setIsSweepRunning(false);
    }
  };

  useEffect(() => {
    const syncRoute = () => {
      const route = readRadarRoute();
      setSelectedLaneId(route.laneId);
      setSelectedSoftwareId(route.softwareId);
    };
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
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
            onClick={selectedLane || selectedSoftware ? closeDetail : onHome}
            className="w-fit rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-600 hover:text-white"
          >
            {selectedLane || selectedSoftware ? "← Back to Radar directory" : "← Back to portfolio"}
          </button>
          <div className="rounded-full border border-zinc-800 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-400">
            Product Radar · {selectedSoftware ? `${selectedSoftware.title} test page` : selectedLane ? `${selectedLane.title} detail` : "v0.4 software directory"}
          </div>
        </div>

        {selectedSoftware ? (
          <>
            <section className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-7 shadow-2xl shadow-black/30 backdrop-blur md:p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                    <Download size={16} /> {selectedSoftware.category} · {selectedSoftware.status}
                  </div>
                  <h1 className="text-4xl font-black tracking-tight md:text-6xl">{selectedSoftware.title}</h1>
                  <p className="mt-5 text-lg leading-relaxed text-zinc-300 md:text-xl">{selectedSoftware.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedSoftware.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <figure className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/20">
                  <img src={selectedSoftware.image} alt={`${selectedSoftware.title} product visual`} className="h-80 w-full object-cover" />
                  <figcaption className="border-t border-white/10 px-5 py-4 text-sm text-zinc-300">Testing page for {selectedSoftware.title}</figcaption>
                </figure>
              </div>
            </section>

            <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <aside className="space-y-4">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                  <h2 className="text-2xl font-bold tracking-tight">Downloadables</h2>
                  <div className="mt-5 space-y-3">
                    {selectedSoftware.downloads.map((download) => (
                      <a
                        key={`${download.label}-${download.href}`}
                        href={download.href}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-zinc-200"
                      >
                        <span>{download.label}</span>
                        <Download size={15} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur">
                  <h2 className="text-2xl font-bold tracking-tight">Open project</h2>
                  <div className="mt-5 space-y-3">
                    {[selectedSoftware.live, selectedSoftware.repo].filter(Boolean).map((link) => (
                      <a
                        key={link!.label}
                        href={link!.href}
                        target={linkTarget(link!.href)}
                        rel={link!.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white hover:text-black"
                      >
                        <span>{link!.label}</span>
                        <ExternalLink size={15} />
                      </a>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="space-y-4">
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
                  <h2 className="text-2xl font-bold tracking-tight">What to test</h2>
                  <p className="mt-3 leading-relaxed text-zinc-300">{selectedSoftware.testingFocus}</p>
                </div>
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur md:p-8">
                  <h2 className="text-2xl font-bold tracking-tight">Quick testing checklist</h2>
                  <div className="mt-5 space-y-3">
                    {selectedSoftware.testSteps.map((step, index) => (
                      <div key={step} className="grid grid-cols-[2.25rem_1fr] gap-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-black text-black">{index + 1}</div>
                        <p className="leading-relaxed text-zinc-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : selectedLane ? (
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
                  Product Radar is now the software testing directory.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                  A living portfolio hub for every serious software project. Open a product, read the clear description, download the test/preview pack, and use the full page as the checklist for testing.
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

            <section className="mt-8 overflow-hidden rounded-[2rem] border border-emerald-400/30 bg-emerald-950/20 p-6 shadow-2xl shadow-emerald-950/20 backdrop-blur md:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-100">
                    <RefreshCw size={16} /> Admin system refresh
                  </div>
                  <h2 className="text-3xl font-black tracking-tight md:text-5xl">Run a full Product Radar sweep.</h2>
                  <p className="mt-3 leading-relaxed text-zinc-300">
                    This protected button requests the system to scan every product blocker, work safe fixes, verify before pushing, push clean changes, and generate a fresh next step for each product.
                  </p>
                  <p className="mt-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-relaxed text-zinc-400">
                    Safety gate: the public site only sends a request after an admin token is entered. The live automation still needs the private Netlify environment variables for the webhook and token.
                  </p>
                </div>
                <div className="w-full rounded-3xl border border-white/10 bg-black/25 p-5 lg:max-w-sm">
                  <button
                    type="button"
                    onClick={requestFullSystemSweep}
                    disabled={isSweepRunning}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-black text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <RefreshCw size={18} className={isSweepRunning ? "animate-spin" : undefined} />
                    {isSweepRunning ? "Requesting sweep…" : "Update all products"}
                  </button>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">{sweepMessage}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="text-2xl font-black text-white">{radarEvidenceLedger.length}</div>
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-zinc-500">blocker rows</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="text-2xl font-black text-white">{radarSoftwareProjects.length}</div>
                      <div className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-zinc-500">products</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                    <Sparkles size={16} /> Evidence ledger + priority order
                  </div>
                  <h2 className="text-3xl font-black tracking-tight md:text-5xl">What has proof, what is blocked, and what ships next.</h2>
                  <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
                    Radar now ranks the current NOW/Sattari projects by proof and usefulness. Each row shows the latest verified proof, current blocker, next tiny build step, and revenue path.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-zinc-300">
                  {radarEvidenceLedger.length} evidence rows
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
                {radarEvidenceLedger.map((item) => (
                  <article key={item.projectName} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">Priority {item.priority}</div>
                        <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">{item.projectName}</h3>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white">
                        {item.readinessScore}/10
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">{item.promise}</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Latest proof</div>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-300">{item.latestProof}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Current blocker</div>
                        <p className="mt-1 text-sm leading-relaxed text-zinc-300">{item.blocker}</p>
                      </div>
                    </div>
                    <div className="mt-3 rounded-2xl border border-white/10 bg-zinc-950/60 p-4">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Next tiny build step</div>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-200">{item.nextStep}</p>
                    </div>
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs leading-relaxed text-zinc-500">Revenue path: {item.monetization}</p>
                      {item.softwareId ? (
                        <button
                          type="button"
                          onClick={() => openSoftware(item.softwareId!)}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white hover:text-black"
                        >
                          Open test page <ExternalLink size={13} />
                        </button>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                    <Download size={16} /> Software downloads + test pages
                  </div>
                  <h2 className="text-3xl font-black tracking-tight md:text-5xl">All software projects in one place.</h2>
                  <p className="mt-3 max-w-3xl leading-relaxed text-zinc-400">
                    Each card opens a full testing page with the product description, live links when available, downloadables, and practical test steps.
                  </p>
                </div>
                <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm font-semibold text-zinc-300">
                  {radarSoftwareProjects.length} software pages
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {radarSoftwareProjects.map((project) => (
                  <motion.article
                    key={project.id}
                    role="button"
                    tabIndex={0}
                    whileHover={{ y: -4 }}
                    onClick={() => openSoftware(project.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        openSoftware(project.id);
                      }
                    }}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/20 outline-none transition focus:ring-2 focus:ring-white/70"
                  >
                    <img src={project.image} alt={`${project.title} preview`} className="h-40 w-full object-cover opacity-90 transition group-hover:opacity-100" />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-zinc-400">
                          {project.category}
                        </span>
                        <span className="text-xs font-semibold text-zinc-400">{project.downloads.length} download</span>
                      </div>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-white">{project.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[0.7rem] font-semibold text-zinc-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap gap-2 pt-5">
                        <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs font-semibold text-zinc-200">
                          Full test page <ExternalLink size={13} />
                        </span>
                        {project.downloads.slice(0, 1).map((download) => (
                          <a
                            key={download.href}
                            href={download.href}
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white px-3 py-2 text-xs font-bold text-black transition hover:bg-zinc-200"
                          >
                            Download <Download size={13} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.article>
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
      id: "scenepilot-studio",
      title: "ScenePilot Studio",
      section: "software",
      subtitle: "Beat-aware creator workflow and auto-arranged edit plans",
      description:
        "A public beta for creator kits: logos, voiceovers, clips, and effects can be organized into beat-aware arrangement plans for faster video assembly.",
      tech: ["React", "Audio Analysis", "Timeline UX", "Creator Tools"],
      points: [
        "Turns raw creator assets into a clearer edit-plan structure instead of a blank timeline.",
        "Explores beat/cut maps, asset lanes, and arrangement logic for short-form content workflows.",
        "Kept honestly in beta until rendered exports, layer export, and manual editing controls are hardened."
      ],
      live: "https://sattari-auto-cut.netlify.app",
      liveLabel: "Live Beta",
      github: "#",
      label: "Video Tool",
      image: "/photos/context-compositor-example.svg",
      status: "Public beta",
      accent: "from-violet-500/30 via-fuchsia-500/20 to-sky-500/30"
    },
    {
      id: "compositor-native",
      title: "COMPOSITOR",
      section: "software",
      subtitle: "Native frame-level video editor foundation",
      description:
        "A native-first C++/Qt video-editor foundation built around frame-level control, layered editing, SQLite project/session storage, import queues, timeline navigation, and recovery-safe project handling.",
      tech: ["C++", "Qt", "CMake", "SQLite", "FFmpeg Boundary"],
      points: [
        "Designed as a real desktop application, not a disposable web toy.",
        "Includes project/layer/session models, crash-safe SQLite saves, backup recovery, import queues, and timeline controls.",
        "Current focus is safe media relinking, native editing foundations, and validated internal build gates."
      ],
      live: "#",
      liveLabel: "Internal Build",
      github: "#",
      label: "Native App",
      image: "/photos/context-compositor-example.svg",
      status: "Native foundation",
      accent: "from-sky-500/30 via-indigo-500/20 to-zinc-500/30"
    },
    {
      id: "auto-pitch",
      title: "Auto Pitch",
      section: "software",
      subtitle: "Sattari vocal-tuning plugin direction",
      description:
        "A Sattari audio product direction for vocal tuning with auto key, adaptive song sections, natural/modern/hard modes, and a higher bar than ordinary demo plugins.",
      tech: ["DSP", "Pitch Detection", "Audio UX", "Plugin Roadmap"],
      points: [
        "Centers on vocalist-friendly tuning controls and an Adapt Mode concept for key changes over time.",
        "Uses preview/test packs while the real installable plugin path, DAW validation, and listening tests continue.",
        "Part of a broader Sattari Audio product line moving toward AU/VST3/Standalone releases."
      ],
      live: "#",
      liveLabel: "Preview Pack",
      github: "#",
      label: "Audio Plugin",
      image: "/photos/auto-pitch-example.svg",
      status: "Prototype",
      accent: "from-orange-500/30 via-amber-500/20 to-yellow-500/30"
    },
    {
      id: "now-market",
      title: "NOW + Market",
      section: "software",
      subtitle: "Identity hub and universal marketplace prototype",
      description:
        "A platform-system direction where NOW becomes the profile/identity hub and Market becomes the first service: search listings, connect seller profiles, and prototype marketplace flows safely.",
      tech: ["JavaScript", "Netlify Functions", "Auth Contracts", "Marketplace UX"],
      points: [
        "NOW models profiles, vaults, identity data, permissions, and safe public/private boundaries.",
        "Market prototypes tenant-aware listing surfaces, source readiness, seller cards, saved items, and inquiry flows.",
        "Guardrails keep it clear that scraping, checkout, payment, and external messaging are not live yet."
      ],
      live: "https://now-suite-preview.netlify.app/market/",
      liveLabel: "Market Preview",
      github: "#",
      label: "Platform System",
      image: "/photos/digital-human-example.svg",
      status: "Preview prototype",
      accent: "from-cyan-500/30 via-blue-500/20 to-purple-500/30"
    },
    {
      id: "digital-human-mvp",
      title: "Digital Human MVP",
      section: "software",
      subtitle: "AI avatar/chat demo with visemes and animation readiness",
      description:
        "A browser avatar/chat MVP with GLB fallback responses, viseme metadata, hybrid animation readiness, and a clear separation between the working fallback demo and future hosted neural/photo engines.",
      tech: ["Three.js", "React", "Avatar Systems", "AI Chat"],
      points: [
        "Delivers a working avatar-chat surface with generated replies and animation metadata.",
        "Tracks readiness and fallback-vs-neural status instead of overclaiming the demo.",
        "Useful as a foundation for persistent AI identity and richer avatar experiences."
      ],
      live: "https://digital-human-mvp.onrender.com",
      liveLabel: "Live MVP",
      github: "#",
      label: "AI Avatar",
      image: "/photos/digital-human-example.svg",
      status: "Live fallback demo",
      accent: "from-fuchsia-500/30 via-purple-500/20 to-blue-500/30"
    },
    {
      id: "stemdeck",
      title: "Sattari StemDeck",
      section: "software",
      subtitle: "Dual-deck remix/plugin concept for stem performance",
      description:
        "A Sattari Audio plugin direction for dual-deck stem playback and remix control, developed as part of the internal JUCE/CMake AU/VST3/Standalone product pipeline.",
      tech: ["JUCE", "CMake", "Audio Plugin", "Remix UX"],
      points: [
        "Explores a performance-friendly dual-deck workflow for stems, loops, and remix-style control.",
        "Uses the stricter Sattari plugin build standard before any public sale-ready language.",
        "Sits alongside Auto Pitch as another serious Sattari Audio product candidate."
      ],
      live: "#",
      liveLabel: "Internal Build",
      github: "#",
      label: "Audio Plugin",
      image: "/photos/auto-pitch-example.svg",
      status: "Internal build",
      accent: "from-red-500/30 via-orange-500/20 to-zinc-500/30"
    },
    {
      id: 3,
      title: "Botanica Lab",
      section: "software",
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
      section: "software",
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
      section: "software",
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
      section: "website",
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
      section: "website",
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

  const softwareProjects = projects.filter((project) => project.section === "software");
  const websiteProjects = projects.filter((project) => project.section === "website");

  const experienceHighlights = [
    {
      role: "Backend Developer",
      company: "Softech",
      timeframe: "4 years",
      description:
        "Built and maintained backend systems, APIs, automation, data flows, and production-facing web infrastructure for real businesses.",
      bullets: ["API and service development", "Database-backed workflows", "Reliable implementation under client/product constraints"]
    },
    {
      role: "AI Engineering Training",
      company: "4Geeks Academy",
      timeframe: "AI Engineering",
      description:
        "Trained in applied AI engineering: modern AI workflows, prompt and agent patterns, automation, and product-minded AI implementation.",
      bullets: ["AI product prototyping", "LLM workflow design", "Practical automation and integration"]
    }
  ];

  const creationHighlights = [
    {
      title: "AI + creative software",
      image: "/photos/auto-pitch-example.svg",
      text: "Auto Pitch, StemDeck, ScenePilot, COMPOSITOR, and Sattari audio/video tools show a creator-software direction: music production, native editing, timeline automation, and workflow acceleration."
    },
    {
      title: "Research and intelligence tools",
      image: "/photos/trader-oracle-example.svg",
      text: "NOW Suite, Market, Trader Oracle, Botanica Lab, Librarian, and Product Radar turn noisy information into structured dashboards, cited research, identity/profile systems, next actions, and decision support."
    },
    {
      title: "Business websites and commerce",
      image: "/photos/sattari-screenshot.png",
      text: "Sattari Music, Nasiri Team Realty, and local-business sample pages demonstrate polished public sites, service positioning, lead-generation UX, and brand-forward interfaces."
    }
  ];

  const skills = [
    "React",
    "TypeScript",
    "JavaScript",
    "Vite",
    "Tailwind",
    "Node.js",
    "Python",
    "SQL",
    "REST APIs",
    "Backend Architecture",
    "Netlify",
    "API Integrations",
    "AI Engineering",
    "AI Product Design",
    "LLM Workflows",
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
    { label: "Experience", id: "experience" },
    { label: "Software", id: "projects" },
    { label: "Websites", id: "websites" },
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
              <Sparkles size={16} /> Backend developer • AI engineer • product builder
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
              I'm Armon Nasiri, a backend developer with 4 years at Softech and AI engineering training from 4Geeks Academy. I build modern websites, AI-powered workflows, dashboards, creator tools, and product systems that move from rough idea to live experience.
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
                { label: "Backend experience", value: "4 yrs" },
                { label: "Product directions", value: "12+" },
                { label: "AI engineering trained", value: "4Geeks" }
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
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
              >
                View Software
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
                I build across the full product loop: shaping the idea, designing the interface, wiring the backend, connecting data and APIs, testing the workflow, and turning rough concepts into usable digital products.
              </p>

              <p className="text-lg text-zinc-300 leading-relaxed">
                My foundation is backend development — 4 years at Softech building practical software systems — plus AI engineering training through 4Geeks Academy. That mix lets me move between infrastructure, product thinking, automation, and user-facing design.
              </p>

              <p className="text-lg text-zinc-300 leading-relaxed">
                My current portfolio spans software downloads, AI music tools, native video-editor work, NOW/Market platform systems, botanical research, stock-market intelligence, book discovery, and business websites. The common thread is simple: make the product feel useful, sharp, and memorable.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Experience + Creation Summary Section */}
        <motion.section
          id="experience"
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
              <h2 className="text-3xl md:text-4xl font-bold">Experience & What I've Created</h2>
              <div className="h-1 w-16 bg-white rounded-full mt-4"></div>
              <p className="mt-5 max-w-3xl text-zinc-400">
                A portfolio should make the story obvious: I come from backend engineering, I trained in AI engineering, and I now build full product experiences across websites, dashboards, automation, and creative tools.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-1 gap-5 lg:grid-cols-2"
            >
              {experienceHighlights.map((item) => (
                <motion.article
                  key={`${item.role}-${item.company}`}
                  variants={fadeUp}
                  className="rounded-3xl border border-zinc-800 bg-zinc-900/55 p-6 backdrop-blur md:p-8"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">{item.company}</div>
                      <h3 className="mt-2 text-2xl font-bold text-white">{item.role}</h3>
                    </div>
                    <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300">
                      {item.timeframe}
                    </span>
                  </div>
                  <p className="mt-5 leading-relaxed text-zinc-300">{item.description}</p>
                  <ul className="mt-5 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm text-zinc-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3"
            >
              {creationHighlights.map((item) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/50 backdrop-blur transition-all hover:border-zinc-700"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-300">{item.text}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Software Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold">Software</h2>
              <div className="h-1 w-16 bg-white rounded-full mt-4"></div>
              <p className="mt-5 max-w-3xl text-zinc-400">
                AI tools, dashboards, research systems, native app foundations, and creator software — grouped together so the software work is easy to scan.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-8"
            >
              {softwareProjects.map((project) => (
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

        {/* Websites Section */}
        <motion.section
          id="websites"
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
              <h2 className="text-3xl md:text-4xl font-bold">Websites</h2>
              <div className="h-1 w-16 bg-white rounded-full mt-4"></div>
              <p className="mt-5 max-w-3xl text-zinc-400">
                Public-facing business websites, brand surfaces, commerce pages, and client-style web experiences kept separate from the software products.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="space-y-8"
            >
              {websiteProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className="group bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
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
                            {project.liveLabel ?? "Live Site"} <ExternalLink size={16} />
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
