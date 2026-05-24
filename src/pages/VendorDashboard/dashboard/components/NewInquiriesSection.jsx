const NewInquiriesSection = ({ inquiries }) => {
  const sampleInquiries = inquiries || [
    {
      name: "Clara M.",
      service: "Wedding Planning",
      note: '"Looking for a full-service planner for...',
      time: "2h ago",
    },
    {
      name: "David L.",
      service: "Floral Design",
      note: '"Inquiry regarding availability for a...',
      time: "3h ago",
    },
  ];

  return (
    <aside className="rounded-lg border border-[#f0f0f0] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-playfair text-[28px] font-medium tracking-wide text-[#1c1c1c]">
          New Inquiries
        </h2>
        <button
          type="button"
          className="font-raleway text-sm tracking-wide text-[#707070] underline underline-offset-4 hover:text-[#1c1c1c]"
        >
          See all inquiries
        </button>
      </div>

      <div className="space-y-6">
        {sampleInquiries.map((item, idx) => (
          <article
            key={idx}
            className="border-b border-[#A7B9A6] pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-1.5 font-raleway text-[15px] text-[#707070]">
                  <span className="font-semibold text-[#1c1c1c] text-lg">
                    {item.name}
                  </span>
                  <span>•</span>
                  <span className="font-medium text-[#707070]">
                    {item.service}
                  </span>
                </div>

                <p className="mt-2.5 font-raleway text-base italic font-medium tracking-wide text-[#7e857e]">
                  {item.note}
                </p>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center rounded-lg bg-[#434d42] px-5 py-2.5 font-raleway text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#343c33]"
                >
                  See Details
                </button>
              </div>

              <div className="shrink-0 pt-0.5 text-right font-raleway text-sm font-semibold text-[#222222]">
                {item.time}
              </div>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
};

export default NewInquiriesSection;
