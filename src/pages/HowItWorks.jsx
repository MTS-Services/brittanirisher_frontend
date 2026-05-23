import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ROUTES } from '../config';

const HERO_IMAGE = '/How_It_Works.png';
const FLOWER_SEPARATOR_IMAGE = '/How_It_Works_flowers.png';
const FLOWER_SEPARATOR = '/VendorPricing-flowers.png';
const TRANSITION_FLORAL_IMAGE = '/Bloom_and_Petal.png';

const COUPLES_PILL_ICON = 'https://www.figma.com/api/mcp/asset/8ffcb619-8715-4fe6-85e0-e6970a166b6c';
const VENDORS_PILL_ICON = 'https://www.figma.com/api/mcp/asset/ea16240c-ac9b-4ba5-92cc-1bf73f5223b4';

const COUPLES_STEPS = [
  {
    icon: 'https://www.figma.com/api/mcp/asset/46952b84-7c7b-42fa-99fc-5896da0db9fd',
    title: '1. Search & Filter',
    text: 'Browse our carefully curated directory of premium vendors. Filter by location, budget, style, and availability to find your perfect matches.',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/ae755608-093c-4711-be59-0e1ff7581574',
    title: '2. Review & Compare',
    text: 'Read authentic reviews from real couples, view stunning portfolios, and compare pricing to make informed decisions.',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/4b1c88d0-f2fa-4b84-a479-2abc87498411',
    title: '3. Connect Directly',
    text: 'Message vendors directly through our platform. Ask questions, share your vision, and schedule consultations with ease.',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/ab1d347c-a97e-4758-a355-0f92f795e507',
    title: '4. Book & Manage',
    text: 'Secure your vendors with confidence. Track all your bookings, contracts, and communications in one organized dashboard.',
  },
];

const VENDOR_STEPS = [
  {
    icon: 'https://www.figma.com/api/mcp/asset/b30d7ee2-1b64-4e88-bf53-82f59ea74f9c',
    title: '1. Create Your Profile',
    text: 'Build a stunning profile showcasing your best work, services, and pricing. Our easy-to-use tools make setup a breeze.',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/46952b84-7c7b-42fa-99fc-5896da0db9fd',
    title: '2. Get Discovered',
    text: 'Reach thousands of engaged couples actively searching for vendors like you. Our platform puts you in front of qualified leads.',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/4b1c88d0-f2fa-4b84-a479-2abc87498411',
    title: '3. Connect with Clients',
    text: 'Respond to inquiries, share proposals, and book consultations all within our streamlined messaging system.',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/ae755608-093c-4711-be59-0e1ff7581574',
    title: '4. Build Your Reputation',
    text: 'Collect verified reviews from satisfied clients. Your stellar reputation helps you stand out and book more weddings.',
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    icon: 'https://www.figma.com/api/mcp/asset/066a900e-4f1a-4165-a4bb-6b17b4b6d738',
    title: 'Vetted Professionals',
    text: 'Every vendor is carefully screened and verified to ensure the highest quality standards',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/2919a25e-d907-4fed-8de5-3ab64795cfbb',
    title: 'Save Time',
    text: 'Find all your wedding vendors in one place instead of searching across multiple platforms',
  },
  {
    icon: 'https://www.figma.com/api/mcp/asset/b457e4c9-881b-4187-b592-1d9e2f03d9ec',
    title: 'Trusted by Thousands',
    text: 'Join the community of happy couples and successful vendors who love our platform',
  },
];




const SectionBadge = memo(({ icon, label }) => (
  <div className='inline-flex flex-col lg:flex-row items-center gap-3 lg:gap-2 rounded-lg border border-[rgba(45,45,45,0.08)] bg-white px-5 py-3 lg:px-5 lg:py-2 shadow-sm'>
    <img src={icon} alt='' aria-hidden='true' className='h-4 w-4' />
    <span className='font-raleway text-[16px] leading-6 text-[#857f7a] text-center lg:text-left'>{label}</span>
  </div>
));

SectionBadge.displayName = 'SectionBadge';

const StepCard = memo(({ icon, title, text, theme = 'light' }) => (
  <article
    className={`flex flex-col lg:flex-row gap-6 rounded-lg p-6 lg:p-8 items-center lg:items-start ${theme === 'sage' ? 'bg-[#d7dfd6]' : 'bg-[#f0e9e1]'}`}
  >
    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DAC3B4]' >
      <img src={icon} alt='' aria-hidden='true' className='h-6 w-6' />
    </div>
    <div className='flex flex-1 flex-col gap-3 text-center lg:text-left'>
      <h3 className='font-playfair text-[24px] leading-none text-[#2d2d2d]'>{title}</h3>
      <p className='font-raleway text-[20px] leading-7 text-[#857f7a]'>{text}</p>
    </div>
  </article>
));

StepCard.displayName = 'StepCard';

