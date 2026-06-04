import React, { memo } from 'react';
import VendorCard from '../../vendors/VendorCard';
import { useGetVendorProfilesQuery } from '../../../store/features/public/publicApi';

const FeaturedVendorsSection = memo(() => {
  const { data: response, isLoading, isError, error } = useGetVendorProfilesQuery();

  const vendorsData = response?.data || [];

  if (isLoading) {
    return (
      <section className='bg-[#f5f1eb] py-14 sm:py-20 text-center text-[#201c18] font-raleway'>
        <p className='text-lg animate-pulse'>Loading featured vendors...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='bg-[#f5f1eb] py-14 sm:py-20 text-center text-red-600 font-raleway'>
        <p className='text-lg'>Something went wrong: {error?.message || 'Failed to load vendors'}</p>
      </section>
    );
  }

  return (
    <section id='vendors' className='relative z-0 bg-[#f5f1eb] py-14 sm:py-20'>
      <div className='mx-auto container px-4 sm:px-6 lg:px-8'>
        <header className='mx-auto max-w-2xl text-center'>
          <h2 className='font-serif text-4xl md:text-6xl text-[#201c18] sm:text-5xl'>Featured Vendors</h2>
          <p className='mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway'>
            Discover highly-rated professionals trusted by hundreds of couples.
          </p>
        </header>

        <div className='mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'>
          {vendorsData.map((vendor) => {
            const formattedVendor = {
              id: vendor.id,
              name: vendor.businessName || vendor.name, 
              category: vendor.category,
              location: vendor.location,
              price: vendor.packagePriceRange 
                ? `$${vendor.packagePriceRange.low} - $${vendor.packagePriceRange.high}` 
                : 'Contact for Price',
              rating: '5', 
              image: vendor.thumbnailImage || '/fallback-image.png', 
            };

            return (
              <VendorCard 
                key={formattedVendor.id} 
                vendor={formattedVendor} 
                variant='featured' 
              />
            );
          })}
        </div>

        {vendorsData.length === 0 && (
          <p className='mt-10 text-center text-[#606060] font-raleway'>No featured vendors found at the moment.</p>
        )}
      </div>
    </section>
  );
});

FeaturedVendorsSection.displayName = 'FeaturedVendorsSection';

export default FeaturedVendorsSection;