import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://oceanmgps.in";
  const now = new Date();

  // Core Marketing Pages
  const mainPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/mgps`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/lpg`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/sitemap`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Product Category Deep Links for Search Crawlers
  const productCategories = [
    "ICU & Diagnostic Equipment",
    "Flow Meters & Regulators",
    "Vacuum Systems",
    "Medical Gas Outlets",
    "Copper Fittings & Pipes",
    "Manifold Systems",
    "Valves & Safety",
    "Alarm Systems",
    "Bed Head Panels",
    "OT Equipment",
  ];

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${baseUrl}/products?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Service Category Deep Links
  const serviceCategories = [
    "Installation",
    "LPG Piping",
    "Equipment",
    "Modular OT",
    "Maintenance",
    "Turnkey",
    "Consultation",
  ];

  const servicePages: MetadataRoute.Sitemap = serviceCategories.map((cat) => ({
    url: `${baseUrl}/services?category=${encodeURIComponent(cat)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...mainPages, ...categoryPages, ...servicePages];
}
