// ============================================
// Projects Page — Live Gallery (Photos & Videos)
// ============================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Building2, Video, Image as ImageIcon, Play, X, ExternalLink } from "lucide-react";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import { useFirestore } from "@/hooks/useFirestore";
import { Project } from "@/types";

const staticFallbackProjects: Partial<Project>[] = [
  { title: "Complete MGPS Installation — Shri Sai Hospital", client: "Shri Sai Hospital", location: "Ch. Sambhaji Nagar, MH", completionDate: "Jan 2025", category: "MGPS Installation", images: ["/images/projects/mgps-installation.png"], videos: [] },
  { title: "Modular OT & MGPS — Lifeline Multi-Specialty", client: "Lifeline Hospital", location: "Pune, MH", completionDate: "Mar 2025", category: "Modular OT Setup", images: ["/images/products/modular-ot.png"], videos: [] },
  { title: "Pipeline Renovation — District General Hospital", client: "District Hospital", location: "Nashik, MH", completionDate: "Nov 2024", category: "Pipeline Work", images: ["/images/projects/mgps-installation.png"], videos: [] },
  { title: "Greenfield MGPS — Apollo Care Hospital", client: "Apollo Care Hospital", location: "Mumbai, MH", completionDate: "Aug 2024", category: "MGPS Installation", images: ["/images/projects/mgps-installation.png"], videos: [] },
  { title: "Equipment Supply — Government Medical College", client: "Government Medical College", location: "Nagpur, MH", completionDate: "Jun 2024", category: "Hospital Setup", images: ["/images/products/manifold-system.png"], videos: [] },
  { title: "Emergency ICU Expansion — City Care Hospital", client: "City Care Hospital", location: "Ch. Sambhaji Nagar, MH", completionDate: "Feb 2024", category: "MGPS Installation", images: ["/images/products/bed-head-panel.png"], videos: [] },
];

export default function ProjectsPage() {
  const { data: dbProjects, loading } = useFirestore<Project>("projects");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Partial<Project> | null>(null);

  // Merge live Firestore projects with fallbacks if database is empty
  const allProjects = dbProjects.length > 0 ? dbProjects : (staticFallbackProjects as Project[]);

  const filtered = allProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <>
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Completed <span className="text-gradient">Hospital Projects</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Explore our turnkey MGPS installations, modular OT setups, and high-pressure copper pipeline networks with photos and site video clips.
            </p>
          </motion.div>

          {/* Filter Bar */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-10 sm:mb-12 justify-start sm:justify-center items-center scrollbar-none">
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {PROJECT_CATEGORIES.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                    style={{
                      background: isSelected ? "var(--color-primary)" : "rgba(226, 232, 240, 0.6)",
                      color: isSelected ? "#FFFFFF" : "var(--color-text-secondary)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filtered.map((project, i) => {
              const mainImage = project.images && project.images.length > 0 ? project.images[0] : "";
              const hasVideo = project.videos && project.videos.length > 0;
              const photoCount = project.images ? project.images.length : 0;

              return (
                <motion.div
                  key={project.id || i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div>
                    {/* Media Container */}
                    <div className="w-full aspect-[16/10] sm:h-52 rounded-2xl sm:rounded-3xl overflow-hidden mb-4 bg-slate-900 shadow-xs relative">
                      {mainImage ? (
                        <img
                          src={mainImage}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50">
                          <Building2 size={40} className="text-[var(--color-primary)] opacity-30" />
                        </div>
                      )}

                      {/* Video / Photo Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                        {hasVideo && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indigo-600 text-white shadow-md">
                            <Play size={10} className="fill-white" /> Site Video
                          </span>
                        )}
                        {photoCount > 1 && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/70 text-white backdrop-blur-xs">
                            <ImageIcon size={10} /> {photoCount} Photos
                          </span>
                        )}
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-4 py-2 rounded-full bg-white/90 text-slate-900 font-bold text-xs shadow-lg backdrop-blur-xs">
                          View Project Gallery →
                        </span>
                      </div>
                    </div>

                    {/* Category */}
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] opacity-80 inline-block mb-1">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-base sm:text-lg font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors leading-snug text-slate-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>

                    {/* Meta info */}
                    <div className="space-y-1.5 text-xs sm:text-sm text-slate-500 font-medium">
                      {project.client && (
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                          <span>{project.client}</span>
                        </div>
                      )}
                      {project.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                          <span>{project.location}</span>
                        </div>
                      )}
                      {project.completionDate && (
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-[var(--color-primary)] flex-shrink-0" />
                          <span>{project.completionDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Project Media Modal (Photos & Videos) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-4xl rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer z-20"
              >
                <X size={18} />
              </button>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--color-primary)]">
                  {selectedProject.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1" style={{ fontFamily: "var(--font-display)" }}>
                  {selectedProject.title}
                </h2>
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mt-2 flex-wrap">
                  {selectedProject.client && (
                    <span className="flex items-center gap-1">
                      <Building2 size={14} className="text-blue-600" /> {selectedProject.client}
                    </span>
                  )}
                  {selectedProject.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-blue-600" /> {selectedProject.location}
                    </span>
                  )}
                  {selectedProject.completionDate && (
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-blue-600" /> {selectedProject.completionDate}
                    </span>
                  )}
                </div>
              </div>

              {selectedProject.description && (
                <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {selectedProject.description}
                </p>
              )}

              {/* Videos Section */}
              {selectedProject.videos && selectedProject.videos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Video size={16} className="text-indigo-600" /> Project Site Videos ({selectedProject.videos.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.videos.map((vid, idx) => (
                      <div key={idx} className="aspect-video rounded-2xl overflow-hidden bg-slate-950 shadow-md border border-slate-200">
                        {vid.includes("youtube.com") || vid.includes("youtu.be") ? (
                          <iframe src={vid} className="w-full h-full" title={`Project video ${idx + 1}`} allowFullScreen />
                        ) : (
                          <video src={vid} controls className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Photos Section */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={16} className="text-blue-600" /> Site Photos ({selectedProject.images.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedProject.images.map((img, idx) => (
                      <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group">
                        <img src={img} alt={`Site Photo ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn btn-outline btn-md font-bold text-xs py-2.5 px-6 rounded-xl"
                >
                  Close Modal
                </button>
                <a
                  href="/contact"
                  className="btn btn-primary btn-md font-bold text-xs py-2.5 px-6 rounded-xl shadow-md"
                >
                  Enquire for Similar Setup →
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
