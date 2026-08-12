// ============================================
// LPG Copper Gas Pipeline System Page
// Domestic Home & Commercial Kitchen LPG Engineering
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  GitBranch,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Home,
  Utensils,
  Building,
  AlertTriangle,
  Gauge,
  Sparkles,
  X,
  PhoneCall,
  Check,
  Layers,
  Settings,
  Activity,
  ShieldAlert,
  FlaskConical,
} from "lucide-react";

// LPG System Components Data
const lpgComponents = [
  {
    title: "Commercial & Domestic Cylinder Manifolds",
    description:
      "2-bank, 4-bank, and multi-cylinder LPG manifold systems with automatic changeover valves ensuring uninterrupted cooking gas flow without flame drops.",
    icon: Flame,
    specs: [
      { label: "Bank Size", value: "2x1, 2x2, 4x4 up to 10x10 Cylinders" },
      { label: "Changeover", value: "Automatic / Manual Changeover Regulator" },
      { label: "Material", value: "Heavy Duty Forged Brass & High-Pressure Hose" },
    ],
  },
  {
    title: "Heavy-Wall Seamless Copper Piping",
    description:
      "Medical & gas grade Cu-DHP copper pipes (BS EN 1057 / IS 1545 / ASTM B280) joined with high-temperature silver alloy brazing for 100% leakproof gas conveyance.",
    icon: GitBranch,
    specs: [
      { label: "Purity Grade", value: "99.9% Deoxidized Copper (Cu-DHP)" },
      { label: "Diameters", value: "8mm, 10mm, 12mm, 15mm, 22mm, 28mm" },
      { label: "Pressure Rating", value: "Tested up to 25 Bar Hydrostatic Pressure" },
    ],
  },
  {
    title: "Dual-Stage Gas Pressure Regulators",
    description:
      "First-stage high-pressure regulators (reduces 7 Bar cylinder pressure to 1.5 Bar) and second-stage low-pressure regulators (reduces to 37 mbar burner pressure).",
    icon: Gauge,
    specs: [
      { label: "First Stage", value: "0.5 - 2.5 Bar High Pressure Output" },
      { label: "Second Stage", value: "28 - 37 mbar Low Pressure Appliance Output" },
      { label: "Safety", value: "Over-Pressure Shut-off (OPSO) & Relief Valve" },
    ],
  },
  {
    title: "Gas Leak Detection & Solenoid Cut-off Valves",
    description:
      "Microprocessor LPG gas leak detectors installed near kitchen stoves that trigger an automatic electro-magnetic solenoid valve to cut off main gas supply within seconds.",
    icon: ShieldAlert,
    specs: [
      { label: "Sensor", value: "Semiconductor LPG Gas Leak Detector" },
      { label: "Response Time", value: "< 5 Seconds Automatic Cut-off" },
      { label: "Alarm", value: "Audible Siren (85dB) + Visual LED Flash" },
    ],
  },
  {
    title: "Individual Gas Utility Meters",
    description:
      "Diaphragm gas meters installed for reticulated LPG systems in residential apartment complexes and food courts for accurate individual gas billing.",
    icon: Activity,
    specs: [
      { label: "Type", value: "G1.6 / G2.5 Diaphragm Gas Meter" },
      { label: "Accuracy", value: "Class 1.5 Billing Precision" },
      { label: "Max Pressure", value: "500 mbar Working Pressure" },
    ],
  },
  {
    title: "Appliance Isolation Valves & Flexible Hoses",
    description:
      "Emergency brass ball valves and wire-braided flexible metallic hoses for connecting copper pipelines safely to gas stoves, burners, and ovens.",
    icon: Settings,
    specs: [
      { label: "Valves", value: "Full-Bore Brass Ball Valve with Yellow Handle" },
      { label: "Hose", value: "SS 304 Wire Braided Hose (IS 9573 Approved)" },
    ],
  },
];

