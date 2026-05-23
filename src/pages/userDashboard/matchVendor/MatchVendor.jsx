import React, { useState } from 'react';
import MatchVendorHeader from './components/MatchVendorHeader';
import MatchVendorPreferences from './components/MatchVendorPreferences';
import VendorResultsSection from './components/VendorResultsSection';
import MatchVendorPagination from './components/MatchVendorPagination';

const vendorData = [
  {
    id: 1,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '128 Reviews',
    location: 'San Francisco, CA',
    priceRange: '$3,500 - $4,000',
  },
  {
    id: 2,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '102 Reviews',
    location: 'San Francisco, CA',
    priceRange: '$2,800 - $3,500',
  },
  {
    id: 3,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: 'Est. - 14 days',
    location: 'San Francisco, CA',
    priceRange: '$3,200 - $4,500',
  },
  {
    id: 4,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: 'Est. - 18 days',
    location: 'San Francisco, CA',
    priceRange: '$3,800 - $5,000',
  },
  {
    id: 5,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '95 Reviews',
    location: 'San Francisco, CA',
    priceRange: '$3,000 - $3,800',
  },
  {
    id: 6,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '78 Reviews',
    location: 'San Francisco, CA',
    priceRange: '$2,500 - $3,200',
  },
  {
    id: 7,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&auto=format&fit=crop&q=80',
    rating: 5,
    reviews: '110 Reviews',
    location: 'San Francisco, CA',
    priceRange: '$3,500 - $4,200',
  },
  {
    id: 8,
    name: 'Bella Flora Studio',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80',
    rating: 4.5,
    reviews: '88 Reviews',
    location: 'San Francisco, CA',
    priceRange: '$3,000 - $4,000',
  },
];

const MatchVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: '$10,000',
    weddingStyle: 'Romantic elegant',
    date: '03/18/YY',
    location: 'California',
    category: 'Photography',
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(vendorData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVendors = vendorData.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className='w-full  text-[#171717] font-playfair '>
      <MatchVendorHeader />

      <MatchVendorPreferences
        preferences={preferences}
        setPreferences={setPreferences}
      />

      <VendorResultsSection
        vendors={paginatedVendors}
        totalCount={vendorData.length}
      />

      <MatchVendorPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default MatchVendor;
