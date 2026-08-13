import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services — MGPS Installation, Modular OT & Pipeline Maintenance | Sambhaji Nagar & Jalna",
  description:
    "End-to-end medical gas pipeline installation, MGPS maintenance & safety certification, modular OT construction, LPG copper piping, hospital equipment supply, and 24/7 emergency technical support in Chh. Sambhaji Nagar, Jalna, Maharashtra, and across India.",
  keywords: [
    "MGPS Installation Service",
    "Medical Gas Pipeline Maintenance",
    "Modular OT Construction",
    "Hospital Pipeline Testing",
    "Gas Purity Certification",
    "LPG Copper Pipeline Installation",
    "Hospital Equipment Supply",
    "24/7 MGPS Service",
    "Pipeline Pressure Testing",
    "NABH Compliance Audit",
    "Manifold Overhaul",
    "Zone Valve Maintenance",
    "Ocean MGPS Services",
    "Chh. Sambhaji Nagar MGPS Service",
    "Chhatrapati Sambhaji Nagar Hospital Pipeline",
    "Jalna MGPS Installation",
    "Jalna Medical Gas Service",
    "Maharashtra MGPS Maintenance",
    "Marathwada Hospital Pipeline Services",
    "India MGPS Turnkey Services",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services — MGPS Installation, Modular OT & Maintenance | Sambhaji Nagar & Jalna",
    description:
      "Certified medical gas pipeline installation, modular OT setup, MGPS maintenance, pipeline testing, and 24/7 technical support for hospitals in Chh. Sambhaji Nagar, Jalna, Maharashtra & across India.",
    url: "https://oceanmgps.in/services",
    images: ["/images/projects/mgps-installation.png"],
  },
};

// Service JSON-LD for Google Rich Results
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ocean MGPS Services",
  description: "Complete medical gas pipeline services for hospitals across India",
  numberOfItems: 7,
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "MGPS Installation",
      description:
        "Full-scope Medical Gas Pipeline System design, procurement, pipeline routing, and commissioning. Serving hospitals from 10 to 500+ beds with turnkey precision.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
      },
      serviceType: "Medical Gas Pipeline Installation",
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "Service",
      position: 2,
      name: "LPG Copper Gas Pipeline Systems",
      description:
        "Safe, leakproof LPG copper gas pipeline installation for domestic kitchens, hotels, restaurants, and reticulated gas supply for residential societies.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
      },
      serviceType: "LPG Gas Pipeline Installation",
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "Service",
      position: 3,
      name: "Equipment Sales & ICU Devices",
      description:
        "Complete range of hospital gas supply hardware, ICU monitors, ECG machines, syringe pumps, ventilators, OT lights, and medical gas accessories.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
      },
      serviceType: "Hospital Equipment Supply",
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "Service",
      position: 4,
      name: "Modular Operation Theater Setup",
      description:
        "Design and installation of state-of-the-art modular operation theaters with integrated gas supply, pendants, shadowless lighting, and HEPA air filtration.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
      },
      serviceType: "Modular OT Construction",
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "Service",
      position: 5,
      name: "Repair, Servicing & Maintenance (AMC)",
      description:
        "24/7 emergency repair and Annual Maintenance Contracts for hospital gas pipelines, ICU monitors, ECG machines, ventilators, and infant warmers.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
      },
      serviceType: "Hospital Equipment Maintenance",
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "Service",
      position: 6,
      name: "Turnkey Hospital Projects",
      description:
        "End-to-end project management for new hospital builds requiring central medical gas pipeline infrastructure built into architectural plans.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
      },
      serviceType: "Turnkey Hospital Construction",
      areaServed: { "@type": "Country", name: "India" },
    },
    {
      "@type": "Service",
      position: 7,
      name: "Consultation & Technical Audit",
      description:
        "Expert IS 7484 compliance audits, BOQ cost estimation, pipeline health analysis, and safety protocol training for hospital administrators.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
      },
      serviceType: "Technical Consultation & Audit",
      areaServed: { "@type": "Country", name: "India" },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://oceanmgps.in/services" },
  ],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

