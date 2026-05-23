import React from 'react';

export default function StorySection({ images }) {
  return (
    <section className='relative  px-4 py-14 sm:px-6 md:py-20  flex items-center overflow-hidden'>
      <div className='mx-auto max-w-7xl w-full'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-20'>
          
          <div className='max-w-xl'>
            <h2 className='font-serif text-[42px] font-normal leading-tight text-[#2d2d2d] sm:text-[48px]'>
              Our Story
            </h2>
            
            <div className='mt-6 space-y-5 font-sans text-[15px] leading-relaxed text-[#7c756e] sm:text-[16px]'>
              <p>
                Vow & Vendor was born from personal experience. Our founders, Sarah and Michael, 
                struggled to find quality wedding vendors when planning their own wedding in 2018. They 
                spent countless hours browsing outdated directories, reading inconsistent reviews, and 
                juggling communications across multiple platforms.
              </p>
              <p>
                They knew there had to be a better way. A platform that connected couples with vetted, 
                professional vendors in one beautiful, easy-to-use space. A marketplace built on trust, 
                quality, and genuine connections.
              </p>
              <p>
                Today, Vow & Vendor serves thousands of couples and vendors across the country, making 
                the wedding planning journey smoother, more enjoyable, and focused on what truly 
                matters—celebrating love.
              </p>
            </div>
          </div>

          <div className='flex justify-center lg:justify-end pt-10 lg:pt-0'>
            <div className='grid grid-cols-2 gap-5 max-w-[460px] w-full items-start'>
              
              <div className='space-y-5'>
                <div className='aspect-square overflow-hidden rounded-[24px] shadow-sm'>
                  <img 
                    src={images[0]} 
                    alt='Wedding celebration balloons' 
                    className='h-full w-full object-cover' 
                  />
                </div>
                
                <div className='aspect-[4/3] overflow-hidden rounded-[24px] shadow-sm'>
                  <img 
                    src={images[2]} 
                    alt='Holding hands with wedding rings' 
                    className='h-full w-full object-cover' 
                  />
                </div>
              </div>

              <div className='space-y-5 transform translate-y-[-30px] lg:translate-y-[-40px]'>
                <div className='aspect-[4/3] overflow-hidden rounded-[24px] shadow-sm'>
                  <img 
                    src={images[1]} 
                    alt='Bride and groom close up' 
                    className='h-full w-full object-cover' 
                  />
                </div>
                
                <div className='aspect-square overflow-hidden rounded-[24px] shadow-sm'>
                  <img 
                    src={images[3]} 
                    alt='Wedding outdoor chairs setup' 
                    className='h-full w-full object-cover' 
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}