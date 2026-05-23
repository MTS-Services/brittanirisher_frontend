import React from "react";

export default function Portfolio({ images }) {
  return (
    <div className="bg-[#F7F5F1] rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-playfair text-gray-900">Portfolio</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="aspect-square rounded-xl overflow-hidden bg-gray-200"
          >
            <img
              src={src}
              alt={`Portfolio piece ${i + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
