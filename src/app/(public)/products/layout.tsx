import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MGPS Products — Medical Gas Pipeline Equipment & Hospital Supplies",
  description:
    "Browse 200+ certified medical gas pipeline products: bed head panels, manifold systems, gas alarm panels, copper pipe fittings, flow meters, vacuum regulators, modular OTs, and ICU equipment in Chh. Sambhaji Nagar, Jalna, Maharashtra, and across India. IS 7484 compliant.",
  keywords: [
    "Medical Gas Pipeline Products",
    "Bed Head Panel",
    "Oxygen Manifold System",
    "Gas Alarm Panel",
    "Copper Pipe Fittings",
    "Flow Meter",
    "Vacuum Regulator",
    "Modular Operation Theater",
    "ICU Equipment India",
    "Hospital Gas Outlet",
    "Zone Valve Box",
    "Medical Gas Accessories",
    "MGPS Equipment",
    "Ocean MGPS Products",
    "ECG Machine",
    "Patient Monitor",
    "Syringe Pump",
    "ICU Ventilator",
    "Infant Warmer",
    "OT Surgical Light",
    "Medical Gas Pendant",
    "Chh. Sambhaji Nagar",
    "Chhatrapati Sambhaji Nagar MGPS Products",
    "Jalna Hospital Equipment",
    "Jalna MGPS Products",
    "Maharashtra Hospital Gas Pipeline Products",
    "Medical Equipment Supplier Maharashtra",
    "India Hospital Hardware",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "MGPS Products — 200+ Medical Gas Pipeline Equipment | Sambhaji Nagar & Jalna",
    description:
      "Certified bed head panels, manifold banks, gas alarms, copper fittings, modular OTs, ICU monitors, ECG machines, and hospital equipment in Chh. Sambhaji Nagar, Jalna, Maharashtra & across India.",
    url: "https://oceanmgps.in/products",
    images: ["/images/products/bed-head-panel.png"],
  },
};

// Product catalog JSON-LD for Google Rich Results
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ocean MGPS Product Catalog",
  description:
    "Certified medical gas pipeline equipment, ICU devices, OT equipment, and hospital supplies",
  numberOfItems: 35,
  itemListElement: [
    {
      "@type": "Product",
      position: 1,
      name: "Bed Head Panel Unit",
      description:
        "Wall-mounted bed head panel with integrated medical gas outlets (O2, Air, Vacuum), electrical sockets, nurse call, and LED reading light for ICU and patient wards.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Bed Head Panels",
    },
    {
      "@type": "Product",
      position: 2,
      name: "Medical Gas Manifold System",
      description:
        "Automatic and semi-automatic changeover manifold bank for centralized cylinder-based oxygen, nitrous oxide, and medical air supply with digital alarm.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Manifold Systems",
    },
    {
      "@type": "Product",
      position: 3,
      name: "Digital Gas Alarm System",
      description:
        "Microprocessor-based medical gas alarm panel displaying real-time pipeline pressure for O2, N2O, Air, and Vacuum with audible alarms and nurse station display.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Alarm Systems",
    },
    {
      "@type": "Product",
      position: 4,
      name: "Medical Grade Copper Pipes & Fittings",
      description:
        "Degreased K-type medical grade copper tubing and fittings (IS 5765 / ASTM B280) for oxygen, medical air, and vacuum pipeline installations.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Copper Fittings & Pipes",
    },
    {
      "@type": "Product",
      position: 5,
      name: "Oxygen BPC Flow Meter",
      description:
        "BPC-type oxygen flow meter with humidifier bottle (0-15 LPM) for bedside oxygen therapy administration.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Flow Meters & Regulators",
    },
    {
      "@type": "Product",
      position: 6,
      name: "Zone Valve Box Assembly",
      description:
        "Zone isolation valve with lockable box for sectional gas supply control. Enables safe maintenance without shutting down entire hospital pipeline.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Valves & Safety",
    },
    {
      "@type": "Product",
      position: 7,
      name: "Medical Gas Outlet Point",
      description:
        "BS 5682 / DIN 13260 / AFNOR / Ohmeda quick-connect gas outlet for wall or ceiling mounting. Gas-specific color coding and pin-indexed safety.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Medical Gas Outlets",
    },
    {
      "@type": "Product",
      position: 8,
      name: "Vacuum Regulator with Jar",
      description:
        "Adjustable negative pressure vacuum regulator with autoclavable collection jar for surgical suction and wound drainage.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "Vacuum Systems",
    },
    {
      "@type": "Product",
      position: 9,
      name: "Modular Operation Theater",
      description:
        "Turnkey modular OT with anti-bacterial wall panels, HEPA laminar airflow, ceiling pendants, LED surgical lights, and integrated gas supply.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "OT Equipment",
    },
    {
      "@type": "Product",
      position: 10,
      name: "Multi-Para Patient Monitor",
      description:
        "5-parameter and 7-parameter bedside patient monitors for ICU and OT with ECG, SpO2, NIBP, Temperature, and Respiration monitoring.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "ICU & Diagnostic Equipment",
    },
    {
      "@type": "Product",
      position: 11,
      name: "Advanced ICU Ventilator",
      description:
        "Microprocessor-controlled invasive and non-invasive ICU ventilator with multiple ventilation modes and touchscreen display.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "ICU & Diagnostic Equipment",
    },
    {
      "@type": "Product",
      position: 12,
      name: "12-Channel ECG Machine with Interpretation",
      description:
        "12-lead ECG machine with auto-interpretation, thermal printing, and USB/WiFi connectivity for cardiac diagnostics.",
      brand: { "@type": "Brand", name: "Ocean MGPS" },
      category: "ICU & Diagnostic Equipment",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: "15000",
        highPrice: "450000",
        offerCount: "50",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "89",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "Products", item: "https://oceanmgps.in/products" },
  ],
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

