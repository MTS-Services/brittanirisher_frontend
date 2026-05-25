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
  BadgeCheck,
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
  const portfolioImages = (vendor.portfolio || []).map((src, index) => ({
    src,
    alt: `${vendor.name} portfolio ${index + 1}`,
  }));
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
    <div className="relative container mx-auto py-8 font-serif px-4">
      <img
        src="/Service_Highlights.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-500 z-50 hidden w-56 translate-x-1/4 -translate-y-1/4 md:block lg:w-40"
      />
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-base text-[#4A4A4A] inline-flex items-center gap-1.5"
          >
            <ChevronLeft size={22} /> Back
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="overflow-hidden rounded-md  shadow-sm mb-6">
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
            <div className="flex font-raleway items-center gap-3 mt-4 text-sm md:text-base text-[#6B6B6B]">
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
                className="flex items-center gap-2 px-1 py-1 bg-white  rounded text-sm"
                onClick={() => setIsFavorite((s) => !s)}
              >
                <Heart
                  size={29}
                  className={`text-[#D4A574] bg-isFavorite ? '#D4A574' : 'transparent' rounded-full p-0.5 transition-colors'}`}
                />
               
              </button>
              <a
                href="#enquiry"
                className="px-4 py-2 font-raleway bg-[#D4A574] text-[#FFFFFF] rounded text-base"
              >
                Send Enquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Packages */}
      <div className="relative pb-10 overflow-visible ">
        <img
          src="/Packages_Pricing_Left.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -left-22 bottom-70 hidden w-44 -translate-x-1/2 translate-y-1/2 md:block lg:w-68"
        />
        <img
          src="/Packages_Pricing.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-1/2 hidden w-40 -translate-y-1/2 translate-x-1/2 md:block lg:w-68"
        />

        <section className="relative py-14">
          <div className="relative text-center">
            <h2 className="mb-8 font-playfair text-2xl text-[#2a241e] md:text-[30px]">
              Packages &amp; Pricing
            </h2>
            <PricingGrid />
          </div>
        </section>
      </div>


  {/* About / Calendar / Enquiry */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 md:pb-20">

        {/* About Me */}
        <div className="bg-[#faf9f6] rounded-md shadow-sm p-6">
          <h2 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-2 ">About Me</h2>
          <p className="text-base font-raleway text-[#4a3f35] leading-relaxed">
            {vendor.about}
          </p>
        </div>

        {/* Available Date */}
        <div className="bg-[#faf9f6] rounded-md shadow-sm p-6 font-raleway flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-2">
                Available Date
              </h2>
              <div className="flex items-center gap-3 text-[11px] text-[#6b5e52]">
                <span className="flex items-center gap-1 text-sm">
                  <span className="w-2 h-2 rounded-full bg-[#b0a89c] inline-block" />
                  Booked
                </span>
                <span className="flex items-center gap-1 text-sm ">
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
                <ChevronLeft size={22} />
              </button>
              <span className="text-lg md:text-2xl font-playfair font-semibold text-[#828282]">
                {monthLabel(month)}
              </span>
              <button
                onClick={nextMonth}
                className="text-[#4a3f35] px-2 hover:opacity-70 bg-transparent border-none"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-sm font-raleway text-[#8a7a6a] font-semibold mb-2 tracking-wide">
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
                      <div className="w-8 h-8 rounded-full bg-[#6b7c65] text-white text-sm font-semibold flex items-center justify-center cursor-pointer">
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
                    className={`text-center py-2 text-base font-raleway rounded ${
                      isBooked
                        ? "text-[#c8bfb5]  cursor-default font-raleway"
                        : isAvailable
                        ? "text-[#4a3f35] font-semibold hover:bg-[#f0ede6]"
                        : "text-[#c8bfb5] cursor-default"
                    }`}
                  >
                    {dt.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <button
              onClick={handleBook}
              className="inline-flex w-full items-center justify-center px-4 py-2.5 bg-[#6b7c65] hover:bg-[#5c6e58] text-white text-sm md:text-base font-raleway font-medium rounded tracking-wide transition-colors"
            >
              {bookingStatus === "loading" ? "Requesting..." : "Request Booking"}
            </button>
            {/* <p className="text-xs text-[#8a7a6a] font-raleway italic text-center">
              Select an available date from the calendar before requesting booking.
            </p> */}
          </div>
        </div>

        {/* Send Enquiry */}
        <div
          className="bg-[#faf9f6] rounded-md shadow-sm p-6"
          id="enquiry"
          ref={enquiryRef}
        >
          <h2 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-2">
            Send Enquiry
          </h2>
          <form onSubmit={handleSendEnquiry} className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-raleway font-semibold text-[#1a1a1a] mb-1">
                Name
              </label>
              <input
                name="name"
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-[#1a1a1a] mb-1">
                Email
              </label>
              <input
                name="email"
                placeholder="Enter your email address"
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]"
              />
            </div>
            <div>
              <label className="block text-sm font-raleway font-semibold text-[#1a1a1a] mb-1">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Write how can I help you"
                rows={4}
                className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-[13px] text-[#4a3f35] bg-[#faf9f6] placeholder-[#b0a89c] outline-none focus:border-[#b0a89c] resize-none"
              />
            </div>

            <div className="mt-2 flex flex-row items-center gap-4">
              <button
                type="submit"
                className="inline-flex flex-1 items-center justify-center px-4 py-2.5 bg-[#6b7c65] hover:bg-[#5c6e58] text-white text-sm md:text-base font-raleway font-medium rounded tracking-wide transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

      </section>

      <section className="relative mb-8 overflow-hidden rounded-3xl border border-[#eadfcd] bg-[#fbf7f0] px-6 py-6 shadow-sm md:px-8 md:py-7">
        {/* <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#edd7c6]/70 blur-2xl" aria-hidden="true" />
        <div className="absolute right-4 top-3 hidden h-20 w-20 md:block" aria-hidden="true">
          <div className="absolute right-0 top-0 h-16 w-16 rounded-full border border-[#d9b7a3]/60" />
          <div className="absolute right-2 top-2 h-12 w-12 rounded-full border border-[#e6cbbf]/70" />
          <div className="absolute right-5 top-5 h-6 w-6 rounded-full bg-[#d9a6a0]/70" />
        </div> */}

        <div className="relative">
          <h4 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl">
            Service Highlights
          </h4>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1.15fr_1fr_1fr]">
            <div className="space-y-2.5">
              {serviceHighlights.slice(0, 3).map((h) => (
                <div key={h} className="flex items-start gap-2 text-[#6b5e52]">
                  <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#e0a15f] text-[10px] text-[#e0a15f]">
                   <Check />
                  </span>
                  <span className="font-raleway text-sm leading-6 md:text-[15px]">{h}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {serviceHighlights.slice(3, 6).map((h) => (
                <div key={h} className="flex items-start gap-2 text-[#6b5e52]">
                  <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#e0a15f] text-[10px] text-[#e0a15f]">
<Check />                  </span>
                  <span className="font-raleway text-sm leading-6 md:text-[15px]">{h}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {serviceHighlights.slice(6, 9).map((h) => (
                <div key={h} className="flex items-start gap-2 text-[#6b5e52]">
                  <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#e0a15f] text-[10px] text-[#e0a15f]">
                    <Check />
                  </span>
                  <span className="font-raleway text-sm leading-6 md:text-[15px]">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-md bg-white/85 px-4 py-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] ring-1 ring-[#eadfcd]">
              <p className="text-xs uppercase tracking-widest text-[#a08a76] font-raleway">Experience</p>
              <p className="mt-1 font-playfair text-xl text-[#2a241e] ">8 years</p>
            </div>
            <div className="rounded-md bg-white/85 px-4 py-4 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset] ring-1 ring-[#eadfcd]">
              <p className="text-xs uppercase tracking-widest text-[#a08a76] font-raleway">Specialty</p>
              <p className="mt-1 font-playfair text-lg text-[#2a241e] md:text-xl">Romantic &amp; Editorial</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="mb-16">
        <h4 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-2">
          Portfolio
        </h4>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {portfolioImages.map((item, i) => (
            <div key={item.alt} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-[#eadfcd]">
              <img
                src={item.src}
                alt={item.alt}
                className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-36"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VendorDetails;