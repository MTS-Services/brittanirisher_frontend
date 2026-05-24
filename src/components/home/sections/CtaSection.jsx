import React, { memo } from 'react';

const CtaSection = memo(() => {
  return (
    <section className='relative overflow-hidden z-10  px-4 pb-0 mb-10  sm:px-6 lg:px-8'>
      <div className='mx-auto container'>
        <div className='relative overflow-hidden rounded-sm px-6 py-14  bg-[#474f47]   text-center text-white shadow-sm sm:px-10 sm:py-16'>
          <div className='mx-auto max-w-5xl'>
            <h2 className='font-serif text-4xl m text-white sm:text-5xl'>Ready to Plan Your Dream Wedding?</h2>
            <p className='mt-4 text-base leading-7 text-white/75 sm:text-xl '>
              Join thousands of couples who found their perfect vendors on Vow & Vendor
            </p>
            <div className='mt-8 flex flex-wrap justify-center gap-3'>
              <a
                href='#vendors'
                className='rounded-sm bg-[#d0d8cd] px-5 py-3 text-sm font-medium text-[#3f493f] transition-transform duration-200 hover:-translate-y-0.5'
              >
                Start Browsing Vendors
              </a>
              <a
                href='#pricing'
                className='rounded-sm border border-[#E0E0E0] px-5 py-3 text-sm font-medium text-white/85 transition-transform duration-200 hover:-translate-y-0.5'
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

CtaSection.displayName = 'CtaSection';

export default CtaSection;