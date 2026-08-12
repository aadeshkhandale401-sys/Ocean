// ============================================
// Services Preview — Landing Page Section
// Mobile-First & Interactive Modal Preview
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Wrench, ShoppingBag, Settings, Stethoscope, Building2, Headphones, Check, X, CheckCircle2, ShieldCheck, Sparkles, Flame, Activity } from "lucide-react";
import { useFirestore } from "@/hooks/useFirestore";
import { Service } from "@/types";

const iconMap: Record<string, any> = {
  Wrench: Wrench,
  Flame: Flame,
  Stethoscope: Stethoscope,
  Activity: Activity,
  ShieldCheck: ShieldCheck,
  ShoppingBag: ShoppingBag,
};

interface DisplayServiceItem {
  id: string;
  icon: any;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  tags: string[];
  badge: string;
}

export default function ServicesPreview() {
  const { data: dbServices } = useFirestore<Service>("services");
  const [selectedService, setSelectedService] = useState<DisplayServiceItem | null>(null);

  const displayServices: DisplayServiceItem[] = dbServices
    .filter((s) => s.status !== "draft")
    .map((s, index) => {
      const IconComp = iconMap[s.icon] || Wrench;
      return {
        id: s.id,
        icon: IconComp,
        title: s.title,
        description: s.shortDescription || s.fullDescription || "",
        fullDescription: s.fullDescription || s.shortDescription || "",
        features: s.features || [],
        tags: [s.category || "IS Standards", "Certification"],
        badge: s.badge || `0${index + 1}`,
      };
    });

  return (
    <section className="section relative overflow-hidden" style={{ background: "var(--color-bg-secondary)", paddingBottom: "5.5rem" }}>
      {/* Background Subtle Gradient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08] pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* Section Heading */}
        <div className="section-heading mb-12">
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-blue-50 text-[var(--color-primary)]">
              <Sparkles size={12} /> High-Standard Medical Solutions
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
            Our Specialized Services
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-sm sm:text-base leading-relaxed mt-2">
            Comprehensive, certified medical gas pipeline solutions designed and executed for modern, high-capacity healthcare facilities across India.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-14 sm:mb-16">
          {displayServices.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedService(service)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              {/* Header Row: Icon + Number Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center">
                  <service.icon size={20} />
                </div>
                <span className="text-xs font-bold font-mono text-slate-400 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {service.badge}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-lg sm:text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-[var(--color-primary)] text-slate-900 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-5 text-slate-500">
                {service.description}
              </p>

              {/* Feature Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100/60 text-slate-500"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom CTA — simple text link */}
              <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-sm group-hover:gap-3 transition-all duration-300 mt-auto pb-2">
                <span>Explore Full Scope</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA — Clear vertical separation */}
        <div className="text-center pt-8 sm:pt-10 mt-6 border-t border-slate-200/60">
          <Link href="/services" className="inline-flex items-center gap-2 btn btn-primary btn-lg w-full sm:w-auto font-bold shadow-md hover:shadow-lg transition-all px-8 py-4 rounded-full">
            <span>View All Services & Specifications</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      {/* Interactive Detail Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
              style={{ border: "1px solid var(--color-border)" }}
            >
              {/* Header Accent Bar */}
              <div
                className="h-2 w-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}
              />

              {/* Scrollable Content Container */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                {/* Header & Close Button Row */}
                <div className="flex items-start justify-between gap-3 pb-4 border-b border-[var(--color-border-light)]">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "var(--color-primary-light)",
                        boxShadow: "0 4px 12px rgba(21, 101, 192, 0.12)",
                      }}
                    >
                      <selectedService.icon size={24} style={{ color: "var(--color-primary)" }} />
                    </div>
                    <div>
                      <span
                        className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-1"
                        style={{
                          background: "var(--color-primary-light)",
                          color: "var(--color-primary)",
                        }}
                      >
                        Service Category #{selectedService.badge}
                      </span>
                      <h3
                        className="text-lg sm:text-2xl font-bold leading-tight"
                        style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                      >
                        {selectedService.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors flex-shrink-0 mt-0.5 cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Section 1: Overview */}
                <div>
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                  >
                    Service Scope & Overview
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                    {selectedService.fullDescription}
                  </p>
                </div>

                {/* Section 2: Key Deliverables Card Box */}
                <div
                  className="p-5 sm:p-6 rounded-2xl"
                  style={{
                    background: "var(--color-bg-tertiary)",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={16} style={{ color: "var(--color-primary)" }} className="flex-shrink-0" />
                    <h4
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-display)" }}
                    >
                      Key Deliverables Included
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedService.features.map((feature: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--color-primary)" }} />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                    onClick={() => setSelectedService(null)}
                    className="btn btn-primary btn-lg w-full justify-center text-sm rounded-xl py-3"
                  >
                    Enquire for {selectedService.title} <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="btn btn-outline btn-lg w-full sm:w-auto justify-center text-sm rounded-xl py-3 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
