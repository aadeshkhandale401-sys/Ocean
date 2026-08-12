// ============================================
// Landing Page — Ocean MGPS
// ============================================

import Hero from "@/components/sections/Hero";
import StatsBar from "@/components/sections/StatsBar";
import ServicesPreview from "@/components/sections/ServicesPreview";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import ProjectsShowcase from "@/components/sections/ProjectsShowcase";
import IndustriesServed from "@/components/sections/IndustriesServed";
import Testimonials from "@/components/sections/Testimonials";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesPreview />
      <FeaturedProducts />
      <ProjectsShowcase />
      <IndustriesServed />
      <Testimonials />
      <CTABanner />
    </>
  );
}
