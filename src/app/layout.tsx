// ============================================
// Root Layout — Ocean MGPS (SEO Enhanced)
// ============================================

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oceanmgps.in"),
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://oceanmgps.in",
      "hi-IN": "https://oceanmgps.in",
      "mr-IN": "https://oceanmgps.in",
      "x-default": "https://oceanmgps.in",
    },
  },
  title: {
    default: "Ocean MGPS | #1 Medical Gas Pipeline System Supplier & Turnkey Installer India",
    template: "%s | Ocean MGPS",
  },
  description:
    "Ocean MGPS Sales & Multi Services — India's #1 rated supplier and turnkey installer of Medical Gas Pipeline Systems (MGPS), hospital copper gas piping, oxygen manifold banks, bed head panels, modular OTs, and vacuum plants across Chh. Sambhaji Nagar, Maharashtra & India.",
  keywords: [
    "MGPS in Sambhaji Nagar",
    "Medical Gas Pipeline in Sambhaji Nagar",
    "Medical Equipment in Sambhaji Nagar",
    "MGPS in Aurangabad",
    "Medical Gas Pipeline in Aurangabad",
    "Medical Equipment in Aurangabad",
    "MGPS in Chh. Sambhaji Nagar",
    "Medical Gas Pipeline in Chh. Sambhaji Nagar",
    "Medical Equipment in Chh. Sambhaji Nagar",
    "MGPS in Chhatrapati Sambhaji Nagar",
    "Medical Gas Pipeline in Chhatrapati Sambhaji Nagar",
    "Medical Equipment in Chhatrapati Sambhaji Nagar",
    "Bed Head Panel in Sambhaji Nagar",
    "Oxygen Manifold in Sambhaji Nagar",
    "Modular OT in Sambhaji Nagar",
    "LPG Gas Piping in Sambhaji Nagar",
    "Chh. Sambhaji Nagar",
    "Chhatrapati Sambhaji Nagar",
    "Aurangabad",
    "Maharashtra",
    "India",
    "Best MGPS Company in India",
    "Top Hospital Equipment Supplier Maharashtra",
    "Medical Gas Pipeline Cost Per Bed",
    "Oxygen Manifold Bank Price India",
    "Bed Head Panel Manufacturer India",
    "Modular OT Setup Cost Maharashtra",
    "IS 7484 Compliance",
    "HTM 02-01 Standard",
    "Ocean MGPS",
  ],
  authors: [{ name: "Ocean MGPS Sales & Multi Services" }],
  creator: "Stack & Scale",
  publisher: "Ocean MGPS Sales & Multi Services",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://oceanmgps.in",
    siteName: "Ocean MGPS",
    title: "Ocean MGPS | #1 Medical Gas Pipeline Systems & Hospital Hardware",
    description:
      "Turnkey medical gas pipeline systems, certified copper piping, manifold banks, modular OTs, and 24/7 technical support in Chh. Sambhaji Nagar, Maharashtra & across India.",
    images: [
      {
        url: "/images/projects/mgps-installation.png",
        width: 1200,
        height: 630,
        alt: "Ocean MGPS Turnkey Medical Gas Pipeline System Installation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean MGPS | #1 Medical Gas Pipeline Systems",
    description:
      "Turnkey medical gas pipeline systems, certified copper piping, manifold banks, and modular OTs across India.",
    images: ["/images/projects/mgps-installation.png"],
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
  verification: {
    google: "google7a9a843494576378",
  },
  icons: {
    icon: "/images/ocean-emblem.png",
    shortcut: "/images/ocean-emblem.png",
    apple: "/images/ocean-emblem.png",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://oceanmgps.in/#organization",
      "name": "Ocean MGPS Sales & Multi Services",
      "url": "https://oceanmgps.in",
      "logo": "https://oceanmgps.in/images/projects/mgps-installation.png",
      "image": "https://oceanmgps.in/images/projects/mgps-installation.png",
      "telephone": ["+918698648386", "+917775904214", "+918007515182"],
      "email": "oceanmgps@gmail.com",
      "priceRange": "$$",
      "description":
        "Certified supplier and turnkey installer of Medical Gas Pipeline Systems (MGPS), ICU bed head panels, modular OTs, and commercial gas piping across Chh. Sambhaji Nagar, Maharashtra, and India.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "MIDC Industrial Area, Mukundwadi",
        "addressLocality": "Chhatrapati Sambhaji Nagar",
        "addressRegion": "Maharashtra",
        "postalCode": "431006",
        "addressCountry": "IN",
      },
      "hasMap": "https://maps.app.goo.gl/LZJodviBcYUcRdzr7",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.8762,
        "longitude": 75.3433,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "20:00",
        },
      ],
      "areaServed": [
        { "@type": "City", "name": "Chhatrapati Sambhaji Nagar" },
        { "@type": "AdministrativeArea", "name": "Marathwada" },
        { "@type": "AdministrativeArea", "name": "Maharashtra" },
        { "@type": "Country", "name": "India" }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "154",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Dr. Rajesh Sharma" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "reviewBody": "Ocean MGPS provided top quality Medical Gas Pipeline System installation for our hospital in Sambhaji Nagar. Strict IS 7484 compliance and 24/7 support."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Dr. Anil Kulkarni" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5" },
          "reviewBody": "Best MGPS contractor in Marathwada region. Oxygen manifold and bed head panel setup was flawless."
        }
      ],
      "sameAs": [
        "https://maps.app.goo.gl/LZJodviBcYUcRdzr7",
        "https://www.facebook.com/oceanmgps",
        "https://www.instagram.com/oceanmgps",
        "https://www.linkedin.com/company/oceanmgps",
        "https://wa.me/917775904214",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Medical Gas Pipeline Products & Services",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "MGPS Equipment",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Bed Head Panel Unit" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Medical Gas Manifold System" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Digital Gas Alarm System" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Zone Valve Box Assembly" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Modular Operation Theater" } },
            ],
          },
          {
            "@type": "OfferCatalog",
            "name": "Installation Services",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MGPS Installation", "image": "https://oceanmgps.in/images/projects/mgps-installation.png", "url": "https://oceanmgps.in/mgps" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "LPG Copper Gas Pipeline", "image": "https://oceanmgps.in/images/projects/lpg-manifold-installation.jpg", "url": "https://oceanmgps.in/lpg" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Modular OT Setup", "image": "https://oceanmgps.in/images/products/modular-ot.png", "url": "https://oceanmgps.in/services" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Repair & AMC", "url": "https://oceanmgps.in/services" } },
            ],
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://oceanmgps.in/#website",
      "url": "https://oceanmgps.in",
      "name": "Ocean MGPS",
      "publisher": {
        "@id": "https://oceanmgps.in/#organization",
      },
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://oceanmgps.in/products?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/images/ocean-emblem.png" />
        <link rel="shortcut icon" href="/images/ocean-emblem.png" />
        <link rel="apple-touch-icon" href="/images/ocean-emblem.png" />
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Chhatrapati Sambhaji Nagar, Maharashtra, India" />
        <meta name="geo.position" content="19.8762;75.3433" />
        <meta name="ICBM" content="19.8762, 75.3433" />
        <meta name="theme-color" content="#0D47A1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body
        style={{
          fontFamily: "var(--font-inter), var(--font-body)",
        }}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#FFFFFF",
              color: "#1A1A2E",
              borderRadius: "10px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#16A34A",
                secondary: "#FFFFFF",
              },
            },
            error: {
              iconTheme: {
                primary: "#DC2626",
                secondary: "#FFFFFF",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
