import React from 'react';
import { DollarSign } from 'lucide-react';

const summaryCards = [
  { title: 'Total Budget', value: '$128,430' },
  { title: 'Expend Budget', value: '$28,430' },
  { title: 'Remaining Budget', value: '$100,000' },
];

const BudgetSummaryCards = () => {
  return (
    <div className='mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3 font-raleway'>
      {summaryCards.map((card) => (
        <article
          key={card.title}
          className='relative min-h-29 overflow-hidden rounded-2xl border border-[#00000029] bg-white px-4 py-3'
        >
          <div className='relative z-1 inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#E4E9E3] text-[#464E46]'>
            <DollarSign size={18} strokeWidth={2} />
          </div>
          <p className='relative z-1 mb-0 mt-2.5 text-base font-medium text-[#505050]'>{card.title}</p>
          <h2 className='relative z-1 m-0 text-[1.7rem] tracking-[0.01em] font-playfair text-[#171717] md:text-[2rem]'>
            {card.value}
          </h2>
          <span
            className='absolute -right-8 -top-8 h-23 w-23 rounded-full bg-[#ebebeb]'
            aria-hidden='true'
          />
        </article>
      ))}
    </div>
  );
};

export default BudgetSummaryCards;
