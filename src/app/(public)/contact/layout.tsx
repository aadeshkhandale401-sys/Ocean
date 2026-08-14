import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Ocean MGPS — Get Free MGPS Site Survey & BOQ Estimate | Sambhaji Nagar",
  description:
    "Contact Ocean MGPS Sales & Multi Services for free site surveys, BOQ preparation, technical consultations, and quotations in Chh. Sambhaji Nagar, Maharashtra, and across India. Call +91 8698648386 / 8007515182 / 7775904214. Office: MIDC Industrial Area, Mukundwadi, Chh. Sambhaji Nagar, MH 431006.",
  keywords: [
    "Contact Ocean MGPS",
    "MGPS Quotation",
    "Free Site Survey",
    "BOQ Preparation",
    "Medical Gas Pipeline Quote",
    "Hospital Equipment Quote India",
    "MGPS Installation Enquiry",
    "Ocean MGPS Phone",
    "Ocean MGPS Email",
    "Chh. Sambhaji Nagar Contact",
    "Chhatrapati Sambhaji Nagar MGPS Contact",
    "Maharashtra MGPS Supplier Contact",
    "India Medical Gas Pipeline Contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Ocean MGPS — Free Site Survey & BOQ Estimate | Sambhaji Nagar",
    description:
      "Get a free site survey, BOQ estimate, and competitive quotation for MGPS installation, hospital equipment, and modular OTs in Chh. Sambhaji Nagar, Maharashtra & across India.",
    url: "https://oceanmgps.in/contact",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Ocean MGPS",
  description:
    "Get a free MGPS site survey, BOQ estimate, and competitive quotation for medical gas pipeline installation.",
  mainEntity: {
    "@type": "Organization",
    name: "Ocean MGPS Sales & Multi Services",
    telephone: ["+918698648386", "+917775904214", "+918007515182"],
    email: "oceanmgps@gmail.com",
    url: "https://oceanmgps.in",
    hasMap: "https://maps.app.goo.gl/LZJodviBcYUcRdzr7",
    address: {
      "@type": "PostalAddress",
      streetAddress: "MIDC Industrial Area, Mukundwadi",
      addressLocality: "Chhatrapati Sambhaji Nagar",
      addressRegion: "Maharashtra",
      postalCode: "431006",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+918698648386",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://oceanmgps.in" },
    { "@type": "ListItem", position: 2, name: "Contact", item: "https://oceanmgps.in/contact" },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
