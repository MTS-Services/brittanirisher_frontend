import React from 'react';
import SavedVendorCard from './SavedVendorCard';

const SavedVendorsGrid = ({ vendors, favorites, onToggleFavorite }) => {
  return (
    <section className='mb-6'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {vendors.map((vendor) => (
          <SavedVendorCard
            key={vendor.id}
            vendor={vendor}
            isFavorite={Boolean(favorites[vendor.id])}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </section>
  );
};

export default SavedVendorsGrid;