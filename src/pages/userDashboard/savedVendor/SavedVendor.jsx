import React, { useState } from 'react';
import SavedVendorHeader from './components/SavedVendorHeader';
import SavedVendorsGrid from './components/SavedVendorsGrid';
import SavedVendorPagination from './components/SavedVendorPagination';

const savedVendorData = [
  {
    id: 1,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '5 - 128',
    location: 'San Francisco, CA',
    priceRange: '$5,500 - $6,000',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '5 - 102',
    location: 'San Francisco, CA',
    priceRange: '$5,100 - $5,400',
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: '4.5 - 95',
    location: 'San Francisco, CA',
    priceRange: '$5,200 - $5,600',
    isFavorite: true,
  },
  {
    id: 4,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '5 - 110',
    location: 'San Francisco, CA',
    priceRange: '$5,300 - $5,800',
    isFavorite: true,
  },
  {
    id: 5,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?w=600&auto=format&fit=crop&q=80',
    rating: 4,
    reviews: '4 - 78',
    location: 'San Francisco, CA',
    priceRange: '$5,100 - $5,500',
    isFavorite: true,
  },
  {
    id: 6,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1507504038482-76214343e500?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '5 - 88',
    location: 'San Francisco, CA',
    priceRange: '$5,400 - $5,900',
    isFavorite: true,
  },
  {
    id: 7,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: '4.5 - 92',
    location: 'San Francisco, CA',
    priceRange: '$5,200 - $5,700',
    isFavorite: true,
  },
  {
    id: 8,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1494955850428-153ad3a95175?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '5 - 115',
    location: 'San Francisco, CA',
    priceRange: '$5,300 - $5,700',
    isFavorite: true,
  },
];

const SavedVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(
    savedVendorData.reduce((acc, vendor) => {
      acc[vendor.id] = vendor.isFavorite;
      return acc;
    }, {})
  );

  const itemsPerPage = 8;
  const totalPages = Math.ceil(savedVendorData.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const toggleFavorite = (vendorId) => {
    setFavorites({ ...favorites, [vendorId]: !favorites[vendorId] });
  };

  return (
    <section className='w-full text-[#171717] font-playfair '>
      <SavedVendorHeader />
      <SavedVendorsGrid
        vendors={savedVendorData}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      <SavedVendorPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default SavedVendor;
