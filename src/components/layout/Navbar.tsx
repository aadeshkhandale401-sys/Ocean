// ============================================
// Navbar — Spacious, Modern & High-End Header
// ============================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-1"
          : "bg-white py-1.5"
      }`}
      style={{ borderBottom: "1px solid var(--color-border-light)" }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation — Spacious Pill Styling */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 xl:px-3.5 py-1.5 text-xs xl:text-sm font-semibold rounded-full no-underline transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[var(--color-primary)] font-bold bg-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex btn btn-primary btn-sm rounded-full px-4 py-2 font-bold shadow-xs hover:shadow-md transition-all"
            >
              <Phone size={14} />
              Get Quote
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700"
              aria-label="Toggle menu"
              suppressHydrationWarning
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-y-auto max-h-[calc(100vh-72px)] bg-white border-t border-[var(--color-border-light)] shadow-lg"
          >
            <div className="container py-4 flex flex-col gap-1.5">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl text-sm font-semibold no-underline transition-colors ${
                        isActive
                          ? "bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <Link
                href="/contact"
                className="btn btn-primary w-full mt-3 justify-center text-sm font-bold py-3 rounded-xl"
              >
                <Phone size={16} />
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
