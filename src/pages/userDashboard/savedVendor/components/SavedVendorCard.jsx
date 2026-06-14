import React from 'react';
import { Link } from 'react-router-dom';
import { Award, DollarSign, Gem, MapPin, Trash2 } from 'lucide-react';
import { API_CONFIG, ROUTES } from '../../../../config';

const VendorBadge = ({ badge }) => {
  if (!badge) return null;

  const normalized = String(badge).toLowerCase().trim();

  if (normalized === 'premium') {
    return (
      <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#fdf6e8] border border-[#e2c97e]'>
        <Gem size={15} className='text-[#b8922a]' />
      </span>
    );
  }

  if (normalized === 'pro') {
    return (
      <span className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#f0f4ef] border border-[#b8ccb5]'>
        <Award size={15} className='text-[#3d5c3a]' />
      </span>
    );
  }

  return null;
};

const SavedVendorCard = ({
  vendor,
  isFavorite,
  onToggleFavorite,
  onRemove,
}) => {
  const vendorId = vendor?.id || vendor?._id;

  const detailsUrl = ROUTES.VENDOR_DETAILS.replace(':id', vendorId);

  // Safe Image URL
  let imageSrc = '/placeholder-vendor.jpg'; // public folder fallback image

  if (vendor?.portfolioImage) {
    if (vendor.portfolioImage.startsWith('http')) {
      imageSrc = vendor.portfolioImage;
    } else {
      imageSrc = `${API_CONFIG.BASE_URL}${vendor.portfolioImage}`;
    }
  }

  return (
    <article className='overflow-hidden rounded-xl border border-[#dfddd8] bg-[#f8f8f7] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
      <div className='relative h-52 bg-[#ece9e2]'>
        <img
          src={imageSrc}
          alt={vendor?.name || 'Vendor'}
          className='h-full w-full object-cover'
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/placeholder-vendor.jpg';
          }}
        />

        {/* <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-[#d9a46a] px-3 py-1 text-sm font-medium text-white">
          98% match
        </span> */}

        <div className='absolute right-3 top-3 flex items-center gap-2'>
          <button
            onClick={() => onToggleFavorite(vendorId)}
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f1f1f] transition hover:bg-[#f4f4f4]'
            aria-label='Remove saved vendor'
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className='px-4 py-4'>
        <div className='mb-1 flex items-center justify-between'>
          <h3 className='mb-1 text-xl font-semibold leading-tight text-[#232323]'>
            {vendor?.name || 'Unknown Vendor'}
          </h3>

          <VendorBadge badge={vendor?.vendorBadge} />
        </div>

        <p className='mb-3 text-base text-[#7f7f7f]'>
          {vendor?.category || 'Photography'}
        </p>

        <div className='mb-2 flex items-center gap-2 text-sm text-[#303030]'>
          <DollarSign size={16} className='text-[#6a6a6a]' />
          <span>{vendor?.priceRange || 'Not specified'}</span>
        </div>

        <div className='mb-4 flex items-center gap-2 text-sm text-[#303030]'>
          <MapPin size={16} className='text-[#6a6a6a]' />
          <span className='capitalize'>
            {vendor?.location || 'Location not available'}
          </span>
        </div>

        <Link
          to={detailsUrl}
          className='block w-full rounded-xl bg-[#9dad9a] px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#8fa18d]'
        >
          View Profile
        </Link>
      </div>
    </article>
  );
};

export default SavedVendorCard;
