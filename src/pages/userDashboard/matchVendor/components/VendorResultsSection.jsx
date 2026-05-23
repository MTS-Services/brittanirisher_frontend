import React from 'react';
import { DollarSign, Heart, MapPin, Sparkles } from 'lucide-react';

const VendorResultsSection = ({ vendors, totalCount }) => {
  return (
    <section className='mb-6'>
      <h2 className='mb-4 text-xl font-raleway font-medium text-[#2a2a2a]'>Recommended Vendors ({totalCount})</h2>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
        {vendors.map((vendor) => (
          <article
            key={vendor.id}
            className='overflow-hidden rounded-xl border border-[#dfddd8] bg-[#f8f8f7] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            <div className='relative h-48 bg-[#ece9e2]'>
              <img
                src={vendor.image}
                alt={vendor.name}
                className='h-full w-full object-cover'
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200?text=${vendor.name}`;
                }}
              />

              <span className='absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#e6bc88] px-2 py-0.5 text-sm font-medium text-white'>
                <Sparkles className='h-2.5 w-2.5' />
                98% match
              </span>

              <button
                type='button'
                className='absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#d9d7d2] bg-white/95 text-[#a8a8a8] transition hover:bg-white hover:text-[#d4544d]'
                aria-label='Add to favorites'
              >
                <Heart size={12} />
              </button>
            </div>

            <div className='px-3 py-2.5'>
              <h3 className='mb-0.5 text-xl font-medium leading-tight text-[#2a2a2a]'>{vendor.name}</h3>
              <p className='mb-2 text-base text-[#8a8a8a]'>{vendor.category || 'Photography'}</p>

              <div className='mb-1.5 flex items-center gap-1 text-sm text-[#595959]'>
                <DollarSign size={11} className='text-[#767676]' />
                <span>{vendor.priceRange}</span>
              </div>

              <div className='mb-2.5 flex items-center gap-1 text-sm text-[#595959]'>
                <MapPin size={11} />
                <span>{vendor.location}</span>
              </div>

              <button
                type='button'
                className='w-full rounded-md bg-[#A7B9A6] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#8fa18d]'
              >
                View Profile
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default VendorResultsSection;
