// ============================================
// About Page — Ocean MGPS (Ch. Sambhaji Nagar)
// Clean White Theme & Ultra Responsive Layout
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Shield,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  Wrench,
  CheckCircle2,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "Every product and pipeline fitting we install meets strict Indian Standards (IS 7484) and hospital-grade safety requirements.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "We build long-term relationships with hospital administrators by providing tailored design, installation, and after-sales support.",
  },
  {
    icon: Clock,
    title: "24/7 Reliability",
    description: "Our systems are engineered for zero downtime with round-the-clock emergency support and preventive maintenance services.",
  },
  {
    icon: Award,
    title: "Technical Expertise",
    description: "With over a decade of hands-on experience, our engineers deliver flawless pipeline routing and certified manifold setups.",
  },
];

const milestones = [
  {
    title: "Established Headquarters",
    description: "Founded in Ch. Sambhaji Nagar, Maharashtra for specialized hospital gas pipeline engineering.",
  },
  {
    title: "100+ Bed Hospital MGPS",
    description: "Executed first major turnkey MGPS installation for multi-specialty care.",
  },
  {
    title: "Modular OT Expansion",
    description: "Expanded engineering scope to NABH-compliant modular operation theater setups.",
  },
  {
    title: "150+ Projects Completed",
    description: "Successfully commissioned 150+ medical gas pipeline projects across India.",
  },
  {
    title: "Pan-India Network",
    description: "Established nationwide equipment supply and technical service coverage.",
  },
  {
    title: "145+ Healthcare Clients",
    description: "Trusted long-term technical partner for 145+ hospitals and healthcare institutes.",
  },
];

const quickStats = [
  { label: "Projects Completed", value: "150+" },
  { label: "Happy Clients", value: "145+" },
  { label: "Years Experience", value: "10+" },
  { label: "Products Available", value: "200+" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="section relative overflow-hidden" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-semibold shadow-sm"
              style={{
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                border: "1px solid rgba(21, 101, 192, 0.15)",
              }}
            >
              <MapPin size={14} /> Ch. Sambhaji Nagar, Maharashtra, India
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-primary-dark)",
              }}
            >
              About <span className="text-gradient">Ocean MGPS</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              We are a highly specialized stockist, supplier, and installer of Medical Gas Pipeline
              Systems and hospital equipment, dedicated to serving healthcare facilities across India
              with certified quality products and expert engineering services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="py-8 bg-white border-y border-[var(--color-border-light)]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {quickStats.map((stat, i) => (
              <div key={i} className="p-3 sm:p-4">
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

      {/* Our Story & Milestones Grid — Frameless & Spacious */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Story & Leadership (6 Columns) */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] block mb-2">
                  OUR JOURNEY & LEADERSHIP
                </span>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Engineered by <span className="text-gradient">Biomedical Experts</span>
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
                <p>
                  Ocean MGPS Sales & Multi Services was founded in Ch. Sambhaji Nagar, Maharashtra, with a clear mission — to provide hospitals, ICUs, and healthcare facilities across India with certified, zero-downtime Medical Gas Pipeline Systems (MGPS).
                </p>
                <p>
                  Founded under the vision of Managing Director <strong className="text-slate-900 font-bold">Ganesh Khandale</strong> and technical leadership of Lead Biomedical Engineer <strong className="text-slate-900 font-bold">Adesh Khandale</strong>, our specialized team brings over a decade of hands-on expertise in central gas manifolds, copper piping networks, ICU equipment, and modular OTs.
                </p>
                <p>
                  From designing central gas manifold banks and medical-grade copper pipeline networks to installing ICU ventilators, patient monitors, and modular OTs, our team ensures 100% compliance with IS 7484 and HTM 02-01 standards.
                </p>
              </div>

              {/* Frameless Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Biomedical Engineers</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Clinical safety & device calibration expertise</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">IS 7484 & HTM 02-01</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Purity certification & leakhold testing</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Key Company Milestones (6 Columns) */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-6 flex flex-col justify-start"
            >
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-200/80">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-slate-900"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Key Company Milestones
                  </h3>
                  <p className="text-xs text-slate-500">Over a decade of engineering excellence</p>
                </div>
              </div>

              {/* Clean Unboxed Milestones List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {milestones.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 size={16} />
                    </div>
                    <div>
                      <h4
                        className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-900"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Core Values — Unboxed */}
      <section className="section" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container">
          <div className="section-heading">
            <h2>Our Core Values</h2>
            <p>The principles that guide our engineering and client service</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className="w-13 h-13 rounded-2xl bg-blue-50 text-[var(--color-primary)] flex items-center justify-center mb-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                >
                  <value.icon size={24} />
                </div>
                <h3
                  className="text-base sm:text-lg font-bold mb-2 transition-colors group-hover:text-[var(--color-primary)] text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder & Technical Leadership Section */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--color-primary)] block mb-2">
              EXECUTIVE & TECHNICAL LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Guided by Experience & Engineering Innovation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Ganesh Khandale — Managing Director */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between items-center text-center space-y-4"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-18 h-18 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0D47A1] to-[#0288D1] text-white shadow-md">
                  <span className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                    GK
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    Ganesh Khandale
                  </h3>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[var(--color-primary)] mt-1">
                    Founder & Managing Director
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium pt-1">
                  Provides strategic vision, operational execution, and client partnership management for turnkey hospital MGPS projects, commercial gas manifolds, and pan-India medical supply distribution.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-3">
                <a
                  href="tel:8698648386"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Phone size={13} /> +91 8698648386
                </a>
              </div>
            </motion.div>

            {/* Aadesh Khandale — Biomedical Engineer */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between items-center text-center space-y-4"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-18 h-18 rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#0288D1] to-[#00ATC4] bg-cyan-700 text-white shadow-md">
                  <span className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
                    AK
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    Aadesh Khandale
                  </h3>
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 mt-1">
                    Lead Biomedical Engineer
                  </span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 font-medium pt-1">
                  Certified Biomedical Engineer overseeing technical pipeline design, IS 7484 & HTM 02-01 safety compliance, ICU critical care equipment calibration, and testing commissioning.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 w-full flex items-center justify-center gap-3">
                <a
                  href="tel:7775904214"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Phone size={13} /> +91 7775904214
                </a>
              </div>
            </motion.div>
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
            Partner with Ocean MGPS Today
          </h2>
          <p className="text-sm sm:text-base mb-8" style={{ color: "var(--color-text-secondary)" }}>
            Need an MGPS installation estimate or equipment supply catalog? Reach out to our engineering team in Ch. Sambhaji Nagar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/services" className="btn btn-outline btn-lg w-full sm:w-auto">
              <Wrench size={16} /> Explore Services
            </Link>
            <Link href="/contact" className="btn btn-primary btn-lg w-full sm:w-auto">
              Contact Us <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
