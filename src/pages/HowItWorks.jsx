import React, { cloneElement, isValidElement, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ROUTES } from '../config';
import { BadgeCheck, BookmarkPlus, Clock8, Heart, MessageCircle, Search, Shield, Star } from 'lucide-react';

const HERO_IMAGE = '/How_It_Works.png';
const FLOWER_SEPARATOR_IMAGE = '/How_It_Works_flowers.png';
const FLOWER_SEPARATOR = '/VendorPricing-flowers.png';
const TRANSITION_FLORAL_IMAGE = '/Bloom_and_Petal.png';

const COUPLES_PILL_ICON = <Heart />;
const VENDORS_PILL_ICON = <Shield />;

const renderIcon = (icon, className) => {
  if (typeof icon === 'string') {
    return <img src={icon} alt='' aria-hidden='true' className={className} />;
  }

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      className: [icon.props.className, className].filter(Boolean).join(' '),
      'aria-hidden': true,
      focusable: false,
      color: 'currentColor',
      strokeWidth: 1.8,
    });
  }

  if (typeof icon === 'function') {
    return createElement(icon, {
      className,
      'aria-hidden': true,
      focusable: false,
      color: 'currentColor',
      strokeWidth: 1.8,
    });
  }

  return null;
};

const COUPLES_STEPS = [
  {
    icon: <Search />,
    title: '1. Search & Filter',
    text: 'Browse our carefully curated directory of premium vendors. Filter by location, budget, style, and availability to find your perfect matches.',
  },
  {
    icon: <Star />,
    title: '2. Review & Compare',
    text: 'Read authentic reviews from real couples, view stunning portfolios, and compare pricing to make informed decisions.',
  },
  {
    icon:<MessageCircle />,
    title: '3. Connect Directly',
    text: 'Message vendors directly through our platform. Ask questions, share your vision, and schedule consultations with ease.',
  },
  {
    icon: <BookmarkPlus />,
    title: '4. Book & Manage',
    text: 'Secure your vendors with confidence. Track all your bookings, contracts, and communications in one organized dashboard.',
  },
];

const VENDOR_STEPS = [
  {
    icon: <BadgeCheck />,
    title: '1. Create Your Profile',
    text: 'Build a stunning profile showcasing your best work, services, and pricing. Our easy-to-use tools make setup a breeze.',
  },
  {
    icon:  <Search />,
    title: '2. Get Discovered',
    text: 'Reach thousands of engaged couples actively searching for vendors like you. Our platform puts you in front of qualified leads.',
  },
  {
    icon: <MessageCircle />,
    title: '3. Connect with Clients',
    text: 'Respond to inquiries, share proposals, and book consultations all within our streamlined messaging system.',
  },
  {
    icon: <Star />,
    title: '4. Build Your Reputation',
    text: 'Collect verified reviews from satisfied clients. Your stellar reputation helps you stand out and book more weddings.',
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    icon: <Shield />,
    title: 'Vetted Professionals',
    text: 'Every vendor is carefully screened and verified to ensure the highest quality standards',
  },
  {
    icon: <Clock8 />,
    title: 'Save Time',
    text: 'Find all your wedding vendors in one place instead of searching across multiple platforms',
  },
  {
    icon:  <Heart />,
    title: 'Trusted by Thousands',
    text: 'Join the community of happy couples and successful vendors who love our platform',
  },
];




const SectionBadge = memo(({ icon, label }) => {
  const iconClassName = 'h-6 w-6 shrink-0 text-[#DAC3B4]';

  const renderedIcon = typeof icon === 'string' ? (
    <img src={icon} alt='' aria-hidden='true' className={iconClassName} />
  ) : isValidElement(icon) ? (
    cloneElement(icon, {
      className: [icon.props.className, iconClassName].filter(Boolean).join(' '),
      'aria-hidden': true,
      focusable: false,
    })
  ) : null;

  return (
    <div className='inline-flex items-center gap-2 rounded-lg border border-[rgba(45,45,45,0.08)] bg-white px-2 py-1.5 shadow-sm whitespace-nowrap'>
      {renderedIcon}
      <span className='font-raleway text-[16px] leading-6 text-[#857f7a]'>{label}</span>
    </div>
  );
});

SectionBadge.displayName = 'SectionBadge';

const StepCard = memo(({ icon, title, text, theme = 'light' }) => (
  <article
    className={`flex flex-col lg:flex-row gap-6 rounded-lg p-6 lg:p-8 items-center lg:items-start ${theme === 'sage' ? 'bg-[#d7dfd6]' : 'bg-[#f0e9e1]'}`}
  >
    <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DAC3B4] text-[#2d2d2d]'>
      {renderIcon(icon, 'h-6 w-6 shrink-0 text-[#FFFFFF]')}
    </div>
    <div className='flex flex-1 flex-col gap-3 text-center lg:text-left'>
      <h3 className='font-playfair text-[24px] leading-none text-[#2d2d2d]'>{title}</h3>
      <p className='font-raleway text-[20px] leading-7 text-[#857f7a]'>{text}</p>
    </div>
  </article>
));

StepCard.displayName = 'StepCard';

const WhyChooseCard = memo(({ icon, title, text }) => (
  <article className='bg-[#f0e9e1] rounded-lg z-100 '>
    <div className='flex flex-col lg:flex-row gap-6 p-6 lg:p-8 items-center lg:items-start'>
      <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DAC3B4] text-[#2d2d2d]'>
        {renderIcon(icon, 'h-6 w-6 shrink-0 text-[#FFFFFF]')}
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
      <section className='relative w-full h-80 md:h-150'>
        <img src={HERO_IMAGE} alt='' aria-hidden='true' className='absolute inset-0 h-full w-full object-cover object-center' />
        <div className='absolute inset-0 bg-black/30' />

        <div className='absolute inset-0 flex items-center justify-center px-4 text-center text-white'>
          <div className='max-w-180 space-y-4'>
            <h1 className='font-playfair text-3xl md:text-4xl lg:text-5xl leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.18)]'>
              How It Works
            </h1>
            <p className='mx-auto max-w-2xl font-raleway text-base md:text-2xl leading-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]'>
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
        <div className='mx-auto flex max-w-7xl flex-col gap-6 items-center '>
          <div className='flex flex-col items-center gap-4 text-center'>
            <SectionBadge icon={COUPLES_PILL_ICON} label='For Couples' />
            <h2 className='font-playfair text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2d2d2d] '>Find Your Dream Team</h2>
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
        <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 sm:w-95 md:w-107.5 lg:w-90'>
          <img src={FLOWER_SEPARATOR} alt='' aria-hidden='true' className='w-full object-contain opacity-95' />
        </div>
      </div>

      {/* For Vendors Section */}
      <section className='relative bg-[#e4e9e3] px-4 py-14 md:py-20 sm:px-6 lg:px-8 '>
        <div className='mx-auto flex max-w-319.5 flex-col items-center gap-11'>
          <div className='flex flex-col items-center gap-3 text-center'>
            <SectionBadge icon={VENDORS_PILL_ICON} label='For Vendors' />
            <h2 className='font-playfair text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2d2d2d]'>Grow Your Business</h2>
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
      <section className='relative overflow-hidden bg-[#f4f0ea] px-4  sm:px-6 lg:px-8 py-14 md:py-20 '  >
        <div className='mx-auto max-w-384 '>
          <h2 className='text-center font-playfair text-3xl md:text-4xl lg:text-5xl leading-tight text-[#2d2d2d]'>
            Why Choose Vow &amp; Vendor
          </h2>

          <div className='mt-10 grid gap-5 lg:grid-cols-3 z-10'>
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