import React from 'react';
import { Link } from 'react-router-dom'; 
import { DollarSign, Heart, MapPin, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast'; 
import { useSaveVendorMutation } from '../../../../store/features/couple/coupleDashboard'; 
import { API_CONFIG, ROUTES } from "../../../../../src/config/index"; 

const VendorCardSkeleton = () => (
  <div className='overflow-hidden rounded-xl border border-[#dfddd8] bg-[#f8f8f7] shadow-sm animate-pulse'>
    <div className='h-48 bg-[#ece9e2]' />
    <div className='px-3 py-2.5 space-y-3'>
      <div className='h-5 w-3/4 rounded bg-[#ece9e2]' />
      <div className='h-4 w-1/2 rounded bg-[#ece9e2]' />
      <div className='space-y-2 pt-1'>
        <div className='h-3.5 w-2/3 rounded bg-[#ece9e2]' />
        <div className='h-3.5 w-1/2 rounded bg-[#ece9e2]' />
      </div>
      <div className='h-8 w-full rounded bg-[#ece9e2]' mt-2 />
    </div>
  </div>
);

const VendorResultsSection = ({ vendors, totalCount, isLoading, isError }) => {
  const [saveVendor, { isLoading: isSaving }] = useSaveVendorMutation();

  const handleSaveToggle = async (vendorId, isCurrentlySaved) => {
    try {
      await saveVendor({ vendorId }).unwrap();
      toast.success(isCurrentlySaved ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      console.error("Failed to save vendor:", error);
      toast.error("Failed to update favorite status. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <section className='mb-6'>
        <div className='mb-4 h-6 w-56 animate-pulse rounded bg-[#ece9e2]' />
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {[...Array(4)].map((_, index) => (
            <VendorCardSkeleton key={index} />
          ))}
        </div>
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
          const rawImage = vendor.thumbnailImage;
          const isFullUrl = rawImage?.startsWith('http://') || rawImage?.startsWith('https://');
          
          const finalImageUrl = isFullUrl 
            ? rawImage 
            : `${API_CONFIG.BASE_URL}${rawImage || '/dummy-image-square.jpg'}`;

          const priceRange =
            vendor.packagePriceRange?.low && vendor.packagePriceRange?.high
              ? `$${vendor.packagePriceRange.low.toLocaleString()} - $${vendor.packagePriceRange.high.toLocaleString()}`
              : 'Price on request';

          const vendorId = vendor.id || vendor._id;
          const detailsUrl = ROUTES.VENDOR_DETAILS.replace(':id', vendorId);

          return (
            <article
              key={vendorId}
              className='overflow-hidden rounded-xl border border-[#dfddd8] bg-[#f8f8f7] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
            >
              <div className='relative h-48 bg-[#ece9e2]'>
                <img
                  src={finalImageUrl}
                  alt={vendor.businessName || vendor.name}
                  className='h-full w-full object-cover'
                  onError={(e) => {
                    e.currentTarget.src = "/dummy-image-square.jpg";
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
                  onClick={() => handleSaveToggle(vendorId, vendor.isSaved)}
                  disabled={isSaving} 
                  className={`absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d7d2] bg-white/95 transition hover:bg-white disabled:opacity-70 ${
                    vendor.isSaved ? 'text-[#d6b28d]' : 'text-[#a8a8a8] hover:text-[#d6b28d]'
                  }`}
                  aria-label={vendor.isSaved ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart size={22} fill={vendor.isSaved ? 'currentColor' : 'none'} />
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

                <Link
                  to={detailsUrl}
                  className='block w-full text-center rounded-md bg-[#A7B9A6] px-3 py-1.5 text-sm font-medium text-white transition hover:bg-[#8fa18d]'
                >
                  View Profile
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default VendorResultsSection;