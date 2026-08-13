import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries We Serve — Hospitals, Labs, Hotels & Manufacturing | Sambhaji Nagar & Jalna",
  description:
    "Ocean MGPS serves multi-specialty hospitals, ICUs, research laboratories, dental clinics, veterinary hospitals, hotels, commercial kitchens, educational institutions, and manufacturing plants in Chh. Sambhaji Nagar, Jalna, Maharashtra, and across India.",
  keywords: [
    "Hospital Gas Pipeline",
    "ICU Gas Pipeline System",
    "Research Lab Gas Pipeline",
    "Dental Clinic Gas Supply",
    "Veterinary Hospital MGPS",
    "Hotel LPG Pipeline",
    "Commercial Kitchen Gas Piping",
    "Manufacturing Plant Gas Supply",
    "Educational Institute Lab Gas",
    "Industries Served by MGPS",
    "Ocean MGPS Industries",
    "Chh. Sambhaji Nagar Industries",
    "Chhatrapati Sambhaji Nagar Hospitals",
    "Jalna Hospitals MGPS",
    "Jalna Industrial LPG Piping",
    "Maharashtra Hospital Sector Supply",
    "India Medical Gas Infrastructure",
  ],
  alternates: {
    canonical: "/industries",
  },
  openGraph: {
    title: "Industries We Serve — Hospitals, Labs, Hotels & Manufacturing | Sambhaji Nagar & Jalna",
    description:
      "Certified medical gas pipeline systems and LPG piping for hospitals, ICUs, labs, dental clinics, hotels, and manufacturing plants in Chh. Sambhaji Nagar, Jalna, Maharashtra & across India.",
    url: "https://oceanmgps.in/industries",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "Industries", item: "https://oceanmgps.in/industries" },
  ],
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
