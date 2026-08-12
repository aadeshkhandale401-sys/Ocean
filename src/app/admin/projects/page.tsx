// ============================================
// Admin — Projects List + Search + Delete
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash2, Edit, FolderOpen, MapPin } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { deleteDocument } from "@/lib/firestore";
import { Project } from "@/types";
import toast from "react-hot-toast";

export default function AdminProjectsPage() {
  const { data: projects, loading, refetch } = useFirestore<Project>("projects");
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = projects.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.client?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await deleteDocument("projects", id);
      toast.success("Project deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Past Projects
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">{projects.length} projects documented</p>
        </div>
        <Link href="/admin/projects/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Add Project
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {loading && projects.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl border border-slate-200">
          <span className="spinner spinner-md" />
          <p className="mt-3 text-sm text-slate-400">Loading projects...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-16 text-center bg-white rounded-xl border border-slate-200">
          <FolderOpen size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700">
            {projects.length === 0 ? "No projects yet" : "No matching projects"}
          </p>
          {projects.length === 0 && (
            <Link href="/admin/projects/new" className="btn btn-primary btn-sm mt-4">
              <Plus size={14} /> Add Your First Project
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden hover:shadow-md transition-all"
            >
              {/* Image thumbnail */}
              {project.images?.[0] && (
                <div className="h-36 overflow-hidden">
                  <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight">{project.title}</h3>
                  {project.client && (
                    <p className="text-xs text-slate-500 mt-1">{project.client}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {project.location && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin size={12} /> {project.location}
                    </span>
                  )}
                  {project.category && <span className="badge badge-blue text-[10px]">{project.category}</span>}
                  <span className={`badge text-[10px] ${project.status === "draft" ? "badge-amber" : "badge-green"}`}>
                    {project.status || "Published"}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-400">
                    {project.images?.length || 0} photos • {project.videos?.length || 0} videos
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <Edit size={16} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      disabled={deleting === project.id}
                      className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      style={{ background: "transparent", border: "none" }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
