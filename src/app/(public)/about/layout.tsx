import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ocean MGPS — Certified Medical Gas Pipeline Engineers | Sambhaji Nagar & Jalna",
  description:
    "Ocean MGPS Sales & Multi Services — Headquartered in Chh. Sambhaji Nagar, serving Jalna, Maharashtra, and pan-India. 150+ completed hospital projects, 12+ years experience. Led by MD Ganesh Khandale and Biomedical Engineer Aadesh Khandale.",
  keywords: [
    "About Ocean MGPS",
    "Ocean MGPS Sales Multi Services",
    "Ganesh Khandale",
    "Aadesh Khandale",
    "Biomedical Engineer",
    "MGPS Installer India",
    "Certified Hospital Equipment Supplier",
    "Medical Gas Pipeline Company",
    "Chh. Sambhaji Nagar",
    "Chhatrapati Sambhaji Nagar MGPS",
    "Jalna MGPS Installer",
    "Jalna Hospital Gas Pipeline",
    "Aurangabad MGPS",
    "Maharashtra Hospital Equipment Supplier",
    "Marathwada Medical Gas Engineers",
    "India Hospital Infrastructure Company",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ocean MGPS — Certified Medical Gas Pipeline Engineers | Sambhaji Nagar & Jalna",
    description:
      "150+ projects completed. 12+ years experience. Certified MGPS installers serving hospitals in Chh. Sambhaji Nagar, Jalna, Maharashtra & across India.",
    url: "https://oceanmgps.in/about",
    images: ["/images/projects/mgps-installation.png"],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Ocean MGPS Sales & Multi Services",
  description:
    "150+ projects completed. 12+ years experience. Certified MGPS installers serving hospitals across India.",
  mainEntity: {
    "@type": "Organization",
    name: "Ocean MGPS Sales & Multi Services",
    founder: [
      { "@type": "Person", name: "Ganesh Khandale", jobTitle: "Managing Director" },
      { "@type": "Person", name: "Aadesh Khandale", jobTitle: "Biomedical Engineer" },
    ],
    foundingLocation: {
      "@type": "Place",
      name: "Chh. Sambhaji Nagar, Maharashtra, India",
    },
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 10, maxValue: 50 },
    slogan: "Your Trusted Partner in Medical Gas Pipeline Systems",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://oceanmgps.in/about" },
  ],
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
