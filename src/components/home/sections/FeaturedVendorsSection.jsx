import React, { memo } from 'react';
import VendorCard from '../../vendors/VendorCard';

const VENDORS = [
  {
    id: 1,
    name: 'Elegant Photography',
    category: 'Photography',
    location: 'Los Angeles, CA',
    price: '$275',
    rating: '5',
    image:
      '/Elegant_Photography.png',
  },
  {
    id: 2,
    name: 'Bloom & Petal',
    category: 'Floral Design',
    location: 'San Francisco, CA',
    price: '$300',
    rating: '4.9',
    image:
      '/Bloom_and_Petal.png',
  },
  {
    id: 3,
    name: 'Sweet Dreams Cakes',
    category: 'Baker',
    location: 'New York, NY',
    price: '$320',
    rating: '5',
    image:
      '/Sweet_Dreams_Cakes.png',
  },
  {
    id: 4,
    name: 'The Grand Ballroom',
    category: 'Venue',
    location: 'Chicago, IL',
    price: '$5000',
    rating: '5',
    image:
      '/The_Grand_Ballroom.png',
  },
];

const FeaturedVendorsSection = memo(() => {
  return (
    <section id='vendors' className='relative z-0 bg-[#f5f1eb] py-14 sm:py-20'>
      {/* <div className='absolute left-0 top-10 h-40 w-40 rounded-full bg-[#e2dccf] blur-3xl' />
      <div className='absolute right-0 top-24 h-40 w-40 rounded-full bg-[#d8e1d6] blur-3xl' /> */}

      <div className='mx-auto container px-4 sm:px-6 lg:px-8'>
        <header className='mx-auto max-w-2xl text-center'>
          {/* <p className='text-sm uppercase tracking-[0.35em] text-[#8b8072]'>Featured Vendors</p> */}
          <h2 className=' font-serif text-4xl md:text-6xl text-[#201c18] sm:text-5xl'>Featured Vendors</h2>
          <p className='mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway '>
            Discover highly-rated professionals trusted by hundreds of couples.
          </p>
        </header>

        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          {VENDORS.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} variant='featured' />
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturedVendorsSection.displayName = 'FeaturedVendorsSection';

export default FeaturedVendorsSection;