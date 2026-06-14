import React, { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Gem, MapPin, Star } from 'lucide-react';
import { API_CONFIG } from '../../config';

const VARIANT_STYLES = {
  featured: {
    article:
      'overflow-hidden rounded-sm bg-white shadow-sm p-4 md:p-5 group cursor-pointer transition-all duration-300 hover:shadow-md border border-neutral-100/50',
    title:
      'text-base md:text-2xl font-serif font-medium text-[#201c18] leading-snug truncate group-hover:text-[#7a6050] transition-colors',
    category: 'mt-1 text-sm font-raleway text-[#606060] tracking-wide',
    metaRow:
      'flex items-center justify-between text-sm text-[#6d6357] mt-3 pt-3 border-t border-dashed border-[#e8e0d8]',
    location:
      'inline-flex items-center gap-1 text-[#5a4a3a] font-raleway font-medium truncate max-w-[60%]',
    price: 'font-serif font-bold text-[#3a2a1a] text-base md:text-lg shrink-0',
    rating:
      'inline-flex items-center gap-0.5 text-sm font-medium text-[#544d43]',
  },

  grid: {
    article:
      'overflow-hidden rounded-sm bg-white shadow-sm p-4 md:p-5 group cursor-pointer transition-all duration-300 hover:shadow-md border border-neutral-100/50',
    title:
      'text-base md:text-2xl font-serif font-medium text-[#201c18] leading-snug truncate group-hover:text-[#7a6050] transition-colors',
    category: 'mt-1 text-sm font-raleway text-[#606060] tracking-wide',
    metaRow: 'flex items-center justify-between text-sm text-[#6d6357] ',
    location:
      'inline-flex items-center gap-1 text-[#5a4a3a] font-raleway font-medium truncate max-w-[60%]',
    price:
      'font-medium text-[#3a2a1a] text-base md:text-2xl shrink-0 font-Inter',
    rating:
      'inline-flex items-center gap-0.5 text-sm font-medium text-[#544d43]',
  },
};

const VendorBadge = ({ badge }) => {
  if (!badge) return null;

  const normalized = String(badge).toLowerCase().trim();

  if (normalized === 'premium') {
    return (
      <span className='inline-flex items-center justify-center py-1 px-3 gap-1 rounded-full bg-[#fdf6e8] border border-[#e2c97e]'>
        <Gem size={15} className='text-[#b8922a]' />
        Premium Vendor
      </span>
    );
  }

  if (normalized === 'pro') {
    return (
      <span className='inline-flex items-center justify-center py-1 px-3 gap-1 rounded-full bg-[#f0f4ef] border border-[#b8ccb5]'>
        <Award size={15} className='text-[#3d5c3a]' />
        Pro Vendor
      </span>
    );
  }

  return null;
};

const VendorCard = memo(({ vendor, variant = 'grid', onClick }) => {
  const navigate = useNavigate();
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.grid;

  const imageSrc =
    vendor?.thumbnailImage || vendor?.image || '/dummy-image-square.jpg';

  const displayLocation = useMemo(() => {
    if (vendor?.city && vendor?.state) {
      return `${vendor.city}, ${vendor.state}`;
    }
    return `${vendor?.location}` || 'Location N/A';
  }, [vendor]);

  const displayPrice = useMemo(() => {
    if (vendor?.packagePriceRange?.low !== undefined) {
      return `$${vendor.packagePriceRange.low.toLocaleString()}`;
    }

    if (typeof vendor?.price === 'string' && vendor.price.includes('-')) {
      return vendor.price.split('-')[0].trim();
    }

    if (vendor?.price) {
      return typeof vendor.price === 'number'
        ? `$${vendor.price.toLocaleString()}`
        : vendor.price;
    }
    return 'Contact Pricing';
  }, [vendor]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onClick) return onClick();
      navigate(`/vendors/${vendor.id}`);
    }
  };

  return (
    <article
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick ?? (() => navigate(`/vendors/${vendor.id}`))}
      onKeyDown={handleKeyDown}
      className={styles.article}
    >
      <div
        className='overflow-hidden bg-[#eee4d6] relative'
        style={{ aspectRatio: '3 / 3' }}
      >
        <img
          src={`${API_CONFIG.BASE_URL}${imageSrc}`}
          alt={vendor?.businessName || vendor?.name || 'Vendor'}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          loading='lazy'
          onError={(event) => {
            event.currentTarget.src = '/dummy-image-square.jpg';
          }}
        />

        {vendor.vendorBadge && (
          <div className='absolute right-2 top-2 z-10 '>
            <VendorBadge badge={vendor.vendorBadge} />
          </div>
        )}
      </div>

      <div className='pt-4 flex flex-col justify-between gap-3'>
        <div className='flex items-start justify-between gap-2 mb-1'>
          <div className='min-w-0 flex-1'>
            <h3 className={styles.title}>
              {vendor?.businessName || vendor?.name}
            </h3>
            <p className={styles.category}>
              {vendor?.category || 'Wedding Professional'}
            </p>
          </div>

          {/* <div className={styles.rating}>
            <Star size={14} className='fill-[#FFBF10] text-[#FFBF10]' />
            <span className='ml-1'>{vendor?.rating || '5.0'}</span>
          </div> */}
        </div>

        <p className=' text-sm font-raleway text-[#606060] tracking-wide line-clamp-2'>
          {vendor?.aboutMe || 'No description available.'}
        </p>

        <div className={styles.metaRow}>
          <span className={styles.location} title={displayLocation}>
            <MapPin size={14} className='text-[#a89280] shrink-0' />
            {displayLocation}
          </span>
          <span className={styles.price}>{displayPrice}</span>
        </div>
      </div>
    </article>
  );
});

VendorCard.displayName = 'VendorCard';

export default VendorCard;
