// ============================================
// Contact Page — Clean, Bulletproof & Flawless
// ============================================

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import toast from "react-hot-toast";
import { DEFAULT_SETTINGS, SERVICE_INTERESTS } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { useSettings } from "@/hooks/useSettings";

function ContactFormContent() {
  const settings = useSettings();
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || searchParams.get("component") || searchParams.get("industry") || "";
  const prefilledProduct = searchParams.get("product") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    serviceInterest: prefilledService || prefilledProduct || "MGPS Turnkey Installation",
    message: prefilledProduct
      ? `Hello, I'm interested in getting specifications and a quote for: ${prefilledProduct}.`
      : prefilledService
      ? `Hello, I'm interested in your service: ${prefilledService}. Please share scope & BOQ details.`
      : "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (prefilledService || prefilledProduct) {
      setFormData((prev) => ({
        ...prev,
        serviceInterest: prefilledService || prefilledProduct || prev.serviceInterest,
        message: prefilledProduct
          ? `Hello, I'm interested in getting specifications and a quote for: ${prefilledProduct}.`
          : prefilledService
          ? `Hello, I'm interested in your service: ${prefilledService}. Please share scope & BOQ details.`
          : prev.message,
      }));
    }
  }, [prefilledService, prefilledProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Submit to Web3Forms API for instant email notification
      const { submitToWeb3Forms } = await import("@/lib/web3forms");
      await submitToWeb3Forms({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        organization: formData.organization,
        serviceInterest: formData.serviceInterest,
        message: formData.message,
        source: "Contact Page Enquiry Form",
      });

      // 2. Save enquiry to Firestore / Local database for Admin Dashboard tracking
      const { addDocument } = await import("@/lib/firestore");
      await addDocument("enquiries", {
        ...formData,
        status: "new",
      });

      setSubmitted(true);
      toast.success("Thank you! Your enquiry has been submitted successfully.");
    } catch {
      toast.error("Failed to submit enquiry. Please try WhatsApp or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappNumber = settings.whatsapp || "917775904214";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      {/* Left Column: Direct Contact Info */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[var(--color-primary)] opacity-80 block mb-2">
            DIRECT CONTACT
          </span>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Reach Our Engineering Office Directly
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Our technical team in Chh. Sambhaji Nagar (Aurangabad) & Jalna is available for free site surveys, BOQ estimation, and emergency support across Maharashtra & India.
          </p>
        </div>

        {/* Info Items List */}
        <div className="space-y-4 pt-2">
          {/* Location */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
              <MapPin size={18} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Headquarters & Workshop
              </span>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {settings.address}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
              <Phone size={18} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Direct Helplines
              </span>
              <div className="flex flex-col gap-1 text-sm font-semibold text-slate-800">
                {settings.phones.map((phone: string) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {phone.startsWith("+91") ? phone : `+91 ${phone}`}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
              <Mail size={18} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Official Email
              </span>
              <a
                href={`mailto:${settings.email}`}
                className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
              >
                {settings.email}
              </a>
            </div>
          </div>

          {/* Business Hours */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mt-0.5">
              <Clock size={18} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                Business Hours
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {settings.businessHours}
              </p>
            </div>
          </div>
        </div>

        {/* Simple Green WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Ocean MGPS team! I would like to enquire about hospital gas pipeline systems.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl p-4 sm:p-5 flex items-center justify-between no-underline transition-all shadow-xs hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/20 text-white flex items-center justify-center flex-shrink-0">
              <WhatsAppIcon size={22} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-bold block text-white">Chat on WhatsApp</span>
              <p className="text-xs text-white/90">Instant technical support & product quotes</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3.5 py-2 rounded-full bg-white text-[#25D366] hidden sm:inline-block shadow-xs">
            Open Chat →
          </span>
        </a>
      </div>

      {/* Right Column: Enquiry Form — Unboxed */}
      <div className="w-full lg:w-7/12">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Enquiry Submitted Successfully!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to Ocean MGPS. Our engineering team in Chh. Sambhaji Nagar will review your request and contact you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn btn-primary btn-lg mt-4 justify-center"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="pb-4 mb-6 border-b border-slate-200/80">
              <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                Send Technical Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Fill in your project specifications for a fast estimate & BOQ consultation
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-3.5 text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="e.g. Dr. Rajesh Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full h-11 px-3.5 text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-3.5 text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="you@hospital.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Hospital / Facility Name
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full h-11 px-3.5 text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  placeholder="e.g. City Multi-Specialty Hospital"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Service or Product Interest
              </label>
              <select
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
                className="w-full h-11 px-3.5 text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
              >
                <option value="">Select a service category</option>
                {SERVICE_INTERESTS.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Project Requirements / Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-3.5 text-sm font-medium rounded-md border border-slate-200 bg-white text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none leading-relaxed"
                placeholder="Specify your bed capacity, required gas outlets (O2, Vacuum, Air), manifold setup, or equipment needs..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-md shadow-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
              style={{ opacity: submitting ? 0.7 : 1 }}
            >
              {submitting ? (
                <>
                  <span className="spinner spinner-sm" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Submit Technical Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Header */}
      <section className="section pb-6 sm:pb-8" style={{ background: "var(--color-bg-primary)" }}>
        <div className="container text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{
                  background: "var(--color-primary-light)",
                  color: "var(--color-primary)",
                }}
              >
                <MapPin size={14} /> Chh. Sambhaji Nagar, Maharashtra
              </span>
            </div>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-primary-dark)" }}
            >
              Get in <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              Have a medical gas pipeline project or equipment requirement? Request a technical consultation and BOQ estimate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form & Contact Info Section — Unboxed */}
      <section className="section pt-4 pb-16 sm:pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-6xl">
          <Suspense fallback={<div className="text-center py-12">Loading form...</div>}>
            <ContactFormContent />
          </Suspense>
        </div>
      </section>

      {/* Google Maps Location — Unboxed */}
      <section className="section pt-0 pb-20" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container max-w-6xl">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/80">
              <div>
                <h3
                  className="text-lg sm:text-xl font-bold text-slate-900"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Our Headquarters Location
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chh. Sambhaji Nagar, Maharashtra 431005, India | Mon - Sat: 9:00 AM - 7:00 PM
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 hidden sm:inline-block">
                Map View
              </span>
            </div>

            <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.0!2d75.35!3d19.88!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzQ4LjAiTiA3NcKwMjEnMDAuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ocean MGPS Location — Chh. Sambhaji Nagar"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
