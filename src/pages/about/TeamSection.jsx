import React from 'react';

export default function TeamSection({ teamImage }) {
  return (
    <section className='relative px-4  sm:px-6 lg:px-8 '>
      <div style={{ maxWidth: 614 }} className='mx-auto text-center'>
        <img src='/VendorPricing-flowers.png' alt='' aria-hidden='true' className='mx-auto w-65 opacity-80' />
        <h2 className='mt-2 font-playfair text-[48px] leading-none text-[#2d2d2d]'>Meet Our Team</h2>
        <p className='mt-4 font-raleway text-[20px] leading-8 text-[#857f7a]'>Passionate people dedicated to creating a joyful planning journey</p>

        <div style={{ maxWidth: 420 }} className='mx-auto mt-10 overflow-hidden rounded-2xl bg-white shadow-[0_18px_40px_rgba(63,73,63,0.12)]'>
          <img src={teamImage} alt='Founder' className='h-90 w-full object-cover object-center' />
          <div className='px-6 py-5'>
            <h3 className='font-playfair text-[24px] leading-none text-[#2d2d2d]'>Brittani Risher</h3>
            <p className='mt-2 font-raleway text-[16px] leading-6 text-[#857f7a]'>Founder &amp; CEO</p>
          </div>
        </div>
      </div>
    </section>
  );
}
