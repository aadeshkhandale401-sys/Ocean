// ============================================
// MGPS Information Page — Complete Educational & Technical Guide
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Gauge,
  GitBranch,
  ShieldCheck,
  Plug,
  Settings,
  Monitor,
  Heart,
  Zap,
  BarChart3,
  X,
  Activity,
  ChevronRight,
  Flame,
  Wind,
  Layers,
  Sparkles,
  Award,
  Clock,
  Building2,
  CheckCircle2,
  Check,
  Stethoscope,
  Maximize2,
  Leaf,
  DollarSign,
  ShieldAlert,
} from "lucide-react";
import { MGPS_COMPONENTS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Gauge,
  GitBranch,
  ShieldCheck,
  Plug,
  Settings,
  Monitor,
};

// Parts of MGPS Architecture
const mgpsParts = [
  {
    category: "Gas Sources & Generation",
    icon: Flame,
    color: "bg-blue-50 text-blue-600",
    items: [
      {
        title: "Central Supply Systems",
        description:
          "High-capacity liquid oxygen (VIE) tanks or automatic changeover cylinder manifold systems (2x2 to 10x10 banks) ensuring uninterrupted bulk supply.",
      },
      {
        title: "Medical Air Compressors & Vacuum Pumps",
        description:
          "Oil-free duplex/triplex compressors for 4-Bar respiratory air & 7-Bar surgical air, alongside heavy-duty vacuum pumps ensuring unbroken suction.",
      },
    ],
  },
  {
    category: "Pipeline Network Distribution",
    icon: GitBranch,
    color: "bg-emerald-50 text-emerald-600",
    items: [
      {
        title: "Medical-Grade Copper Piping",
        description:
          "Degreased phosphorus-deoxidized copper tubes (Cu-DHP / BS EN 13348 / IS 1545) joined with silver alloy brazing for 100% immunity to contamination.",
      },
      {
        title: "Flexible Conduits & Risers",
        description:
          "High-pressure flexible conduits and vertical riser pipes conveying gases safely from the plant room to every floor and ward.",
      },
    ],
  },
  {
    category: "Control & Safety Systems",
    icon: ShieldCheck,
    color: "bg-amber-50 text-amber-600",
    items: [
      {
        title: "Manifolds & Pressure Regulators",
        description:
          "Dual-stage line pressure regulators controlling stored gas delivery rates and automatic bank changeover without pressure drops.",
      },
      {
        title: "Area Valve Service Units (AVSU) & Alarms",
        description:
          "Digital audio-visual master and area alarm panels monitoring line pressures 24/7, providing instant alerts for pressure deviations.",
      },
    ],
  },
  {
    category: "Terminal Delivery Units",
    icon: Plug,
    color: "bg-purple-50 text-purple-600",
    items: [
      {
        title: "Medical Gas Outlets & Bed Head Panels",
        description:
          "Self-sealing gas outlet points (BS / DIN / AFNOR) integrated into bed head panel units and ceiling surgical pendants in ICUs & OTs.",
      },
    ],
  },
];

// Main Medical Gases Data
const medicalGases = [
  {
    name: "Oxygen (O₂)",
    formula: "O₂",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    use: "Essential medical gas used for continuous respiratory support, ICU ventilation, emergency resuscitation, and oxygen therapy in breathing difficulties.",
  },
  {
    name: "Nitrous Oxide (N₂O)",
    formula: "N₂O",
    color: "text-cyan-600 bg-cyan-50 border-cyan-200",
    use: "Primary inhalation anesthetic gas utilized in surgical operation theaters for pain control and induction of anesthesia.",
  },
  {
    name: "Medical Air (4 Bar & 7 Bar)",
    formula: "Air",
    color: "text-slate-700 bg-slate-100 border-slate-200",
    use: "Ultra-clean, dry, compressed air used for powering ICU ventilators, respiratory therapy, and driving pneumatic surgical tools.",
  },
  {
    name: "Vacuum / Suction",
    formula: "VAC",
    color: "text-rose-600 bg-rose-50 border-rose-200",
    use: "Centralized negative pressure vacuum system for clearing surgical secretions, blood, fluids, and airway emissions during operations.",
  },
  {
    name: "Carbon Dioxide (CO₂)",
    formula: "CO₂",
    color: "text-amber-600 bg-amber-50 border-amber-200",
    use: "Applied in laparoscopic surgeries for abdominal cavity insufflation and precise standardization of surgical instruments.",
  },
  {
    name: "Heliox (Helium + Oxygen)",
    formula: "He+O₂",
    color: "text-purple-600 bg-purple-50 border-purple-200",
    use: "Specialized gas mixture utilized to decrease airway resistance and work of breathing in severe upper respiratory obstruction.",
  },
];

