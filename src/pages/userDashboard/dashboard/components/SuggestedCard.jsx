import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../config/index'; 

const SuggestedCard = ({ item }) => {
  const formatPrice = (price) => {
    if (price === undefined || price === null) return '0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const displayPrice = item?.packagePriceRange 
    ? `${formatPrice(item.packagePriceRange.low)} - ${formatPrice(item.packagePriceRange.high)}`
    : 'Price N/A';


  const vendorId = item?.id || item?._id;
  const detailsUrl = ROUTES.VENDOR_DETAILS.replace(':id', vendorId);

  return (
    <div className='flex h-full flex-col rounded-lg font-raleway border border-[#f0eee9] p-4 transition-shadow hover:shadow-sm'>
      <div className='mb-4 flex items-center justify-between'>
        <span className='rounded-full bg-[#F6F5F2] px-3 py-1 text-[10px] font-medium text-[#6b6b6b]'>
          {item?.category || 'Uncategorized'}
        </span>
        <span className='text-sm font-medium text-[#D4A574]'>
          {item?.matchPercentage}% match
        </span>
      </div>

      <h3 className='mb-1.5 text-lg font-medium text-[#2d2d2d] truncate' title={item?.businessName || item?.name}>
        {item?.businessName || item?.name}
      </h3>

      <p className='mb-5 text-sm text-[#6b6b6b] font-medium'>{displayPrice}</p>

      <Link 
        to={detailsUrl} 
        className='mt-auto w-full text-center rounded-lg bg-[#A3B79C] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#8d9f87]'
      >
        View Details
      </Link>
    </div>
  );
};

export default SuggestedCard;