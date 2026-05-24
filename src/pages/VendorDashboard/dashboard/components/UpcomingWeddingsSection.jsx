
const UpcomingWeddingsSection = ({ weddings }) => {
  const sampleWeddings = weddings || [
    { couple: 'Eleanor & Julian', date: 'Sept 14, 2024', venue: 'The Glass House, NY', image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=150&auto=format&fit=crop&q=60' },
    { couple: 'Sophia & Marcus', date: 'Oct 02, 2024', venue: 'Ritz-Carlton Ballroom', image: 'https://images.unsplash.com/photo-1519225495846-b9cf906c249a?w=150&auto=format&fit=crop&q=60' }
  ];

  return (
    <div className="flex-1">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-playfair text-[28px] font-medium tracking-wide text-[#1c1c1c]">
          Upcoming Weddings
        </h2>
        <button
          type="button"
          className="font-raleway text-[12px] tracking-wide text-[#707070] underline underline-offset-4 hover:text-[#1c1c1c]"
        >
          View Calendar
        </button>
      </div>

      <div className="space-y-4">
        {sampleWeddings.map((wedding, idx) => (
          <article
            key={idx}
            className="flex items-center gap-6 rounded-2xl border border-[#f3f3f3] border-l-[6px] border-l-[#3a4439] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
          >
            <img
              src={wedding.image}
              alt=""
              className="h-19 w-19 rounded-[14px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-playfair text-[24px] font-medium leading-tight text-[#222222]">
                {wedding.couple}
              </h3>
              <p className="mt-1.5 font-raleway text-[15px] font-medium tracking-wide text-[#7a827a]">
                {wedding.date} • {wedding.venue}
              </p>
            </div>

            <div className="flex items-center pr-2">
              <span className="rounded-full bg-[#f1f5f0] px-4 py-1.5 font-raleway text-[11px] font-bold uppercase tracking-[1.5px] text-[#556153]">
                Photography
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default UpcomingWeddingsSection;