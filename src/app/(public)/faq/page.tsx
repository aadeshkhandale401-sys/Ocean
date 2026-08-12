// ============================================
// FAQ Page — Spacious, Non-Overlapping Layout
// ============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Search,
  X,
  Phone,
} from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";

// Categorize FAQs for rich filtering
const faqCategories = [
  "All",
  "Installation & Timeline",
  "Products & Hardware",
  "Maintenance & Warranty",
  "Safety & Certification",
];

const categoryMap: Record<number, string> = {
  0: "Installation & Timeline",
  1: "Products & Hardware",
  2: "Installation & Timeline",
  3: "Installation & Timeline",
  4: "Maintenance & Warranty",
  5: "Products & Hardware",
  6: "Maintenance & Warranty",
  7: "Safety & Certification",
  8: "Installation & Timeline",
  9: "Products & Hardware",
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = FAQ_ITEMS.map((item, index) => ({
    ...item,
    originalIndex: index,
    category: categoryMap[index] || "General",
  })).filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Header */}
      <section className="section pb-6 sm:pb-8" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-semibold shadow-xs"
              style={{
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
              }}
            >
              <HelpCircle size={14} /> Knowledge & Help Center
            </span>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: "var(--color-text-secondary)" }}>
              Clear answers regarding Medical Gas Pipeline Systems (MGPS), equipment supply, IS 7484 safety compliance, and installation timelines.
            </p>

            {/* Search Bar Wrapper */}
            <div className="w-full flex flex-col items-center justify-center mb-2">
              <div className="relative w-full max-w-xl" style={{ margin: "0 auto" }}>
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-primary)" }}
                />
                <input
                  type="text"
                  placeholder="Search FAQ questions..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-3.5 text-sm sm:text-base font-medium rounded-full bg-white border border-[var(--color-border)] shadow-md outline-none transition-all focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  style={{
                    paddingLeft: "3rem",
                    paddingRight: search ? "2.75rem" : "1.25rem",
                    color: "var(--color-text-primary)",
                  }}
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Search Match Counter */}
            {search && (
              <p className="text-xs font-semibold text-[var(--color-primary)] mt-2">
                Showing {filteredFaqs.length} matching question{filteredFaqs.length !== 1 ? "s" : ""} for &quot;{search}&quot;
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Category Filter + Clean Accordion List */}
      <section className="section pt-6 pb-16 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-3xl">
          {/* Category Filter Pills — Unboxed */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-8 sm:mb-10 justify-start sm:justify-center items-center pt-2 scrollbar-none">
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {faqCategories.map((cat) => {
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

          {/* Open Unboxed Accordion List */}
          {filteredFaqs.length > 0 ? (
            <div className="flex flex-col">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === faq.originalIndex;

                return (
                  <motion.div
                    key={faq.originalIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * idx }}
                    className="border-b border-slate-200/80 last:border-b-0 group"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : faq.originalIndex)}
                      className="w-full flex items-center justify-between py-5 text-left cursor-pointer transition-colors"
                    >
                      <h3
                        className="text-base sm:text-lg font-bold pr-4 leading-snug transition-colors"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: isOpen ? "var(--color-primary)" : "#0F172A",
                        }}
                      >
                        {faq.question}
                      </h3>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 flex-shrink-0"
                      >
                        <ChevronDown size={18} className="text-[var(--color-primary)]" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                          <div className="pb-6 pt-1">
                            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle size={44} className="mx-auto mb-3 opacity-30 text-[var(--color-primary)]" />
              <p className="text-base sm:text-lg font-medium text-[var(--color-text-secondary)]">
                No matching questions found
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Try searching for different keywords like &quot;Oxygen&quot;, &quot;Manifold&quot;, or &quot;Warranty&quot;
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Separate Contact Support Section — Unboxed */}
      <section className="section py-14 sm:py-18" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-6 sm:py-8 text-center"
          >
            <h3
              className="text-2xl sm:text-3xl font-bold mb-3"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Still Have Questions?
            </h3>
            <p className="text-sm sm:text-base mb-8 text-slate-500 max-w-lg mx-auto leading-relaxed">
              Our engineering team in Ch. Sambhaji Nagar is ready to assist with your hospital gas pipeline questions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="tel:8698648386"
                className="btn btn-outline btn-lg w-full sm:w-auto text-sm justify-center rounded-xl py-3 px-6"
              >
                <Phone size={16} /> Call +91 8698648386
              </a>
              <Link href="/contact" className="btn btn-primary btn-lg w-full sm:w-auto text-sm justify-center rounded-xl py-3 px-6 font-bold shadow-xs">
                Send Enquiry <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
