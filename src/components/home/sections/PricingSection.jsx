import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Search, X } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$00',
    period: '/month',
    description: 'Perfect for new wedding professionals just starting out.',
    features: [
      'Profile listing',
      'Portfolio (10 items)',
      'Direct Leads',
      'Basic Support',
    ],
    excluded: ['Featured Placement', 'Analytics Dashboard','Review Management'],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$25',
    period: '/month',
    description: 'The most popular choice for established small businesses.',
    featured: true,
    features: [
      'Priority Listing',
      'Unlimited Portfolio',
      'Lead Notifications',
      'Review management',
      'Basic support',
    ],
    excluded: ['Top-tier placement ','Top-Tier Placement'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$75',
    period: '/month',
    description: 'Maximum exposure for the wedding industry leaders.',
    features: [
      'Top-tier placement',
      'Unlimited everything',
      'Advanced analytics',
      'Account manager',
      'Lead Verification',
    ],
    excluded: [],
  },
];

const PricingCard = memo(({ plan }) => {
  const navigate = useNavigate();
  return (
    <article
      className={`relative rounded-lg border p-4 md:p-6 flex flex-col h-full shadow-sm ${
        plan.featured
          ? 'border-[#4f5b4d] bg-[#474f47] text-white scale-[1.02]'
          : 'border-[#e4dbcf] bg-white text-[#2a241e]'
      }`}
    >
    {plan.featured && (
      <span className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#99a897] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white'>
        Most Popular
      </span>
    )}

    {/* <div className='flex h-14 w-14 items-center justify-center rounded-sm bg-[#a69f95] text-[#FFFFFF]'>
      <Search size={28} />
    </div> */}

    <h3 className='mt-5 font-playfair text-3xl'>{plan.name}</h3>
    <div className='mt-3 flex items-end gap-1'>
      <span className='font-playfair font-bold text-5xl leading-none'>{plan.price}</span>
      <span className={`pb-1 text-sm ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`}>
        {plan.period}
      </span>
    </div>
    <p className={`mt-4 mb-3 font-raleway text-base md:text-lg leading-7 ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`}>
      {plan.description}
    </p>
  <div className={` border-t ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`} />
    <ul className='mt-6 mb-6 space-y-3 text-sm'>
      {plan.features.map((feature) => (
        <li key={feature} className='flex items-center gap-2 font-raleway '>
          <Check size={16} className={plan.featured ? 'text-[#16B21B]' : 'text-[#16B21B]'} />
          <span className='text-sm '>{feature}</span>
        </li>
      ))}
      {plan.excluded.map((feature) => (
        <li key={feature} className='flex font-raleway  items-center gap-2 opacity-80'>
          <X size={16} className={plan.featured ? 'text-white/70' : 'text-[#6b6b6b]'} />
          <span >{feature}</span>
        </li>
      ))}
    </ul>

    {/* <button
      type='button'
      onClick={() => navigate('/login')}
      className={`mt-auto w-11/12 mx-auto h-12 rounded-sm text-sm font-medium flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 ${
        plan.featured
          ? 'bg-[#c8d2c4] text-[#425044]'
          : 'bg-[#d6ddcf] text-[#4f5b4d]'
      }`}
    >
      Select Plan
    </button> */}
    </article>
  );
});

PricingCard.displayName = 'PricingCard';

const PricingSection = memo(() => {
  return (
    <section id='pricing' className='relative overflow-hidden pt-14 sm:pt-20 md:pb-6'>
      {/* <div className='absolute left-0 top-10 h-52 w-52 rounded-full  blur-3xl' /> */}
      {/* <div className='absolute right-0 bottom-10 h-56 w-56 rounded-full  blur-3xl' /> */}

      <div className='mx-auto max-w-360 px-4 sm:px-6 lg:px-8'>
        <header className='mx-auto max-w-3xl text-center'>
          
          <h2 className='font-serif text-4xl md:text-6xl text-[#201c18] sm:text-5xl'>Vendor Pricing</h2>
          <p className='mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway w-4/6 mx-auto'>
            Choose the perfect plan to showcase your services, connect with couples, and grow your business.
          </p>
        </header>

        <div className='mt-10 max-w-6xl mx-auto grid gap-8 md:gap-5 lg:grid-cols-3 auto-rows-fr'>
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
      {/* Decorative image removed from here — placed between sections in HomeContent */}
    </section>
  );
});

PricingSection.displayName = 'PricingSection';

export default PricingSection;