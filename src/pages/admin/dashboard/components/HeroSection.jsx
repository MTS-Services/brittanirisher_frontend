import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Mail, Phone } from "lucide-react";

export default function HeroSection({
  imageUrl,
  imageUrls = [],
  name = "Grace Photography",
  category = "Photography",
  location = "Bay Area, California",
  email = "debra.holt@example.com",
  phone = "(629) 555-0129",
}) {
  const slides = useMemo(() => {
    const fallbackImage =
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80";

    const candidates = [imageUrl, ...imageUrls].filter(Boolean);
    const unique = [...new Set(candidates)];
    return unique.length > 0 ? unique : [fallbackImage];
  }, [imageUrl, imageUrls]);

  const [activeIndex, setActiveIndex] = useState(0);
  const isSingleSlide = slides.length <= 1;

  useEffect(() => {
    if (activeIndex > slides.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, slides.length]);

  const handlePrev = () => {
    if (isSingleSlide) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (isSingleSlide) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full mx-auto rounded-[20px] overflow-hidden bg-[#F9F8F5] border border-gray-200/60 shadow-sm">
      
      {/* Image Carousel Section (Full width, no padding) */}
      <div className="relative h-75 sm:h-112.5 w-full">
        <img
          src={slides[activeIndex]}
          alt="Wedding Couple"
          className="w-full h-full object-cover object-center"
        />
        
        {/* Carousel Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={isSingleSlide}
          aria-label="Previous image"
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white flex items-center justify-center rounded-full text-gray-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={isSingleSlide}
          aria-label="Next image"
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white flex items-center justify-center rounded-full text-gray-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} strokeWidth={2} />
        </button>
        
        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={`slide-dot-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`rounded-full shadow-sm transition-all ${
                index === activeIndex ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Vendor Details Section */}
      <div className="px-8 py-7 space-y-4">
        
        {/* Vendor Name */}
        <h1 className="text-4xl font-playfair text-gray-900 tracking-tight">
          {name}
        </h1>

        {/* Category Tag */}
        <div>
          <span className="inline-block px-4 py-1 bg-[#EBE5DD] text-gray-700 text-[13px] font-medium rounded-full">
            {category}
          </span>
        </div>

        {/* Contact Details */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-[14px] text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-400" />
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-gray-400" />
            <span>{phone}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}