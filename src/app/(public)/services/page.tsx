// ============================================
// Services Page — Clean Non-Overlapping Mobile & Desktop Layout
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Wrench,
  ShoppingBag,
  Settings,
  Stethoscope,
  Building2,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  X,
  Filter,
  Sparkles,
  Flame,
} from "lucide-react";

import { useFirestore } from "@/hooks/useFirestore";
import { Service } from "@/types";

const iconMap: Record<string, any> = {
  Wrench,
  Flame,
  ShoppingBag,
  Settings,
  Stethoscope,
  Building2,
  Headphones,
  ShieldCheck,
  Sparkles,
};

const staticFallbackServices = [
  {
    id: "mgps-installation",
    category: "Installation",
    icon: Wrench,
    title: "MGPS Installation",
    tagline: "End-to-end hospital gas pipeline engineering & IS 7484 certification",
    description:
      "Full-scope Medical Gas Pipeline System design, procurement, pipeline routing, and commissioning. Serving hospitals from 10 to 500+ beds with turnkey precision.",
    fullDetails:
      "We provide complete engineering for central hospital gas distribution networks. Our scope includes site load planning, 3D CAD pipeline routing, degreased medical copper piping installation, zone valve box (ZVB) setup, digital alarm panel integration, high-pressure manifold erection, nitrogen purge hold testing, and IS 7484 safety certification.",
    features: [
      "Site survey & load capacity calculation",
      "3D CAD central pipeline routing design",
      "Oxygen, Medical Air, CO2, Nitrogen, Vacuum & Terminal Outlet Installation",
      "Medical-grade degreased copper pipe installation",
      "Zone valve box (ZVB) & digital area gas alarms",
      "Automatic cylinder manifold & LMO tank setup",
      "Nitrogen purge testing, pressure hold & IS certification",
    ],
    badge: "Full Turnkey",
    leadTime: "10-30 Days",
  },
  {
    id: "lpg-gas-piping",
    category: "LPG Piping",
    icon: Flame,
    title: "LPG Copper Gas Pipeline Systems",
    tagline: "Centralized LPG copper gas piping for homes, hotels, restaurants & apartments",
    description:
      "Safe, leakproof LPG copper gas pipeline installation for domestic kitchens, villas, commercial hotel kitchens, restaurants, and reticulated gas supply for residential societies.",
    fullDetails:
      "We design and install domestic and commercial LPG copper gas pipeline systems. We relocate heavy LPG cylinders outside the kitchen into safe external manifold yards, running heavy-wall copper pipes (BS EN 1057 / ASTM B280) with automatic gas leak detectors, solenoid cutoff valves, dual-stage pressure regulators, and individual utility gas meters.",
    features: [
      "Domestic home kitchen LPG copper piping with gas leak detector",
      "Commercial hotel & restaurant multi-cylinder LPG manifold banks",
      "Automatic electro-magnetic gas cutoff solenoid valve setup",
      "First stage (1.5 Bar) & second stage (37 mbar) pressure regulators",
      "Reticulated LPG system for multi-story apartment buildings",
      "PESO & IS 6044 safety compliant installation & pressure hold testing",
    ],
    badge: "IS 6044 / PESO Certified",
    leadTime: "3-10 Days",
  },
  {
    id: "equipment-sales",
    category: "Equipment",
    icon: ShoppingBag,
    title: "Equipment Sales & ICU Devices",
    tagline: "Certified stockist & supplier of hospital gas hardware, ICU, OT & diagnostic equipment across India",
    description:
      "Complete range of hospital gas supply hardware, ICU monitors, ECG machines, syringe pumps, ventilators, baby care warmers, OT lights, pendants, and medical gas accessories.",
    fullDetails:
      "We serve all types of hospital equipment — certified stockist and supplier of complete medical gas equipment, ICU patient monitors, ECG machines, syringe pumps, ventilators, OT surgical lights, pendants, and infant radiant warmers for new hospital builds and ICU expansions. Products include 3/12 Channel ECG machines, 5/7-para patient monitors, volumetric infusion & syringe pumps, advanced ICU ventilators, infant warmers & incubators, ceiling surgical pendants, LED OT lights, BS/DIN gas outlets, BPC flow meters, vacuum suction regulators, bed head panels, and digital alarm panels.",
    features: [
      "3-Channel & 12-Channel ECG Machines with Interpretation & Thermal Printing",
      "Multi-Para Patient Monitors (5-Para / 7-Para / Modular ICU & OT Monitors)",
      "Volumetric Infusion Pumps & High-Precision Micro-Syringe Pumps",
      "Advanced ICU Ventilators & Emergency Portable Transport Ventilators",
      "Infant Radiant Warmers, Baby Incubators & Phototherapy Units",
      "Single & Dual Arm Ceiling Surgical Pendants (Gas + Electrical Outlets)",
      "LED Shadowless Surgical OT Lights (Single & Dual Dome)",
      "Manual & Automatic Gas Manifold Control Panels with Digital Alarm Display",
      "BS 5682 / DIN 13260 / AFNOR / Ohmeda Quick-Connect Gas Outlets",
      "BPC Oxygen Flow Meters, Anodized Regulators & Autoclavable Vacuum Suction Units",
      "Anti-Microbial & Flame-Retardant Hospital Cubicle Curtains & Aluminum Ceiling Track Systems",
      "ICU Patient Beds, Bed Head Panels & Heavy-Duty Gas Cylinder Trolleys",
    ],
    badge: "Certified Hardware & ICU Devices",
    leadTime: "Immediate Stock / Fast Dispatch",
  },
  {
    id: "modular-ot",
    category: "Modular OT",
    icon: Settings,
    title: "Modular Operation Theater Setup",
    tagline: "Sterile surgical environments with integrated gas supply & laminar flow",
    description:
      "Design and installation of state-of-the-art modular operation theaters with integrated gas supply, pendants, shadowless lighting, and HEPA air filtration.",
    fullDetails:
      "Complete turnkey modular OT construction complying with NABH guidelines. Includes stainless steel / anti-bacterial wall paneling, ceiling pendants with gas sockets & electrical points, Class 100 HEPA laminar airflow, OT touch control screens, and hermetically sealed sliding doors.",
    features: [
      "Anti-bacterial wall & ceiling panel systems",
      "Single & dual ceiling surgical pendants",
      "Class 100 HEPA filtered laminar air flow",
      "Integrated medical gas terminal outlets",
      "Digital OT control panels & X-ray viewing screens",
      "NABH & ISO compliant surgical theater setup",
    ],
    badge: "NABH Compliant",
    leadTime: "15-45 Days",
  },
  {
    id: "repair-maintenance",
    category: "Maintenance",
    icon: Stethoscope,
    title: "Repair, Servicing & Maintenance (AMC)",
    tagline: "24/7 emergency repair & annual maintenance for MGPS pipelines & ICU equipment",
    description:
      "Comprehensive preventive maintenance, calibration, ultrasonic leak detection, and 24/7 emergency repair services for hospital gas supply networks and ICU devices.",
    fullDetails:
      "Round-the-clock emergency support and customized Annual Maintenance Contracts (AMC) for hospital gas pipelines, ICU monitors, ECG machines, syringe pumps, ventilators, and infant radiant warmers. We conduct periodic pressure calibration, manifold servicing, leak rectification, sensor replacements, and medical device calibration to ensure 100% uptime for ICUs and OTs.",
    features: [
      "24/7 Emergency breakdown repair helpline for MGPS & ICU equipment",
      "Calibration & servicing of 3/12 Channel ECG machines & Patient Monitors",
      "Infusion & Syringe pump flow rate calibration & mechanical repair",
      "ICU ventilator preventive maintenance & oxygen sensor replacement",
      "Infant radiant warmer & baby incubator temperature calibration",
      "Ultrasonic gas leak detection & pipe repair",
      "Manifold pressure regulator calibration & outlet servicing",
      "Comprehensive AMC & Non-AMC packages for complete hospital peace of mind",
    ],
    badge: "24/7 Emergency & ICU AMC",
    leadTime: "Instant Helpline / On-Site Dispatch",
  },
  {
    id: "turnkey-solutions",
    category: "Turnkey",
    icon: Building2,
    title: "Turnkey Hospital Projects",
    tagline: "Complete architectural coordination & central plant commissioning",
    description: "End-to-end project management for new hospital builds requiring central medical gas pipeline infrastructure built into architectural plans.",
    fullDetails:
      "Single-point project execution for new greenfield & brownfield hospital construction. We collaborate with architects, MEP consultants, and civil contractors to design, install, and commission central gas infrastructure from ground up.",
    features: [
      "Architectural & MEP coordination",
      "Central plant room & LMO tank yard design",
      "Pipeline routing optimization & sizing",
      "Turnkey installation & project management",
      "Quality assurance & pressure hold tests",
      "Hospital staff training & handover certification",
    ],
    badge: "End-to-End",
    leadTime: "Project Based",
  },
  {
    id: "consultation-audit",
    category: "Consultation",
    icon: Headphones,
    title: "Consultation & Technical Audit",
    tagline: "IS 7484 compliance audits, BOQ estimates & safety consultations",
    description: "Expert technical guidance for hospital administrators planning to install, upgrade, or audit central medical gas pipeline infrastructure.",
    fullDetails:
      "Technical safety audits and consultation for existing hospital gas pipelines. We evaluate pressure drops, leak rates, safety valve calibration, and compliance with IS 7484 standards, delivering detailed BOQ estimates and technical audit reports.",
    features: [
      "IS 7484 safety & compliance audits",
      "Pipeline health & pressure drop analysis",
      "BOQ cost estimation & equipment selection",
      "Oxygen consumption optimization guidance",
      "Staff safety protocol training sessions",
      "Detailed technical audit report & recommendations",
    ],
    badge: "Expert Guidance",
    leadTime: "1-3 Days",
  },
];

