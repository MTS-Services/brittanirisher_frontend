import React, { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = memo(() => {
  return (
    <section className='relative w-full z-10 bg-[#fbf8f5]'>
      {/* Mobile: Image on top */}
      <div className='relative w-full aspect-[4/3] lg:hidden'>
        <img
          src='/brittanirisher.png'
          alt='Bride'
          className='h-full w-full object-cover object-top'
        />
        <div className='absolute -bottom-12 left-0 z-[9999] max-w-[130px] mix-blend-multiply pointer-events-none'>
          <img
            src='/flowers_left.png'
            alt=''
            className='object-contain w-full'
          />
        </div>
      </div>

      {/* Mobile: Text content */}
      <div className='lg:hidden px-5 py-14 bg-[#fbf8f5]'>
        <h1 className='font-serif text-4xl font-normal leading-[1.1] text-[#1b1815]'>
          Find Your <br />
          Perfect <span className='text-[#5b6451]'>Wedding</span> <br />
          Vendors
        </h1>
        <p className='mt-5 text-base font-normal leading-relaxed text-[#414141]'>
          Connect with premium, vetted wedding professionals who will bring your
          vision to life.
        </p>
        <div className='mt-7 grid grid-cols-2 gap-3'>
          <a
            href='#couples'
            className='flex items-center justify-center gap-2 rounded-md bg-[#A7B9A6] px-5 py-3 text-sm text-[#464E46] transition-all duration-200 hover:bg-[#7d947b]'
          >
            I&apos;m a Couple <ArrowRight size={16} />
          </a>
          <a
            href='#vendors'
            className='flex items-center justify-center rounded-md border border-[#000000] bg-transparent px-5 py-3 text-sm text-[#1b1815] transition-all duration-200 hover:bg-[#1b1815]/5'
          >
            I&apos;m a Vendor
          </a>
        </div>
      </div>

      {/* Desktop: Full-screen with bg image */}
      <div className='relative hidden lg:flex md:min-h-screen md:items-center'>
        <div className='absolute inset-0 z-0'>
          <img
            src='/brittanirisher.png'
            alt='Bride'
            className='h-full w-full object-cover object-center'
          />
        </div>

        <div className='relative z-10 container mx-auto px-6 lg:px-8 py-20'>
          <div className='text-left'>
            <h1 className='font-serif text-5xl font-normal leading-[1.1] text-[#1b1815] md:text-6xl lg:text-[72px]'>
              Find Your <br />
              Perfect <span className='text-[#5b6451]'>Wedding</span> <br />
              Vendors
            </h1>
            <p className='mt-6 text-base font-normal leading-relaxed text-[#414141] sm:text-lg md:max-w-md'>
              Connect with premium, vetted wedding professionals who will bring
              your vision to life.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <Link
                to='/signup?audience=couple'
                className='inline-flex items-center gap-2 rounded-md bg-[#A7B9A6] px-6 py-3 text-sm md:text-base text-[#464E46] transition-all duration-200 hover:bg-[#7d947b]'
              >
                I&apos;m a Couple <ArrowRight size={16} />
              </Link>
              <Link
                to='/signup?audience=vendor'
                className='inline-flex items-center rounded-md border border-[#000000] bg-transparent px-6 py-3 text-sm md:text-base text-[#1b1815] transition-all duration-200 hover:bg-[#1b1815]/5'
              >
                I&apos;m a Vendor
              </Link>
            </div>
          </div>
        </div>

        {/* Flower — desktop */}
        <div className='absolute -bottom-29 left-0 z-[9999] max-w-[280px] mix-blend-multiply pointer-events-none'>
          <img src='/flowers_left.png' alt='' className='object-contain' />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
