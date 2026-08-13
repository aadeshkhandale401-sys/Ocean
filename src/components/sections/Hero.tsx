// ============================================
// Hero Section — Landing Page
// ============================================

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Shield, Award, Clock } from "lucide-react";

export default function Hero() {
  return (
    <section className="section relative overflow-hidden bg-white">
      {/* Mobile-Only Background Image & Dark Overlay */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/projects/mgps-installation.png')",
        }}
      />
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(10, 25, 47, 0.85) 0%, rgba(13, 37, 74, 0.92) 100%)",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full mb-5 sm:mb-6 max-w-full bg-[var(--color-primary-light)] lg:bg-[var(--color-primary-light)] bg-white/15 backdrop-blur-md"
              style={{
                border: "1px solid rgba(21, 101, 192, 0.2)",
              }}
            >
              <Shield size={14} className="text-white lg:text-[var(--color-primary)] flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold text-white lg:text-[var(--color-primary)] truncate">
                Trusted MGPS Installer & Supplier
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-5 text-white lg:text-[var(--color-primary-dark)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
              }}
            >
              Your Trusted Partner for{" "}
              <span className="text-blue-300 lg:text-gradient">Medical Gas Pipeline Systems</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-[540px] text-blue-100/90 lg:text-[var(--color-text-secondary)]"
            >
              Highly specialized supplier & turnkey installer of certified{" "}
              <span className="font-extrabold text-cyan-300 lg:text-[var(--color-primary)]">
                Medical Gas Pipeline Systems (MGPS), medical equipment & hospital hardware
              </span>{" "}
              in Chh. Sambhaji Nagar (Aurangabad), Jalna, Maharashtra & across India.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12 pb-2">
              <Link href="/services" className="btn btn-primary btn-lg w-full sm:w-auto">
                Explore Services
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="btn btn-outline btn-lg w-full sm:w-auto text-white border-white/60 hover:bg-white hover:text-blue-900 lg:text-[var(--color-primary)] lg:border-[var(--color-primary)] lg:hover:bg-[var(--color-primary)] lg:hover:text-white"
              >
                <Phone size={18} />
                Contact Us
              </Link>
            </div>

            {/* Mini Trust Indicators — Guaranteed spacious separation */}
            <div className="flex flex-wrap gap-5 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/15 lg:border-slate-200/80">
              {[
                { icon: Award, text: "ISO Certified" },
                { icon: Shield, text: "Quality Assured" },
                { icon: Clock, text: "24/7 Support" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <item.icon size={16} className="text-blue-300 lg:text-[var(--color-primary)]" />
                  <span className="text-xs sm:text-sm font-medium text-white/90 lg:text-[var(--color-text-secondary)]">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Visual (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block w-full"
          >
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(135deg, var(--color-primary-light), rgba(2, 136, 209, 0.1))",
                aspectRatio: "4/3",
              }}
            >
              {/* Decorative grid pattern */}
              <div
                className="absolute inset-0 opacity-30 z-10 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(21, 101, 192, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(21, 101, 192, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Real Hero Image */}
              <img
                src="/images/projects/mgps-installation.png"
                alt="Medical Gas Pipeline System Installation"
                className="w-full h-full object-cover"
              />
              {/* Subtle dark-to-light gradient overlay for badge readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13, 71, 161, 0.4) 0%, transparent 60%)",
                }}
              />

              {/* Floating badges */}
              <motion.div
                className="absolute top-6 right-6 bg-white rounded-lg px-3 py-2 z-20"
                style={{ boxShadow: "var(--shadow-md)" }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-success)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    150+ Projects
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-6 left-6 bg-white rounded-lg px-3 py-2 z-20"
                style={{ boxShadow: "var(--shadow-md)" }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    Pan-India Service
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
