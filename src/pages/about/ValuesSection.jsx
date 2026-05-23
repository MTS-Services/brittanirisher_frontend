import React from 'react';
import { Heart, Target, Users, Star } from 'lucide-react';

const Icons = [Heart, Target, Users, Star];

export default function ValuesSection({ values }) {
  return (
    <section className='relative px-4 py-14 sm:px-6 lg:px-8 lg:py-20'>
      <div  className='mx-auto container text-center'>
        <h2 className='font-playfair text-[48px] leading-none text-[#2d2d2d]'>Our Values</h2>
        <p className='mt-4 font-raleway text-[20px] leading-8 text-[#857f7a]'>The principles that guide everything we do</p>

        <div className='mt-10 grid gap-5 lg:grid-cols-4'>
          {values.map((value, idx) => {
            const IconComp = Icons[idx] || Icons[0];
            return (
              <article key={value.title} className='rounded-none bg-[#f0e9e1] px-6 py-8 text-left shadow-sm'>
                <div className='mb-4 inline-flex items-center justify-center rounded-lg bg-[#e6d7c7] p-3 text-[#6a513f]'>
                  <IconComp />
                </div>
                <h3 className='font-playfair text-xl md:text-2xl leading-none text-[#2d2d2d]'>{value.title}</h3>
                <p className='mt-4 font-raleway text-base leading-7 text-[#615d58]'>{value.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
