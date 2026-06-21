import React from "react";
import { Check } from "lucide-react";

export default function PackagesGrid({ packages }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
      {packages.map((p) => (
        <div
          key={p.id}
          className={`relative rounded-lg p-6 ${
            p.recommended
              ? "bg-[#464E46] text-white shadow-xl transform scale-[1.02]"
              : "bg-[#F7F5F1] text-gray-900"
          }`}
        >
          {p.recommended && (
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#96A795] text-white px-5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-full whitespace-nowrap shadow-sm">
              Recommended
            </div>
          )}

          <h3
            className={`text-2xl font-semibold font-playfair mb-3 ${
              p.recommended ? "text-white" : "text-gray-900"
            }`}
          >
            {p.title}
          </h3>
          <p className="text-3xl font-playfair mb-2">{p.price}</p>
          <p
            className={`text-base mb-6 ${
              p.recommended ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {p.description}
          </p>

          <hr
            className={`mb-6 ${
              p.recommended ? "border-white/20" : "border-gray-200"
            }`}
          />

          <ul className="space-y-3.5">
            {p.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check
                  size={16}
                  className={`shrink-0 mt-0.5 ${
                    p.recommended ? "text-white" : "text-gray-400"
                  }`}
                  strokeWidth={2.5}
                />
                <span
                  className={`text-base leading-tight ${
                    p.recommended
                      ? "text-white"
                      : "text-black/90"
                  }`}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
