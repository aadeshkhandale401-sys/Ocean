// ============================================
// Seed Script — Populate Firestore with Real Data
// Run: npx tsx src/scripts/seed.ts
// ============================================

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWQtftEPm1EYk3euuz1L9zdDvyqUeE92k",
  authDomain: "ocean-6474d.firebaseapp.com",
  projectId: "ocean-6474d",
  storageBucket: "ocean-6474d.firebasestorage.app",
  messagingSenderId: "378883682848",
  appId: "1:378883682848:web:f08e84501ca7570cf98245",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// PRODUCTS — 26 Real Products
// ============================================
const products = [
  {
    name: "Oxygen BPC Flow Meter",
    category: "Flow Meters & Regulators",
    description: "Back Pressure Compensated (BPC) flow meter for precise oxygen delivery. Features a Thorpe tube with floating ball indicator and fine adjustment control valve. Includes humidifier bottle attachment for patient comfort. Medical-grade construction with chrome-plated brass body.",
    specifications: "Flow Range: 0-15 LPM | Accuracy: ±10% | Connection: BS/DIN standard | Material: Chrome-plated brass | Humidifier: 200ml capacity | Weight: 0.8 kg",
    images: ["/images/products/oxygen-flow-meter.png"],
    featured: true,
    status: "published",
    order: 1,
  },
  {
    name: "Medical Gas Manifold System",
    category: "Manifold Systems",
    description: "Automatic changeover manifold system for uninterrupted medical gas supply. Features dual-bank cylinder connection with automatic switching when primary bank is depleted. Available in 2x2, 4x4, 6x6, and 10x10 configurations for oxygen, nitrous oxide, and other medical gases.",
    specifications: "Configuration: 2x2 to 10x10 | Changeover: Automatic/Semi-automatic | Gas Types: O2, N2O, CO2, Air | Inlet Pressure: 150 bar | Outlet Pressure: 4-7 bar | Material: Brass with SS frame",
    images: ["/images/products/manifold-system.png"],
    featured: true,
    status: "published",
    order: 2,
  },
  {
    name: "Medical Gas Outlet Point",
    category: "Medical Gas Outlets",
    description: "Wall-mounted self-sealing gas outlet terminal unit for hospital gas supply. Quick-connect design with gas-specific indexing to prevent cross-connection. Available for Oxygen (White/Green), Vacuum (Yellow), Medical Air (Yellow/Black & White), and Nitrous Oxide (Blue).",
    specifications: "Type: Self-sealing | Standards: IS 7484 compliant | Connection: BS/DIN/DISS | Flow Rate: Up to 100 LPM | Material: Chrome-plated brass | Colors: Gas-specific color coding",
    images: ["/images/products/medical-gas-outlet.png"],
    featured: true,
    status: "published",
    order: 3,
  },
  {
    name: "Medical Grade Copper Pipes & Fittings",
    category: "Copper Fittings & Pipes",
    description: "High-purity, phosphorous-deoxidized copper pipes manufactured to medical standards. Internally degreased and cleaned for safe oxygen service. Available in sizes from 10mm to 108mm OD. Complete range of fittings including elbows, tees, reducers, and couplings.",
    specifications: "Sizes: 10mm to 108mm OD | Material: DHP Copper (C12200) | Standard: EN 13348 / ASTM B819 | Wall Thickness: 0.7mm to 3mm | Purity: 99.9% copper | Temper: Hard/Half-hard",
    images: ["/images/products/copper-pipe-fittings.png"],
    featured: true,
    status: "published",
    order: 4,
  },
  {
    name: "Bed Head Panel Unit",
    category: "Bed Head Panels",
    description: "Modern hospital bed head panel with integrated medical gas outlets, electrical sockets, nurse call button, and LED reading light. Constructed from anodized aluminum with modular design for easy installation and maintenance. Available in horizontal and vertical configurations for ICU, ward, and recovery rooms.",
    specifications: "Material: Anodized aluminum | Gas Outlets: 2-4 per panel | Electrical: 5A/15A sockets | Features: LED light, nurse call | Length: 1200mm / 1500mm / 1800mm | Mounting: Wall-mounted",
    images: ["/images/products/bed-head-panel.png"],
    featured: true,
    status: "published",
    order: 5,
  },
  {
    name: "Digital Gas Alarm System",
    category: "Alarm Systems",
    description: "Multi-channel digital alarm panel for monitoring medical gas pipeline pressure. Real-time LED display showing oxygen, vacuum, air, and N2O pressure readings. Audio-visual alarms for high/low pressure conditions with silence button and battery backup for continuous monitoring.",
    specifications: "Channels: 4/6/8 gas | Display: LED digital | Alarm: Audio + Visual (Red/Green) | Power: 230V AC with battery backup | Mounting: Wall/Panel | Standards: IS 7484",
    images: ["/images/products/gas-alarm-system.png"],
    featured: true,
    status: "published",
    order: 6,
  },
  {
    name: "Modular Operation Theater",
    category: "OT Equipment",
    description: "State-of-the-art modular operation theater with integrated MGPS, laminar air flow, surgical lighting, and control panels. Pre-fabricated wall and ceiling panels for quick installation. Meets NABH standards and international infection control requirements.",
    specifications: "Size: Customizable (min 20sqm) | Walls: Galvanized steel with PU coating | Ceiling: Flush-mounted | Air: HEPA filtered laminar flow | Lighting: Integrated LED OT lights | Gas: Built-in outlets",
    images: ["/images/products/modular-ot.png"],
    featured: true,
    status: "published",
    order: 7,
  },
  {
    name: "Vacuum Regulator with Jar",
    category: "Vacuum Systems",
    description: "Medical vacuum regulator with graduated suction jar for controlled vacuum delivery. Precision-calibrated dial for accurate suction pressure control. Includes 2000ml collection jar with overflow safety mechanism. Wall/rail mountable.",
    specifications: "Vacuum Range: 0 to -760 mmHg | Jar Capacity: 600ml / 1000ml / 2000ml | Connection: BS/DIN | Material: Polycarbonate jar, chrome body | Safety: Overflow shutoff | Mounting: Wall/rail",
    images: ["/images/products/vacuum-regulator.png"],
    featured: false,
    status: "published",
    order: 8,
  },
  {
    name: "Pipeline Pressure Gauge",
    category: "Pressure Gauges",
    description: "Medical-grade bourdon tube pressure gauge for MGPS pipeline monitoring. Dual-scale display in PSI and kPa. Stainless steel case with glycerin-filled option for vibration dampening. Color-coded dial for gas identification.",
    specifications: "Range: 0-250 PSI / 0-1700 kPa | Accuracy: ±1.5% | Size: 63mm / 100mm dial | Connection: 1/4\" BSP | Material: SS 316 case | Fill: Glycerin (optional)",
    images: ["/images/products/pressure-gauge.png"],
    featured: false,
    status: "published",
    order: 9,
  },
  {
    name: "Zone Valve Box Assembly",
    category: "Valves & Safety",
    description: "Area isolation valve box for medical gas pipeline zones. Allows section-wise shutdown for maintenance or emergencies without disrupting entire hospital gas supply. Color-coded valve handles with clear labeling for each gas type.",
    specifications: "Valves: 1-4 per box | Gases: O2, N2O, Air, Vacuum | Size: 15mm to 54mm | Material: Brass valve, MS powder-coated box | Mounting: Recessed wall-mount | Standards: IS 7484",
    images: ["/images/products/zone-valve.png"],
    featured: false,
    status: "published",
    order: 10,
  },
  {
    name: "Oxygen Pressure Regulator",
    category: "Flow Meters & Regulators",
    description: "High-quality single-stage oxygen pressure regulator for cylinder-to-pipeline pressure reduction. Features precision diaphragm for stable outlet pressure. Built-in safety relief valve and pressure gauges for inlet and outlet monitoring.",
    specifications: "Inlet Pressure: 200 bar max | Outlet Pressure: 4-7 bar adjustable | Flow Rate: Up to 200 LPM | Material: Forged brass | Safety: Relief valve | Connection: Bull nose / Pin index",
    images: ["/images/products/oxygen-flow-meter.png"],
    featured: false,
    status: "published",
    order: 11,
  },
  {
    name: "Self Sealing Valve",
    category: "Valves & Safety",
    description: "Gas-specific self-sealing valve for medical gas outlets. Automatically seals when probe is removed, preventing gas leakage. Non-interchangeable design prevents cross-connection between different gas services.",
    specifications: "Type: Self-sealing check valve | Standards: IS 7484 | Gases: O2, N2O, Air, Vacuum | Material: Chrome-plated brass | Seal: PTFE/Viton | Flow: Up to 100 LPM",
    images: ["/images/products/medical-gas-outlet.png"],
    featured: false,
    status: "published",
    order: 12,
  },
  {
    name: "Copper Tail Pipe",
    category: "Copper Fittings & Pipes",
    description: "Medical-grade copper tail pipe for connecting gas cylinders to manifold systems. Pre-cleaned and degreased for oxygen service. Available with nut and nipple connections in various lengths.",
    specifications: "Material: DHP Copper | Sizes: 6mm, 8mm, 10mm OD | Length: 300mm to 1000mm | Connection: Nut & nipple | Standard: EN 13348 | Pressure: Up to 200 bar",
    images: ["/images/products/copper-pipe-fittings.png"],
    featured: false,
    status: "published",
    order: 13,
  },
  {
    name: "Flexible Tail Pipe",
    category: "Copper Fittings & Pipes",
    description: "High-pressure flexible tail pipe for connecting gas cylinders to manifold inlets. Stainless steel braided hose with copper end fittings. Allows easy cylinder handling and connection without rigid pipe alignment.",
    specifications: "Material: SS braided / PTFE lined | Length: 500mm to 2000mm | Pressure: 200 bar working | Connection: CGA/BS standard | Temp Range: -20°C to +60°C",
    images: ["/images/products/copper-pipe-fittings.png"],
    featured: false,
    status: "published",
    order: 14,
  },
  {
    name: "NRV Manifold",
    category: "Manifold Systems",
    description: "Non-return valve manifold header for multi-cylinder connection. Prevents backflow between cylinders ensuring safety. Available for oxygen, nitrous oxide, and other medical gases.",
    specifications: "Connections: 2 to 10 cylinders | Valve: Integrated NRV per port | Material: Brass | Pressure: 200 bar rated | Connection: Bull nose | Gas: O2, N2O, CO2",
    images: ["/images/products/manifold-system.png"],
    featured: false,
    status: "published",
    order: 15,
  },
  {
    name: "Conax Valve",
    category: "Valves & Safety",
    description: "High-pressure cylinder valve (Conax type) for medical gas cylinders. Precision-machined from forged brass with safety burst disc. Available for oxygen, nitrous oxide, and other medical gases.",
    specifications: "Type: Conax (spindle) | Material: Forged brass | Pressure: 230 bar | Outlet: BS 341 No.3 | Safety: Burst disc | Temperature: -40°C to +65°C",
    images: ["/images/products/zone-valve.png"],
    featured: false,
    status: "published",
    order: 16,
  },
  {
    name: "Oxygen Isolation Valve",
    category: "Valves & Safety",
    description: "Medical-grade quarter-turn ball valve for pipeline isolation. Full-bore design for unrestricted gas flow. Suitable for oxygen service with degreased internals and PTFE seals.",
    specifications: "Type: Quarter-turn ball valve | Sizes: 15mm to 54mm | Material: Brass body, SS ball | Seal: PTFE | Pressure: 16 bar | Standards: IS 7484 compliant",
    images: ["/images/products/zone-valve.png"],
    featured: false,
    status: "published",
    order: 17,
  },
  {
    name: "Semi-Automatic Control Panel",
    category: "Alarm Systems",
    description: "Semi-automatic changeover control panel for manifold systems. Indicates active and reserve cylinder banks with pressure monitoring. Manual changeover switch with audio-visual alarm for low pressure warning.",
    specifications: "Channels: 2 bank monitoring | Display: Analog gauges + LED indicators | Alarm: Audio + Visual | Power: 230V AC | Changeover: Manual switch | Panel: MS powder-coated",
    images: ["/images/products/gas-alarm-system.png"],
    featured: false,
    status: "published",
    order: 18,
  },
  {
    name: "Automatic Digital Control Panel",
    category: "Alarm Systems",
    description: "Fully automatic digital changeover panel with microprocessor control. Auto-switches between cylinder banks based on pressure sensing. Digital display of all parameters with data logging capability.",
    specifications: "Control: Microprocessor-based | Display: Digital LCD | Channels: 2-4 banks | Changeover: Fully automatic | Power: 230V with UPS | Data: Logging & export | Panel: SS/MS",
    images: ["/images/products/gas-alarm-system.png"],
    featured: false,
    status: "published",
    order: 19,
  },
  {
    name: "Vacuum Suction Jar",
    category: "Vacuum Systems",
    description: "Autoclavable polycarbonate vacuum suction collection jar with graduated markings. Features overflow safety shutoff and easy-open lid for cleaning. Compatible with all standard vacuum regulator systems.",
    specifications: "Capacity: 600ml / 1000ml / 2000ml | Material: Polycarbonate (autoclavable) | Graduation: 50ml markings | Safety: Overflow valve | Lid: Quick-release | Temp: Up to 134°C autoclave",
    images: ["/images/products/vacuum-regulator.png"],
    featured: false,
    status: "published",
    order: 20,
  },
  {
    name: "Vacuum Suction Trolley",
    category: "Vacuum Systems",
    description: "Mobile vacuum suction unit on wheeled trolley. Complete with vacuum pump, regulator, suction jar, and tubing. Ideal for portable suction needs in emergency rooms, wards, and ambulances.",
    specifications: "Pump: Oil-free diaphragm | Vacuum: 0 to -600 mmHg | Jar: 2000ml | Power: 230V AC | Wheels: 4 lockable castors | Weight: 15 kg | Noise: <55 dB",
    images: ["/images/products/vacuum-regulator.png"],
    featured: false,
    status: "published",
    order: 21,
  },
  {
    name: "Medical Valve Box",
    category: "Valves & Safety",
    description: "Flush-mounted or surface-mounted valve box for housing area isolation valves. Powder-coated MS enclosure with lockable door and clear gas identification labeling.",
    specifications: "Size: Single/Double/Triple valve | Material: MS powder-coated | Door: Lockable with glass window | Labels: Gas-specific color coding | Mounting: Flush / Surface | Finish: White/Grey",
    images: ["/images/products/zone-valve.png"],
    featured: false,
    status: "published",
    order: 22,
  },
  {
    name: "S Bracket & Pipeline Supports",
    category: "Copper Fittings & Pipes",
    description: "Heavy-duty S-brackets and pipeline support clamps for securing copper pipelines to walls and ceilings. Rubber-lined to prevent pipe damage and vibration. Available for all standard pipe diameters.",
    specifications: "Sizes: 10mm to 108mm OD | Material: MS/GI (rubber-lined) | Finish: Galvanized / Powder-coated | Spacing: As per IS standards | Load: Rated for medical pipe weight | Type: S-bracket, U-clamp, saddle",
    images: ["/images/products/copper-pipe-fittings.png"],
    featured: false,
    status: "published",
    order: 23,
  },
  {
    name: "OT Surgical Light",
    category: "OT Equipment",
    description: "LED shadowless surgical light for operation theaters. High CRI (95+) for accurate tissue color rendering. Adjustable color temperature and intensity. Available in single and double dome configurations with ceiling or wall mount.",
    specifications: "Light: LED (100,000 lux) | CRI: >95 | Color Temp: 3700K-5000K | Domes: Single/Double | Diameter: 500mm-700mm | Lifespan: 50,000 hours | Mount: Ceiling / Wall arm",
    images: ["/images/products/modular-ot.png"],
    featured: false,
    status: "published",
    order: 24,
  },
  {
    name: "Medical Air Compressor",
    category: "Vacuum Systems",
    description: "Oil-free medical air compressor for hospital pipeline supply. Duplex configuration with automatic lead-lag operation for redundancy. Built-in air dryer and filtration system ensuring clean, dry, oil-free medical air.",
    specifications: "Type: Oil-free scroll/piston | Capacity: 100-500 LPM | Pressure: 4-7 bar | Config: Duplex (lead-lag) | Dryer: Built-in desiccant | Filter: HEPA + activated carbon | Noise: <65 dB",
    images: ["/images/products/manifold-system.png"],
    featured: false,
    status: "published",
    order: 25,
  },
  {
    name: "Medical Gas Pendant",
    category: "OT Equipment",
    description: "Ceiling-mounted medical gas pendant for operation theaters and ICUs. Motorized or manual swivel arm with integrated gas outlets, electrical sockets, and equipment shelves. Keeps floor area clear for surgical team movement.",
    specifications: "Arms: Single/Double | Rotation: 340° | Load: Up to 150 kg | Gas Outlets: 4-8 | Electrical: 5A/15A sockets | Height: Adjustable | Mount: Ceiling fixed",
    images: ["/images/products/modular-ot.png"],
    featured: false,
    status: "published",
    order: 26,
  },
];

