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
  },
  title: {
    default: "Ocean MGPS | Medical Gas Pipeline Systems — Sales & Turnkey Installation",
    template: "%s | Ocean MGPS",
  },
  description:
    "Ocean MGPS Sales & Multi Services — Leading certified supplier and installer of Medical Gas Pipeline Systems (MGPS), hospital copper gas piping, oxygen manifold banks, modular OTs, and vacuum plants across India.",
  keywords: [
    "MGPS",
    "Medical Gas Pipeline System",
    "Hospital Gas Pipeline",
    "Oxygen Copper Piping",
    "Medical Gas Outlet Points",
    "Oxygen Manifold System",
    "Modular Operation Theater",
    "Bed Head Panel Unit",
    "Gas Alarm System",
    "Hospital Vacuum Plant",
    "LPG Gas Piping for Labs",
    "Chh. Sambhaji Nagar",
    "Chhatrapati Sambhaji Nagar",
    "Aurangabad",
    "Maharashtra",
    "India Medical Engineering",
    "IS 7484 Compliance",
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
    title: "Ocean MGPS | Certified Medical Gas Pipeline Systems",
    description:
      "Turnkey medical gas pipeline systems, certified copper piping, manifold banks, modular OTs, and 24/7 technical support for hospitals across India.",
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
    title: "Ocean MGPS | Medical Gas Pipeline Systems",
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
        "Certified supplier and turnkey installer of Medical Gas Pipeline Systems (MGPS), ICU bed head panels, modular OTs, and commercial gas piping across India.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "MIDC Industrial Area",
        "addressLocality": "Chhatrapati Sambhaji Nagar",
        "addressRegion": "Maharashtra",
        "postalCode": "431005",
        "addressCountry": "IN",
      },
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
      "areaServed": {
        "@type": "Country",
        "name": "India",
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
