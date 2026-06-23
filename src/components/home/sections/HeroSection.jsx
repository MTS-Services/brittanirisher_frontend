import React, { memo, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const getVisibleElements = (root, selector) =>
  Array.from(root.querySelectorAll(selector)).filter(
    (element) => element.offsetParent !== null,
  );

const HeroSection = memo(() => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const images = getVisibleElements(section, '[data-hero-image]');
      const lines = getVisibleElements(section, '[data-hero-line]');
      const accents = getVisibleElements(section, '[data-hero-accent]');
      const descriptions = getVisibleElements(section, '[data-hero-desc]');
      const ctas = getVisibleElements(section, '[data-hero-cta]');
      const flowers = getVisibleElements(section, '[data-hero-flower]');

      gsap.set([...lines, ...accents, ...descriptions, ...ctas], {
        autoAlpha: 0,
        y: 28,
      });
      gsap.set(images, { autoAlpha: 0, scale: 1.06 });
      gsap.set(flowers, { autoAlpha: 0, x: -24, y: 12 });

      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .to(images, {
          autoAlpha: 1,
          scale: 1,
          duration: 1.15,
        })
        .to(
          lines,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.11,
          },
          '-=0.75',
        )
        .to(
          accents,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
          },
          '-=0.45',
        )
        .to(
          descriptions,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
          },
          '-=0.5',
        )
        .to(
          ctas,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          '-=0.45',
        )
        .to(
          flowers,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.9,
          },
          '-=0.85',
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineLines = (
    <>
      <span className='block overflow-hidden'>
        <span data-hero-line className='inline-block'>
          Find Your
        </span>
      </span>
      <span className='block overflow-hidden'>
        <span data-hero-line className='inline-block'>
          Perfect{' '}
          <span
            data-hero-accent
            className='text-[#5b6451] italic'
          >
            Wedding
          </span>
        </span>
      </span>
      <span className='block overflow-hidden'>
        <span data-hero-line className='inline-block'>
          Vendors
        </span>
      </span>
    </>
  );

  return (
    <section
      ref={sectionRef}
      data-no-gsap
      className='relative w-full z-10 bg-[#fbf8f5] overflow-hidden'
    >
      {/* Mobile: Image on top */}
      <div className='relative w-full aspect-[4/3] lg:hidden'>
        <img
          data-hero-image
          src='/brittanirisher.png'
          alt='Bride'
          className='h-full w-full object-cover object-top'
        />
        <div className='absolute -bottom-12 left-0 z-[9999] max-w-[130px] mix-blend-multiply pointer-events-none'>
          <img
            data-hero-flower
            src='/flowers_left.png'
            alt=''
            className='object-contain w-full'
          />
        </div>
      </div>

      {/* Mobile: Text content */}
      <div className='lg:hidden px-5 py-14 bg-[#fbf8f5]'>
        <h1 className='font-serif text-4xl font-normal leading-[1.1] text-[#1b1815]'>
          {headlineLines}
        </h1>
        <p
          data-hero-desc
          className='mt-5 text-base font-normal leading-relaxed text-[#414141]'
        >
          Connect with premium, vetted wedding professionals who will bring your
          vision to life.
        </p>
        <div className='mt-7 grid grid-cols-2 gap-3'>
          <a
            data-hero-cta
            href='#couples'
            className='flex items-center justify-center gap-2 rounded-md bg-[#A7B9A6] px-5 py-3 text-sm text-[#464E46] transition-all duration-200 hover:bg-[#7d947b] hover:-translate-y-0.5'
          >
            I&apos;m a Couple <ArrowRight size={16} />
          </a>
          <a
            data-hero-cta
            href='#vendors'
            className='flex items-center justify-center rounded-md border border-[#000000] bg-transparent px-5 py-3 text-sm text-[#1b1815] transition-all duration-200 hover:bg-[#1b1815]/5 hover:-translate-y-0.5'
          >
            I&apos;m a Vendor
          </a>
        </div>
      </div>

      {/* Desktop: Full-screen with bg image */}
      <div className='relative hidden lg:flex md:min-h-screen md:items-center'>
        <div className='absolute inset-0 z-0 overflow-hidden'>
          <img
            data-hero-image
            src='/brittanirisher.png'
            alt='Bride'
            className='h-full w-full object-cover object-center'
          />
        </div>

        <div className='relative z-10 container mx-auto px-6 lg:px-8 py-20'>
          <div className='text-left'>
            <h1 className='font-serif text-5xl font-normal leading-[1.1] text-[#1b1815] md:text-6xl lg:text-[72px]'>
              {headlineLines}
            </h1>
            <p
              data-hero-desc
              className='mt-6 text-base font-normal leading-relaxed text-[#414141] sm:text-lg md:max-w-md'
            >
              Connect with premium, vetted wedding professionals who will bring
              your vision to life.
            </p>
            <div className='mt-8 flex flex-wrap items-center gap-4'>
              <Link
                data-hero-cta
                to='/signup?audience=couple'
                className='inline-flex items-center gap-2 rounded-md bg-[#A7B9A6] px-6 py-3 text-sm md:text-base text-[#464E46] transition-all duration-200 hover:bg-[#7d947b] hover:-translate-y-0.5'
              >
                I&apos;m a Couple <ArrowRight size={16} />
              </Link>
              <Link
                data-hero-cta
                to='/signup?audience=vendor'
                className='inline-flex items-center rounded-md border border-[#000000] bg-transparent px-6 py-3 text-sm md:text-base text-[#1b1815] transition-all duration-200 hover:bg-[#1b1815]/5 hover:-translate-y-0.5'
              >
                I&apos;m a Vendor
              </Link>
            </div>
          </div>
        </div>

        {/* Flower — desktop */}
        <div className='absolute -bottom-29 left-0 z-[9999] max-w-[280px] mix-blend-multiply pointer-events-none'>
          <img
            data-hero-flower
            src='/flowers_left.png'
            alt=''
            className='object-contain'
          />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
