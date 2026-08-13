// ============================================
// Stats Bar — Animated Counters
// ============================================

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Clock, Package } from "lucide-react";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { useSettings } from "@/hooks/useSettings";

const statIcons = [Briefcase, Users, Clock, Package];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const settings = useSettings();
  const stats = settings.stats || DEFAULT_SETTINGS.stats;

  return (
    <section
      className="py-10"
      style={{
        background: "var(--color-bg-primary)",
        borderTop: "1px solid var(--color-border-light)",
        borderBottom: "1px solid var(--color-border-light)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-1.5 sm:gap-2"
              >
                <Icon size={22} style={{ color: "var(--color-primary)" }} />
                <span
                  className="text-2xl sm:text-3xl lg:text-[42px] font-extrabold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-primary-dark)",
                  }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
