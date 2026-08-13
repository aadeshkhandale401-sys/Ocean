import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Sitemap — Ocean MGPS Website Directory",
  description:
    "Complete website directory and HTML sitemap for Ocean MGPS Sales & Multi Services. Access all pages, medical gas products, MGPS installation services, projects, and FAQs.",
  keywords: [
    "Ocean MGPS Sitemap",
    "Medical Gas Pipeline Site Directory",
    "MGPS Website Map",
    "Hospital Equipment Sitemap",
    "Ocean MGPS Pages",
  ],
  alternates: {
    canonical: "/sitemap",
  },
  openGraph: {
    title: "HTML Sitemap — Ocean MGPS Website Directory",
    description:
      "Complete site map and link directory for Ocean MGPS products, services, guides, and regional hubs in Chh. Sambhaji Nagar, Maharashtra & India.",
    url: "https://oceanmgps.in/sitemap",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "Sitemap", item: "https://oceanmgps.in/sitemap" },
  ],
};

export default function SitemapLayout({ children }: { children: React.ReactNode }) {
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
