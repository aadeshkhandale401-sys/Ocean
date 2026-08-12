// ============================================
// Industries Page — Ultra Clean Mobile & Desktop UI
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Hospital,
  Stethoscope,
  FlaskConical,
  Microscope,
  Siren,
  Building2,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Home,
  Utensils,
} from "lucide-react";

const industries = [
  {
    id: "hospitals",
    icon: Hospital,
    name: "Multi-Specialty & Govt Hospitals",
    badge: "100+ Beds Turnkey",
    description: "Centralized liquid oxygen (LMO) tank yards, automatic manifold plants, and floor-wise piping for large healthcare facilities.",
    tags: ["LMO Tank Yard", "Automatic Manifold", "Bed Head Panels"],
  },
  {
    id: "home-lpg",
    icon: Home,
    name: "Residences, Villas & Apartments",
    badge: "Domestic LPG Safety",
    description: "Domestic copper LPG gas piping, external cylinder placement, gas leak sensors, and auto cutoff solenoid valves.",
    tags: ["External Cylinders", "Leak Cutoff Solenoid", "Clean Kitchen"],
  },
  {
    id: "commercial-lpg",
    icon: Utensils,
    name: "Hotels, Restaurants & Canteens",
    badge: "Commercial LPG Systems",
    description: "High-flow commercial LPG cylinder manifold banks (4x4 to 10x10) with automatic changeover for commercial kitchens.",
    tags: ["High-Flow Manifold", "Auto Changeover", "IS 6044 Safety"],
  },
  {
    id: "clinics",
    icon: Stethoscope,
    name: "Private Clinics & Nursing Homes",
    badge: "Compact MGPS",
    description: "Space-efficient 2-to-4 cylinder manual and semi-automatic manifold setups tailored for 10-50 bed facilities.",
    tags: ["2-4 Cylinder Rack", "Wall Gas Outlets", "Emergency Backup"],
  },
  {
    id: "modular-ot",
    icon: Building2,
    name: "Modular Operation Theaters (OT)",
    badge: "NABH Compliant",
    description: "Surgical gas supply integration with ceiling pendants, shadowless lights, and sterile laminar air flow.",
    tags: ["Surgical Pendants", "NABH Compliant", "Laminar Air Flow"],
  },
  {
    id: "icu-trauma",
    icon: Siren,
    name: "ICUs & Emergency Trauma Care",
    badge: "24/7 Redundancy",
    description: "Uninterrupted high-pressure oxygen, medical air (4 bar/7 bar), and vacuum lines with zero downtime tolerance.",
    tags: ["Dual Manifolds", "Area Gas Alarms", "Continuous Vacuum"],
  },
  {
    id: "laboratories",
    icon: FlaskConical,
    name: "Diagnostic & Research Labs",
    badge: "High-Purity Lines",
    description: "High-purity gas delivery systems (Nitrogen, Helium, Carbon Dioxide) with precise pressure regulation.",
    tags: ["High-Purity Copper", "Needle Regulators", "Leak Sensors"],
  },
  {
    id: "institutes",
    icon: Microscope,
    name: "Medical Colleges & Institutes",
    badge: "Campus Infrastructure",
    description: "Turnkey MGPS infrastructure for teaching hospitals, central gas plant rooms, and campus-wide underground piping.",
    tags: ["Central Plant Room", "Campus Network", "AMC Support"],
  },
];

const industryStats = [
  { value: "150+", label: "Pipeline Projects" },
  { value: "145+", label: "Hospitals Served" },
  { value: "100%", label: "IS 7484 Compliance" },
  { value: "24/7", label: "Emergency Support" },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="section pb-6 sm:pb-8" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                }}
              >
                <MapPin size={14} /> Ch. Sambhaji Nagar, Maharashtra • Serving Pan-India
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Industries <span className="text-gradient">We Serve</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Providing certified Medical Gas Pipeline Systems and hospital equipment across the healthcare ecosystem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="py-6 bg-white border-y border-[var(--color-border-light)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {industryStats.map((stat, i) => (
              <div key={i} className="p-2.5 sm:p-4">
                <span
                  className="block text-2xl sm:text-3xl font-extrabold"
                  style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid — Open Flat Layout */}
      <section className="section pt-10 pb-24 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
            {industries.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50/80 text-[var(--color-primary)] flex-shrink-0">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors leading-snug text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 mb-4">
                    {item.description}
                  </p>

                  {/* Feature Checklist List */}
                  <div className="space-y-2 mb-6">
                    {item.tags.map((tag, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <CheckCircle2 size={15} className="text-[var(--color-primary)] flex-shrink-0" />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-auto">
                  <Link
                    href={`/contact?industry=${encodeURIComponent(item.name)}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--color-primary)] group-hover:gap-3 transition-all duration-300"
                  >
                    <span>Inquire for {item.name.split(" ")[0]}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
          >
            Planning Medical Gas Infrastructure for Your Facility?
          </h2>
          <p className="text-sm sm:text-base mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Contact our technical team in Ch. Sambhaji Nagar for site evaluation, BOQ preparation, and IS 7484 safety guidance.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg w-full sm:w-auto justify-center">
            Request Technical Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
