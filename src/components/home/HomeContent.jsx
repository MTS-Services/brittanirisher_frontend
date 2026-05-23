import React, { memo } from "react";
import HeroSection from "./sections/HeroSection";
import FeaturedVendorsSection from "./sections/FeaturedVendorsSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import PricingSection from "./sections/PricingSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CtaSection from "./sections/CtaSection";

const HomeContent = memo(() => {
  return (
    <div
      style={{ backgroundColor: "var(--page-bg)" }}
      className="text-[#26221d]"
    >
      
      <HeroSection />
      <FeaturedVendorsSection />
      <HowItWorksSection />
      <PricingSection />
      <div className="flex justify-center">
        <img
          src="/VendorPricing-flowers.png"
          alt="Vendor pricing decoration"
          className="max-w-70 md:max-w-95 mx-auto w-full object-contain pointer-events-none "
        />
      </div>
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
});

HomeContent.displayName = "HomeContent";

export default HomeContent;
