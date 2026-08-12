// ============================================
// Root Layout — Ocean MGPS
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
  title: {
    default: "Ocean MGPS | Medical Gas Pipeline Systems — Sales & Installation",
    template: "%s | Ocean MGPS",
  },
  description:
    "Ocean MGPS Sales & Multi Services — Leading supplier and installer of Medical Gas Pipeline Systems, hospital equipment, modular OTs, and gas supply infrastructure in Aurangabad, Maharashtra, India.",
  keywords: [
    "MGPS",
    "Medical Gas Pipeline System",
    "hospital gas supply",
    "medical gas outlet",
    "oxygen pipeline",
    "manifold system",
    "modular OT",
    "hospital equipment",
    "Aurangabad",
    "Maharashtra",
    "India",
    "Ocean MGPS",
    "copper pipeline",
    "bed head panel",
  ],
  authors: [{ name: "Ocean MGPS Sales & Multi Services" }],
  creator: "Stack & Scale",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://oceanmgps.com",
    siteName: "Ocean MGPS",
    title: "Ocean MGPS | Medical Gas Pipeline Systems",
    description:
      "Trusted supplier and installer of Medical Gas Pipeline Systems and hospital equipment across India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ocean MGPS | Medical Gas Pipeline Systems",
    description:
      "Trusted supplier and installer of Medical Gas Pipeline Systems and hospital equipment across India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
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