// Comprehensive MGPS Benefits
const mgpsBenefits = [
  {
    icon: Heart,
    title: "Continuous & Reliable Supply",
    desc: "Provides an unbroken supply of critical gases (O₂, N₂O, Air, Vacuum), eliminating cylinder depletion delays during emergencies.",
  },
  {
    icon: ShieldAlert,
    title: "Enhanced Operational Safety",
    desc: "Avoids cylinder handling hazards (leakage, explosion, mechanical injury) and monitors line pressure 24/7 with digital alarms.",
  },
  {
    icon: Zap,
    title: "Streamlined Hospital Workflow",
    desc: "Relieves nursing and maintenance staff from transporting heavy gas cylinders into wards and operation theaters.",
  },
  {
    icon: Stethoscope,
    title: "Improved Patient Outcomes",
    desc: "Ensures precise, controlled flow of medical gases during delicate surgical procedures and prolonged ICU stays.",
  },
  {
    icon: DollarSign,
    title: "Cost-Effective Bulk Management",
    desc: "Eliminates recurring cylinder transport fees and reduces gas wastage through centralized bulk storage.",
  },
  {
    icon: Maximize2,
    title: "Optimized Space Utilization",
    desc: "Frees up valuable floor space in patient rooms and ICUs that would otherwise be occupied by large gas cylinders.",
  },
  {
    icon: Leaf,
    title: "Environmental Footprint Reduction",
    desc: "Centralized liquid storage reduces carbon emissions associated with frequent cylinder truck deliveries.",
  },
  {
    icon: Award,
    title: "Strict Regulatory Compliance",
    desc: "Meets global healthcare standards including HTM 02-01, NFPA 99, IS 7484, and NABH accreditation requirements.",
  },
];

// Solutions & Products Offerings List (from screenshot)
const solutionProducts = [
  "Patient Monitoring Systems (ECG & Multi-Para)",
  "Anaesthesia Machines & Surgical Workstations",
  "Medical Ventilators & Lung Monitoring Systems",
  "Neonatal Incubators & Thermoregulation Units",
  "Infant Radiant Warmers & Phototherapy Lights",
  "Polaris Surgical Lights & Dual Ceiling Pendants",
  "Workplace Infrastructure & Modular OT Design",
  "Central Medical Gas Pipeline Systems (MGPS)",
  "Hospital Consumables, Flow Meters & Accessories",
  "Turnkey Hospital Planning & Engineering Design",
];

const systemFlow = [
  { step: "01", title: "Central Gas Source", desc: "Oxygen Manifold / LMO Tank Yard / Vacuum Pump / Air Compressor" },
  { step: "02", title: "Automatic Control Panel", desc: "Pressure regulation, dual bank changeover & line stabilization" },
  { step: "03", title: "Copper Pipeline Riser", desc: "Degreased medical copper pipes (IS 1545 / BS EN 13348 standard)" },
  { step: "04", title: "Zone Valves & Alarms", desc: "Floor-wise isolation valve boxes (AVSU) & digital area gas alarms" },
  { step: "05", title: "Terminal Units", desc: "Bed head panel units, OT ceiling pendants & wall gas sockets" },
];

