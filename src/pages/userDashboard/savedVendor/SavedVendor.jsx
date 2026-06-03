import React, { useState } from 'react';
import SavedVendorHeader from './components/SavedVendorHeader';
import SavedVendorsGrid from './components/SavedVendorsGrid';
import SavedVendorPagination from './components/SavedVendorPagination';
import { useGetSaveVendorsQuery } from '../../../store/features/couple/coupleDashboard'; 

const SavedVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: responseData, isLoading, isError, error } = useGetSaveVendorsQuery({
    page: currentPage,
    limit: itemsPerPage
  });

  const vendors = responseData?.data || [];
  const meta = responseData?.meta || {};
  const totalPages = meta.totalPages || 1;

  const handlePrevPage = () => {
    if (meta.hasPreviousPage) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (meta.hasNextPage) setCurrentPage(currentPage + 1);
  };

  const [favorites, setFavorites] = useState({});
  const toggleFavorite = (vendorId) => {
    setFavorites(prev => ({ ...prev, [vendorId]: !prev[vendorId] }));
  };

  const handleRemoveVendor = (vendorId) => {
    console.log("Remove vendor ID:", vendorId);
  };

  if (isLoading) {
    return <div className="text-center py-10 font-raleway">Loading saved vendors...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500 font-raleway">Error: {error?.message || 'Something went wrong'}</div>;
  }

  return (
    <section className='w-full text-[#171717] font-raleway'>
      <SavedVendorHeader />
      
      {vendors.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No saved vendors found.</div>
      ) : (
        <SavedVendorsGrid
          vendors={vendors}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRemove={handleRemoveVendor}
        />
      )}

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