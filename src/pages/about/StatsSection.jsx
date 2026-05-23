import React from 'react';

const DECOR = '/Our_Values.png';

export default function StatsSection({ stats }) {
  const duplicatedStats = [...stats, ...stats];

  return (
    <section className='relative px-4 pt-0'>
   
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className='relative mx-auto -mt-14.5 max-w-277.5 overflow-visible'>
        <img
          src={DECOR}
          alt=''
          aria-hidden='true'
          className='pointer-events-none absolute left-0 top-15 md:top-20 z-30  w-30 translate-x-[-39%] -translate-y-[40%]  lg:block xl:w-45'
        />
        <img
          src={DECOR}
          alt=''
          aria-hidden='true'
          className='pointer-events-none absolute right-0 top-7 z-30  w-30 -rotate-80 translate-x-[32%] -translate-y-1/2 scale-x-[-1] lg:block xl:w-45'
        />

        <div className='relative z-20 overflow-hidden rounded-none bg-[#f4f0ea] px-6 py-7 shadow-[0_14px_30px_rgba(63,73,63,0.08)] sm:px-10'>
          
          <div className='flex w-max items-center gap-12 animate-marquee md:hidden'>
            {duplicatedStats.map(([value, label], index) => (
              <div 
                key={`${label}-${index}`} 
                className='flex flex-row items-center gap-2 shrink-0 pr-4'
              >
                <span className='font-playfair text-[22px] leading-none text-[#0f0f0f]'>
                  {value}
                </span>
                <span className='font-raleway text-[13px] leading-none text-[#615d58] whitespace-nowrap'>
                  {label}
                </span>
                <span className='ml-6 text-[#615d58]/40'>•</span>
              </div>
            ))}
          </div>

          <div className='hidden md:grid md:grid-cols-4 md:gap-4 md:text-center'>
            {stats.map(([value, label]) => (
              <div key={label} className='flex flex-col gap-1 text-center'>
                <span className='font-playfair text-[32px] leading-none text-[#0f0f0f]'>
                  {value}
                </span>
                <span className='font-raleway text-[16px] leading-6 text-[#615d58]'>
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}