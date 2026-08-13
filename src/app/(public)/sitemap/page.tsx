// ============================================
// HTML Sitemap Page — Visual Site Directory Hub
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Package,
  Wrench,
  Building2,
  HelpCircle,
  Phone,
  Info,
  Flame,
  Globe,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const mainSections = [
  {
    title: "Main Navigation Pages",
    icon: FileText,
    links: [
      { name: "Home Page", href: "/", desc: "Turnkey MGPS sales & installation overview" },
      { name: "About Ocean MGPS", href: "/about", desc: "Company history, leadership & certifications" },
      { name: "Contact & Free Site Survey", href: "/contact", desc: "Phone numbers, address & BOQ enquiry form" },
      { name: "Project Showcase", href: "/projects", desc: "Completed hospital pipeline & OT installations" },
      { name: "Industries Served", href: "/industries", desc: "Hospitals, ICUs, labs, hotels & commercial spaces" },
      { name: "Frequently Asked Questions", href: "/faq", desc: "IS 7484 compliance, timelines & pricing FAQs" },
    ],
  },
  {
    title: "Core Gas Pipeline Guides",
    icon: Flame,
    links: [
      { name: "Medical Gas Pipeline System (MGPS)", href: "/mgps", desc: "Centralized oxygen, air, N2O & vacuum pipelines" },
      { name: "LPG Copper Gas Pipeline Systems", href: "/lpg", desc: "Residential, hotel & commercial reticulated LPG piping" },
      { name: "Turnkey Hospital Services", href: "/services", desc: "Full-scope installation, testing & AMC maintenance" },
      { name: "Medical Equipment Catalog", href: "/products", desc: "200+ hospital hardware items & ICU devices" },
    ],
  },
];

const productCategories = [
  { name: "ICU & Diagnostic Equipment", count: "ECG, Patient Monitors, Ventilators, Syringe Pumps" },
  { name: "Flow Meters & Regulators", count: "Oxygen BPC Flow Meters, Anodized Regulators" },
  { name: "Vacuum Systems", count: "Vacuum Regulators, Suction Jars & Trolleys" },
  { name: "Medical Gas Outlets", count: "BS, DIN, AFNOR & Ohmeda Quick Outlets" },
  { name: "Copper Fittings & Pipes", count: "Medical Grade Copper Tubing & Brass Fittings" },
  { name: "Manifold Systems", count: "Automatic & Manual Oxygen Cylinder Manifolds" },
  { name: "Valves & Safety", count: "Zone Valve Boxes & Isolation Lockable Valves" },
  { name: "Alarm Systems", count: "Digital Microprocessor Gas Alarm Panels" },
  { name: "Bed Head Panels", count: "ICU Bed Head Trunking & Gas Electrical Outlets" },
  { name: "Modular OT Equipment", count: "Surgical Pendants, LED OT Lights & HEPA Hoods" },
];

const serviceList = [
  { name: "MGPS Turnkey Installation", href: "/services" },
  { name: "LPG Copper Gas Piping", href: "/lpg" },
  { name: "Hospital Equipment & ICU Supply", href: "/services" },
  { name: "Modular OT Construction", href: "/services" },
  { name: "24/7 Repair & Servicing (AMC)", href: "/services" },
  { name: "Turnkey Hospital Infrastructure", href: "/services" },
  { name: "Technical Audit & IS 7484 Consultation", href: "/services" },
];

const localHubs = [
  "Chh. Sambhaji Nagar (Aurangabad)",
  "Marathwada Regional Hubs",
  "Maharashtra State Supply",
  "Pan-India Hospital Infrastructure",
];

export default function HTMLSitemapPage() {
  return (
    <div className="section pb-16 sm:pb-24 bg-slate-50">
      <div className="container max-w-6xl mx-auto space-y-12">
        {/* Header Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[var(--color-primary)] text-xs font-semibold border border-blue-100">
            <Globe size={14} /> Full Website Directory & Link Map
          </div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-slate-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ocean MGPS Complete HTML Sitemap
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Browse all pages, product categories, turnkey service offerings, and regional hub directories for Ocean MGPS Sales & Multi Services.
          </p>
        </div>

        {/* Main Navigation Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainSections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center">
                  <section.icon size={20} />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="group block p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all no-underline"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-[var(--color-primary)] transition-colors">
                        {link.name}
                      </span>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-[var(--color-primary)] group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{link.desc}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Categories & Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Categories Directory */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center">
                <Package size={20} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Product Categories</h2>
            </div>

            <div className="space-y-3">
              {productCategories.map((cat, i) => (
                <Link
                  key={i}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="group flex items-start justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors no-underline border border-transparent hover:border-slate-200"
                >
                  <div>
                    <span className="text-sm font-bold text-slate-800 group-hover:text-[var(--color-primary)]">
                      {cat.name}
                    </span>
                    <span className="text-xs text-slate-500 block">{cat.count}</span>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-[var(--color-primary)] flex-shrink-0 mt-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Turnkey Services Directory */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center">
                <Wrench size={20} />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Turnkey Services</h2>
            </div>

            <div className="space-y-3">
              {serviceList.map((srv, i) => (
                <Link
                  key={i}
                  href={srv.href}
                  className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors no-underline border border-transparent hover:border-slate-200"
                >
                  <span className="text-sm font-bold text-slate-800 group-hover:text-[var(--color-primary)]">
                    {srv.name}
                  </span>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-[var(--color-primary)]" />
                </Link>
              ))}
            </div>

            {/* Regional Service Locations */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Regional Coverage
              </h3>
              <div className="flex flex-wrap gap-2">
                {localHubs.map((hub, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded-full border border-slate-200"
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* XML Sitemap Link Callout */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-8 text-center space-y-4 shadow-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200 border border-white/15">
            <ShieldCheck size={14} /> Search Engine Crawlers
          </div>
          <h2 className="text-2xl font-bold">Looking for raw XML Sitemap for Google Search Console?</h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Our automatically updated Next.js XML sitemap is available for search engine bots at <code className="bg-white/15 px-2 py-0.5 rounded text-white">/sitemap.xml</code>.
          </p>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-[var(--color-primary-dark)] font-bold text-sm hover:bg-blue-50 transition-colors no-underline"
          >
            Open XML Sitemap (/sitemap.xml) <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
