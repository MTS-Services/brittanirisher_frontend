import React, { memo, useMemo, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ArrowLeft,
  Heart,
  Check,
  X,
  ChevronLeft,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";
import ALL_VENDORS from "../data/vendors";
import { useSEO } from "../hooks/useSEO";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return iso;
  }
};

const PricingCard = memo(({ plan }) => {
  const navigate = useNavigate();
  return (
    <article
      className={`relative rounded-lg border p-4 md:p-6 flex flex-col h-full shadow-sm ${
        plan.featured
          ? "border-[#4f5b4d] bg-[#474f47] text-white scale-[1.02]"
          : "border-[#e4dbcf] bg-white text-[#2a241e]"
      }`}
    >
      {plan.featured && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99a897] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          Most Popular
        </span>
      )}

      <h3 className="mt-5 font-playfair text-3xl">{plan.name}</h3>
      <div className="mt-3 flex items-end gap-1">
        <span className="font-playfair font-bold text-5xl leading-none">
          {plan.price}
        </span>
        <span
          className={`pb-1 text-sm ${plan.featured ? "text-white" : "text-[#857F7A]"}`}
        >
          {plan.period}
        </span>
      </div>
      <p
        className={`mt-4 mb-3 font-raleway text-base md:text-lg leading-7 ${plan.featured ? "text-white" : "text-[#857F7A]"}`}
      >
        {plan.description}
      </p>
      <div
        className={`border-t ${plan.featured ? "text-white" : "text-[#857F7A]"}`}
      />
      <ul className="mt-6 mb-6 space-y-3 text-sm">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 font-raleway">
            <Check size={16} className="text-[#16B21B]" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
        {plan.excluded.map((feature) => (
          <li
            key={feature}
            className="flex font-raleway items-center gap-2 opacity-80"
          >
            <X
              size={16}
              className={plan.featured ? "text-white/70" : "text-[#6b6b6b]"}
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
});

const PricingGrid = () => {
  const PLANS = [
    {
      id: "starter",
      name: "Starter",
      price: "$00",
      period: "/month",
      description: "Perfect for new wedding professionals just starting out.",
      features: [
        "Profile listing",
        "Portfolio (10 items)",
        "Direct Leads",
        "Basic Support",
      ],
      excluded: [
        "Featured Placement",
        "Analytics Dashboard",
        "Review Management",
      ],
    },
    {
      id: "professional",
      name: "Professional",
      price: "$25",
      period: "/month",
      description: "The most popular choice for established small businesses.",
      featured: true,
      features: [
        "Priority Listing",
        "Unlimited Portfolio",
        "Lead Notifications",
        "Review management",
        "Basic support",
      ],
      excluded: ["Top-tier placement", "Top-Tier Placement"],
    },
    {
      id: "premium",
      name: "Premium",
      price: "$75",
      period: "/month",
      description: "Maximum exposure for the wedding industry leaders.",
      features: [
        "Top-tier placement",
        "Unlimited everything",
        "Advanced analytics",
        "Account manager",
        "Lead Verification",
      ],
      excluded: [],
    },
  ];

  return (
    <div className="mt-10 max-w-7xl mx-auto grid gap-8 md:gap-5 lg:grid-cols-3 auto-rows-fr">
      {PLANS.map((plan) => (
        <PricingCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
};

const monthLabel = (date) =>
  date.toLocaleDateString(undefined, { month: "long", year: "numeric" });

const buildMonthMatrix = (year, month) => {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const days = [];
  const startDay = first.getDay();
  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  return days;
};

const VendorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendorId = Number(id);
  const vendor = useMemo(
    () => ALL_VENDORS.find((v) => v.id === vendorId),
    [vendorId],
  );
  const enquiryRef = useRef(null);

  useSEO({
    title: vendor ? `${vendor.name} — Vendor` : "Vendor details",
    description: vendor ? vendor.description : "Vendor details",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("idle");
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setSelectedDate("");
    setBookingStatus("idle");
  }, [vendorId]);

  if (!vendor) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-lg">Vendor not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#3a3028] text-white rounded"
        >
          Go back
        </button>
      </div>
    );
  }

  const availableSet = new Set(vendor.availableDates || []);
  const bookedSet = new Set(vendor.bookedDates || []);
  const serviceHighlights = vendor.serviceHighlights || [];
  const portfolioImages = vendor.portfolio || [];
  const days = buildMonthMatrix(month.getFullYear(), month.getMonth());

  const prevMonth = () =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const nextMonth = () =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  const handleBook = () => {
    if (!selectedDate) {
      window.alert("Please select a date from the calendar.");
      return;
    }
    setBookingStatus("loading");
    setTimeout(() => {
      if (!vendor.bookedDates) vendor.bookedDates = [];
      vendor.bookedDates.push(selectedDate);
      vendor.availableDates = (vendor.availableDates || []).filter(
        (d) => d !== selectedDate,
      );
      setBookingStatus("done");
      window.alert(
        `Booking request sent for ${formatDate(selectedDate)} — ${vendor.name}`,
      );
    }, 700);
  };

  const handleSendEnquiry = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !phone || !email) {
      window.alert("Please fill name, phone and email");
      return;
    }
    window.alert("Enquiry sent (demo) — we will get back to you");
    form.reset();
    enquiryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto py-8 font-serif px-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-[#4A4A4A] inline-flex items-center gap-1.5"
          >
            <ChevronLeft size={22} /> Back
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="overflow-hidden rounded-md bg-white shadow mb-6">
        <div className="relative">
          <img
            src={vendor.image}
            alt={vendor.name}
            className="w-full h-96 object-cover rounded-md"
          />
          <button
            onClick={() => navigate(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
            <ChevronRight />
          </button>
        </div>
        <div className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-serif text-[#201c18]">
              {vendor.name}
            </h1>
            <div className="py-1.5 mt-2 px-4 bg-[#e8dfd3] inline-flex rounded-full">
              <span className="text-base">{vendor.category}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-sm text-[#857F7A]">
              <span><MapPin size={20} /></span>
              <span>{vendor.location}</span>
              <span><Mail size={20} /></span>
              <span>{vendor.contact?.email}</span>
              <span><Phone size={20} /></span>
              <span>{vendor.contact?.phone}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded text-sm"
                onClick={() => setIsFavorite((s) => !s)}
              >
                <Heart
                  size={14}
                  className={`text-${isFavorite ? "rose-500" : "gray-400"}`}
                />
                Save
              </button>
              <a
                href="#enquiry"
                className="px-4 py-2 bg-[#d6bfae] text-[#3a3028] rounded text-sm"
              >
                Send Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <section className="my-14 md:my-20">
        <h2 className="text-xl text-center font-serif mb-6">
          Packages & Pricing
        </h2>
        <PricingGrid />
      </section>

      {/* About / Calendar / Enquiry */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* About Me */}
        <div className="bg-[#faf9f6] rounded-md shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">About Me</h2>
          <p className="text-[13px] text-[#4a3f35] leading-relaxed">
            {vendor.about}
          </p>
        </div>

        {/* Available Date */}
        <div className="bg-[#faf9f6] rounded-md shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-[#1a1a1a]">
              Available Date
            </h2>
            <div className="flex items-center gap-3 text-[11px] text-[#6b5e52]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#b0a89c] inline-block" />
                Booked
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#5c6e58] inline-block" />
                Available
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="text-[#4a3f35] px-2 hover:opacity-70 bg-transparent border-none"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-lg font-semibold text-[#1a1a1a]">
              {monthLabel(month)}
            </span>
            <button
              onClick={nextMonth}
              className="text-[#4a3f35] px-2 hover:opacity-70 bg-transparent border-none"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] text-[#8a7a6a] font-semibold mb-2 tracking-wide">
            {["SUN", "MO", "TU", "WED", "TH", "FR", "SA"].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 text-sm">
            {days.map((dt, i) => {
              if (!dt) return <div key={`blank-${i}`} className="py-3" />;
              const iso = dt.toISOString().slice(0, 10);
              const isAvailable = availableSet.has(iso);
              const isBooked = bookedSet.has(iso);
              const isSelected = selectedDate === iso;

              if (isSelected) {
                return (
                  <div
                    key={iso}
                    className="flex items-center justify-center py-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#6b7c65] text-white text-[13px] font-semibold flex items-center justify-center cursor-pointer">
                      {dt.getDate()}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={iso}
                  onClick={() => { if (isAvailable) setSelectedDate(iso); }}
                  disabled={!isAvailable}
                  className={`text-center py-2 text-[13px] rounded ${
                    isBooked
                      ? "text-[#c8bfb5] cursor-default"
                      : isAvailable
                      ? "text-[#4a3f35] hover:bg-[#f0ede6]"
                      : "text-[#c8bfb5] cursor-default"
                  }`}
                >
                  {dt.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-4">
            <button
              onClick={handleBook}
              className="w-full px-4 py-2.5 bg-[#6b7c65] hover:bg-[#5c6e58] text-white text-[13px] font-medium rounded tracking-wide"
            >
              {bookingStatus === "loading" ? "Requesting..." : "Request Booking"}
            </button>
          </div>
        </div>

        {/* Send Enquiry */}
        <div
          className="bg-[#faf9f6] rounded-md shadow-sm p-6"
          id="enquiry"
          ref={enquiryRef}
        >
          <h2 className="text-xl font-semibold text-[#1a1a1a] mb-4">
            Send Enquiry
          </h2>
          <form onSubmit={handleSendEnquiry} className="flex flex-col gap-3">
            <div>
              <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">
                Name
              </label>
              <input
                name="name"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-[13px] text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-[13px] text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">
                Email
              </label>
              <input
                name="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-[13px] text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Write how can I help you"
                rows={4}
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-[13px] text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c] resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-[#8a9882] hover:bg-[#7a8872] text-white text-[13px] font-medium rounded mt-1 tracking-wide"
            >
              Submit
            </button>
          </form>
        </div>

      </section>

      <section className="bg-white p-6 rounded-md shadow mb-8">
        <h4 className="font-raleway text-xl mb-3">Service Highlights</h4>
        <div className="flex flex-wrap gap-3">
          {serviceHighlights.map((h) => (
            <div
              key={h}
              className="px-3 py-1 border rounded text-sm text-[#5a4a3a]"
            >
              {h}
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="mb-16">
        <h4 className="font-semibold mb-4">Portfolio</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {portfolioImages.map((img, i) => (
            <div key={img + i} className="overflow-hidden rounded-md bg-white">
              <img
                src={img}
                alt={`${vendor.name}-${i}`}
                className="w-full h-24 object-cover"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VendorDetails;