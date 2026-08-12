// ============================================
// Brand Logo Component — High Resolution & Theme Integrated
// ============================================

"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

export default function Logo({ variant = "dark", size = "md", className = "", href = "/" }: LogoProps) {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: { emblem: "w-8 h-8", title: "text-base", sub1: "text-[9px]", sub2: "text-[8px]" },
    md: { emblem: "w-10 sm:w-11 h-10 sm:h-11", title: "text-lg sm:text-xl", sub1: "text-[10px]", sub2: "text-[8px]" },
    lg: { emblem: "w-14 h-14", title: "text-2xl", sub1: "text-xs", sub2: "text-[10px]" },
  }[size];

  return (
    <Link href={href} className={`inline-flex items-center gap-3 no-underline group ${className}`}>
      {/* Emblem Icon */}
      <div className="relative flex-shrink-0">
        <img
          src="/images/ocean-emblem.png"
          alt="Ocean MGPS Emblem"
          className={`${sizeClasses.emblem} object-contain rounded-full transition-transform duration-300 group-hover:scale-105`}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <span
          className={`${sizeClasses.title} font-extrabold tracking-wider leading-none`}
          style={{
            fontFamily: "var(--font-display)",
            color: isLight ? "#FFFFFF" : "var(--color-primary-dark)",
            letterSpacing: "0.05em",
          }}
        >
          OCEAN
        </span>
        <span
          className={`${sizeClasses.sub1} font-bold tracking-[0.15em] uppercase leading-tight mt-0.5`}
          style={{
            color: isLight ? "#E3F2FD" : "var(--color-primary)",
          }}
        >
          MGPS INSTALLER
        </span>
        <span
          className={`${sizeClasses.sub2} font-semibold tracking-[0.1em] uppercase leading-none opacity-90`}
          style={{
            color: isLight ? "rgba(255,255,255,0.75)" : "var(--color-text-secondary)",
          }}
        >
          SALES & MULTI SERVICES
        </span>
      </div>
    </Link>
  );
}
