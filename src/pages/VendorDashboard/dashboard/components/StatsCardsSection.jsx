const StatCard = ({ card }) => {
  const Icon = card.icon;

  return (
    <div
      className='relative overflow-hidden rounded-lg border border-[#e2e2e2] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.03)]'
      style={{ minHeight: 100 }}
    >
      <div className='absolute right-0 top-0 h-14 w-14 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#f0efeb]' />
      <div className='relative flex h-full flex-col justify-between'>
        <div className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e5e7eb] bg-[#f8faf8] text-[#5c665b]'>
          <Icon size={16} strokeWidth={1.8} />
        </div>
        <div>
          <div className='font-raleway text-[12px] leading-4 text-[#4a5154]'>
            {card.label}
          </div>
          <div className='mt-1 font-raleway text-[16px] font-medium leading-6 text-[#070707]'>
            {card.value}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCardsSection = ({ cards }) => (
  <section className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
    {cards.map((card) => (
      <StatCard key={card.label} card={card} />
    ))}
  </section>
);

export default StatsCardsSection;
