import React from 'react';

const StatsCardsSection = ({ cards = [] }) => (
  <section className='mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
    {cards.map((card) => {
      const Icon = card.icon;

      return (
        <div
          key={card.label}
          className='relative overflow-hidden rounded-2xl border border-[#ebe5db]  bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]'
        >
          <div className='absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#f5f3f0]' />

          <div className='relative z-10'>
            <div className='mb-5 flex h-10.5 w-10.5 items-center justify-center rounded-xl bg-[#E4E9E3]'>
              <Icon size={20} className='text-[#464E46]' />
            </div>
            <div>
              <p className='mb-1 text-base text-[#070707]'>{card.label}</p>
              <p className='text-2xl font-semibold text-[#1a1a1a]'>
                {card.value}
                {card.sub && (
                  <span className='ml-2 text-sm font-normal text-[#808080]'>
                    {card.sub}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </section>
);

export default StatsCardsSection;