import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ — Medical Gas Pipeline System Questions Answered | Sambhaji Nagar",
  description:
    "Frequently asked questions about Medical Gas Pipeline Systems (MGPS) in Chh. Sambhaji Nagar, Maharashtra, and India: installation timelines, IS 7484 compliance, copper pipeline specifications, manifold maintenance, gas alarm testing, modular OT requirements, and pricing.",
  keywords: [
    "MGPS FAQ",
    "Medical Gas Pipeline Questions",
    "MGPS Installation Time",
    "IS 7484 Compliance FAQ",
    "Copper Pipeline Specifications",
    "Manifold Maintenance FAQ",
    "Gas Alarm Testing",
    "Modular OT FAQ",
    "Hospital Gas Pipeline Cost",
    "MGPS Pricing India",
    "Ocean MGPS FAQ",
    "Chh. Sambhaji Nagar MGPS FAQ",
    "Chhatrapati Sambhaji Nagar Medical Gas",
    "Maharashtra MGPS Guidelines",
    "India MGPS Standards",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ — Medical Gas Pipeline System Questions Answered | Sambhaji Nagar",
    description:
      "Expert answers to common questions about MGPS installation, IS 7484 compliance, copper pipeline specs, maintenance schedules, and pricing in Chh. Sambhaji Nagar, Maharashtra & across India.",
    url: "https://oceanmgps.in/faq",
  },
};

// FAQ Page JSON-LD for Google Rich Results
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://oceanmgps.in/faq" },
  ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

