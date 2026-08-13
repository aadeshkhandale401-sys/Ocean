import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Gas Pipeline System (MGPS) — Complete Guide & Installation | Sambhaji Nagar",
  description:
    "Learn about Medical Gas Pipeline Systems (MGPS): centralized oxygen, nitrous oxide, medical air, and vacuum supply for hospitals in Chh. Sambhaji Nagar, Maharashtra, and across India. IS 7484 compliant copper pipeline networks with automatic manifold banks, zone valve boxes, and gas alarm systems.",
  keywords: [
    "Medical Gas Pipeline System",
    "MGPS",
    "Hospital Gas Pipeline",
    "Centralized Oxygen Supply",
    "Medical Air Pipeline",
    "Nitrous Oxide Pipeline",
    "Vacuum Pipeline System",
    "Automatic Manifold Bank",
    "Zone Valve Box",
    "Gas Alarm System",
    "IS 7484 Standard",
    "HTM 02-01",
    "Hospital Copper Piping",
    "ICU Gas Outlet",
    "Medical Gas Outlet Points",
    "MGPS Installation India",
    "Ocean MGPS",
    "Chh. Sambhaji Nagar MGPS",
    "Chhatrapati Sambhaji Nagar Gas Pipeline",
    "Maharashtra Hospital Gas Pipeline",
    "Marathwada MGPS Turnkey Provider",
    "India Medical Engineering Contractor",
  ],
  alternates: {
    canonical: "/mgps",
  },
  openGraph: {
    title: "MGPS — Medical Gas Pipeline System Guide & Installation | Sambhaji Nagar",
    description:
      "Complete guide to Medical Gas Pipeline Systems: centralized oxygen, vacuum, and medical air supply with IS 7484 compliant copper piping. Turnkey installation in Chh. Sambhaji Nagar, Maharashtra & across India.",
    url: "https://oceanmgps.in/mgps",
    images: ["/images/projects/mgps-installation.png"],
  },
};

const mgpsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Medical Gas Pipeline System (MGPS) — Complete Guide & Installation",
  description:
    "Learn about centralized oxygen, nitrous oxide, medical air, and vacuum supply for hospitals through IS 7484 compliant copper pipeline networks.",
  author: {
    "@type": "Organization",
    name: "Ocean MGPS Sales & Multi Services",
  },
  publisher: {
    "@type": "Organization",
    name: "Ocean MGPS Sales & Multi Services",
    url: "https://oceanmgps.in",
  },
  mainEntityOfPage: "https://oceanmgps.in/mgps",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "MGPS", item: "https://oceanmgps.in/mgps" },
  ],
};

export default function MgpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mgpsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
