import React from "react";
import { BadgeCheck } from "lucide-react";

export default function SubscriptionBanner({
  vendorName = "Sarah Photography Studio",
  planName = "Starter",
  planPrice = "$79",
  expiryDate = "5/12/2026",
  description = "Manage your subscription, keep your profile active, and continue receiving quality leads from brides.",
  onUpgrade,
  // Pass your exported pattern image via this prop
  patternImageSrc = "/pattern-bg.png" 
}) {
  return (
    <section className="relative flex w-full overflow-hidden rounded-lg border border-[#ebe5db] bg-[#F7F5F1] px-4 py-4 shadow-sm sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      
      {/* Right Side Image 
        Using absolute positioning so it bleeds to the edges perfectly 
      */}
      <div className="absolute inset-y-0 right-0 z-0 hidden w-1/2 lg:block">
        <img
          src="/right.webp"
          alt="Background Pattern"
          className="h-full w-full object-cover object-left-top opacity-90"
        />
      </div>

      {/* Left Side Content */}
      <div className="relative z-10 w-full max-w-2xl lg:w-[60%]">
        <div className="inline-flex font-raleway items-center gap-1.5 rounded-full bg-[#B6C5B1] px-3.5 py-1.5 text-xs font-medium text-white shadow-sm">
          <BadgeCheck size={16} strokeWidth={2} />
          Subscription Active
        </div>

        <h1 className="mt-5 max-w-xl font-playfair text-2xl leading-tight text-[#111111] sm:text-4xl font-medium ">
          Welcome back, {vendorName}
        </h1>

        <p className="mt-4 max-w-xl text-base font-raleway leading-relaxed text-[#57534e]">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap gap-10 sm:gap-14">
          <div className="font-raleway">
            <div className="text-base text-black font-raleway">
              Active Package
            </div>
            <div className="mt-2 text-2xl font-medium text-[#111111]">
              {planName}
            </div>
          </div>
          
          <div className="font-raleway">
            <div className="text-base text-black font-raleway">
              Price
            </div>
            <div className="mt-2 text-2xl font-medium text-[#111111]">
              {planPrice}
              <span className="ml-1 text-[13px] text-[#7a756f] font-normal">/month</span>
            </div>
          </div>
          
          <div className="font-raleway">
            <div className="text-base text-black font-raleway">
              Expiry Date
            </div>
            <div className="mt-2 text-2xl font-medium text-[#111111]">
              {expiryDate}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onUpgrade}
          className="mt-8 inline-flex font-raleway items-center rounded-xl bg-[#A3B79C] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#8d9f87]"
        >
          Upgrade Plan
        </button>
      </div>
    </section>
  );
}