// Domestic, Commercial, Reticulated & Chemistry Lab Applications
const lpgApplications = [
  {
    icon: Home,
    title: "Home & Domestic LPG Copper Piping",
    tagline: "Safe, Centralized Cooking Gas Piping for Residences & Villas",
    description:
      "Move heavy LPG cylinders out of your home kitchen into a safe external utility area or balcony. Heavy-duty copper pipes deliver gas directly to your cooktop with automatic leak cutoff protection.",
    benefits: [
      "Eliminates fire hazards & gas cylinder explosion risks inside kitchens",
      "Saves valuable floor and cabinet space inside domestic kitchens",
      "Prevents cylinder movement damage to marble, granite & tile flooring",
      "Automatic gas leak detector shuts off gas supply if a leak occurs",
      "Convenient cylinder replacement without workers entering your living room",
    ],
  },
  {
    icon: Utensils,
    title: "Commercial Kitchen LPG Manifold Systems",
    tagline: "High-Flow Gas Piping for Hotels, Restaurants, Resorts & Canteens",
    description:
      "Custom multi-cylinder manifold banks (4x4, 6x6, 10x10) engineered for high-demand commercial kitchens, bakery ovens, food courts, and industrial canteens requiring high gas flow rate.",
    benefits: [
      "Uninterrupted cooking gas supply with automatic dual-bank changeover",
      "High gas flow rate powering multiple commercial burners simultaneously",
      "PESO & IS 6044 compliant safety valves, flame arrestors & emergency shutoffs",
      "Reduces LPG cylinder consumption costs through 100% gas exhaustion",
      "Dedicated 24/7 technical support & quarterly safety audits in Sambhaji Nagar",
    ],
  },
  {
    icon: FlaskConical,
    title: "LPG Piping for Chemistry & Science Labs",
    tagline: "Safe Gas Distribution for School, College & Research Laboratories",
    description:
      "Specialized copper LPG gas distribution networks for chemistry laboratories, educational institution science labs, and industrial testing centers. Features multi-station Bunsen burner taps, master instructor shutoffs, and gas leak alarms.",
    benefits: [
      "Central cylinder manifold stored outside lab rooms to eliminate indoor hazards",
      "Workbench copper piping with individual fine-control needle valves for Bunsen burners",
      "Master emergency gas shutoff valve at lab entrance for instant instructor control",
      "Dual-stage pressure regulation providing steady, non-flickering blue heating flame",
      "IS 6044 lab safety compliant with semiconductor gas leak detectors & audio alarms",
    ],
  },
  {
    icon: Building,
    title: "Reticulated LPG for Housing Societies",
    tagline: "Centralized Piped LPG Network for Multi-Story Apartment Buildings",
    description:
      "Central LPG storage compound connected via underground & riser copper piping to individual apartment units, complete with individual gas meters for monthly consumption billing.",
    benefits: [
      "24/7 Piped LPG gas on demand just like electricity or water supply",
      "Individual gas meters ensure pay-as-you-use billing transparency",
      "Zero hassle of booking, waiting, or carrying LPG cylinders upstairs",
      "Centralized gas leak monitoring for the entire residential building",
      "Increases property value and modern lifestyle appeal for homebuyers",
    ],
  },
];

// LPG Benefits
const lpgBenefits = [
  {
    icon: ShieldCheck,
    title: "100% Kitchen Safety",
    desc: "Placing cylinders outside eliminates gas accumulation, explosion hazards, and indoor fire risks.",
  },
  {
    icon: Zap,
    title: "Automatic Gas Leak Cutoff",
    desc: "Gas sensors detect leaks and shut off the main solenoid valve in less than 5 seconds.",
  },
  {
    icon: Flame,
    title: "Uninterrupted Cooking Flame",
    desc: "Auto-changeover manifolds switch to reserve cylinders automatically without interrupting cooking.",
  },
  {
    icon: Sparkles,
    title: "Clean Kitchen Aesthetics",
    desc: "No bulky gas cylinders blocking kitchen cabinets or scratching expensive kitchen flooring.",
  },
];

