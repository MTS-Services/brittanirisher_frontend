import React from 'react';
import { DollarSign, Heart, MapPin, Sparkles, Loader2 } from 'lucide-react';

// API taban adresi burada merkezi olarak tanımlandı
const BASE_URL = "https://api-brittanirisher.maktechgroup.tech";

const VendorResultsSection = ({ vendors, totalCount, isLoading, isError }) => {
  if (isLoading) {
    return (
      <section className='mb-6 flex items-center justify-center py-16'>
        <Loader2 className='h-8 w-8 animate-spin text-[#9cae9b]' />
        <span className='ml-3 font-raleway text-sm text-[#7a7a7a]'>Loading vendors...</span>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center'>
        <p className='font-raleway text-sm text-red-500'>Failed to load vendors. Please try again.</p>
      </section>
    );
  }

  if (!vendors || vendors.length === 0) {
    return (
      <section className='mb-6 rounded-2xl border border-[#D4A57426] bg-white px-5 py-12 text-center'>
        <p className='font-raleway text-sm text-[#9a9a9a]'>No vendors found matching your preferences.</p>
      </section>
    );
  }

  return (
    <section className='mb-6'>
      <h2 className='mb-4 text-xl font-raleway font-medium text-[#2a2a2a]'>
        Recommended Vendors ({totalCount})
      </h2>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
        {vendors.map((vendor) => {
          // BASE_URL kullanımı ve URL temizleme mantığı düzeltildi
          const imageUrl = vendor.thumbnailImage
            ? vendor.thumbnailImage.startsWith('http')
              ? vendor.thumbnailImage
              : `${BASE_URL.replace(/\/$/, '')}/${vendor.thumbnailImage.replace(/^\//, '')}`
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.businessName || vendor.name || 'Vendor')}&background=ece9e2&color=8a8a8a&size=300`;

          const priceRange =
            vendor.packagePriceRange?.low && vendor.packagePriceRange?.high
              ? `$${vendor.packagePriceRange.low.toLocaleString()} - $${vendor.packagePriceRange.high.toLocaleString()}`
              : 'Price on request';

          return (
            <article
              key={vendor.id}
              className='overflow-hidden rounded-xl border border-[#dfddd8] bg-[#f8f8f7] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
            >
              <div className='relative h-48 bg-[#ece9e2]'>
                <img
                  src={imageUrl}
                  alt={vendor.businessName || vendor.name}
                  className='h-full w-full object-cover'
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(vendor.name || 'Vendor')}&background=ece9e2&color=8a8a8a&size=300`;
                  }}
                />

                {vendor.matchPercentage != null && (
                  <span className='absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#e6bc88] px-2 py-0.5 text-sm font-medium text-white'>
                    <Sparkles className='h-2.5 w-2.5' />
                    {vendor.matchPercentage}% match
                  </span>
                )}

                <button
                  type='button'
                  className={`absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#d9d7d2] bg-white/95 transition hover:bg-white ${
                    vendor.isSaved ? 'text-[#d4544d]' : 'text-[#a8a8a8] hover:text-[#d4544d]'
                  }`}
                  aria-label='Add to favorites'
                >
                  <Heart size={12} fill={vendor.isSaved ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className='px-3 py-2.5'>
                <h3 className='mb-0.5 text-xl font-medium leading-tight text-[#2a2a2a]'>
                  {vendor.businessName || vendor.name}
                </h3>
                <p className='mb-2 text-base text-[#8a8a8a]'>{vendor.category || '—'}</p>

                <div className='mb-1.5 flex items-center gap-1 text-sm text-[#595959]'>
                  <DollarSign size={11} className='text-[#767676]' />
                  <span>{priceRange}</span>
                </div>

                <div className='mb-2.5 flex items-center gap-1 text-sm text-[#595959]'>
                  <MapPin size={11} />
                  <span>{vendor.location || `${vendor.city || ''}${vendor.city && vendor.state ? ', ' : ''}${vendor.state || ''}` || '—'}</span>
                </div>

                <button
                  type='button'
                  className='w-full rounded-md bg-[#A7B9A6] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#8fa18d]'
                >
                  View Profile
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default VendorResultsSection;