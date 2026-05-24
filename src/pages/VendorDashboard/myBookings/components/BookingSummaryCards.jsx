const BookingSummaryCards = ({ cards }) => (
  <section className='mt-8 grid grid-cols-1 gap-4 xl:grid-cols-3'>
    {cards.map((card) => (
      <div
        key={card.label}
        className='relative min-h-33.75 overflow-hidden rounded-2xl border border-[#00000029] bg-white px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]'
      >
        <div className='absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#f2edea]' />
        <div className='relative flex h-full flex-col justify-between'>
          <div className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e3e8df] text-[#617062]'>
            <card.icon size={21} />
          </div>
          <div className='mt-3'>
            <div className='text-sm uppercase tracking-[0.08em] text-[#070707]'>{card.label}</div>
            <div className='mt-2 flex items-end gap-2'>
              <span className='text-3xl font-medium leading-none text-[#222]'>{card.value}</span>
              {card.meta ? <span className='pb-1 text-base text-[#6c645f]'>{card.meta}</span> : null}
            </div>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default BookingSummaryCards;
