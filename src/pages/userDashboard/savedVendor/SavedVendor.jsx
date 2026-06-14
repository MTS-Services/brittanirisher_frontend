import React, { useState } from 'react';
import SavedVendorHeader from './components/SavedVendorHeader';
import SavedVendorsGrid from './components/SavedVendorsGrid';
import SavedVendorPagination from './components/SavedVendorPagination';
import { useGetSaveVendorsQuery, useSaveVendorMutation } from '../../../store/features/couple/coupleDashboard';

const SavedVendorsSkeleton = () => (
  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-pulse'>
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className='overflow-hidden rounded-xl border border-[#dfddd8] bg-[#f8f8f7] shadow-sm'
      >
        <div className='h-48 bg-[#ece9e2]' />

        <div className='px-3 py-2.5 space-y-3'>
          <div className='h-5 w-3/4 rounded bg-[#ece9e2]' />
          <div className='h-4 w-1/2 rounded bg-[#ece9e2]' />
          <div className='space-y-2 pt-1'>
            <div className='h-3.5 w-2/3 rounded bg-[#ece9e2]' />
            <div className='h-3.5 w-1/2 rounded bg-[#ece9e2]' />
          </div>
          <div className='h-8 w-full rounded bg-[#ece9e2] mt-2' />
        </div>
      </div>
    ))}
  </div>
);

const SavedVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const {
    data: responseData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSaveVendorsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [saveVendor, { isLoading: isSaving }] = useSaveVendorMutation();

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
  const toggleFavorite = async (vendorId) => {
    try {
      await saveVendor({ vendorId }).unwrap();
      setFavorites((prev) => ({
        ...prev,
        [vendorId]: !prev[vendorId],
      }));
      toast.success(
        favorites[vendorId] ? 'Removed from favorites' : 'Added to favorites',
      );
      refetch();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleRemoveVendor = async (vendorId) => {
    try {
      await saveVendor({ vendorId }).unwrap();
      setFavorites((prev) => ({
        ...prev,
        [vendorId]: !prev[vendorId],
      }));
      toast.success(
        favorites[vendorId] ? 'Removed from favorites' : 'Added to favorites',
      );
      refetch();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  if (isError) {
    return (
      <div className='text-center py-10 text-red-500 font-raleway'>
        Error: {error?.message || 'Something went wrong'}
      </div>
    );
  }

  return (
    <section className='w-full text-[#171717] font-raleway'>
      <SavedVendorHeader />

      {isLoading ? (
        <SavedVendorsSkeleton />
      ) : vendors.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>
          No saved vendors found.
        </div>
      ) : (
        <SavedVendorsGrid
          vendors={vendors}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRemove={handleRemoveVendor}
        />
      )}

      {!isLoading && vendors.length > 0 && (
        <SavedVendorPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  );
};

export default SavedVendor;
