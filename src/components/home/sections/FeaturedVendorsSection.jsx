import React, { memo } from 'react';
import VendorCard from '../../vendors/VendorCard';
import {
  useGetVendorProfilesHomeQuery,
  useGetVendorProfilesQuery,
} from '../../../store/features/public/publicApi';
import VendorCardHome from '../../vendors/VendorCardHome';

const FeaturedCardSkeleton = () => (
  <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mt-10 animate-pulse'>
    {[...Array(4)].map((_, index) => (
      <div
        key={index}
        className='overflow-hidden rounded-xl border border-[#dfddd8] bg-white shadow-sm'
      >
        <div className='h-52 bg-[#ece9e2]' />

        <div className='p-4 space-y-3'>
          <div className='flex justify-between items-center'>
            <div className='h-4 w-1/3 rounded bg-[#ece9e2]' />
            <div className='h-4 w-10 rounded bg-[#ece9e2]' />
          </div>
          <div className='h-6 w-3/4 rounded bg-[#ece9e2]' />
          <div className='h-4 w-1/2 rounded bg-[#ece9e2]' />

          <hr className='border-gray-200 pt-1' />

          <div className='h-4 w-2/3 rounded bg-[#ece9e2]' />
        </div>
      </div>
    ))}
  </div>
);

const FeaturedVendorsSection = memo(() => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetVendorProfilesHomeQuery();

  const vendorsData = response?.data ? response.data.slice(0, 4) : [];

  if (isError) {
    return (
      <section className='bg-[#f5f1eb] py-14 sm:py-20 text-center text-red-600 font-raleway'>
        <p className='text-lg'>
          Something went wrong: {error?.message || 'Failed to load vendors'}
        </p>
      </section>
    );
  }

  return (
    <section id='vendors' className='relative z-0 bg-[#f5f1eb] py-14 sm:py-20'>
      <div className='mx-auto container px-4 sm:px-6 lg:px-8'>
        <header className='mx-auto max-w-2xl text-center'>
          <h2 className='font-serif text-4xl md:text-6xl text-[#201c18] sm:text-5xl'>
            Featured Vendors
          </h2>
          <p className='mt-2 md:mt-4 text-base md:text-lg leading-6 text-[#606060] font-raleway'>
            Discover highly-rated professionals trusted by hundreds of couples.
          </p>
        </header>

        {isLoading ? (
          <FeaturedCardSkeleton />
        ) : (
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
                vendorBadge: vendor.vendorBadge,
                aboutMe: vendor.aboutMe,
              };

              return (
                <VendorCardHome
                  key={formattedVendor.id}
                  vendor={formattedVendor}
                  variant='featured'
                />
              );
            })}
          </div>
        )}

        {!isLoading && vendorsData.length === 0 && (
          <p className='mt-10 text-center text-[#606060] font-raleway'>
            No featured vendors found at the moment.
          </p>
        )}
      </div>
    </section>
  );
});

FeaturedVendorsSection.displayName = 'FeaturedVendorsSection';

export default FeaturedVendorsSection;
