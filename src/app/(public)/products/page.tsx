// ============================================
// Products Page — Ultra Premium Grid & Modal
// ============================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Filter, Eye, Check, ArrowRight, X } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import ProductModal, { ProductItem } from "@/components/ui/ProductModal";
import { useFirestore } from "@/hooks/useFirestore";
import { Product } from "@/types";

const staticProducts: ProductItem[] = [
  { name: "3-Channel ECG Machine", category: "ICU & Diagnostic Equipment", image: "/images/products/gas-alarm-system.png" },
  { name: "12-Channel ECG Machine with Interpretation", category: "ICU & Diagnostic Equipment", image: "/images/products/gas-alarm-system.png" },
  { name: "Multi-Para Patient Monitor (5-Para / 7-Para)", category: "ICU & Diagnostic Equipment", image: "/images/products/gas-alarm-system.png" },
  { name: "Volumetric Infusion Pump", category: "ICU & Diagnostic Equipment", image: "/images/products/vacuum-regulator.png" },
  { name: "High-Precision Micro Syringe Pump", category: "ICU & Diagnostic Equipment", image: "/images/products/vacuum-regulator.png" },
  { name: "Advanced ICU Ventilator", category: "ICU & Diagnostic Equipment", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Infant Radiant Warmer", category: "ICU & Diagnostic Equipment", image: "/images/products/bed-head-panel.png" },
  { name: "Baby Incubator & Phototherapy Unit", category: "ICU & Diagnostic Equipment", image: "/images/products/bed-head-panel.png" },
  { name: "Biphasic Defibrillator with AED", category: "ICU & Diagnostic Equipment", image: "/images/products/gas-alarm-system.png" },
  { name: "Oxygen BPC Flow Meter", category: "Flow Meters & Regulators", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Oxygen Pressure Regulator", category: "Flow Meters & Regulators", image: "/images/products/oxygen-flow-meter.png" },
  { name: "Vacuum Regulator with Jar", category: "Vacuum Systems", image: "/images/products/vacuum-regulator.png" },
  { name: "Medical Gas Outlet Point", category: "Medical Gas Outlets", image: "/images/products/medical-gas-outlet.png" },
  { name: "Self Sealing Valve", category: "Valves & Safety", image: "/images/products/medical-gas-outlet.png" },
  { name: "Medical Grade Copper Pipes & Fittings", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Copper Tail Pipe", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Flexible Tail Pipe", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "S Bracket & Pipeline Supports", category: "Copper Fittings & Pipes", image: "/images/products/copper-pipe-fittings.png" },
  { name: "Medical Gas Manifold System", category: "Manifold Systems", image: "/images/products/manifold-system.png" },
  { name: "NRV Manifold", category: "Manifold Systems", image: "/images/products/manifold-system.png" },
  { name: "Conax Valve", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Oxygen Isolation Valve", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Zone Valve Box Assembly", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Medical Valve Box", category: "Valves & Safety", image: "/images/products/zone-valve.png" },
  { name: "Digital Gas Alarm System", category: "Alarm Systems", image: "/images/products/gas-alarm-system.png" },
  { name: "Semi-Automatic Control Panel", category: "Alarm Systems", image: "/images/products/gas-alarm-system.png" },
  { name: "Automatic Digital Control Panel", category: "Alarm Systems", image: "/images/products/gas-alarm-system.png" },
  { name: "Vacuum Suction Jar", category: "Vacuum Systems", image: "/images/products/vacuum-regulator.png" },
  { name: "Vacuum Suction Trolley", category: "Vacuum Systems", image: "/images/products/vacuum-regulator.png" },
  { name: "Medical Air Compressor", category: "Vacuum Systems", image: "/images/products/manifold-system.png" },
  { name: "Bed Head Panel Unit", category: "Bed Head Panels", image: "/images/products/bed-head-panel.png" },
  { name: "Modular Operation Theater", category: "OT Equipment", image: "/images/products/modular-ot.png" },
  { name: "OT Surgical Light", category: "OT Equipment", image: "/images/products/modular-ot.png" },
  { name: "Medical Gas Pendant", category: "OT Equipment", image: "/images/products/modular-ot.png" },
];

export default function ProductsPage() {
  const { data: dbProducts } = useFirestore<Product>("products");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Map live firestore products to ProductItem shape
  const liveProductItems: ProductItem[] = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    image: p.images && p.images.length > 0 ? p.images[0] : "",
    description: p.description,
    specifications: p.specifications,
  }));

  const allProductsList = liveProductItems;

  const filteredProducts = allProductsList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Hero Header */}
      <section className="section pb-4 sm:pb-6" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Medical Equipments in <span className="text-gradient">Sambhaji Nagar</span>
            </h1>
            <p className="text-base sm:text-lg mb-6 leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Complete range of hospital hardware, ICU patient monitors, ECG machines, ventilators, bed head panels, manifold systems, and certified medical equipments in Chh. Sambhaji Nagar (Aurangabad), Maharashtra & pan-India.
            </p>

            {/* Search Bar Wrapper */}
            <div className="w-full flex flex-col items-center justify-center mb-4">
              <div className="relative w-full max-w-xl" style={{ margin: "0 auto" }}>
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: "var(--color-primary)" }}
                />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-3 sm:py-3.5 text-sm sm:text-base font-medium rounded-full bg-white border border-[var(--color-border)] shadow-md outline-none transition-all focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
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

            {/* Search Results Count Pill */}
            {search && (
              <p className="text-xs font-semibold text-[var(--color-primary)] mb-2">
                Showing {filteredProducts.length} matching result{filteredProducts.length !== 1 ? "s" : ""} for &quot;{search}&quot;
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid Section */}
      <section className="section pt-4 pb-24 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          {/* Category Filter Pills — Unboxed */}
          <div className="flex overflow-x-auto pb-4 gap-2 mb-8 justify-start sm:justify-center items-center pt-2 scrollbar-none">
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              {PRODUCT_CATEGORIES.map((cat) => {
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

          {/* Product Grid — Open Flat Layout */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id || `${product.name}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Standalone Image Container — Borderless */}
                      <div
                        className="w-full aspect-square rounded-2xl flex items-center justify-center mb-3 overflow-hidden transition-all duration-300 group-hover:scale-[1.02] relative p-3 bg-slate-100/70"
                      >
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain rounded-xl"
                          />
                        ) : (
                          <Package size={36} style={{ color: "var(--color-primary)" }} className="opacity-40" />
                        )}

                        {/* Stock Pill Badge */}
                        <div className="absolute top-2 left-2 bg-emerald-500/90 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs flex items-center gap-0.5">
                          <Check size={9} /> IN STOCK
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <span className="bg-white text-[var(--color-primary-dark)] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <Eye size={14} /> Quick View
                          </span>
                        </div>
                      </div>

                      {/* Category Pill */}
                      <span
                        className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] opacity-80 inline-block mb-1"
                      >
                        {product.category}
                      </span>

                      {/* Title */}
                      <h4
                        className="text-xs sm:text-sm font-bold leading-snug mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 text-slate-900"
                        style={{
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {product.name}
                      </h4>
                    </div>

                    {/* Action Link — Borderless */}
                    <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] group-hover:gap-2.5 transition-all">
                      <span>View Specs</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-[var(--color-border)]">
              <Package size={48} className="mx-auto mb-4 opacity-30" style={{ color: "var(--color-text-muted)" }} />
              <p className="text-lg font-medium" style={{ color: "var(--color-text-secondary)" }}>
                No products found
              </p>
              <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                Try a different search term or category filter
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Product Quick View Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
