import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LPG Copper Gas Pipeline — Residential & Commercial Installation | Sambhaji Nagar",
  description:
    "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, hostels, laboratories, and industrial kitchens in Chh. Sambhaji Nagar, Maharashtra, and across India. Leak-proof copper piping with individual gas meters and safety shutoff valves.",
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
    "Maharashtra LPG Copper Pipeline",
    "Marathwada Gas Pipeline Installer",
  ],
  alternates: {
    canonical: "/lpg",
  },
  openGraph: {
    title: "LPG Copper Gas Pipeline — Residential & Commercial Installation | Sambhaji Nagar",
    description:
      "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, labs, and industrial kitchens in Chh. Sambhaji Nagar, Maharashtra & across India.",
    url: "https://oceanmgps.in/lpg",
    siteName: "Ocean MGPS",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg",
        width: 1200,
        height: 800,
        alt: "Commercial LPG Cylinder Manifold & Copper Pipeline Installation by Ocean MGPS",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LPG Copper Gas Pipeline — Residential & Commercial Installation",
    description:
      "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, labs, and industrial kitchens in Sambhaji Nagar & across India.",
    images: ["https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const lpgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://oceanmgps.in/lpg#service",
      name: "LPG Copper Gas Pipeline Installation",
      serviceType: "LPG Gas Pipeline Installation",
      description:
        "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, hostels, laboratories, and industrial kitchens across India. Leak-proof copper piping with individual gas meters and safety shutoff valves.",
      provider: {
        "@type": "MedicalBusiness",
        name: "Ocean MGPS Sales & Multi Services",
        url: "https://oceanmgps.in",
        telephone: ["+918698648386", "+917775904214", "+918007515182"],
        image: "https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg",
      },
      areaServed: [
        { "@type": "City", name: "Chhatrapati Sambhaji Nagar" },
        { "@type": "AdministrativeArea", name: "Maharashtra" },
        { "@type": "Country", name: "India" },
      ],
      image: "https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg",
    },
    {
      "@type": "WebPage",
      "@id": "https://oceanmgps.in/lpg#webpage",
      url: "https://oceanmgps.in/lpg",
      name: "LPG Copper Gas Pipeline — Residential & Commercial Installation | Sambhaji Nagar",
      description:
        "Professional LPG copper gas pipeline installation for apartments, hotels, restaurants, labs, and industrial kitchens in Chh. Sambhaji Nagar, Maharashtra & across India.",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg",
        contentUrl: "https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg",
        caption: "Real Commercial LPG Cylinder Manifold & Gas Pipeline Installation by Ocean MGPS",
      },
      image: "https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg",
    },
  ],
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
