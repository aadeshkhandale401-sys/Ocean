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
  Activity,
} from "lucide-react";
import { getDocuments } from "@/lib/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    projects: 0,
    services: 0,
    media: 0,
  });
  const [loading, setLoading] = useState(true);

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
        <Link
          href="/"
          target="_blank"
          className="btn btn-outline btn-sm"
        >
          <ExternalLink size={14} /> View Live Website
        </Link>
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
