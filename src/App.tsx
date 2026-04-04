import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X, ExternalLink, Code2, Mail } from "lucide-react";

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projects = [
    {
      id: 2,
      title: "Sattari Music",
      subtitle: "Brand-forward music and drum business website",
      description:
        "A custom web direction for a music business centered on drum gear, local services, rentals, and brand identity.",
      image:
        "/photos/sattari-screenshot.png",
      tech: ["React", "Stripe", "E-commerce", "Responsive Design"],
      points: [
        "Organized the site to highlight products while still making room for repair, rental, and local service offerings.",
        "Built with a cleaner custom direction in mind rather than a boxed-in template feel.",
        "Focused on making the homepage feel product-led, visual, and strong for a niche audience."
      ],
      live: "https://sattari.netlify.app",
      github: "#",
      label: "Commerce"
    },
    {
      id: 3,
      title: "Nasiri Team Realty",
      subtitle: "Modern real estate platform with live property listings",
      description:
        "A responsive real estate website designed for property listings, agent profiles, and seamless client communication. Built with a clean, modern interface for browsing and filtering available properties.",
      image:
        "/photos/nasiri-screenshot.png",
      tech: ["React", "Real Estate CMS", "Property Listings", "Responsive Design"],
      points: [
        "Organized property listings with advanced filtering by price, location, and property type.",
        "Built with a modern design direction that feels professional and trustworthy for real estate clientele.",
        "Integrated smooth user experience for viewing property details, agent info, and contact options."
      ],
      live: "https://nasiriteam.netlify.app",
      github: "#",
      label: "Real Estate"
    }
  ];

  const skills = [
    "React",
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "Tailwind",
    "Node.js",
    "API Integrations",
    "Responsive Design",
    "UI/UX",
    "Git",
    "VS Code"
  ];

  const buildingNow = [
    "AI-powered user tools with simple upload workflows",
    "Brand-forward websites for creative businesses",
    "Marketplace concepts for local community and culture",
    "More polished product pages and digital storefronts"
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
    { label: "Work", id: "projects" },
    { label: "Building", id: "building" },
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
          <div className="max-w-4xl w-full text-center space-y-8">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-5xl md:text-7xl font-bold tracking-tight"
            >
              I build websites, AI tools, and creative digital experiences.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              I'm Armon Nasiri, a digital developer focused on modern web design, product ideas, and real-world digital builds that blend function, branding, and strong visual direction.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12"
            >
              {[
                { label: "AI-integrated concepts", value: "∞" },
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
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
              >
                View My Work
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
                I'm a developer and creative builder focused on turning ideas into real digital products. My work includes business websites, community platform concepts, and AI-powered tools designed to be useful, visual, and distinctive.
              </p>

              <p className="text-lg text-zinc-300 leading-relaxed">
                I care about making websites that feel sharp, intentional, and easy to move through. Whether the goal is branding, conversion, product flow, or cultural identity, I like building experiences that feel modern and memorable.
              </p>
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
              <h2 className="text-3xl md:text-4xl font-bold">Featured Work</h2>
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
                    {/* Image */}
                    <div className="relative h-64 md:h-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
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
                      <div className="flex gap-3">
                        <motion.a
                          href={project.live}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-zinc-100 transition-colors text-sm"
                        >
                          Live Demo <ExternalLink size={16} />
                        </motion.a>
                        <motion.a
                          href={project.github}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition-colors text-sm"
                        >
                          Code <Code2 size={16} />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Currently Building Section */}
        <motion.section
          id="building"
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
              <h2 className="text-3xl md:text-4xl font-bold">Currently Building</h2>
              <div className="h-1 w-16 bg-white rounded-full mt-4"></div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {buildingNow.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -5, borderColor: "rgb(113, 113, 122)" }}
                  className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-900/70 transition-all"
                >
                  <div className="text-lg font-medium text-white">{item}</div>
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
              <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
              <div className="h-1 w-16 bg-white rounded-full mx-auto"></div>
              
              <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
                I'm open to freelance work, collaborations, and exciting new projects. Whether you have a question or want to build something together, feel free to reach out.
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
              <p className="text-sm text-zinc-500">Digital Developer</p>
            </div>
            <p className="text-sm text-zinc-500">
              © 2024 All rights reserved. Crafted with React, Tailwind & Framer Motion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

