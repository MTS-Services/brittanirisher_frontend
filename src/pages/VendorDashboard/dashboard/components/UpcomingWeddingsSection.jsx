import React from "react";
import { Link } from "react-router-dom";

const UpcomingWeddingsSection = ({ weddings = [] }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex-1">
      <div className="mb-6 flex items-baseline justify-between gap-3">
        <h2 className="font-playfair text-2xl font-medium tracking-wide text-[#1c1c1c] md:text-[28px]">
          Upcoming Weddings
        </h2>
        <Link
          to="/vendor/bookings"
          type="button"
          className="shrink-0 font-raleway text-sm tracking-wide text-[#707070] hover:text-[#1c1c1c]"
        >
          View Calendar
        </Link>
      </div>

      <div className="space-y-4">
        {weddings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#f3f3f3] bg-white p-8 text-center font-raleway text-[#7a827a]">
            No upcoming weddings found.
          </div>
        ) : (
          weddings.map((wedding) => (
            <article
              key={wedding.id}
              className="rounded-2xl border border-[#f3f3f3] border-l-[6px] border-l-[#3a4439] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[14px] bg-[#f1f5f0] font-playfair text-xl font-bold text-[#3a4439] sm:h-20 sm:w-20">
                    {wedding.coupleName
                      ? wedding.coupleName.charAt(0).toUpperCase()
                      : "W"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-playfair text-xl font-medium leading-none text-[#222222] sm:text-2xl sm:leading-tight">
                      {wedding.coupleName || "Unknown Couple"}
                    </h3>

                    <p className="mt-2 font-raleway text-base leading-relaxed font-medium tracking-wide text-[#7a827a] sm:mt-1.5 sm:text-lg">
                      <span className="block sm:inline">
                        {formatDate(wedding.weddingDate)}
                      </span>
                      <span className="hidden sm:inline"> • </span>
                      <span className="block sm:inline">
                        {wedding.venueName} ({wedding.location})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:self-center sm:pr-2">
                  <span className="rounded-full bg-[#f1f5f0] px-4 py-1.5 font-raleway text-[11px] font-bold uppercase tracking-[1.5px] text-[#556153]">
                    {wedding.status || "BOOKED"}
                  </span>
                  <span className="rounded-full bg-[#3a4439] px-3 py-1.5 font-raleway text-[11px] font-bold text-white">
                    ${wedding.price}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default UpcomingWeddingsSection;
