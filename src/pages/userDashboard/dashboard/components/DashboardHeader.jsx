import React from 'react';

const DashboardHeader = ({ headlineName }) => (
  <header className='mb-4'>
    <h1 className=' text-2xl md:text-4xl text-[#1a1a1a] mb-3'>
      Welcome back, {headlineName}
    </h1>
    <p className='mt-2.5 font-raleway text-base text-[#606060] font-light'>
      Your dream wedding is coming together beautifully
    </p>
  </header>
);

export default DashboardHeader;