export default function LPGPage() {
  const [selectedComponent, setSelectedComponent] = useState<(typeof lpgComponents)[number] | null>(null);

  return (
    <>
      {/* Hero Header */}
      <section className="section pb-8 sm:pb-12" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold"
              style={{ background: "var(--color-primary-light)", color: "var(--color-primary)" }}
            >
              <Flame size={14} /> Domestic & Commercial Gas Safety Engineering
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Home & Commercial <span className="text-gradient">LPG Copper Gas Pipeline</span> Systems
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 font-medium">
              Specialized installer of leakproof copper LPG piping, cylinder manifolds, gas leak detectors, and reticulated gas systems for homes, hotels, restaurants, and apartments across Maharashtra.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Applications Overview — Frameless */}
      <section className="section pt-4 pb-16" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>LPG Piped Gas Applications</h2>
            <p>Custom engineered LPG copper piping solutions for homes, commercial kitchens, and residential societies</p>
          </div>

          <div className="flex flex-col gap-14 sm:gap-20 max-w-5xl mx-auto">
            {lpgApplications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="pt-10 sm:pt-14 first:pt-0 border-t first:border-t-0 border-slate-200/70"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                        <app.icon size={24} />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] opacity-80">
                          APPLICATION #{String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                          {app.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-blue-600 leading-relaxed">
                      {app.tagline}
                    </p>
                    <p className="text-sm leading-relaxed text-slate-600 font-medium">
                      {app.description}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={`/contact?service=${encodeURIComponent(app.title)}`}
                        className="inline-flex items-center gap-2 btn btn-primary btn-lg text-xs sm:text-sm rounded-lg py-3 px-6 font-bold shadow-xs hover:shadow-md transition-all"
                      >
                        Enquire for {app.title.split(" ")[0]} Pipeline <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 pb-3 mb-3 border-b border-slate-200/60">
                      KEY SAFETY & OPERATIONAL ADVANTAGES
                    </h4>
                    <ul className="space-y-3">
                      {app.benefits.map((benefit, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-slate-700">
                          <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-primary)]" />
                          <span className="leading-snug">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Components — Frameless Grid */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>LPG Pipeline System Components</h2>
            <p>High-grade copper pipes, automatic regulators, and gas safety cutoff hardware (Tap any for specs)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
            {lpgComponents.map((comp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedComponent(comp)}
                className="cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center transition-transform group-hover:scale-110">
                      <comp.icon size={22} />
                    </div>
                    <span className="text-[11px] font-semibold text-[var(--color-primary)] opacity-80 group-hover:opacity-100 transition-opacity">
                      View Specs →
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2 text-slate-900 group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {comp.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium mb-4">
                    {comp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                  <span>Inspect Technical Parameters</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Compliance Section — Frameless */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-5xl">
          <div className="section-heading">
            <h2>Why Choose LPG Copper Piping for Your Home & Business?</h2>
            <p>Unmatched safety, continuous gas availability, and clean kitchen aesthetics</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {lpgBenefits.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-start group"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center mb-3 transition-transform group-hover:scale-110">
                  <b.icon size={22} />
                </div>
                <h3 className="text-base font-bold mb-1.5 text-slate-900 leading-snug group-hover:text-[var(--color-primary)] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Planning Home or Commercial LPG Gas Piping?
          </h2>
          <p className="text-sm sm:text-base mb-8 text-slate-500 font-medium leading-relaxed">
            Get a free site inspection, pipe routing design, and BOQ estimation from our gas pipeline engineers in Ch. Sambhaji Nagar.
          </p>
          <Link href="/contact?service=LPG%20Copper%20Gas%20Pipeline" className="btn btn-primary btn-lg w-full sm:w-auto justify-center rounded-full px-8 py-4 font-bold shadow-md hover:shadow-lg transition-all">
            Request LPG Piping Proposal <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Component Specs Modal */}
      <AnimatePresence>
        {selectedComponent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedComponent(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  LPG Component Specifications
                </span>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                  {selectedComponent.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  {selectedComponent.description}
                </p>
              </div>

              {/* Specs Table */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-bold uppercase text-slate-400">Technical Parameters</h4>
                <div className="space-y-1.5">
                  {selectedComponent.specs.map((s, j) => (
                    <div key={j} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100">
                      <span className="font-semibold text-slate-500">{s.label}</span>
                      <span className="font-bold text-slate-900">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Link
                  href={`/contact?service=LPG%20Piping&component=${encodeURIComponent(selectedComponent.title)}`}
                  onClick={() => setSelectedComponent(null)}
                  className="btn btn-primary btn-lg w-full justify-center text-sm font-bold"
                >
                  Enquire for {selectedComponent.title.split(" ")[0]} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="btn btn-outline btn-lg w-full sm:w-auto justify-center text-sm font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
