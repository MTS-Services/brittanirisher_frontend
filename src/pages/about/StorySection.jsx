import React from "react";

export default function StorySection({ images = [] }) {
  return (
    <section className="relative px-4 md:mt-6 py-14 sm:px-6 md:py-20 flex items-center overflow-hidden">
      <img
        src="/Our_Story_2.png"
        alt="decorative flowers"
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute left-30 top-8 w-90 opacity-90"
      />
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl mt-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-[#2d2d2d] sm:text-[48px]">
              Our Story
            </h2>

            <div className="mt-6 space-y-5 font-sans text-[15px] leading-relaxed text-[#7c756e] sm:text-[16px] text-justify">
              <p>
                Vow & Vendor was created by Brittani Risher after noticing a
                clear trend in the wedding industry: brides were spending
                countless hours searching across multiple social media pages,
                websites, and group recommendations just to find the right
                vendors for their day. While there are many wedding platforms
                available, it became clear that what most brides truly wanted
                was a more personalized, streamlined, and intentional
                experience.
              </p>
              <p>
                Brittani envisioned a platform that removes the overwhelm and
                replaces it with clarity. Vow & Vendor allows brides to filter
                through exactly what they're looking for, by style, service,
                budget, and location, so they can confidently connect with
                vendors who truly match their vision.
              </p>
              <p>
                At its heart, Vow & Vendor was built to simplify the planning
                process, support small wedding businesses, and help every couple
                find the right people to bring their day to life without the
                stress of endless searching.
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end pt-10 lg:pt-0">
            <div className="grid grid-cols-2 gap-5 max-w-[460px] w-full items-start">
              <div className="space-y-5 transform translate-y-[-30px] lg:translate-y-[-40px]">
                <div className="aspect-square overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={images[0] || "https://via.placeholder.com/400"}
                    alt="Wedding celebration balloons"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={images[2] || "https://via.placeholder.com/400x300"}
                    alt="Holding hands with wedding rings"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-5 ">
                <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={images[1] || "https://via.placeholder.com/400x300"}
                    alt="Bride and groom close up"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="aspect-square overflow-hidden rounded-lg shadow-sm">
                  <img
                    src={images[3] || "https://via.placeholder.com/400"}
                    alt="Wedding outdoor chairs setup"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}