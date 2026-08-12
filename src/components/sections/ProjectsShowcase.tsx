// ============================================
// Past Projects & Site Video Showcase — Landing Page Section
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Building2, Video, Image as ImageIcon, Play, ArrowRight, X } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { Project } from "@/types";

const staticFallbackProjects: Partial<Project>[] = [
  {
    id: "p1",
    title: "Complete MGPS Installation — Shri Sai Hospital",
    client: "Shri Sai Hospital",
    location: "Ch. Sambhaji Nagar, MH",
    completionDate: "Jan 2025",
    category: "MGPS Installation",
    images: ["/images/projects/mgps-installation.png"],
    videos: [],
    description: "Turnkey MGPS setup featuring medical oxygen copper pipelines, 4x4 manifold banks, zone valve boxes, and digital gas alarms across 120 hospital beds.",
  },
  {
    id: "p2",
    title: "Modular OT & Medical Gas Pipeline — Lifeline Hospital",
    client: "Lifeline Multi-Specialty",
    location: "Pune, MH",
    completionDate: "Mar 2025",
    category: "Modular OT Setup",
    images: ["/images/products/modular-ot.png"],
    videos: [],
    description: "State-of-the-art modular operation theater with ceiling-mounted surgical pendants, laminar airflow, and anti-bacterial paneling.",
  },
  {
    id: "p3",
    title: "Central Oxygen & Vacuum Pipeline — Apollo Care",
    client: "Apollo Care Hospital",
    location: "Mumbai, MH",
    completionDate: "Aug 2024",
    category: "MGPS Installation",
    images: ["/images/products/bed-head-panel.png"],
    videos: [],
    description: "Complete medical gas distribution system, ICU bed head panels, and 24/7 automated pressure monitoring controls.",
  },
];

export default function ProjectsShowcase() {
  const { data: dbProjects } = useFirestore<Project>("projects");
  const [selectedProject, setSelectedProject] = useState<Partial<Project> | null>(null);

  const projectsToDisplay = dbProjects.length > 0 ? dbProjects.slice(0, 3) : (staticFallbackProjects as Project[]);

  return (
    <section className="section bg-slate-900 text-white relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-400 border border-blue-400/30">
              ⚡ Verified Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
              Past Hospital <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Projects & Videos</span>
            </h2>
            <p className="text-slate-400 text-base max-w-xl font-medium">
              Take a visual tour of our completed turnkey hospital MGPS installations, ICU setups, and commercial gas pipeline projects.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur-md transition-all self-start md:self-auto cursor-pointer"
          >
            Explore All Projects ({dbProjects.length > 0 ? dbProjects.length : 6}) <ArrowRight size={16} />
          </Link>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsToDisplay.map((project, i) => {
            const mainImage = project.images && project.images.length > 0 ? project.images[0] : "";
            const hasVideo = project.videos && project.videos.length > 0;
            const photoCount = project.images ? project.images.length : 0;

            return (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Media Container */}
                  <div className="w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden mb-4 bg-slate-950 border border-slate-800 shadow-md relative">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-950">
                        <Building2 size={44} className="text-blue-500 opacity-40" />
                      </div>
                    )}

                    {/* Video & Photo Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
                      {hasVideo && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-indigo-600 text-white shadow-md">
                          <Play size={10} className="fill-white" /> Site Video
                        </span>
                      )}
                      {photoCount > 1 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/70 text-slate-200 backdrop-blur-xs">
                          <ImageIcon size={10} /> {photoCount} Photos
                        </span>
                      )}
                    </div>

                    {/* Hover Button Overlay */}
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <span className="px-4 py-2 rounded-full bg-white text-slate-900 font-bold text-xs shadow-lg">
                        View Photos & Videos →
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 block mb-1">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.title}
                  </h3>

                  {/* Meta details */}
                  <div className="space-y-1.5 text-xs text-slate-400 font-medium">
                    {project.client && (
                      <div className="flex items-center gap-2">
                        <Building2 size={14} className="text-blue-400 flex-shrink-0" />
                        <span className="truncate">{project.client}</span>
                      </div>
                    )}
                    {project.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Modal for Homepage Showcase */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white text-slate-900 w-full max-w-4xl rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6"
            >
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

              {/* Videos */}
              {selectedProject.videos && selectedProject.videos.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Video size={16} className="text-indigo-600" /> Site Videos ({selectedProject.videos.length})
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

              {/* Photos */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <ImageIcon size={16} className="text-blue-600" /> Project Photos ({selectedProject.images.length})
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
                <Link
                  href="/contact"
                  className="btn btn-primary btn-md font-bold text-xs py-2.5 px-6 rounded-xl shadow-md"
                >
                  Request Similar Installation →
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
