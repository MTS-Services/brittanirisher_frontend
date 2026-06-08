import React from "react";
import { BadgeCheck } from "lucide-react";
import { useGetVendorStatusQuery } from "../../../../store/features/vendor/vendorDashboardApi";

export default function SubscriptionBanner({
  vendorName = "N/A",
  planName = "N/A",
  planPrice = "N/A",
  expiryDate = "N/A",
  description = "Manage your subscription, keep your profile active, and continue receiving quality leads from brides.",
  onUpgrade,

  patternImageSrc = "/pattern-bg.png" 
}) {
  const { data: vendorProfileResponse } = useGetVendorStatusQuery();

  const resolvedVendorName =
    vendorProfileResponse?.data?.businessName ||
    vendorProfileResponse?.data?.companyName ||
    vendorProfileResponse?.data?.fullName ||
    vendorName ||
    "Vendor";

  return (
    <section className="relative flex w-full overflow-hidden rounded-lg border border-[#ebe5db] bg-[#F7F5F1] px-4 py-4 shadow-sm sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      
   
      <div className="absolute inset-y-0 right-0 z-0 hidden w-1/2 lg:block">
        <img
          src="/right.webp"
          alt="Background Pattern"
          className="h-full w-full object-cover object-top-left opacity-90"
        />
      </div>

      {/* Left Side Content */}
      <div className="relative z-10 w-full max-w-2xl lg:w-[60%]">
        <div className="inline-flex font-raleway items-center gap-1.5 rounded-full bg-[#B6C5B1] px-3.5 py-1.5 text-xs font-medium text-white shadow-sm">
          <BadgeCheck size={16} strokeWidth={2} />
          Subscription Active
        </div>

        <h1 className="mt-5 max-w-xl font-playfair text-2xl leading-tight text-[#111111] sm:text-4xl font-medium ">
          Welcome back, {resolvedVendorName}
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