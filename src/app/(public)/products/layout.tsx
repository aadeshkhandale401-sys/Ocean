import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Equipments in Sambhaji Nagar — Ocean MGPS Products & Hospital Hardware",
  description:
    "Leading supplier of Medical Equipments in Chh. Sambhaji Nagar (Aurangabad), Maharashtra: ICU patient monitors, 12-channel ECG machines, ICU ventilators, syringe pumps, bed head panels, oxygen flow meters, manifold systems, and hospital gas pipeline hardware.",
  keywords: [
    "Medical Equipments in Sambhaji Nagar",
    "Medical Equipment Supplier Sambhaji Nagar",
    "Hospital Equipment in Sambhaji Nagar",
    "ICU Equipment Supplier Sambhaji Nagar",
    "Medical Equipment Store Sambhaji Nagar",
    "Medical Gas Pipeline Products Sambhaji Nagar",
    "ECG Machine Sambhaji Nagar",
    "Patient Monitor Sambhaji Nagar",
    "ICU Ventilator Sambhaji Nagar",
    "Syringe Pump Sambhaji Nagar",
    "Bed Head Panel Sambhaji Nagar",
    "Oxygen Manifold System Sambhaji Nagar",
    "Gas Alarm Panel Sambhaji Nagar",
    "Copper Pipe Fittings Sambhaji Nagar",
    "BPC Flow Meter Sambhaji Nagar",
    "Vacuum Regulator Sambhaji Nagar",
    "Modular Operation Theater Sambhaji Nagar",
    "Hospital Gas Outlet Sambhaji Nagar",
    "Zone Valve Box Sambhaji Nagar",
    "Chh. Sambhaji Nagar Medical Supplies",
    "Chhatrapati Sambhaji Nagar Medical Equipment",
    "Aurangabad Medical Equipment Supplier",
    "Maharashtra Hospital Hardware Supplier",
    "Ocean MGPS Products",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Medical Equipments in Sambhaji Nagar — #1 Hospital Hardware Supplier",
    description:
      "Certified medical equipments supplier in Chh. Sambhaji Nagar (Aurangabad): ICU monitors, ECG machines, ventilators, bed head panels, oxygen manifolds, and gas pipeline equipment with fast local delivery.",
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

