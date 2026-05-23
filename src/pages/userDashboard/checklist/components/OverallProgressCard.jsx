import React from 'react';

const OverallProgressCard = ({ progressPercent, completedText }) => {
  return (
    <section className='mb-4 rounded-xl border border-[#D4A57426] bg-white px-4 py-4'>
      <div className='mb-2 flex items-center justify-between'>
        <div>
          <h2 className='m-0 text-[1.9rem] text-[#222222]'>Overall Progress</h2>
          <p className='m-0 text-base font-raleway text-[#606060]'>{completedText}</p>
        </div>
        <span className='text-[2.2rem] leading-none text-[#D4A574]'>{progressPercent}%</span>
      </div>

      <div className='h-1.75 w-full overflow-hidden rounded-full bg-[#ece8e2]'>
        <div
          className='h-full rounded-full bg-[#D4A574]'
          style={{ width: `${progressPercent}%` }}
          aria-hidden='true'
        />
      </div>
    </section>
  );
};

export default OverallProgressCard;