import React from 'react';
import { Link } from 'react-router-dom'; // ১. Link ইম্পোর্ট করুন
import { DollarSign, Heart, MapPin, Trash2 } from 'lucide-react';
import { API_CONFIG, ROUTES } from '../../../../config'; 

const SavedVendorCard = ({ vendor, isFavorite, onToggleFavorite, onRemove }) => {
  const baseUrl = ""; 
  const imageUrl = vendor.portfolioImage?.startsWith('http') 
    ? vendor.portfolioImage 
    : `${baseUrl}${vendor.portfolioImage}`;

  const vendorId = vendor.id || vendor._id;
  const detailsUrl = ROUTES.VENDOR_DETAILS.replace(':id', vendorId);

  return (
    <article className='overflow-hidden rounded-xl border border-[#dfddd8] bg-[#f8f8f7] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'>
      <div className='relative h-52 bg-[#ece9e2]'>
        <img
          src={`${API_CONFIG.BASE_URL}${imageUrl}`}
          alt={vendor.name}
          className='h-full w-full object-cover'
          onError={(event) => {
            event.target.src = `https://via.placeholder.com/300x200?text=${encodeURIComponent(vendor.name || 'Vendor')}`;
          }}
        />

        <span className='absolute font-playfair left-3 top-3 inline-flex items-center rounded-full bg-[#d9a46a] px-3 py-1 text-sm font-medium text-white'>
          98% match
        </span>

        <div className='absolute right-3 top-3 flex items-center gap-2'>
          {/* <button
            onClick={() => onRemove?.(vendorId)}
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f1f1f] transition hover:bg-[#f4f4f4]'
            aria-label='Remove saved vendor'
          >
            <Trash2 size={18} />
          </button> */}

          <button
            onClick={() => onToggleFavorite(vendorId)}
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#d6b18d] transition hover:bg-[#f4f4f4] hover:text-[#c89d74]'
            aria-label='Toggle favorite'
          >
            <Heart size={18} className={isFavorite ? 'fill-[#d6b18d] text-[#d6b18d]' : ''} />
          </button>
        </div>
      </div>

      <div className='px-4 py-4'>
        <h3 className='mb-1 text-xl font-semibold leading-tight text-[#232323]'>{vendor.name}</h3>
        <p className='mb-3 text-base text-[#7f7f7f]'>{vendor.category || 'Photography'}</p>

        <div className='mb-2 flex items-center gap-2 text-sm text-[#303030]'>
          <DollarSign size={16} className='text-[#6a6a6a]' />
          <span className='font-raleway'>{vendor.priceRange}</span>
        </div>

        <div className='mb-4 flex items-center gap-2 text-sm text-[#303030]'>
          <MapPin size={16} className='text-[#6a6a6a]' />
          <span className='font-raleway capitalize'>{vendor.location}</span>
        </div>

        <Link
          to={detailsUrl}
          className='block w-full text-center rounded-xl bg-[#9dad9a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#8fa18d]'
        >
          View Profile
        </Link>
      </div>
    </article>
  );
};

export default SavedVendorCard;