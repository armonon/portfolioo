import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, ExternalLink, Code2, Mail, Sparkles, Download } from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      id: 6,
      title: "Context Compositor",
      subtitle: "Smart background overlay concept for video editors",
      description:
        "A video-editor tool concept for selecting a subject, tracking it through footage, and building believable background/overlay composites faster.",
      tech: ["Video Tools", "Segmentation", "Compositing", "Creator Workflow"],
      points: [
        "Targets Premiere-style workflows where creators need fast subject-aware scene building.",
        "Explores masking, motion alignment, color matching, and timeline-safe controls.",
        "Designed for music videos, ads, social edits, and creator content."
      ],
      live: "#",
      github: "#",
      label: "Video AI",
      image: "/photos/context-compositor-example.svg",
      status: "Prototype concept",
      accent: "from-pink-500/30 via-rose-500/20 to-yellow-500/30"
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
      status: "Preview pack",
      tags: ["Video Editing", "AI Workflow", "Creator Tools"]
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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

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
            <div className="hidden md:flex gap-8">
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

                    <motion.a
                      href={product.href}
                      download
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-zinc-100"
                    >
                      <Download size={16} />
                      {product.fileLabel}
                    </motion.a>
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
