// ============================================
// Testimonials / Trust Section — Landing Page
// ============================================

"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Award, Factory } from "lucide-react";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Quality Assured Products",
    description: "All products meet Indian Standards specifications and hospital-grade safety requirements.",
  },
  {
    icon: Award,
    title: "Experienced Team",
    description: "Over a decade of experience in MGPS installation and hospital equipment supply.",
  },
  {
    icon: Factory,
    title: "IS Standards Compliant",
    description: "Adhering strictly to Indian Standards (IS 7484) for hospital gas supply and safety.",
  },
  {
    icon: CheckCircle2,
    title: "Complete Solutions",
    description: "From single component supply to turnkey hospital gas pipeline installations.",
  },
];

export default function Testimonials() {
  return (
    <section
      className="section"
      style={{
        background: "var(--color-primary-light)",
      }}
    >
      <div className="container">
        <div className="section-heading">
          <h2>Why Choose Ocean MGPS</h2>
          <p>Trusted by hospitals and healthcare facilities across India</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-2xl"
              style={{
                border: "1px solid rgba(21, 101, 192, 0.12)",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                style={{
                  background: "var(--color-primary-light)",
                  boxShadow: "0 4px 12px rgba(21, 101, 192, 0.15)",
                }}
              >
                <point.icon size={26} style={{ color: "var(--color-primary)" }} />
              </div>
              <h3
                className="text-base sm:text-lg font-bold mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-primary-dark)",
                }}
              >
                {point.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
