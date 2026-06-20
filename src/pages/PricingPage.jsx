import React, { memo } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import { ROUTES } from '../config';
import { useGetSubscriptionPlansQuery } from '../store/features/public/publicApi';
import { PricingSkeleton } from '../components/skeletons/LoadingSkeletons';

const HERO_IMAGE = '/Vendor_Pricing.png';
const FLOWER_LEFT_IMAGE = '/Footer_img.png';
const Compare_Feature_Plans = '/Compare_Feature_Plans.png';
const FLOWER_RIGHT_IMAGE = '/Footer_img2.png';
const BACKGROUND_FLOWER_IMAGE = '/Vendor_Pricing_2.png';
const FLOWER_SEPARATOR = '/VendorPricing-flowers.png';

const FEATURE_ROWS = [
  ['Profile Listing', 'tick', 'tick', 'tick'],
  ['Lead Notifications', 'cross', 'tick', 'tick'],
  ['Portfolio Uploads', '10 Items', 'Unlimited', 'Unlimited'],
  ['Priority Search Placement', 'cross', 'tick', 'tick'],
  ['Top-Tier Banner Ad', 'cross', 'cross', 'tick'],
  ['Detailed Analytics', 'Basic', 'Standard', 'Advanced'],
];

const FAQ_ITEMS = [
  {
    title: 'Where can I watch?',
    body: 'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis. Fermentum nulla cras porttitor euismod nulla.',
  },
  {
    title: 'How do I list my services on this platform?',
    body: "Getting started is simple and straightforward. Create your vendor account, complete your profile with your services and portfolio, set your pricing, and you'll be visible to couples immediately. Our team is here to help you every step of the way.",
  },
  {
    title: 'Is there a fee for registration?',
    body: 'Registration is completely free! We only charge subscription fees for vendors who want access to our premium features and lead generation system. Choose the plan that works best for your business.',
  },
  {
    title: 'How do couples contact me?',
    body: "Couples can reach out to you directly through your profile page, via phone, email, or our built-in messaging system. You'll receive notifications for every inquiry so you never miss a potential booking.",
  },
  {
    title: 'Can I update my portfolio after publishing?',
    body: 'Absolutely! You can update your portfolio, services, pricing, and availability anytime through your vendor dashboard. Changes go live immediately to keep your profile current and fresh.',
  },
  {
    title: 'How does the booking system work?',
    body: "After a couple expresses interest, you can communicate directly to discuss availability, pricing, and requirements. Once you've agreed on terms, you can finalize the booking through our secure system.",
  },
  {
    title: 'What are the benefits of a "Verified Vendor" badge?',
    body: "Our Verified Vendor badge increases couples' trust and confidence in your services. Verified vendors appear higher in search results and receive priority placement on the platform, leading to more inquiries and bookings.",
  },
];

