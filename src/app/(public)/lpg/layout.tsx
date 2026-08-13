import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG Copper Gas Pipeline — Residential & Commercial Installation | Sambhaji Nagar & Jalna",
  description:
    "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, hostels, laboratories, and industrial kitchens in Chh. Sambhaji Nagar, Jalna, Maharashtra, and across India. Leak-proof copper piping with individual gas meters and safety shutoff valves.",
  keywords: [
    "LPG Gas Pipeline",
    "LPG Copper Piping",
    "Residential Gas Pipeline",
    "Commercial LPG Pipeline",
    "Apartment Gas Piping",
    "Hotel Gas Pipeline",
    "Restaurant Gas Pipeline",
    "Lab Gas Pipeline",
    "Bunsen Burner Pipeline",
    "Gas Leak Detector",
    "Individual Gas Meter",
    "Safety Shutoff Valve",
    "IS 5765 Compliance",
    "Copper Gas Piping India",
    "Ocean MGPS LPG",
    "Chh. Sambhaji Nagar LPG Pipeline",
    "Chhatrapati Sambhaji Nagar Gas Piping",
    "Jalna LPG Pipeline",
    "Jalna Commercial Gas Piping",
    "Maharashtra LPG Copper Pipeline",
    "Marathwada Gas Pipeline Installer",
  ],
  alternates: {
    canonical: "/lpg",
  },
  openGraph: {
    title: "LPG Copper Gas Pipeline — Residential & Commercial Installation | Sambhaji Nagar & Jalna",
    description:
      "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, labs, and industrial kitchens in Chh. Sambhaji Nagar, Jalna, Maharashtra & across India.",
    url: "https://oceanmgps.in/lpg",
    images: ["/images/products/copper-pipe-fittings.png"],
  },
};

const lpgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "LPG Copper Gas Pipeline Installation",
  description:
    "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, hostels, laboratories, and industrial kitchens across India.",
  provider: {
    "@type": "MedicalBusiness",
    name: "Ocean MGPS Sales & Multi Services",
    url: "https://oceanmgps.in",
  },
  serviceType: "LPG Gas Pipeline Installation",
  areaServed: { "@type": "Country", name: "India" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "LPG Pipeline", item: "https://oceanmgps.in/lpg" },
  ],
};

export default function LpgLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lpgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
