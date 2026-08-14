// ============================================
// Stats Bar — Animated & Translation-Safe Counters
// ============================================

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Users, Clock, Package } from "lucide-react";
import { DEFAULT_SETTINGS } from "@/lib/constants";
import { useSettings } from "@/hooks/useSettings";

const statIcons = [Briefcase, Users, Clock, Package];

function AnimatedCounter({ value, suffix }: { value: number | string; suffix?: string }) {
  const targetValue = Math.max(0, parseInt(String(value), 10) || 0);
  const [count, setCount] = useState<number>(targetValue);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated && isInView && targetValue > 0) {
      setHasAnimated(true);
      let start = 0;
      const duration = 1500;
      const step = Math.max(1, Math.ceil(targetValue / (duration / 16)));

      const timer = setInterval(() => {
        start += step;
        if (start >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);

      return () => clearInterval(timer);
    } else if (!hasAnimated) {
      setCount(targetValue);
    }
  }, [isInView, targetValue, hasAnimated]);

  return (
    <span ref={ref} translate="no" className="notranslate tabular-nums inline-block">
      {count > 0 ? count : targetValue}
      {suffix || "+"}
    </span>
  );
}

export default function StatsBar() {
  const settings = useSettings();
  const stats = (settings && settings.stats && settings.stats.length > 0) 
    ? settings.stats 
    : DEFAULT_SETTINGS.stats;

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
            const fallbackValue = DEFAULT_SETTINGS.stats[i]?.value || 100;
            const finalValue = stat?.value ?? fallbackValue;
            const finalSuffix = stat?.suffix ?? "+";

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
                  <AnimatedCounter value={finalValue} suffix={finalSuffix} />
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