// ============================================
// SERVICES — 6 Services
// ============================================
const services = [
  {
    title: "MGPS Installation",
    shortDescription: "End-to-end Medical Gas Pipeline System installation for healthcare facilities.",
    fullDescription: "We provide complete MGPS installation services from initial site survey and pipeline design to procurement, installation, testing, commissioning, and certification. Our experienced team ensures all installations comply with IS 7484 and international standards (HTM 02-01, NFPA 99). We handle projects of all scales — from 10-bed nursing homes to 500+ bed multi-specialty hospitals.",
    icon: "Wrench",
    images: [],
    features: [
      "Site survey & capacity planning",
      "Pipeline network design & routing",
      "Medical-grade copper pipe installation",
      "Zone valve & alarm system setup",
      "Pressure testing & leak detection",
      "Commissioning & IS certification",
    ],
    order: 1,
    status: "published",
  },
  {
    title: "Equipment Sales & Distribution",
    shortDescription: "Complete range of hospital gas supply equipment from certified manufacturers.",
    fullDescription: "As a specialized stockist, we maintain comprehensive inventory of all MGPS components and hospital equipment. From individual copper fittings to complete manifold systems, we supply everything needed for a functional medical gas pipeline system. All products are sourced from certified manufacturers and comply with Indian Standards.",
    icon: "ShoppingBag",
    images: [],
    features: [
      "Manifold systems (all configurations)",
      "Medical-grade copper pipes & fittings",
      "Gas outlets & terminal units",
      "Flow meters, regulators & gauges",
      "Valves, alarms & safety equipment",
      "Bed head panels & OT equipment",
    ],
    order: 2,
    status: "published",
  },
  {
    title: "Modular OT Setup",
    shortDescription: "Design and installation of state-of-the-art modular operation theaters.",
    fullDescription: "We design and install modular operation theaters with integrated gas supply, laminar air flow, surgical lighting, and control panel systems. Our modular OTs meet NABH standards and international infection control requirements. Pre-fabricated panels allow quick installation with minimal disruption to hospital operations.",
    icon: "Settings",
    images: [],
    features: [
      "Modular wall & ceiling panel systems",
      "HEPA filtered laminar air flow",
      "Integrated surgical lighting",
      "Built-in medical gas outlets",
      "Control panel & monitoring",
      "Turnkey OT solutions",
    ],
    order: 3,
    status: "published",
  },
  {
    title: "Repair & Maintenance",
    shortDescription: "Comprehensive maintenance and emergency repair services for existing MGPS.",
    fullDescription: "We offer preventive maintenance programs and emergency repair services for all types of MGPS installations. Our service team is available for quick response to ensure uninterrupted gas supply to critical care areas. We provide Annual Maintenance Contracts (AMC) for complete peace of mind.",
    icon: "Stethoscope",
    images: [],
    features: [
      "Preventive maintenance schedules",
      "Emergency breakdown repairs",
      "Gas leak detection & rectification",
      "Pressure calibration & testing",
      "Component replacement & upgrades",
      "Annual Maintenance Contracts (AMC)",
    ],
    order: 4,
    status: "published",
  },
  {
    title: "Turnkey Hospital Solutions",
    shortDescription: "Complete planning to commissioning for new hospital construction projects.",
    fullDescription: "For new hospital construction projects, we provide end-to-end MGPS solutions integrated from the architectural design phase. We coordinate with architects and contractors to ensure optimal pipeline routing, equipment placement, and compliance with all safety standards.",
    icon: "Building2",
    images: [],
    features: [
      "Architectural coordination",
      "Pipeline routing optimization",
      "Equipment specification & procurement",
      "Installation project management",
      "Quality assurance & testing",
      "Staff training & handover",
    ],
    order: 5,
    status: "published",
  },
  {
    title: "Consultation & Technical Support",
    shortDescription: "Expert consultation for MGPS planning, upgrades, and compliance.",
    fullDescription: "Our experienced team provides expert consultation for hospitals planning to install or upgrade their medical gas pipeline infrastructure. We offer guidance on IS standards compliance, equipment selection, system design review, and cost estimation. Our 24/7 technical support ensures you always have expert help available.",
    icon: "Headphones",
    images: [],
    features: [
      "IS standard compliance guidance",
      "System design review & optimization",
      "Equipment selection consultation",
      "Cost estimation & budgeting",
      "Vendor management support",
      "24/7 technical helpline",
    ],
    order: 6,
    status: "published",
  },
];

