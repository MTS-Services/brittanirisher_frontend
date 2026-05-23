import React from "react";

export default function AboutSection({ bio }) {
  return (
    <div className="max-w-6xl space-y-4 py-4">
      <h2 className="text-2xl font-playfair text-gray-900">About Me</h2>
      <div className="space-y-4 text-base leading-relaxed text-black/90">
        {bio.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
