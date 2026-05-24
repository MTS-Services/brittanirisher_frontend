
const UpcomingWeddingsSection = ({ weddings }) => {
  const sampleWeddings = weddings || [
    { couple: 'Eleanor & Julian', date: 'Sept 14, 2024', venue: 'The Glass House, NY', image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=150&auto=format&fit=crop&q=60' },
    { couple: 'Sophia & Marcus', date: 'Oct 02, 2024', venue: 'Ritz-Carlton Ballroom', image: 'https://images.unsplash.com/photo-1519225495846-b9cf906c249a?w=150&auto=format&fit=crop&q=60' }
  ];

  return (
    <div className="flex-1">
      <div className="mb-6 flex items-baseline justify-between gap-3">
        <h2 className="font-playfair text-2xl font-medium tracking-wide text-[#1c1c1c] md:text-[28px]">
          Upcoming Weddings
        </h2>
        <button
          type="button"
          className="shrink-0 font-raleway text-[12px] tracking-wide text-[#707070] underline underline-offset-4 hover:text-[#1c1c1c]"
        >
          View Calendar
        </button>
      </div>

      <div className="space-y-4">
        {sampleWeddings.map((wedding, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-[#f3f3f3] border-l-[6px] border-l-[#3a4439] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <img
                  src={wedding.image}
                  alt=""
                  className="h-40 w-full rounded-[14px] object-cover sm:h-30 sm:w-30 sm:shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-playfair text-[32px] font-medium leading-none text-[#222222] sm:text-[24px] sm:leading-tight">
                    {wedding.couple}
                  </h3>
                  <p className="mt-2 font-raleway text-[16px] leading-relaxed font-medium tracking-wide text-[#7a827a] sm:mt-1.5 sm:text-[15px]">
                    <span className="block sm:inline">{wedding.date}</span>
                    <span className="hidden sm:inline"> • </span>
                    <span className="block sm:inline">{wedding.venue}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center sm:shrink-0 sm:self-center sm:pr-2">
                <span className="rounded-full bg-[#f1f5f0] px-4 py-1.5 font-raleway text-[11px] font-bold uppercase tracking-[1.5px] text-[#556153]">
                  Photography
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UpcomingWeddingsSection;