function getServiceCategory(s: Service): string {
  if (s.category) return s.category;
  const title = (s.title || "").toLowerCase();
  if (title.includes("lpg")) return "LPG Piping";
  if (title.includes("equipment")) return "Equipment";
  if (title.includes("modular") || title.includes("ot")) return "Modular OT";
  if (title.includes("maintenance") || title.includes("testing") || title.includes("repair")) return "Maintenance";
  if (title.includes("turnkey")) return "Turnkey";
  if (title.includes("consultation") || title.includes("audit")) return "Consultation";
  return "Installation";
}

type ServiceItem = (typeof staticFallbackServices)[number];

export default function ServicesPage() {
  const { data: dbServices } = useFirestore<Service>("services");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const liveServices: ServiceItem[] = dbServices
    .filter((s) => (s.status || "published") !== "draft")
    .map((s) => {
      const IconComp = iconMap[s.icon] || Wrench;
      const category = getServiceCategory(s);
      return {
        id: s.id,
        category,
        icon: IconComp,
        title: s.title,
        tagline: s.tagline || s.shortDescription || "Certified Medical Gas Engineering",
        description: s.shortDescription || s.fullDescription || "",
        fullDetails: s.fullDescription || s.shortDescription || "",
        features: s.features?.length ? s.features : ["Certified IS 7484 installation", "Professional engineering & testing"],
        badge: s.badge || "Certified Scope",
        leadTime: s.leadTime || "Standard Delivery",
      };
    });

  const allServices = liveServices.length > 0 ? liveServices : staticFallbackServices;

  const categories = ["All", ...Array.from(new Set(allServices.map((s) => s.category)))];

  const filteredServices = allServices.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  return (
    <>
      {/* Hero Header */}
      <section className="section pb-8 sm:pb-12" style={{ background: "var(--color-bg-primary)" }}>
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
                <ShieldCheck size={14} /> Certified Medical Gas Engineering
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Our Specialized <span className="text-gradient">Services</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              End-to-end medical gas pipeline installation, certified equipment supply, modular OT construction, and 24/7 maintenance across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter + Services List Section */}
      <section className="section pt-6 pb-24 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          {/* Category Filter Scrollbar */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-10 sm:mb-12 justify-start sm:justify-center items-center pt-2 scrollbar-none">
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {categories.map((cat) => {
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap"
                    style={{
                      background: isSelected ? "var(--color-primary)" : "rgba(226, 232, 240, 0.6)",
                      color: isSelected ? "#FFFFFF" : "var(--color-text-secondary)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services List — Frameless / Borderless Flat Layout */}
          <div className="flex flex-col gap-14 sm:gap-20 md:gap-24">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="pt-10 sm:pt-14 first:pt-0 border-t first:border-t-0 border-slate-200/70"
              >
                {/* Top Service Header Row — Frameless */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6">
                  <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
                      <service.icon size={22} />
                    </div>
                    <div>
                      <div className="block mb-1">
                        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] opacity-80">
                          SERVICE CATEGORY #{String(i + 1).padStart(2, "0")} — {service.category}
                        </span>
                      </div>
                      <h2
                        className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-slate-900"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {service.title}
                      </h2>
                    </div>
                  </div>

                  {/* Badges Row — Frameless */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 sm:pt-0">
                    <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-[var(--color-primary)] whitespace-nowrap">
                      {service.badge}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 whitespace-nowrap">
                      {service.leadTime}
                    </span>
                  </div>
                </div>

                {/* Main Body Grid: Description & Deliverables — Frameless */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
                  {/* Left Column: Tagline, Description & Action Buttons */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-3 leading-relaxed">
                        {service.tagline}
                      </p>
                      <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                        {service.description}
                      </p>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="btn btn-primary btn-lg text-xs sm:text-sm justify-center rounded-lg py-3.5 px-6 shadow-xs hover:shadow-md transition-all font-bold group/btn"
                      >
                        Enquire for {service.title.split(" ")[0]}
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className="btn btn-outline btn-lg text-xs sm:text-sm justify-center rounded-lg py-3.5 px-6 transition-all font-bold cursor-pointer hover:bg-slate-50"
                      >
                        <Sparkles size={15} /> Full Scope & Specs
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Key Deliverables — Frameless Unboxed List */}
                  <div className="lg:col-span-5 w-full">
                    <h4
                      className="text-xs font-extrabold uppercase tracking-wider text-slate-700 pb-3 mb-3 border-b border-slate-200/60"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      KEY DELIVERABLES INCLUDED
                    </h4>

                    <ul className="space-y-3">
                      {service.features.map((feature: string, j: number) => (
                        <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                          <CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[var(--color-primary)]" />
                          <span className="leading-snug">{feature}</span>
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

      {/* Bottom CTA */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-2xl mx-auto">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
          >
            Need a Customized Solution for Your Hospital?
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mb-8 leading-relaxed">
            Contact our engineering team in Ch. Sambhaji Nagar for site evaluation, BOQ preparation, and competitive pricing.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 btn btn-primary btn-lg w-full sm:w-auto justify-center rounded-full px-8 py-4 font-bold shadow-md hover:shadow-lg transition-all">
            Request Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Detail Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div
                className="h-2 w-full flex-shrink-0"
                style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}
              />

              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--color-border-light)]">
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
                        {selectedService.category} • {selectedService.badge}
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

                <div>
                  <h4
                    className="text-xs font-bold uppercase tracking-wider mb-2"
                    style={{ color: "var(--color-primary)", fontFamily: "var(--font-display)" }}
                  >
                    Comprehensive Service Scope
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                    {selectedService.fullDetails}
                  </p>
                </div>

                <div
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200/50"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck size={16} style={{ color: "var(--color-primary)" }} className="flex-shrink-0" />
                    <h4
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-display)" }}
                    >
                      Technical Deliverables & Specifications
                    </h4>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedService.features.map((feature: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0 text-[var(--color-primary)]" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/contact?service=${encodeURIComponent(selectedService.title)}`}
                    onClick={() => setSelectedService(null)}
                    className="btn btn-primary btn-lg w-full justify-center text-sm rounded-xl py-3 font-bold"
                  >
                    Enquire for {selectedService.title} <ArrowRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedService(null)}
                    className="btn btn-outline btn-lg w-full sm:w-auto justify-center text-sm rounded-xl py-3 font-bold cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
