import React, { memo, useMemo, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Check,
  X,
  ChevronLeft,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Heart,
} from "lucide-react";
import { useGetVendorDetailQuery,useSendEnquiryMutation } from "../../src/store/features/public/publicApi"; 
import { useSaveVendorMutation } from "../../src/store/features/couple/coupleDashboard";
// import {  } from "../../src/store/features/couple/coupleDashboard"; 
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
  return (
    <article
      className={`relative rounded-lg border p-4 md:p-6 flex flex-col h-full shadow-sm ${
        plan.badge
          ? "border-[#4f5b4d] bg-[#474f47] text-white scale-[1.02]"
          : "border-[#e4dbcf] bg-white text-[#2a241e]"
      }`}
    >
      {plan.badge && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99a897] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white whitespace-nowrap">
          {plan.badge}
        </span>
      )}

      <h3 className="mt-5 font-playfair text-3xl">{plan.packageName}</h3>
      <div className="mt-3 flex items-end gap-1">
        <span className="font-playfair font-bold text-4xl leading-none">
          ${Number(plan.price).toLocaleString()}
        </span>
        <span className={`pb-1 text-sm ${plan.badge ? "text-white" : "text-[#857F7A]"}`}>
          /package
        </span>
      </div>
      <p className={`mt-4 mb-3 font-raleway text-base md:text-lg leading-7 ${plan.badge ? "text-white" : "text-[#857F7A]"}`}>
        {plan.shortDescription || "No description provided for this package."}
      </p>
      <div className={`border-t ${plan.badge ? "border-white/20" : "border-[#e4dbcf]"}`} />
      <ul className="mt-6 mb-6 space-y-3 text-sm flex-1">
        {plan.features?.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 font-raleway">
            <Check size={16} className="text-[#16B21B] shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
});

