import React, { memo } from 'react';
import { Search, HeartHandshake, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    icon: Search,
    title: 'Browse & Discover',
    text: 'Explore our curated directory of premium wedding vendors tailored to your preferences.',
  },
  {
    id: 2,
    icon: HeartHandshake,
    title: 'Connect & Compare',
    text: 'Review portfolios, compare services, and message vendors directly to find your perfect match.',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: 'Book with Confidence',
    text: 'Secure your vendors and manage your bookings in one beautiful, organized space.',
  },
];

const StepCard = memo(({ step: { icon: Icon, title, text } }) => (
  <article className='relative rounded-[1.75rem] border border-[#d3dccf] bg-[#edf1e8] p-8 text-center shadow-[0_18px_40px_rgba(63,73,63,0.08)]'>
    <div className='mx-auto grid h-12 w-12 place-items-center rounded-lg bg-[#464E46] text-white shadow-lg shadow-[#4f5b4d]/20'>
      <Icon size={28} />
    </div>
    <h3 className='mt-6 font-serif text-xl md:text-3xl text-[#2D2D2D]'>{title}</h3>
    <p className='mx-auto font-raleway mt-3 max-w-sm text-base leading-7 text-[#857F7A]'>{text}</p>
  </article>
));

StepCard.displayName = 'StepCard';

const HowItWorksSection = memo(() => {
  return (
    <section id='how-it-works' className='relative overflow-hidden bg-[#D7DFD6] py-14 md:py-20'>

      {/* LEFT flower — mobile: top-left | desktop: bottom-left */}
      <div className='pointer-events-none absolute -top-6 rotate-180 md:rotate-0 -left-10 w-[150px] mix-blend-multiply opacity-70 lg:top-auto lg:-bottom-1 lg:-left-24 lg:w-[220px] xl:w-[320px]'>
        <img
          src='/flowers-left.png'
          alt=''
          className='w-full object-contain'
        />
      </div>

      {/* RIGHT flower — mobile: bottom-right | desktop: bottom-right */}
      <div className='pointer-events-none absolute bottom-0 z-9995 md:z-0 -right-6 w-[120px] mix-blend-multiply lg:-bottom-1 lg:-right-16 lg:w-[220px] xl:w-[320px]'>
        <img
          src='/flowers-left.png'
          alt=''
          className='w-full object-contain scale-x-[-1]'
        />
      </div>

      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8'>
        <header className='mx-auto max-w-2xl text-center'>
          <h2 className='font-serif text-4xl md:text-6xl text-[#201c18] sm:text-5xl'>How It Works</h2>
          <p className='mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway'>
            Three simple steps to find your dream wedding team.
          </p>
        </header>

        <div className='mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
          {STEPS.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>

    </section>
  );
});

HowItWorksSection.displayName = 'HowItWorksSection';

export default HowItWorksSection;