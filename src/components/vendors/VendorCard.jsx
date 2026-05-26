import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';

const VARIANT_STYLES = {
  featured: {
    article: 'overflow-hidden rounded-sm bg-white shadow-sm p-4 md:p-5',
    title: 'text-base md:text-lg font-serif font-medium text-[#201c18] leading-snug',
    category: 'mt-0.5 text-sm font-raleway text-[#606060]',
    metaRow: 'flex items-center justify-between text-sm text-[#6d6357]',
    location: 'inline-flex items-center gap-1 text-[#070707] font-raleway font-medium',
    price: 'font-playfair font-bold text-[#070707] text-lg',
    rating: 'inline-flex items-center gap-0.5 text-base font-medium text-[#544d43] mt-0.5',
  },
  grid: {
   article: 'overflow-hidden rounded-sm bg-white shadow-sm p-4 md:p-5',
    title: 'text-base md:text-lg font-serif font-medium text-[#201c18] leading-snug',
    category: 'mt-0.5 text-sm font-raleway text-[#606060]',
    metaRow: 'flex items-center justify-between text-sm text-[#6d6357]',
    location: 'inline-flex items-center gap-1 text-[#070707] font-raleway font-medium',
    price: 'font-playfair font-bold text-[#070707] text-lg',
    rating: 'inline-flex items-center gap-0.5 text-base font-medium text-[#544d43] mt-0.5',
  },
};

const VendorCard = memo(({ vendor, variant = 'grid', onClick }) => {
  const navigate = useNavigate();
  const styles = VARIANT_STYLES[variant] || VARIANT_STYLES.grid;
  const priceText = vendor.priceDisplay ?? vendor.price ?? 'Contact for pricing';

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
      <div className='overflow-hidden bg-[#eee4d6]' style={{ aspectRatio: '4 / 3' }}>
        <img
          src={vendor.image || '/dummy-image-square.jpg'}
          alt={vendor.name}
          className='h-full w-full object-cover transition-transform'
          loading='lazy'
          onError={(event) => {
            event.currentTarget.src = '/dummy-image-square.jpg';
          }}
        />
      </div>

      <div className={variant === 'featured' ? 'pt-3' : 'py-4'}>
        <div className='flex items-start justify-between gap-2'>
          <div className='min-w-0'>
            <h3 className={styles.title}>{vendor.name}</h3>
            <p className={styles.category}>{vendor.category}</p>
          </div>

          <div className={styles.rating}>
            <Star size={variant === 'featured' ? 14 : 13} className='fill-[#FFBF10] text-[#FFBF10]' />
            {vendor.rating}
          </div>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.location}>
            <MapPin size={variant === 'featured' ? 15 : 14} />
            {vendor.location}
          </span>
          <span className={styles.price}>{priceText}</span>
        </div>
      </div>
    </article>
  );
});

VendorCard.displayName = 'VendorCard';

export default VendorCard;