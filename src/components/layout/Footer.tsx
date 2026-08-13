// ============================================
// Footer — Spacious White with 4-Column Grid
// ============================================

"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

import Logo from "@/components/ui/Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "MGPS Systems", href: "/mgps" },
  { label: "LPG Gas Piping", href: "/lpg" },
  { label: "Our Products", href: "/products" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
  { label: "HTML Sitemap", href: "/sitemap" },
];

const serviceLinks = [
  { label: "MGPS Installation", href: "/services" },
  { label: "LPG Copper Gas Piping", href: "/lpg" },
  { label: "Equipment & ICU Devices", href: "/services" },
  { label: "Modular OT Setup", href: "/services" },
  { label: "Repair & Maintenance", href: "/services" },
  { label: "Consultation", href: "/services" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const settings = useSettings();

  return (
    <footer
      className="bg-white mt-16 sm:mt-24 border-t border-slate-200"
    >
      {/* Main Footer Container */}
      <div className="container py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Logo & About */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <Logo size="md" />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
              {settings.about || "Highly specialized stockist, supplier & installer of Medical Gas Pipeline Systems and hospital equipment across India."}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-[var(--color-primary)] border border-blue-100">
                IS 7484 Certified
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 text-slate-900">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm no-underline flex items-center gap-1.5 text-slate-600 hover:text-[var(--color-primary)] transition-colors"
                  >
                    <ArrowUpRight size={14} className="text-[var(--color-primary)]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 text-slate-900">
              Our Services
            </h4>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm no-underline flex items-center gap-1.5 text-slate-600 hover:text-[var(--color-primary)] transition-colors"
                  >
                    <ArrowUpRight size={14} className="text-[var(--color-primary)]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 text-slate-900">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-3.5">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  {settings.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:+91${phone.replace(/\s+/g, "")}`}
                      className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] no-underline"
                    >
                      {phone.startsWith("+91") ? phone : `+91 ${phone}`}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] no-underline"
                >
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600">
                  {settings.website}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Local SEO Service Hubs & Search Keywords */}
      <div className="py-8 border-t border-slate-100 bg-slate-50/50">
        <div className="container space-y-4">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Top Service Locations & Local Search Hubs
          </h5>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-700">Chh. Sambhaji Nagar / Aurangabad:</span>
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">MGPS in Sambhaji Nagar</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">Medical Gas Pipeline in Sambhaji Nagar</Link> • 
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">Medical Equipment in Sambhaji Nagar</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">MGPS in Aurangabad</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">Medical Gas Pipeline in Aurangabad</Link> • 
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">Medical Equipment in Aurangabad</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">MGPS in Chh. Sambhaji Nagar</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">Medical Gas Pipeline in Chh. Sambhaji Nagar</Link> • 
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">Medical Equipment in Chh. Sambhaji Nagar</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">MGPS in Chhatrapati Sambhaji Nagar</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">Medical Gas Pipeline in Chhatrapati Sambhaji Nagar</Link> • 
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">Medical Equipment in Chhatrapati Sambhaji Nagar</Link>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 leading-relaxed pt-1">
            <span className="font-semibold text-slate-700">Equipment & Services by Region:</span>
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">Bed Head Panel in Sambhaji Nagar</Link> • 
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">Oxygen Manifold in Sambhaji Nagar</Link> • 
            <Link href="/services" className="hover:text-[var(--color-primary)] no-underline">Modular OT Setup in Sambhaji Nagar</Link> • 
            <Link href="/lpg" className="hover:text-[var(--color-primary)] no-underline">LPG Gas Piping in Sambhaji Nagar</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">MGPS in Jalna</Link> • 
            <Link href="/mgps" className="hover:text-[var(--color-primary)] no-underline">Medical Gas Pipeline in Jalna</Link> • 
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">Medical Equipment in Jalna</Link> • 
            <Link href="/services" className="hover:text-[var(--color-primary)] no-underline">Hospital Gas Pipeline Maintenance Maharashtra</Link> • 
            <Link href="/products" className="hover:text-[var(--color-primary)] no-underline">ICU Equipment Supplier India</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-slate-100 bg-slate-50">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {currentYear} Ocean MGPS Sales & Multi Services. All rights reserved.</p>
          <p>
            Crafted by{" "}
            <a
              href="https://stackandscale.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--color-primary)] no-underline hover:underline"
            >
              Stack & Scale
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
