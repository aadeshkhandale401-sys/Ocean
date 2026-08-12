// ============================================
// Admin — Services Management (Inline CRUD)
// ============================================

"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Wrench, Save, X } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { addDocument, updateDocument, deleteDocument } from "@/lib/firestore";
import { Service } from "@/types";
import toast from "react-hot-toast";

const emptyForm = {
  title: "",
  category: "Installation",
  shortDescription: "",
  fullDescription: "",
  tagline: "",
  badge: "Full Turnkey",
  leadTime: "10-30 Days",
  icon: "Wrench",
  features: [""],
  order: 0,
  status: "published" as "published" | "draft",
};

export default function AdminServicesPage() {
  const { data: services, loading, refetch } = useFirestore<Service>("services");
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setForm({ ...emptyForm, features: [""] });
    setEditing(null);
    setAdding(true);
  };

  const openEdit = (s: Service) => {
    setForm({
      title: s.title,
      category: s.category || "Installation",
      shortDescription: s.shortDescription || "",
      fullDescription: s.fullDescription || "",
      tagline: s.tagline || "",
      badge: s.badge || "Full Turnkey",
      leadTime: s.leadTime || "10-30 Days",
      icon: s.icon || "Wrench",
      features: s.features?.length ? [...s.features] : [""],
      order: s.order || 0,
      status: s.status || "published",
    });
    setEditing(s.id);
    setAdding(true);
  };

  const closeForm = () => { setAdding(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.title.trim()) return toast.error("Title required");
    const data = { ...form, features: form.features.filter((f) => f.trim()), images: [] };
    try {
      if (editing) {
        await updateDocument("services", editing, data);
        toast.success("Service updated");
      } else {
        await addDocument("services", data);
        toast.success("Service created");
      }
      closeForm();
      refetch();
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      await deleteDocument("services", id);
      toast.success("Service deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Services</h1>
          <p className="text-sm text-slate-500 mt-0.5">{services.length} services listed</p>
        </div>
        {!adding && (
          <button onClick={openAdd} className="btn btn-primary btn-sm">
            <Plus size={16} /> Add Service
          </button>
        )}
      </div>

      {/* Inline Form */}
      {adding && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">{editing ? "Edit Service" : "New Service"}</h3>
            <button onClick={closeForm} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer" style={{ background: "transparent", border: "none" }}>
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label>Title *</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" placeholder="Service title" />
            </div>
            <div className="input-group">
              <label>Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" placeholder="e.g. Installation, LPG Piping, Equipment" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="input-group">
              <label>Icon</label>
              <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className="input-field">
                <option value="Wrench">Wrench (Installation)</option>
                <option value="Flame">Flame (LPG Piping)</option>
                <option value="ShoppingBag">ShoppingBag (Equipment)</option>
                <option value="Settings">Settings (Modular OT)</option>
                <option value="Stethoscope">Stethoscope (Maintenance)</option>
                <option value="Building2">Building2 (Turnkey)</option>
                <option value="Headphones">Headphones (Consultation)</option>
                <option value="Activity">Activity (MGPS)</option>
                <option value="ShieldCheck">ShieldCheck (Certification)</option>
              </select>
            </div>
            <div className="input-group">
              <label>Badge</label>
              <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="input-field" placeholder="e.g. Turnkey, IS Certified" />
            </div>
            <div className="input-group">
              <label>Lead Time</label>
              <input value={form.leadTime} onChange={(e) => setForm({ ...form, leadTime: e.target.value })} className="input-field" placeholder="e.g. 10-30 Days, 1-3 Days" />
            </div>
          </div>

          <div className="input-group">
            <label>Tagline</label>
            <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="input-field" placeholder="Tagline or subtitle" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label>Short Description</label>
              <input value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="input-field" placeholder="One-line summary" />
            </div>
            <div className="input-group">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "published" | "draft" })} className="input-field">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="input-group">
            <label>Full Description</label>
            <textarea value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} rows={3} className="input-field" placeholder="Detailed description..." />
          </div>

          <div className="input-group">
            <label>Features / Key Deliverables</label>
            {form.features.map((f, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={f}
                  onChange={(e) => { const newF = [...form.features]; newF[i] = e.target.value; setForm({ ...form, features: newF }); }}
                  className="input-field" placeholder="Feature point..."
                />
                {form.features.length > 1 && (
                  <button type="button" onClick={() => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })}
                    className="p-2 text-red-500 cursor-pointer" style={{ background: "transparent", border: "none" }}>
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => setForm({ ...form, features: [...form.features, ""] })}
              className="text-sm font-medium cursor-pointer" style={{ color: "var(--color-primary)", background: "transparent", border: "none" }}>
              + Add Feature
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="btn btn-primary btn-sm">
              <Save size={16} /> {editing ? "Update" : "Save"}
            </button>
            <button onClick={closeForm} className="btn btn-ghost btn-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Services List */}
      {loading ? (
        <div className="p-16 text-center"><span className="spinner spinner-md" /></div>
      ) : services.length === 0 && !adding ? (
        <div className="p-16 text-center bg-white rounded-xl border border-slate-200">
          <Wrench size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700">No services yet</p>
          <button onClick={openAdd} className="btn btn-primary btn-sm mt-4"><Plus size={14} /> Add Service</button>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900">{s.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.shortDescription}</p>
                {s.features?.length > 0 && (
                  <p className="text-[11px] text-slate-400 mt-2">{s.features.length} feature{s.features.length !== 1 ? "s" : ""}</p>
                )}
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => openEdit(s)} className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer" style={{ background: "transparent", border: "none" }}>
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(s.id, s.title)} className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer" style={{ background: "transparent", border: "none" }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
