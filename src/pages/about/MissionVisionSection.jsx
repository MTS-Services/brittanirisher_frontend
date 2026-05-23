import React from 'react';

export default function MissionVisionSection() {
  return (
    <section className='relative bg-[#e2e8e1] px-4 py-16 sm:px-6 lg:px-8 lg:py-20'>
      <div  className='mx-auto container grid gap-5 lg:grid-cols-2'>
        <article className='rounded-none bg-[#d6ded5] p-8'>
          <h3 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>Our Mission</h3>
          <p className='mt-4 font-raleway text-[20px] leading-8 text-[#615d58]'>
            To create a thoughtful wedding planning experience that connects couples with exceptional vendors and makes every decision feel easier.
          </p>
        </article>

        <article className='rounded-none bg-[#d6ded5] p-8'>
          <h3 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>Our Vision</h3>
          <p className='mt-4 font-raleway text-[20px] leading-8 text-[#615d58]'>
            To become the trusted digital home for modern wedding planning where discovery, inspiration, and booking all live in one place.
          </p>
        </article>
      </div>
    </section>
  );
}
