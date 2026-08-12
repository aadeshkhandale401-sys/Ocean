// ============================================
// Footer — Spacious White with 4-Column Grid
// ============================================

import Link from "next/link";
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from "lucide-react";
import { DEFAULT_SETTINGS } from "@/lib/constants";

import Logo from "@/components/ui/Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "MGPS Systems", href: "/mgps" },
  { label: "LPG Gas Piping", href: "/lpg" },
  { label: "Our Products", href: "/products" },
  { label: "Our Projects", href: "/projects" },
  { label: "Contact Us", href: "/contact" },
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
              Highly specialized stockist, supplier & installer of Medical Gas Pipeline Systems and hospital equipment across India.
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
                  {DEFAULT_SETTINGS.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  {DEFAULT_SETTINGS.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:+91${phone}`}
                      className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] no-underline"
                    >
                      +91 {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <a
                  href={`mailto:${DEFAULT_SETTINGS.email}`}
                  className="text-xs sm:text-sm text-slate-600 hover:text-[var(--color-primary)] no-underline"
                >
                  {DEFAULT_SETTINGS.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe size={16} className="text-[var(--color-primary)] flex-shrink-0" />
                <span className="text-xs sm:text-sm text-slate-600">
                  {DEFAULT_SETTINGS.website}
                </span>
              </li>
            </ul>
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
