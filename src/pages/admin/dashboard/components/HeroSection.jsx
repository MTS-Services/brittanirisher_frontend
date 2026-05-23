import React from "react";
import { ChevronLeft, ChevronRight, MapPin, Mail, Phone } from "lucide-react";

export default function HeroSection({ imageUrl }) {
  // Fallback image for preview
  const finalImageUrl = imageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80";

  return (
    <div className="w-full mx-auto rounded-[20px] overflow-hidden bg-[#F9F8F5] border border-gray-200/60 shadow-sm">
      
      {/* Image Carousel Section (Full width, no padding) */}
      <div className="relative h-[300px] sm:h-[450px] w-full">
        <img
          src={finalImageUrl}
          alt="Wedding Couple"
          className="w-full h-full object-cover object-center"
        />
        
        {/* Carousel Arrows */}
        <button className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white flex items-center justify-center rounded-full text-gray-700 shadow-md transition-all">
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white flex items-center justify-center rounded-full text-gray-700 shadow-md transition-all">
          <ChevronRight size={20} strokeWidth={2} />
        </button>
        
        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <span className="w-6 h-1.5 bg-white rounded-full shadow-sm"></span>
          <span className="w-1.5 h-1.5 bg-white/70 rounded-full shadow-sm"></span>
          <span className="w-1.5 h-1.5 bg-white/70 rounded-full shadow-sm"></span>
          <span className="w-1.5 h-1.5 bg-white/70 rounded-full shadow-sm"></span>
        </div>
      </div>

      {/* Vendor Details Section */}
      <div className="px-8 py-7 space-y-4">
        
        {/* Vendor Name */}
        <h1 className="text-4xl font-playfair text-gray-900 tracking-tight">
          Grace Photography
        </h1>

        {/* Category Tag */}
        <div>
          <span className="inline-block px-4 py-1 bg-[#EBE5DD] text-gray-700 text-[13px] font-medium rounded-full">
            Photography
          </span>
        </div>

        {/* Contact Details */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-[14px] text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>Bay Area, California</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-400" />
            <span>debra.holt@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-gray-400" />
            <span>(629) 555-0129</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}