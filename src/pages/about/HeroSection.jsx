import React from 'react';

export default function HeroSection({ image }) {
  return (
    <section className='relative h-100 md:h-150 overflow-hidden'>
      <img src={image} alt='' aria-hidden='true' className='absolute inset-0 h-full w-full object-cover object-center' />
      <div className='absolute inset-0 bg-[rgba(45,45,45,0.34)]' />

      <div className='absolute inset-0 flex items-center justify-center px-4 text-center text-white'>
        <div style={{ maxWidth: 781 }} className='space-y-3'>
          <div className='mx-auto inline-flex items-center rounded-full bg-[rgba(255,255,255,0.47)] px-4 md:px-6 py-1.5 font-raleway text-[16px] font-medium leading-6 text-[#414141]'>
           Our Story 
          </div>
          <h1 className='font-playfair text-3xl  md:text-4xl lg:text-5xl leading-none'>Making Wedding Planning Effortless &amp; Joyful</h1>
          <p className='font-raleway text-base md:text-xl leading-8'>
            We believe every couple deserves a trusted vendor team and a planning experience that feels calm, creative, and connected.
          </p>
        </div>
      </div>
    </section>
  );
}
