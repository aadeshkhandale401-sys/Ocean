// ============================================
// Product Quick View Modal Component
// ============================================

"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, ShieldCheck, Package, PhoneCall } from "lucide-react";

export interface ProductItem {
  id?: string;
  name: string;
  category: string;
  image?: string;
  description?: string;
  specifications?: string;
  specs?: { label: string; value: string }[];
  compliance?: string[];
  inStock?: boolean;
}

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

// Fallback technical specs generator based on product category
function getProductDetails(product: ProductItem) {
  const defaultDesc =
    product.description ||
    `High-precision hospital-grade ${product.name}. Designed and manufactured in full compliance with Indian Standards (IS 7484) for safe, reliable medical gas pipeline operation in ICUs, OTs, and general wards.`;

  const categorySpecs: Record<string, { label: string; value: string }[]> = {
    "ICU & Diagnostic Equipment": [
      { label: "Device Types", value: "3/12 Channel ECG, Multi-para Monitor, Infusion/Syringe Pump, ICU Ventilator, Baby Warmer" },
      { label: "Display / Interface", value: "High-Resolution Color TFT Touchscreen / Digital LED Display" },
      { label: "Power Supply", value: "220V AC 50Hz with Integrated Lithium Battery Backup" },
      { label: "Monitoring Parameters", value: "ECG, SpO2, NIBP, Respiration, Dual Temp, IBP, EtCO2 (Optional)" },
      { label: "Compliance & Safety", value: "ISO 13485 / CE Certified Medical Grade Standards" },
    ],
    "Flow Meters & Regulators": [
      { label: "Flow Rate", value: "0 - 15 LPM / 0 - 70 LPM" },
      { label: "Inlet Pressure", value: "4.2 Bar (60 PSI)" },
      { label: "Body Material", value: "Chrome Plated Solid Brass" },
      { label: "Humidifier Jar", value: "Autoclavable Polycarbonate (250ml)" },
      { label: "Gas Type", value: "Medical Oxygen (O2) / Air" },
    ],
    "Medical Gas Outlets": [
      { label: "Standard", value: "BS 5682 / DIN / AFNOR compliant" },
      { label: "Operating Pressure", value: "3.5 Bar to 5.0 Bar" },
      { label: "Color Coding", value: "International ISO Standard Color Coded" },
      { label: "Mechanism", value: "Quick Connect / Self-Sealing Pin Index" },
      { label: "Installation", value: "Wall Mounted / Bed Head Panel Mounted" },
    ],
    "Manifold Systems": [
      { label: "Configurations", value: "2x1, 4x4, 6x6, 10x10 Cylinder Banks" },
      { label: "Control System", value: "Manual / Semi-Auto / Fully Automatic Changeover" },
      { label: "Operating Pressure", value: "150 Bar Cylinder Inlet to 4.2 Bar Line" },
      { label: "Safety Relief", value: "Dual Line Safety Pressure Relief Valves" },
      { label: "Alarm Integration", value: "High / Low Pressure Audio-Visual Contacts" },
    ],
    "Copper Fittings & Pipes": [
      { label: "Purity", value: "99.9% Deoxidized Medical Grade Copper (Cu-DHP)" },
      { label: "Standard", value: "BS EN 13348 / IS 1545" },
      { label: "Cleaning", value: "Degreased for Oxygen Service (< 0.02g/m² total residue)" },
      { label: "Joint Type", value: "Brazed with Silver Alloy Filler Rods" },
      { label: "Pressure Rating", value: "Working Pressure up to 34 Bar" },
    ],
    "Valves & Safety": [
      { label: "Type", value: "Full Bore Ball Valve / Zone Valve Box (ZVB)" },
      { label: "Inlet/Outlet", value: "15mm, 22mm, 28mm, 42mm Copper Stub Ends" },
      { label: "Pressure Test", value: "100% Factory Hydrostatic & Leak Tested" },
      { label: "Locking", value: "Padlockable / Emergency Break Glass Window" },
    ],
    "Alarm Systems": [
      { label: "Display", value: "Digital LED / Touchscreen Area Pressure Monitor" },
      { label: "Channels", value: "1 to 6 Gas Monitoring Channels" },
      { label: "Signals", value: "High / Low Line Pressure Audible & Visual Flash" },
      { label: "BMS Output", value: "RS485 / Modbus / Potential-Free Contacts" },
      { label: "Backup Power", value: "Integrated Battery Backup (up to 4 hours)" },
    ],
    "OT Equipment": [
      { label: "Application", value: "Modular Operation Theater & Critical ICU" },
      { label: "Mounting", value: "Ceiling Pendant / Wall Panel Mounted" },
      { label: "Capacity", value: "Multiple Gas Outlets + Electrical Sockets" },
      { label: "Filtration", value: "Class 100 HEPA Laminar Airflow" },
    ],
    "Bed Head Panels": [
      { label: "Material", value: "Extruded Anodized Aluminum Alloy" },
      { label: "Length Options", value: "1.2m, 1.5m, 1.8m per bed capacity" },
      { label: "Channels", value: "Segregated Low Voltage, High Voltage & Gas Compartments" },
      { label: "Outlets", value: "Up to 4 Gas Outlets + 6 Switch Sockets + Nurse Call" },
    ],
    "Vacuum Systems": [
      { label: "Suction Jar", value: "1000ml / 2000ml Autoclavable Jar" },
      { label: "Regulator Range", value: "0 - 760 mmHg Vacuum Range" },
      { label: "Safety Trap", value: "Mechanical Overflow Safety Valve" },
    ],
    "Pressure Gauges": [
      { label: "Dial Size", value: '50mm / 63mm / 100mm (2" / 4")' },
      { label: "Accuracy", value: "Class 1.6 Full Scale Accuracy" },
      { label: "Range", value: "0 - 10 Bar (Line) / 0 - 250 Bar (High Pressure)" },
    ],
  };

  const specs = product.specs || categorySpecs[product.category] || categorySpecs["Medical Gas Outlets"];
  const compliance = product.compliance || ["IS 7484 Compliant", "Hospital Grade Safety", "Degreased for Oxygen Service"];

  return { description: defaultDesc, specs, compliance };
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const { description, specs, compliance } = getProductDetails(product);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917775904214";
  const whatsappMessage = encodeURIComponent(
    `Hello Ocean MGPS! I'd like to enquire about the product: ${product.name} (${product.category}). Please share pricing and availability.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col"
          style={{ border: "1px solid var(--color-border)" }}
        >
          {/* Header Accent Bar */}
          <div
            className="h-2 w-full flex-shrink-0"
            style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-accent))" }}
          />

          {/* Scrollable Content */}
          <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-5">
            {/* Header & Close Button Row */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--color-border-light)]">
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                  }}
                >
                  {product.category}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  In Stock / Ready Supply
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Product Title & Image Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-5 bg-[var(--color-primary-light)] rounded-xl aspect-square overflow-hidden flex items-center justify-center border border-[var(--color-border-light)] p-2">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Package size={48} style={{ color: "var(--color-primary)" }} className="opacity-50" />
                )}
              </div>

              <div className="sm:col-span-7 flex flex-col justify-center">
                <h3
                  className="text-lg sm:text-2xl font-bold leading-tight mb-2"
                  style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
                >
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                  {description}
                </p>

                {/* Compliance Badges */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {compliance.map((c, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-100"
                    >
                      <ShieldCheck size={12} className="text-blue-600" />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs Table */}
            <div
              className="p-4 sm:p-5 rounded-xl space-y-2"
              style={{
                background: "var(--color-bg-tertiary)",
                border: "1px solid var(--color-border-light)",
              }}
            >
              <h4
                className="text-xs font-bold uppercase tracking-wider mb-3"
                style={{ color: "var(--color-primary-dark)", fontFamily: "var(--font-display)" }}
              >
                Technical Specifications & Standards
              </h4>
              <div className="divide-y divide-[var(--color-border-light)]">
                {specs.map((spec, i) => (
                  <div key={i} className="py-1.5 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-slate-500">{spec.label}</span>
                    <span className="font-bold text-slate-800 text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                onClick={onClose}
                className="btn btn-primary btn-lg w-full justify-center text-sm"
              >
                <span>Enquire for {product.name.split(" ")[0]}</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg w-full sm:w-auto text-white flex items-center justify-center gap-2 font-semibold text-sm"
                style={{
                  background: "#25D366",
                  borderColor: "#25D366",
                }}
              >
                <PhoneCall size={16} />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
