// ============================================
// Admin — Site Settings Management
// ============================================

"use client";

import { useState, useEffect } from "react";
import { Save, Plus, X } from "lucide-react";
import { getDocument, updateDocument } from "@/lib/firestore";
import { SiteSettings } from "@/types";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const doc = await getDocument<SiteSettings & { id: string }>("settings", "main");
        if (doc) {
          setSettings(doc);
          setSettingsId("main");
        }
      } catch {
        /* fallback to defaults */
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settingsId) {
        await updateDocument<SiteSettings>("settings", settingsId, settings);
      } else {
        const { doc, setDoc } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        await setDoc(doc(db, "settings", "main"), { ...settings, updatedAt: new Date() });
        setSettingsId("main");
      }
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20"><span className="spinner spinner-lg" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage global company contact info and homepage stats.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-primary btn-sm">
          {saving ? <><span className="spinner spinner-sm" /> Saving...</> : <><Save size={16} /> Save Settings</>}
        </button>
      </div>

      <div className="space-y-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label>Company Name</label>
              <input value={settings.companyName} onChange={(e) => setSettings({ ...settings, companyName: e.target.value })} className="input-field" />
            </div>
            <div className="input-group">
              <label>Tagline</label>
              <input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="input-field" />
            </div>
          </div>
          <div className="input-group">
            <label>About Description</label>
            <textarea value={settings.about} onChange={(e) => setSettings({ ...settings, about: e.target.value })} rows={3} className="input-field" />
          </div>
          <div className="input-group">
            <label>Address</label>
            <input value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="input-field" />
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label>Email</label>
              <input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="input-field" />
            </div>
            <div className="input-group">
              <label>WhatsApp Number</label>
              <input value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="input-field" />
            </div>
            <div className="input-group">
              <label>Website URL</label>
              <input value={settings.website} onChange={(e) => setSettings({ ...settings, website: e.target.value })} className="input-field" />
            </div>
            <div className="input-group">
              <label>Business Hours</label>
              <input value={settings.businessHours} onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })} className="input-field" />
            </div>
          </div>

          <div className="input-group">
            <label>Phone Numbers</label>
            {settings.phones.map((phone, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={phone}
                  onChange={(e) => {
                    const p = [...settings.phones];
                    p[i] = e.target.value;
                    setSettings({ ...settings, phones: p });
                  }}
                  className="input-field"
                />
                {settings.phones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setSettings({ ...settings, phones: settings.phones.filter((_, idx) => idx !== i) })}
                    className="p-2 text-red-500 cursor-pointer"
                    style={{ background: "transparent", border: "none" }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => setSettings({ ...settings, phones: [...settings.phones, ""] })}
              className="text-sm font-medium cursor-pointer"
              style={{ color: "var(--color-primary)", background: "transparent", border: "none" }}
            >
              <Plus size={14} className="inline mr-1" /> Add Phone Number
            </button>
          </div>
        </div>

        {/* Homepage Stats */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Homepage Stats</h3>
          {settings.stats.map((stat, i) => (
            <div key={i} className="grid grid-cols-3 gap-3">
              <input
                value={stat.label}
                onChange={(e) => {
                  const s = [...settings.stats];
                  s[i] = { ...s[i], label: e.target.value };
                  setSettings({ ...settings, stats: s });
                }}
                className="input-field"
                placeholder="Label"
              />
              <input
                type="number"
                value={stat.value}
                onChange={(e) => {
                  const s = [...settings.stats];
                  s[i] = { ...s[i], value: parseInt(e.target.value) || 0 };
                  setSettings({ ...settings, stats: s });
                }}
                className="input-field"
                placeholder="Value"
              />
              <input
                value={stat.suffix}
                onChange={(e) => {
                  const s = [...settings.stats];
                  s[i] = { ...s[i], suffix: e.target.value };
                  setSettings({ ...settings, stats: s });
                }}
                className="input-field"
                placeholder="Suffix (+, etc.)"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
