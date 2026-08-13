// ============================================
// Admin Dashboard — Stats + Quick Actions
// ============================================

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  FolderOpen,
  Wrench,
  ImageIcon,
  Plus,
  ExternalLink,
  ChevronRight,
  Database,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { getDocuments } from "@/lib/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    projects: 0,
    services: 0,
    media: 0,
  });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (!confirm("Populate default products, projects, services, and settings directly into Firestore Cloud?")) return;
    setSeeding(true);
    try {
      const { seedDatabase } = await import("@/lib/seed");
      const res = await seedDatabase(true);
      toast.success(`Firestore Seeded! ${res.products} products, ${res.projects} projects, ${res.services} services created.`);
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast.error("Seeding failed. Please check Firebase security rules in console.");
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    async function fetchStats() {
      try {
        const results = await Promise.allSettled([
          getDocuments("products"),
          getDocuments("projects"),
          getDocuments("services"),
          getDocuments("media"),
        ]);
        if (!mounted) return;
        setStats({
          products: results[0].status === "fulfilled" ? results[0].value.length : 0,
          projects: results[1].status === "fulfilled" ? results[1].value.length : 0,
          services: results[2].status === "fulfilled" ? results[2].value.length : 0,
          media: results[3].status === "fulfilled" ? results[3].value.length : 0,
        });
      } catch {
        // fallback to 0
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchStats();
    return () => { mounted = false; };
  }, []);

  const statCards = [
    { label: "Products", value: stats.products, icon: Package, href: "/admin/products", color: "#3B82F6", bg: "#EFF6FF" },
    { label: "Projects", value: stats.projects, icon: FolderOpen, href: "/admin/projects", color: "#06B6D4", bg: "#ECFEFF" },
    { label: "Services", value: stats.services, icon: Wrench, href: "/admin/services", color: "#10B981", bg: "#ECFDF5" },
    { label: "Media Files", value: stats.media, icon: ImageIcon, href: "/admin/media", color: "#F59E0B", bg: "#FFFBEB" },
  ];

  const quickActions = [
    { label: "Add Product", href: "/admin/products/new", icon: Package },
    { label: "Add Project", href: "/admin/projects/new", icon: FolderOpen },
    { label: "Upload Media", href: "/admin/media", icon: ImageIcon },
  ];

  const handleClearCache = async () => {
    const { clearAllLocalData } = await import("@/lib/firestore");
    clearAllLocalData();
    toast.success("Cache cleared & re-synced with Cloud Firestore!");
    setTimeout(() => window.location.reload(), 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold text-slate-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your products, projects, services, and media.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleClearCache}
            className="btn btn-outline btn-sm border-slate-200 text-slate-700 hover:bg-slate-50"
            title="Clear local browser cache and force re-sync from Cloud Firestore"
          >
            <RefreshCw size={14} /> Clear Local Cache
          </button>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="btn btn-outline btn-sm border-blue-200 text-blue-700 hover:bg-blue-50"
            title="Populate Firestore Cloud with seed data"
          >
            {seeding ? <RefreshCw size={14} className="animate-spin" /> : <Database size={14} />}
            {seeding ? "Seeding..." : "Seed Firestore Cloud"}
          </button>
          <Link
            href="/"
            target="_blank"
            className="btn btn-outline btn-sm"
          >
            <ExternalLink size={14} /> View Live Website
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all no-underline"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: stat.bg, color: stat.color }}
              >
                <stat.icon size={20} />
              </div>
              <ChevronRight
                size={16}
                className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <div
              className="text-2xl sm:text-3xl font-black text-slate-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {loading ? "—" : stat.value}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              {stat.label}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2
          className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all no-underline group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <action.icon size={18} />
              </div>
              <span className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