const PricingCard = memo(({ plan }) => {
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

      <h3 className='mt-5 font-playfair text-3xl'>{plan.planName}</h3>
      <div className='mt-3 flex items-end gap-1'>
        <span className='font-playfair font-bold text-5xl leading-none'>
          ${plan.priceMonthly}
        </span>
        <span
          className={`pb-1 text-sm ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`}
        >
          /{(plan.validFor || 'month').toLowerCase()}
        </span>
      </div>
      <p
        className={`mt-4 mb-3 font-raleway text-base md:text-lg leading-7 ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`}
      >
        {plan.sortDescription}
      </p>
      <div
        className={` border-t ${plan.featured ? 'text-white' : 'text-[#857F7A]'}`}
      />
      <ul className='mt-6 mb-6 space-y-3 text-sm'>
        {plan.featuresAllowed
          ?.filter((feature) => feature.isIncluded)
          .map((feature, index) => (
            <li
              key={`${feature.name}-${index}`}
              className='flex items-center gap-2 font-raleway '
            >
              <Check
                size={16}
                className={plan.featured ? 'text-[#16B21B]' : 'text-[#16B21B]'}
              />
              <span className='text-sm '>{feature.name}</span>
            </li>
          ))}
        {plan.featuresAllowed
          ?.filter((feature) => !feature.isIncluded)
          .map((feature, index) => (
            <li
              key={`${feature.name}-excluded-${index}`}
              className='flex font-raleway  items-center gap-2 opacity-80'
            >
              <X
                size={16}
                className={plan.featured ? 'text-white/70' : 'text-[#6b6b6b]'}
              />
              <span>{feature.name}</span>
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

const PricingPage = memo(() => {
  const { data, isLoading } = useGetSubscriptionPlansQuery();
  const plans = data?.data || [];

  useSEO({
    title: 'Pricing',
    description:
      'Review vendor pricing tiers, compare plans, and find the right package for your business.',
    keywords: ['pricing', 'plans', 'wedding vendors'],
  });

  return (
    <div className='overflow-hidden bg-[#f4f0ea] text-[#2d2d2d]'>
      <section className='relative h-100 md:h-150 overflow-hidden'>
        <img
          src={HERO_IMAGE}
          alt=''
          aria-hidden='true'
          className='absolute inset-0 h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-[rgba(45,45,45,0.4)]' />
        <div className='absolute inset-0 flex items-center justify-center px-4 text-center text-white'>
          <div className='space-y-2' style={{ maxWidth: 781 }}>
            <div className='mx-auto inline-flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.47)] px-6 py-1.5 font-raleway text-[16px] font-medium leading-6 text-[#414141]'>
              Join Our Community
            </div>
            <h1 className='font-playfair text-3xl md:text-4xl lg:text-5xl leading-none'>
              Grow Your Wedding Business
            </h1>
            <p className='font-raleway text-[20px] leading-8'>
              Vow &amp; Vendor connects you with thousands of local brides
              actively looking for their perfect wedding team.
            </p>
          </div>
        </div>
      </section>

      <section className='relative px-4 sm:px-6 overflow-hidden'>
        <div className='mx-auto container  sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10'>
          <div className='mx-auto w-full md:max-w-4/6 text-center '>
            <h2 className='font-playfair text-3xl md:text-4xl lg:text-5xl leading-none text-[#090909]'>
              Vendor Pricing
            </h2>
            <p className='mt-6 font-raleway md:text-[20px] md:leading-8 text-[#857f7a]'>
              Choose the perfect plan to showcase your services, connect with
              brides, and grow your wedding business with Vow &amp; Vendor.
            </p>
          </div>

          {isLoading ? (
            <PricingSkeleton />
          ) : plans.length === 0 ? (
            <p className='mt-10 text-center text-base text-[#606060]'>
              No pricing plans found.
            </p>
          ) : (
            <div className='mt-10 md:max-w-7xl px-0  sm:px-6 lg:px-8 mx-auto grid gap-8 md:gap-5 lg:grid-cols-3 auto-rows-fr'>
              {plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={{
                    ...plan,
                    featured:
                      String(plan.planName || '').toLowerCase() ===
                      'professional',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <div className='relative h-0 pointer-events-none z-50'>
        <img
          src={BACKGROUND_FLOWER_IMAGE}
          alt=''
          aria-hidden='true'
          className='absolute hidden lg:block -right-2 -top-99 w-[320px] h-auto'
        />
      </div>

      <section className='relative overflow-hidden bg-[#d7dfd6]'>
        <img
          src={Compare_Feature_Plans}
          alt=''
          aria-hidden='true'
          className='pointer-events-none absolute hidden opacity-45 lg:block left-0 bottom-0 w-50 h-auto z-50'
        />

        <div className='mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20'>
          <h2 className='text-center font-playfair text-3xl md:text-4xl lg:text-5xl leading-none text-[#090909]'>
            Compare Feature Plans
          </h2>

          {/* Desktop / tablet table — unchanged structure, hidden below md */}
          <div className='mt-12 hidden overflow-hidden border border-[#f7f5f1] bg-transparent md:block'>
            <div className='grid grid-cols-[1.3fr_1fr_1fr_1fr] border-b border-[#f7f5f1] px-8 py-3.5 font-raleway text-lg font-medium text-[#070707] md:text-xl lg:px-10'>
              <div>Features</div>
              <div>Starter</div>
              <div>Professional</div>
              <div>Premium</div>
            </div>

            {FEATURE_ROWS.map(([feature, starter, pro, premium]) => (
              <div
                key={feature}
                className='grid grid-cols-[1.3fr_1fr_1fr_1fr] border-b border-[#f7f5f1] px-8 py-5 font-raleway text-[20px] font-medium text-[#070707] lg:px-10'
              >
                <div>{feature}</div>
                <div className='flex items-center justify-start'>
                  {starter === 'tick' ? (
                    <Check size={24} className='text-[#16B21B]' />
                  ) : starter === 'cross' ? (
                    <X size={24} className='text-[#6b6b6b]' />
                  ) : (
                    starter
                  )}
                </div>
                <div className='flex items-center justify-start'>
                  {pro === 'tick' ? (
                    <Check size={24} className='text-[#16B21B]' />
                  ) : pro === 'cross' ? (
                    <X size={24} className='text-[#6b6b6b]' />
                  ) : (
                    pro
                  )}
                </div>
                <div className='flex items-center justify-start'>
                  {premium === 'tick' ? (
                    <Check size={24} className='text-[#16B21B]' />
                  ) : premium === 'cross' ? (
                    <X size={24} className='text-[#6b6b6b]' />
                  ) : (
                    premium
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile — stacked cards, one per feature, plan rows underneath */}
          <div className='mt-10 space-y-4 md:hidden'>
            {FEATURE_ROWS.map(([feature, starter, pro, premium]) => (
              <div
                key={feature}
                className='overflow-hidden rounded-lg border border-[#f7f5f1] bg-white/40'
              >
                <div className='border-b border-[#f7f5f1] px-4 py-3 font-raleway text-base font-semibold text-[#070707]'>
                  {feature}
                </div>

                <div className='divide-y divide-[#f7f5f1]'>
                  {[
                    ['Starter', starter],
                    ['Professional', pro],
                    ['Premium', premium],
                  ].map(([planName, value]) => (
                    <div
                      key={planName}
                      className='flex items-center justify-between px-4 py-3 font-raleway text-sm text-[#070707]'
                    >
                      <span className='text-[#6b6b6b]'>{planName}</span>
                      <span className='flex items-center font-medium'>
                        {value === 'tick' ? (
                          <Check size={20} className='text-[#16B21B]' />
                        ) : value === 'cross' ? (
                          <X size={20} className='text-[#6b6b6b]' />
                        ) : (
                          value
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className='relative z-50 h-0 pointer-events-none'>
        <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 sm:w-70 md:w-80 lg:w-90'>
          <img
            src={FLOWER_SEPARATOR}
            alt=''
            aria-hidden='true'
            className='w-full object-contain opacity-95'
          />
        </div>
      </div>

      <section className='relative px-4 py-14 sm:px-6 lg:px-8 lg:py-20'>
        <div className=''>
          <div className='mx-auto text-center  '>
            <h2 className='font-playfair text-3xl md:text-4xl lg:text-5xl leading-none text-[#2d2d2d]'>
              Vendor FAQs
            </h2>
            <p className='mt-4 font-raleway text-[20px] leading-7 text-[#857f7a]'>
              Quick answers to common questions
            </p>
          </div>

          <div className='mt-12 space-y-3 mx-auto max-w-7xl  sm:px-6 lg:px-8 '>
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.title}
                open={item.open}
                className='group bg-[#f0e9e1] px-6 py-4'
              >
                <summary className='flex cursor-pointer list-none items-center justify-between gap-6 font-raleway text-[16px] font-medium leading-6 text-black outline-none'>
                  <span>{item.title}</span>
                  <ChevronDown
                    size={16}
                    className='shrink-0 transition-transform duration-200 group-open:rotate-180'
                  />
                </summary>
                {item.body && (
                  <p className='mt-4 text-[18px] leading-[1.4] text-[rgba(60,60,67,0.85)] text-justify'>
                    {item.body}
                  </p>
                )}
              </details>
            ))}
          </div>

          <div className='mx-auto mt-14 md:mt-20 container rounded-2xl bg-[#5c665b]  py-16 text-center text-white  lg:py-20'>
            <h3 className='font-playfair text-[48px] leading-none'>
              Become a Vendor Today
            </h3>
            <p className='mx-auto mt-6 font-raleway text-[20px] leading-8 '>
              Don&apos;t miss out on the busiest wedding season yet. Secure your
              spot in our directory and start receiving leads.
            </p>
            <Link
              to={ROUTES.LOGIN}
              className='mt-8 inline-flex items-center justify-center rounded-lg bg-[#a7b9a6] px-6 py-3 font-raleway text-[16px] leading-6 text-[#464e46]'
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

PricingPage.displayName = 'PricingPage';

export default PricingPage;
