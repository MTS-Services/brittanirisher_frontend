import React from 'react';

const SuggestedCard = ({ item }) => (
  <div className='flex h-full flex-col rounded-lg font-raleway border border-[#f0eee9] p-4 transition-shadow hover:shadow-sm'>
    <div className='mb-4 flex items-center justify-between'>
      <span className='rounded-full bg-[#F6F5F2] px-3 py-1 text-[10px] font-medium text-[#6b6b6b]'>
        {item.category}
      </span>
      <span className='text-sm text-[#9a9a9a]'>{item.match}</span>
    </div>

    <h3 className='mb-1.5 text-lg
     font-medium text-[#2d2d2d]'>{item.name}</h3>

    <p className='mb-5 text-base text-[#6b6b6b]'>{item.price}</p>

    <button className='mt-auto w-full rounded-lg bg-[#A3B79C] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#8d9f87]'>
      View Details
    </button>
  </div>
);

export default SuggestedCard;
