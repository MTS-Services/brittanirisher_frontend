import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function ServiceHighlights({ highlights, experience, specialty }) {
  return (
    <div className="bg-[#F7F5F1] rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-playfair text-gray-900">Service Highlights</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((col, colIdx) => (
          <ul key={colIdx} className="space-y-4">
            {col.map((item, itemIdx) => (
              <li
                key={itemIdx}
                className="flex items-start gap-3 text-base text-gray-600"
              >
                <CheckCircle2
                  size={16}
                  className="text-[#D4A574] shrink-0 mt-0.5"
                  strokeWidth={2}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-1">
            Experience
          </p>
          <p className="text-base text-gray-900">{experience}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm uppercase tracking-wider text-gray-400 font-semibold mb-1">
            Specialty
          </p>
          <p className="text-base text-gray-900">{specialty}</p>
        </div>
      </div>
    </div>
  );
}