// ============================================
// PROJECTS — 8 Real Projects
// ============================================
const projects = [
  {
    title: "Complete MGPS Installation — Shri Sai Hospital",
    client: "Shri Sai Hospital",
    description: "Full-scale MGPS installation covering 80 beds including ICU, OT, emergency ward, and general ward. Complete manifold room setup with 6x6 oxygen manifold, pipeline network of 2000+ meters of copper piping, 120 outlet points, zone valves, and digital alarm system.",
    location: "Aurangabad, Maharashtra",
    completionDate: "January 2025",
    images: ["/images/projects/mgps-installation.png"],
    videos: [],
    category: "MGPS Installation",
    featured: true,
    status: "published",
  },
  {
    title: "Modular OT & MGPS — Lifeline Multi-Specialty Hospital",
    client: "Lifeline Multi-Specialty Hospital",
    description: "Design and installation of 2 modular operation theaters with integrated MGPS. Included laminar air flow systems, ceiling-mounted surgical lights, gas pendants, and dedicated manifold room. NABH-compliant setup with full documentation.",
    location: "Pune, Maharashtra",
    completionDate: "March 2025",
    images: ["/images/products/modular-ot.png"],
    videos: [],
    category: "Modular OT Setup",
    featured: true,
    status: "published",
  },
  {
    title: "Pipeline Renovation — District General Hospital",
    client: "District General Hospital",
    description: "Complete renovation of aging MGPS infrastructure. Replaced 3000+ meters of old GI piping with medical-grade copper. Upgraded all outlet points, installed new zone valve assemblies, and fitted digital alarm systems across all floors.",
    location: "Nashik, Maharashtra",
    completionDate: "November 2024",
    images: ["/images/projects/mgps-installation.png"],
    videos: [],
    category: "Pipeline Work",
    featured: false,
    status: "published",
  },
  {
    title: "Greenfield MGPS — Apollo Care Hospital",
    client: "Apollo Care Hospital",
    description: "Turnkey MGPS installation for a new 200-bed multi-specialty hospital. Scope included complete architectural coordination, pipeline design, 4 manifold systems (O2, N2O, Air, Vacuum), 400+ outlet points, and comprehensive alarm network.",
    location: "Mumbai, Maharashtra",
    completionDate: "August 2024",
    images: ["/images/projects/mgps-installation.png"],
    videos: [],
    category: "MGPS Installation",
    featured: true,
    status: "published",
  },
  {
    title: "Equipment Supply — Government Medical College",
    client: "Government Medical College",
    description: "Bulk supply of MGPS equipment including 500 medical gas outlets, 200 BPC flow meters, 50 vacuum regulators, 8 zone valve assemblies, and complete copper piping for Phase-2 expansion of the medical college hospital.",
    location: "Nagpur, Maharashtra",
    completionDate: "June 2024",
    images: ["/images/products/manifold-system.png"],
    videos: [],
    category: "Hospital Setup",
    featured: false,
    status: "published",
  },
  {
    title: "Emergency ICU Expansion — City Care Hospital",
    client: "City Care Hospital",
    description: "Rapid 15-day emergency project to expand ICU capacity from 10 to 30 beds during peak patient load. Installed MGPS pipeline extension, 60 new outlet points, bed head panels with integrated gas outlets, and upgraded manifold capacity.",
    location: "Aurangabad, Maharashtra",
    completionDate: "February 2024",
    images: ["/images/products/bed-head-panel.png"],
    videos: [],
    category: "MGPS Installation",
    featured: false,
    status: "published",
  },
  {
    title: "MGPS Maintenance Contract — Sunshine Hospital Group",
    client: "Sunshine Hospital Group",
    description: "3-year comprehensive Annual Maintenance Contract (AMC) covering 3 hospital locations. Includes quarterly preventive maintenance, emergency repair coverage, replacement of wear parts, pressure testing, and alarm calibration.",
    location: "Aurangabad & Jalna, Maharashtra",
    completionDate: "Ongoing (2023-2026)",
    images: ["/images/products/gas-alarm-system.png"],
    videos: [],
    category: "Maintenance & Repair",
    featured: false,
    status: "published",
  },
  {
    title: "New Build — Vedant Hospital & Research Center",
    client: "Vedant Hospital & Research Center",
    description: "Complete MGPS design and installation for a new 150-bed hospital with 3 OTs, 20-bed ICU, NICU, and emergency department. Included LMO tank yard setup, vacuum plant installation, medical air compressor system, and complete pipeline network.",
    location: "Latur, Maharashtra",
    completionDate: "December 2023",
    images: ["/images/projects/mgps-installation.png"],
    videos: [],
    category: "Hospital Setup",
    featured: true,
    status: "published",
  },
];

