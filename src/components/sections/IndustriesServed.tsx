// ============================================
// Industries Served — Landing Page Section
// Clean Buttons & Structured Spacing
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
  CheckCircle2,
  Home,
  Utensils,
} from "lucide-react";

const industries = [
  {
    icon: Hospital,
    name: "Multi-Specialty & Govt Hospitals",
    description: "Centralized liquid oxygen (LMO) tank yards, automatic manifold plants, and floor-wise piping for 100+ bed facilities.",
    badge: "100+ Beds Setup",
    tags: ["LMO Tank Yard", "Automatic Manifold", "Bed Head Panels"],
  },
  {
    icon: Home,
    name: "Residences, Villas & Apartments",
    description: "Domestic LPG copper gas piping, external cylinder placement, gas leak sensors, and auto cutoff solenoid valves.",
    badge: "Domestic LPG",
    tags: ["External Cylinders", "Leak Cutoff Valve", "Clean Kitchen"],
  },
  {
    icon: Utensils,
    name: "Hotels, Restaurants & Canteens",
    description: "High-flow commercial LPG cylinder manifold banks (4x4 to 10x10) with automatic changeover for commercial kitchens.",
    badge: "Commercial LPG",
    tags: ["High-Flow Manifold", "Auto Changeover", "IS 6044 Safety"],
  },
  {
    icon: Stethoscope,
    name: "Private Clinics & Nursing Homes",
    description: "Space-efficient 2-to-4 cylinder manual and semi-automatic manifold setups tailored for 10-50 bed facilities.",
    badge: "Compact MGPS",
    tags: ["2-4 Cylinder Rack", "Wall Gas Outlets", "Emergency Backup"],
  },
  {
    icon: Building2,
    name: "Modular Operation Theaters (OT)",
    description: "Surgical gas supply integration with ceiling pendants, shadowless lights, and sterile laminar air flow.",
    badge: "NABH Compliant",
    tags: ["Surgical Pendants", "NABH Compliant", "Laminar Air Flow"],
  },
  {
    icon: Siren,
    name: "ICUs & Emergency Trauma Care",
    description: "Uninterrupted high-pressure oxygen, medical air (4 bar/7 bar), and vacuum lines with zero downtime tolerance.",
    badge: "24/7 Redundancy",
    tags: ["Dual Manifolds", "Area Gas Alarms", "Continuous Vacuum"],
  },
  {
    icon: FlaskConical,
    name: "Chemistry & Science Laboratories",
    description: "Multi-station LPG gas pipeline networks for educational school/college chemistry labs and industrial research testing centers.",
    badge: "Lab Gas Safety",
    tags: ["Bunsen Burner Taps", "Master Cutoff Valve", "Gas Leak Sensor"],
  },
];

export default function IndustriesServed() {
  return (
    <section className="section" style={{ background: "var(--color-bg-primary)" }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading">
          <h2>Industries We Serve</h2>
          <p>Delivering certified medical gas pipeline solutions across the healthcare ecosystem</p>
        </div>

        {/* Industries Grid — Open Flat Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 mb-10 sm:mb-12">
          {industries.map((item, i) => (
            <motion.div
              key={item.name}
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

        {/* View Page Link */}
        <div className="text-center pt-4 sm:pt-6">
          <Link href="/industries" className="btn btn-outline btn-lg w-full sm:w-auto justify-center">
            Explore All Healthcare Ecosystem Solutions <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