const PricingGrid = ({ packages }) => {
  if (!packages || packages.length === 0) {
    return <p className="text-[#857F7A] font-raleway mt-4">No packages available for this vendor.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto grid gap-8 md:gap-5 lg:grid-cols-3 auto-rows-fr mt-8">
      {packages.map((plan) => (
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
  const enquiryRef = useRef(null);

  const { data: response, isLoading, isError } = useGetVendorDetailQuery(id);
  const [saveVendor, { isLoading: isSaving }] = useSaveVendorMutation();
  
  const [sendEnquiry, { isLoading: isInquiring }] = useSendEnquiryMutation();
  
  const vendor = response?.data;

  useSEO({
    title: vendor ? `${vendor.businessName} — Vendor` : "Vendor details",
    description: vendor ? vendor.aboutMe : "Vendor details",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [bookingStatus, setBookingStatus] = useState("idle");
  const [month, setMonth] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    if (vendor && typeof vendor.isFavorite !== "undefined") {
      setIsFavorite(vendor.isFavorite);
    }
  }, [vendor]);

  const heroImages = useMemo(() => {
    const arr = [];
    if (vendor?.coverImage) {
      arr.push(vendor.coverImage);
    }
    if (vendor?.portfolioImages && vendor.portfolioImages.length > 0) {
      vendor.portfolioImages.forEach((img) => {
        if (img.mediaUrl) arr.push(img.mediaUrl);
      });
    }
    while (arr.length < 3) {
      arr.push("/dummy-image-square.jpg");
    }
    return arr;
  }, [vendor]);

  useEffect(() => {
    setHeroIndex(0);
    setSelectedDate("");
    setBookingStatus("idle");
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 text-center font-raleway">
        <p className="text-lg">Loading vendor profile...</p>
      </div>
    );
  }

  if (isError || !vendor) {
    return (
      <div className="container mx-auto py-20 text-center font-raleway">
        <p className="text-lg text-red-500">Vendor not found or failed to load profile.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#3a3028] text-white rounded"
        >
          Go back
        </button>
      </div>
    );
  }

  const prevHero = () => setHeroIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
  const nextHero = () => setHeroIndex((i) => (i + 1) % heroImages.length);

  const availableSet = new Set(vendor.availableDates || []);
  const bookedSet = new Set(vendor.bookedDates || []);
  
  const serviceHighlights = vendor.highlightedServices || [];
  const days = buildMonthMatrix(month.getFullYear(), month.getMonth());

  const prevMonth = () => setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  const nextMonth = () => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));

  const handleBook = () => {
    if (!selectedDate) {
      return;
    }
    setBookingStatus("loading");
    setTimeout(() => {
      setBookingStatus("done");
      window.alert(`Booking request sent for ${formatDate(selectedDate)} — ${vendor.businessName}`);
    }, 700);
  };

  const handleSendEnquiry = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !phone || !email) {
      return;
    }

    const enquiryPayload = {
      vendorId: id, 
      senderName: name,
      senderPhone: phone,
      senderEmail: email,
      message: message || "",
      status: "NEW"
    };

    try {
      await sendEnquiry(enquiryPayload).unwrap();
      form.reset();
    } catch (error) {
    }
  };

  const handleToggleFavorite = async () => {
    const previousState = isFavorite;
    setIsFavorite(!previousState);

    try {
      await saveVendor({ vendorId: id }).unwrap();
    } catch (error) {
      setIsFavorite(previousState);
      window.alert("Failed to update favorite status. Please try again.");
    }
  };

  return (
    <div className="relative container mx-auto pt-8 font-serif px-4">
      <img
        src="/Service_Highlights.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-470 z-50 hidden w-56 translate-x-1/4 -translate-y-1/4 md:block lg:w-40"
      />
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-base text-[#4A4A4A] inline-flex items-center gap-1.5 font-raleway bg-transparent border-none cursor-pointer"
        >
          <ChevronLeft size={22} /> Back
        </button>
      </div>

      {/* Hero Layout */}
      <div className="overflow-hidden rounded-md shadow-sm border border-[#eadfcd] bg-white">
        <div className="relative">
          <img
            src={heroImages[heroIndex]}
            alt={`${vendor.businessName} image ${heroIndex + 1}`}
            className="w-full h-70 md:h-96 object-cover"
          />
          <button
            onClick={prevHero}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full hover:bg-white shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextHero}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 md:p-2 rounded-full hover:bg-white shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-[#201c18] capitalize">
              {vendor.businessName}
            </h1>
            {vendor.category?.name && (
              <div className="py-1 mt-2 px-3 bg-[#e8dfd3] inline-flex rounded-full text-xs font-raleway text-[#4a3f35]">
                <span>{vendor.category.name}</span>
              </div>
            )}
            <div className="flex flex-wrap font-raleway items-center gap-x-4 gap-y-2 mt-4 text-sm text-[#6B6B6B]">
              <span className="flex items-center gap-1"><MapPin size={18} /> {vendor.location}</span>
              <span className="flex items-center gap-1"><Mail size={18} /> {vendor.user?.email}</span>
              {vendor.phone && (
                <span className="flex items-center gap-1"><Phone size={18} /> {vendor.phone}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              className="flex items-center justify-center p-2 bg-white border border-[#eadfcd] rounded-full transition-colors disabled:opacity-70"
              onClick={handleToggleFavorite}
              disabled={isSaving}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                size={24}
                className={isFavorite ? "fill-[#D4A574] text-[#D4A574]" : "text-[#D4A574]"}
              />
            </button>
            <a
              href="#enquiry"
              className="px-5 py-2.5 font-raleway bg-[#D4A574] hover:bg-[#c39463] text-white rounded text-sm font-medium transition-colors"
            >
              Send Inquiry
            </a>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className="relative overflow-visible">
        <section className="relative py-14">
          <div className="relative text-center">
            <h2 className="font-playfair mb-2 text-2xl text-[#2a241e] md:text-[30px]">
              Packages &amp; Pricing
            </h2>
            <PricingGrid packages={vendor.packages} />
          </div>
        </section>
      </div>

      {/* Grid: About / Calendar / Enquiry */}
      <section className="grid grid-cols-1 md:grid-cols-3 pb-14 gap-6">
        {/* About Me */}
        <div className="bg-[#faf9f6] rounded-md shadow-sm p-4 md:p-6 border border-[#eadfcd]">
          <h2 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-3 border-b border-[#ddd6cd] mb-4">
            About Me
          </h2>
          <p className="text-base font-raleway text-[#4a3f35] leading-relaxed whitespace-pre-line">
            {vendor.aboutMe || "No introduction written yet."}
          </p>
        </div>

        {/* Availability Calendar */}
        <div className="bg-[#faf9f6] rounded-md shadow-sm p-4 md:p-6 font-raleway flex flex-col justify-between border border-[#eadfcd]">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ddd6cd]">
              <h2 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl">
                Available Dates
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-[#6b5e52]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#b0a89c]" /> Booked</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#5c6e58]" /> Available</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="text-[#4a3f35] p-1 hover:opacity-75 bg-transparent border-none cursor-pointer">
                <ChevronLeft size={20} />
              </button>
              <span className="text-lg font-playfair font-semibold text-[#2a241e]">
                {monthLabel(month)}
              </span>
              <button onClick={nextMonth} className="text-[#4a3f35] p-1 hover:opacity-75 bg-transparent border-none cursor-pointer">
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#8a7a6a] mb-2 tracking-wider">
              {["SUN", "MO", "TU", "WED", "TH", "FR", "SA"].map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-sm">
              {days.map((dt, i) => {
                if (!dt) return <div key={`blank-${i}`} className="py-2" />;
                const iso = dt.toISOString().slice(0, 10);
                const isAvailable = availableSet.has(iso);
                const isBooked = bookedSet.has(iso);
                const isSelected = selectedDate === iso;

                if (isSelected) {
                  return (
                    <div key={iso} className="flex items-center justify-center py-1">
                      <button className="w-8 h-8 rounded-full bg-[#6b7c65] text-white text-xs font-semibold flex items-center justify-center cursor-pointer border-none">
                        {dt.getDate()}
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={iso}
                    onClick={() => { if (isAvailable) setSelectedDate(iso); }}
                    disabled={!isAvailable}
                    className={`text-center py-1.5 text-sm rounded transition-colors ${
                      isBooked
                        ? "text-[#c8bfb5] line-through cursor-not-allowed bg-[#f0ede6]/40"
                        : "isAvailable"
                        ? "text-[#4a3f35] font-semibold hover:bg-[#6b7c65] hover:text-white cursor-pointer"
                        : "text-[#c8bfb5] cursor-default"
                    }`}
                  >
                    {dt.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleBook}
              disabled={bookingStatus === "loading"}
              className="w-full px-4 py-2.5 bg-[#6b7c65] hover:bg-[#5c6e58] text-white text-sm font-medium rounded tracking-wide transition-colors cursor-pointer disabled:opacity-50"
            >
              {bookingStatus === "loading" ? "Requesting..." : "Request Booking"}
            </button>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-[#faf9f6] rounded-md shadow-sm p-4 md:p-6 border border-[#eadfcd]" id="enquiry" ref={enquiryRef}>
          <h2 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-3 border-b border-[#ddd6cd] mb-4">
            Send Inquiry
          </h2>
          <form onSubmit={handleSendEnquiry} className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway">Name</label>
              <input name="name" required placeholder="Enter your full name" className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway">Phone Number</label>
              <input name="phone" required placeholder="Enter your phone number" className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway">Email</label>
              <input name="email" type="email" required placeholder="Enter your email address" className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1a1a1a] mb-1 font-raleway">Message</label>
              <textarea name="message" placeholder="Write how we can help you" rows={4} className="w-full px-3 py-2 border border-[#ddd6cd] rounded text-sm font-raleway text-[#4a3f35] bg-white placeholder-[#b0a89c] outline-none focus:border-[#b0a89c] resize-none" />
            </div>
            <button 
              type="submit" 
              disabled={isInquiring}
              className="w-full mt-2 px-4 py-2.5 bg-[#6b7c65] hover:bg-[#5c6e58] text-white text-sm font-medium rounded transition-colors cursor-pointer disabled:opacity-50"
            >
              {isInquiring ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="relative mb-14 overflow-hidden rounded-md border border-[#eadfcd] bg-[#fbf7f0] px-4 py-6 shadow-sm md:px-6 md:py-7">
        <div className="relative">
          <h4 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl">
            Service Highlights
          </h4>
          {serviceHighlights.length > 0 ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {serviceHighlights.map((h, index) => (
                <div key={index} className="flex items-start gap-2 text-[#6b5e52]">
                  <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#e0a15f] text-[#e0a15f]">
                    <Check size={10} />
                  </span>
                  <span className="font-raleway text-sm leading-6">{h}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm font-raleway text-[#857F7A] mt-2">No highlights specified.</p>
          )}

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <div className="rounded-md bg-white/85 px-4 py-3 ring-1 ring-[#eadfcd]">
              <p className="text-[10px] uppercase tracking-widest text-[#a08a76] font-raleway font-semibold">Experience</p>
              <p className="mt-0.5 font-playfair text-lg text-[#2a241e]">{vendor.experienceYears || "N/A"}</p>
            </div>
            <div className="rounded-md bg-white/85 px-4 py-3 ring-1 ring-[#eadfcd]">
              <p className="text-[10px] uppercase tracking-widest text-[#a08a76] font-raleway font-semibold">Specialty</p>
              <p className="mt-0.5 font-playfair text-lg text-[#2a241e] capitalize">{vendor.speciality || "N/A"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {vendor.portfolioImages && vendor.portfolioImages.length > 0 && (
        <section className="mb-14">
          <h4 className="font-playfair text-xl font-semibold text-[#2a241e] md:text-2xl pb-4">
            Portfolio
          </h4>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {vendor.portfolioImages.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#eadfcd]">
                <img
                  src={item.mediaUrl}
                  alt="Portfolio media"
                  className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-36"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default VendorDetails;