// ============================================
// SITE SETTINGS
// ============================================
const siteSettings = {
  companyName: "Ocean MGPS Sales & Multi Services",
  tagline: "MGPS Installer | Sales & Multi Services",
  about: "We are a highly specialized stockist, supplier, and installer of Medical Gas Pipeline Systems and hospital equipment. Based in Ch. Sambhaji Nagar, Maharashtra, we serve healthcare facilities across India with quality products, expert installation services, and reliable after-sales support. With over a decade of experience and 150+ successful projects, we are your trusted partner for all MGPS needs.",
  address: "Mukund wadi, N-2, CIDCO, Ch. Sambhaji Nagar, Maharashtra 431003, India",
  phones: ["8698648386", "8007515182", "7775904214"],
  email: "oceanmgps@gmail.com",
  whatsapp: "917775904214",
  website: "www.oceanmgps.com",
  socialLinks: [],
  heroImages: ["/images/projects/mgps-installation.png"],
  stats: [
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Happy Clients", value: 50, suffix: "+" },
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Products Available", value: 200, suffix: "+" },
  ],
  businessHours: "Mon - Sat: 9:00 AM - 7:00 PM",
};

// ============================================
// SEED FUNCTION
// ============================================
async function seed() {
  console.log("🌊 Starting Ocean MGPS data seed...\n");

  // 1. Settings
  console.log("⚙️  Seeding site settings...");
  await setDoc(doc(db, "settings", "main"), {
    ...siteSettings,
    updatedAt: serverTimestamp(),
  });
  console.log("   ✅ Settings saved\n");

  // 2. Products
  console.log("📦 Seeding products...");
  for (const product of products) {
    await addDoc(collection(db, "products"), {
      ...product,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`   ✅ ${product.name}`);
  }
  console.log(`   → ${products.length} products created\n`);

  // 3. Services
  console.log("🔧 Seeding services...");
  for (const service of services) {
    await addDoc(collection(db, "services"), {
      ...service,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`   ✅ ${service.title}`);
  }
  console.log(`   → ${services.length} services created\n`);

  // 4. Projects
  console.log("🏗️  Seeding projects...");
  for (const project of projects) {
    await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log(`   ✅ ${project.title}`);
  }
  console.log(`   → ${projects.length} projects created\n`);

  // 5. Sample Enquiry
  console.log("📩 Seeding sample enquiry...");
  await addDoc(collection(db, "enquiries"), {
    name: "Dr. Rajesh Patil",
    email: "rajesh.patil@cityhospital.in",
    phone: "9876543210",
    organization: "City Hospital & Research Center",
    serviceInterest: "MGPS Installation",
    message: "We are planning to set up a new 100-bed hospital in Aurangabad and need a complete MGPS installation. Please share your quotation for oxygen, vacuum, and medical air pipeline system with manifold room setup, 150 outlet points, and alarm systems. Also interested in modular OT setup for 2 operation theaters.",
    status: "new",
    createdAt: serverTimestamp(),
  });
  console.log("   ✅ Sample enquiry created\n");

  console.log("🎉 Seed complete! All data has been populated.");
  console.log("   📦 26 Products");
  console.log("   🔧 6 Services");
  console.log("   🏗️  8 Projects");
  console.log("   📩 1 Sample Enquiry");
  console.log("   ⚙️  Site Settings");
  console.log("\n🌊 Ocean MGPS is ready to go!");

  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