export default function MGPSPage() {
  const [selectedComponent, setSelectedComponent] = useState<{
    title: string;
    description: string;
    icon: string;
  } | null>(null);

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
              <Gauge size={14} /> Hospital Infrastructure & Safety Guide
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Medical Gas Pipeline System <span className="text-gradient">(MGPS)</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600">
              Comprehensive guide to central hospital gas supply architecture, medical gas types, pipeline components, and IS 7484 / HTM 02-01 safety standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is MGPS — Unboxed */}
      <section className="section pt-4 pb-12" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center">
                <Activity size={22} />
              </div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900"
                style={{ fontFamily: "var(--font-display)" }}
              >
                What is an MGPS System?
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              <p>
                A <strong className="text-slate-900">Medical Gas Pipeline System (MGPS)</strong> is a
                centralized hospital infrastructure engineered to safely deliver essential medical gases — including Oxygen (O₂), Nitrous Oxide (N₂O),
                Medical Air (4 Bar & 7 Bar), Carbon Dioxide (CO₂), and Vacuum — directly to patient bedsides, ICUs, and Operation Theaters.
              </p>
              <p>
                By replacing cumbersome individual gas cylinders in hospital wards with a centralized plant room and degreased copper pipeline distribution network, MGPS guarantees 24/7 continuous gas pressure, zero contamination, and instant emergency isolation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Parts of an MGPS System — Unboxed Section */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Parts of a Medical Gas Pipeline System</h2>
            <p>The core four-tier architecture from central supply plant to bedside terminal units</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-5xl mx-auto">
            {mgpsParts.map((part, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${part.color}`}>
                    <part.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {part.category}
                  </h3>
                </div>

                <div className="space-y-3 pl-2">
                  {part.items.map((subItem, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-[var(--color-primary)] flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-0.5">{subItem.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                          {subItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Medical Gases and Their Uses — Grid */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Main Medical Gases & Their Uses</h2>
            <p>Critical healthcare gases supplied through hospital pipeline infrastructure</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {medicalGases.map((gas, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-xs font-black px-2.5 py-1 rounded-md border ${gas.color}`}>
                    {gas.formula}
                  </span>
                  <h3 className="text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {gas.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {gas.use}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How MGPS Works — Flow Steps */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>How MGPS Works</h2>
            <p>The step-by-step central gas distribution pathway from manifold to bedside</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {systemFlow.map((flow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[var(--color-primary)]"
                    >
                      Step {flow.step}
                    </span>
                  </div>
                  <h4
                    className="text-sm sm:text-base font-bold mb-1.5 text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {flow.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {flow.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key MGPS Components Grid — Unboxed */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Key MGPS Components</h2>
            <p>The certified building blocks of a hospital gas pipeline network (Tap any for specs)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {MGPS_COMPONENTS.map((component, i) => {
              const Icon = iconMap[component.icon] || Gauge;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedComponent(component)}
                  className="cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-[var(--color-primary)] transition-transform duration-300 group-hover:scale-110"
                      >
                        <Icon size={24} />
                      </div>
                      <span
                        className="text-[11px] font-semibold text-[var(--color-primary)] opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        Tap for specs →
                      </span>
                    </div>

                    <h3
                      className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors text-slate-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {component.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                      {component.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 flex items-center justify-between text-xs font-semibold text-[var(--color-primary)]">
                    <span>Explore Component Scope</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comprehensive Benefits of MGPS */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Benefits of Medical Gas Pipeline System</h2>
            <p>Why modern hospitals transition to centralized gas infrastructure</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 max-w-6xl mx-auto">
            {mgpsBenefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-start text-left group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-50 text-[var(--color-primary)] mb-3 transition-transform group-hover:scale-110"
                >
                  <benefit.icon size={22} />
                </div>
                <h3
                  className="text-base font-bold mb-1.5 text-slate-900 leading-snug group-hover:text-[var(--color-primary)] transition-colors"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {benefit.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Solutions & Products Portfolio List */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-5xl">
          <div className="section-heading">
            <h2>Complete Solutions & Products Portfolio</h2>
            <p>Full spectrum of hospital gas pipeline systems, ICU devices & OT infrastructure</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {solutionProducts.map((prod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 py-2"
              >
                <div className="w-8 h-8 rounded-full bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                  <Check size={16} />
                </div>
                <span className="text-sm font-bold text-slate-900">{prod}</span>
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
            Planning an MGPS Installation for Your Hospital?
          </h2>
          <p className="text-sm sm:text-base mb-8 text-slate-500 font-medium">
            Our engineering team in Ch. Sambhaji Nagar assists with architectural CAD planning, pipeline sizing, and BOQ estimation.
          </p>
          <Link href="/contact" className="btn btn-primary btn-lg w-full sm:w-auto justify-center">
            Request Technical Proposal <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Component Detail Modal */}
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
              className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">
                  MGPS Component Details
                </span>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div>
                <h3
                  className="text-xl font-bold mb-2 text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {selectedComponent.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 font-medium">
                  {selectedComponent.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-2 text-xs font-medium text-blue-900">
                <div className="flex items-center gap-2 font-bold text-blue-950">
                  <ShieldCheck size={16} className="text-blue-600" />
                  <span>Compliance & Safety Standards</span>
                </div>
                <p>
                  Manufactured & tested under IS 7484 / HTM 02-01 specifications. Degreased for high-purity medical oxygen service.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href={`/contact?component=${encodeURIComponent(selectedComponent.title)}`}
                  onClick={() => setSelectedComponent(null)}
                  className="btn btn-primary btn-lg w-full justify-center text-sm"
                >
                  Inquire for {selectedComponent.title} <ArrowRight size={16} />
                </Link>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="btn btn-outline btn-lg w-full sm:w-auto justify-center text-sm"
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
