import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Showcase — MGPS Installations & Modular OT Setups | Sambhaji Nagar",
  description:
    "View Ocean MGPS completed projects: turnkey MGPS installations, modular operation theater setups, oxygen manifold systems, and LPG copper pipeline networks in Chh. Sambhaji Nagar, Maharashtra, and across India.",
  keywords: [
    "MGPS Project Gallery",
    "MGPS Installation Photos",
    "Hospital Pipeline Project",
    "Modular OT Project",
    "Medical Gas Pipeline Portfolio",
    "Oxygen Manifold Installation",
    "Completed MGPS Projects India",
    "Hospital Equipment Deployment",
    "Ocean MGPS Projects",
    "Chh. Sambhaji Nagar MGPS Projects",
    "Maharashtra Medical Gas Projects",
    "Marathwada MGPS Gallery",
  ],
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Project Showcase — MGPS Installations & Modular OT Setups | Sambhaji Nagar",
    description:
      "Explore 150+ completed medical gas pipeline installations, modular OTs, and hospital equipment projects in Chh. Sambhaji Nagar, Maharashtra & across India.",
    url: "https://oceanmgps.in/projects",
    images: ["/images/projects/mgps-installation.png"],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "Projects", item: "https://oceanmgps.in/projects" },
  ],
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
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
