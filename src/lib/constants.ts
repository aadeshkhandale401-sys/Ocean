// ============================================
// Ocean MGPS — Site Constants
// ============================================

import { NavLink, FAQItem, Industry } from "@/types";

// Navigation links
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "MGPS", href: "/mgps" },
  { label: "LPG Piping", href: "/lpg" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Industries", href: "/industries" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Product categories
export const PRODUCT_CATEGORIES = [
  "All",
  "ICU & Diagnostic Equipment",
  "Flow Meters & Regulators",
  "Medical Gas Outlets",
  "Manifold Systems",
  "LPG Gas Copper Systems",
  "Copper Fittings & Pipes",
  "Valves & Safety",
  "Alarm Systems",
  "OT Equipment",
  "Bed Head Panels",
  "Vacuum Systems",
] as const;

// Project categories
export const PROJECT_CATEGORIES = [
  "All",
  "MGPS Installation",
  "LPG Copper Pipeline",
  "Modular OT Setup",
  "Pipeline Work",
  "Hospital Setup",
  "Maintenance & Repair",
] as const;

// Service interest options for enquiry form
export const SERVICE_INTERESTS = [
  "MGPS Installation",
  "LPG Copper Gas Pipeline",
  "Equipment Purchase",
  "Modular OT Setup",
  "Repair & Maintenance",
  "Consultation",
  "Other",
] as const;

// Default site settings (fallback)
export const DEFAULT_SETTINGS = {
  companyName: "Ocean MGPS Sales & Multi Services",
  tagline: "MGPS Installer | Sales & Multi Services",
  about:
    "We are a highly specialized stockist, supplier, and installer of Medical Gas Pipeline Systems and hospital equipment. Serving healthcare facilities across India with quality products and expert installation services.",
  address: "Mukund wadi, N-2, CIDCO, Ch. Sambhaji Nagar, Maharashtra, India",
  phones: ["8698648386", "8007515182", "7775904214"],
  email: "oceanmgps@gmail.com",
  whatsapp: "917775904214",
  website: "www.oceanmgps.com",
  socialLinks: [],
  heroImages: [],
  stats: [
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Happy Clients", value: 145, suffix: "+" },
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Products Available", value: 200, suffix: "+" },
  ],
  businessHours: "Mon - Sat: 9:00 AM - 7:00 PM",
};

// FAQ items
export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What is a Medical Gas Pipeline System (MGPS)?",
    answer:
      "A Medical Gas Pipeline System (MGPS) is a centralized system that supplies medical gases like oxygen, nitrous oxide, and vacuum to various points within a hospital or healthcare facility through a network of copper pipelines, zone valves, alarm systems, and medical gas outlets.",
  },
  {
    question: "Which gases are supplied through MGPS?",
    answer:
      "Medical oxygen (O2), Medical nitrous oxide (N2O), Medical compressed air (4 bar & 7 bar), Medical vacuum, and Carbon dioxide (CO2).",
  },
  {
    question: "Do you comply with safety standards?",
    answer:
      "Yes, all our pipeline systems, fittings, and manifolds strictly comply with Indian Standards (IS 7484 / IS 6044 / HTM 02-01) and NABH quality guidelines.",
  },
  {
    question: "Do you undertake turnkey hospital MGPS projects?",
    answer:
      "Yes, we provide end-to-end MGPS installation services including planning, procurement, pipeline installation, testing, commissioning, and certification. Our experienced team ensures all installations meet IS standards.",
  },
  {
    question: "What is the warranty on your products?",
    answer:
      "We offer one year of free-of-cost service on all our installations. Product-specific warranties vary by manufacturer. Contact us for detailed warranty information on specific products.",
  },
  {
    question: "How do I request a quotation?",
    answer:
      "You can request a quotation through our website's enquiry form, by calling us at +91 8698648386 / 8007515182 / 7775904214, emailing oceanmgps@gmail.com, or sending us a message on WhatsApp (+91 7775904214). We typically respond within 24 hours.",
  },
  {
    question: "Do you provide maintenance and repair services?",
    answer:
      "Yes, we offer comprehensive maintenance and repair services for all types of MGPS installations, manifold systems, OT equipment, and related hospital gas supply infrastructure.",
  },
  {
    question: "What certifications do your products have?",
    answer:
      "Our products are manufactured to Indian Standards (IS) specifications and come with relevant quality certifications. We are a 'Made in India' compliant supplier with products meeting hospital-grade safety requirements.",
  },
  {
    question: "How long does a typical MGPS installation take?",
    answer:
      "Installation timelines depend on the scale of the project. A small clinic setup can be completed in 1-2 weeks, while a large hospital installation may take 4-8 weeks. We provide detailed project timelines during the consultation phase.",
  },
  {
    question: "Do you supply individual components or complete systems?",
    answer:
      "We supply both individual components (copper pipes, fittings, regulators, outlets, valves, etc.) and complete turnkey MGPS solutions. Whether you need a single replacement part or a full hospital gas pipeline installation, we've got you covered.",
  },
];

// Industries
export const INDUSTRIES: Industry[] = [
  {
    icon: "Hospital",
    name: "Hospitals & Healthcare Facilities",
    description:
      "Complete MGPS installation and equipment supply for multi-specialty hospitals, from small nursing homes to large healthcare complexes.",
  },
  {
    icon: "FlaskConical",
    name: "Pharmaceutical Companies",
    description:
      "Gas pipeline systems and equipment for pharmaceutical manufacturing facilities requiring precise gas delivery and safety compliance.",
  },
  {
    icon: "Microscope",
    name: "Research Laboratories",
    description:
      "Specialized gas supply systems for medical and scientific research laboratories with high purity requirements.",
  },
  {
    icon: "Stethoscope",
    name: "Multi-specialty Clinics",
    description:
      "Compact and efficient MGPS solutions tailored for clinics, day-care centers, and outpatient facilities.",
  },
  {
    icon: "Siren",
    name: "Emergency Care Centers",
    description:
      "Rapid-deployment gas pipeline systems for emergency wards, trauma centers, and ICU setups with 24/7 reliability.",
  },
  {
    icon: "Building2",
    name: "New Hospital Construction",
    description:
      "End-to-end MGPS planning and installation for new hospital construction projects, integrated from the design phase.",
  },
];

// MGPS Components
export const MGPS_COMPONENTS = [
  {
    title: "Manifold System",
    description: "Central gas supply system with automatic changeover for uninterrupted gas flow. Available in 2x2, 4x4, 6x6, and 10x10 configurations.",
    icon: "Gauge",
  },
  {
    title: "Copper Pipeline Network",
    description: "Medical-grade copper pipes from 10mm to 108mm diameter, ensuring safe and clean gas delivery throughout the facility.",
    icon: "GitBranch",
  },
  {
    title: "Zone Valves & Alarm Systems",
    description: "Area-wise isolation valves and digital alarm systems for monitoring gas pressure and flow, ensuring patient safety.",
    icon: "ShieldCheck",
  },
  {
    title: "Medical Gas Outlets",
    description: "Wall-mounted and ceiling-mounted gas outlets with self-sealing valves for oxygen, nitrous oxide, vacuum, and air connections.",
    icon: "Plug",
  },
  {
    title: "Pressure Regulators",
    description: "High-precision pressure regulators for oxygen, BPC flow meters, and vacuum regulators with safety relief valves.",
    icon: "Settings",
  },
  {
    title: "Safety & Control Panels",
    description: "Semi-automatic and automatic digital control panels for monitoring and managing the entire MGPS infrastructure.",
    icon: "Monitor",
  },
];
