import React from "react";
import { MapPin, Mail, Phone, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VendorHeader({ vendor }) {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
  

      {/* Vendor Header */}
      <div className="space-y-4 border-b border-gray-100 pb-8">
        <h1 className="text-4xl font-serif text-gray-900">{vendor.name}</h1>
        <span className="inline-block px-3 py-1 bg-[#F5EFE6] text-[#8C7A6B] text-[11px] uppercase tracking-wider font-semibold rounded-md">
          {vendor.category}
        </span>
        <div className="flex flex-wrap items-center gap-6 text-[13px] text-gray-500">
          <span className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" /> {vendor.location}
          </span>
          <span className="flex items-center gap-2">
            <Mail size={14} className="text-gray-400" /> {vendor.email}
          </span>
          <span className="flex items-center gap-2">
            <Phone size={14} className="text-gray-400" /> {vendor.phone}
          </span>
        </div>
      </div>
    </div>
  );
}
