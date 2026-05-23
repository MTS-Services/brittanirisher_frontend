import React, { memo, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const ALL_TESTIMONIALS = [
  {
    id: 1,
    quote: "Mehdi and his team did a terrific job on the engineered hardwood flooring installation and walk-in closet addition. Great eye for envisioning improvements that add value to the home.",
    author: "Richard J.",
  },
  {
    id: 2,
    quote: "Outstanding job painting my entire house and replacing carpet. Completed quickly with exceptional professionalism. Highly recommend.",
    author: "Joseph G.",
  },
  {
    id: 3,
    quote: "My kitchen was in desperate need of a makeover. They helped me choose perfect cabinetry, countertops, and flooring. The result is a fresh, updated kitchen my family adores.",
    author: "Aaron P.",
  },
  {
    id: 4,
    quote: "Ricardo and his team did an amazing job ahead of schedule! We love our new floor and will recommend American Carpet to everyone.",
    author: "Andrew K.",
  },
  {
    id: 5,
    quote: "Absolutely thrilled with our bathroom renovation. The tile work is flawless and the team was courteous from start to finish. Will definitely hire again.",
    author: "Sarah M.",
  },
  {
    id: 6,
    quote: "They transformed our dated living room into something truly stunning. The attention to detail was impressive and the project stayed on budget.",
    author: "James L.",
  },
  {
    id: 7,
    quote: "From the first consultation to the final walkthrough, everything was handled with care. Our hardwood floors look absolutely beautiful.",
    author: "Emily R.",
  },
  {
    id: 8,
    quote: "The crew was professional, punctual, and meticulous. Our basement flooring and wall paneling turned out better than we ever imagined.",
    author: "Daniel W.",
  },
];

const PER_PAGE = 4;

const TestimonialCard = memo(({ testimonial }) => (
  <article className="rounded-sm bg-[#faf8f5] p-4 md:p-6 lg:p-8 shadow-[0_16px_40px_rgba(58,49,39,0.06)]">
    <div className="flex gap-1 text-[#D4A574]">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={18} className="fill-current" />
      ))}
    </div>
    <p className="mt-5 text-lg leading-7 text-[#6d655a]">{testimonial.quote}</p>
    <p className="mt-6 text-sm font-semibold text-[#1C1917]">— {testimonial.author}</p>
  </article>
));

TestimonialCard.displayName = "TestimonialCard";

const TestimonialsSection = memo(() => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(ALL_TESTIMONIALS.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = ALL_TESTIMONIALS.slice(start, start + PER_PAGE);

  const handlePrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const handleNext = () => setPage((p) => (p + 1) % totalPages);

  return (
    <section className="relative overflow-hidden pb-14 sm:pb-20">


      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <header className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="text-sm uppercase tracking-[0.20em] text-[#8a7d70]">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#201c18] sm:text-5xl">
            Love Stories
          </h2>
          <p className="mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway w-4/6 mx-auto">
            Hear from couples who found their perfect vendors with us
          </p>
          <div className="mt-5 flex items-center gap-1 text-lg text-[#F9B90A]">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} className="fill-current" />
            ))}
            <span className="ml-1 text-[#57534D]">4.9/5 on Google</span>
          </div>
        </header>

        <div className="mt-10 max-w-6xl mx-auto grid gap-5 md:grid-cols-2">
          {visible.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-10 flex justify-center items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-[#e0d9d0] text-[#8a7d70] flex items-center justify-center hover:bg-[#d4ccc2] transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-[#1a1714] text-white flex items-center justify-center hover:bg-[#2e2a26] transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="absolute right-78 bottom-24 pointer-events-none hidden md:block">
          <img
            src="/Love_Stories.png"
            alt="Love Stories decoration"
            className="w-70 h-auto object-contain opacity-90"
          />
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = "TestimonialsSection";

export default TestimonialsSection;