const WhyChooseCard = memo(({ icon, title, text }) => (
  <article className='bg-[#f0e9e1] rounded-lg'>
    <div className='flex flex-col lg:flex-row gap-6 p-6 lg:p-8 items-center lg:items-start'>
      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DAC3B4]'>
        <img src={icon} alt='' aria-hidden='true' className='h-6 w-6' />
      </div>
      <div className='flex flex-1 flex-col gap-3 text-center lg:text-left'>
        <h3 className='font-playfair text-[28px] leading-tight text-[#2d2d2d]'>{title}</h3>
        <p className='font-raleway text-[20px] leading-7 text-[#857f7a]'>{text}</p>
      </div>
    </div>
  </article>
));

WhyChooseCard.displayName = 'WhyChooseCard';

const HowItWorks = memo(() => {
  useSEO({
    title: 'How It Works',
    description: 'Learn how couples discover and book wedding vendors.',
    keywords: ['how it works', 'wedding planning', 'process'],
  });

  return (
    <div className='overflow-hidden bg-[#f4f0ea] text-[#2d2d2d]'>
      {/* Hero Section */}
      <section className='relative w-full h-150'>
        <img src={HERO_IMAGE} alt='' aria-hidden='true' className='absolute inset-0 h-full w-full object-cover object-center' />
        <div className='absolute inset-0 bg-black/30' />

        <div className='absolute inset-0 flex items-center justify-center px-4 text-center text-white'>
          <div className='max-w-180 space-y-4'>
            <h1 className='font-playfair text-[56px] leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]'>
              How It Works
            </h1>
            <p className='mx-auto max-w-2xl font-raleway text-[24px] leading-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]'>
              Whether you&apos;re planning your dream wedding or a vendor looking to grow your business, we make it effortless
            </p>
          </div>
        </div>
      </section>

      <div className='relative z-50 h-0 pointer-events-none'>
        <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-95 md:w-107.5 lg:w-117.5'>
          <img src={FLOWER_SEPARATOR_IMAGE} alt='' aria-hidden='true' className='w-full object-contain opacity-95' />
        </div>
      </div>

      {/* For Couples Section */}
      <section id='how-it-works-couples' className='relative bg-[#f4f0ea] px-4 pb-24 sm:px-6 lg:px-8 py-14 md:py-20'>
        <div className='mx-auto flex max-w-7xl flex-col items-center gap-11'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <SectionBadge icon={COUPLES_PILL_ICON} label='For Couples' />
            <h2 className='font-playfair text-[44px] leading-tight text-[#2d2d2d]'>Find Your Dream Team</h2>
          </div>

          <div className='grid w-full gap-5 lg:grid-cols-2'>
            {COUPLES_STEPS.map((step) => (
              <StepCard key={step.title} {...step} />
            ))}
          </div>

          <Link
            to={ROUTES.BROWSE_VENDORS}
            className='inline-flex items-center justify-center rounded-lg bg-[#a7b9a6] px-6 py-3 font-raleway text-[16px] leading-6 text-[#464e46] transition-transform duration-200 hover:-translate-y-0.5'
          >
            Start Browsing Vendors
          </Link>
        </div>
      </section>

      <div className='relative z-50 h-0 pointer-events-none'>
        <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-95 md:w-107.5 lg:w-90'>
          <img src={FLOWER_SEPARATOR} alt='' aria-hidden='true' className='w-full object-contain opacity-95' />
        </div>
      </div>

      {/* For Vendors Section */}
      <section className='relative bg-[#e4e9e3] px-4 py-14 md:py-20 sm:px-6 lg:px-8 '>
        <div className='mx-auto flex max-w-319.5 flex-col items-center gap-11'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <SectionBadge icon={VENDORS_PILL_ICON} label='For Vendors' />
            <h2 className='font-playfair text-[44px] leading-tight text-[#2d2d2d]'>Grow Your Business</h2>
          </div>

          <div className='grid w-full gap-5 lg:grid-cols-2'>
            {VENDOR_STEPS.map((step) => (
              <StepCard key={step.title} theme='sage' {...step} />
            ))}
          </div>

          <Link
            to={ROUTES.LOGIN}
            className='inline-flex items-center justify-center rounded-lg bg-[#a7b9a6] px-6 py-3 font-raleway text-[16px] leading-6 text-[#464e46] transition-transform duration-200 hover:-translate-y-0.5'
          >
            Join as a Vendor
          </Link>
        </div>

        <div className='pointer-events-none absolute left-1/2 -bottom-20 z-10 w-65 -translate-x-1/2 sm:w-85 md:w-95 lg:w-80'>
          <img src={FLOWER_SEPARATOR} alt='' aria-hidden='true' className='w-full object-contain rotate-180 opacity-90' />
        </div>
        
      </section>

      {/* Why Choose Section */}
      <section className='relative overflow-hidden bg-[#f4f0ea] px-4  sm:px-6 lg:px-8 py-14 md:py-20'  >
        <div className='mx-auto max-w-384'>
          <h2 className='text-center font-playfair text-[44px] leading-tight text-[#2d2d2d]'>
            Why Choose Vow &amp; Vendor
          </h2>

          <div className='mt-10 grid gap-5 lg:grid-cols-3'>
            {WHY_CHOOSE_ITEMS.map((item) => (
              <WhyChooseCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
});

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;