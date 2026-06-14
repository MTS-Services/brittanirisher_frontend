import React, { useState } from 'react';
import MatchVendorHeader from './components/MatchVendorHeader';
import MatchVendorPreferences from './components/MatchVendorPreferences';
import VendorResultsSection from './components/VendorResultsSection';
import MatchVendorPagination from './components/MatchVendorPagination';
import { useGetVendorSuggestedQuery } from '../../../store/features/couple/coupleDashboard';


const INITIAL_PREFERENCES = {
  search: '',
  date: '',
  _dateDisplay: '',
  state: '',
  city: '',
  minPrice: '',
  maxPrice: '',
  category: '',
};
 
const MatchVendor = () => {
  const [currentPage, setCurrentPage] = useState(1);
 
  // Draft preferences — what user is typing/selecting
  const [preferences, setPreferences] = useState(INITIAL_PREFERENCES);
 
  // Applied preferences — what is actually sent to API (only after Search click)
  const [appliedPreferences, setAppliedPreferences] = useState(INITIAL_PREFERENCES);
 
  // Build query params from APPLIED preferences only
  const queryParams = {
    page: currentPage,
    limit: 12,
    ...(appliedPreferences.search && { search: appliedPreferences.search }),
    ...(appliedPreferences.state && { state: appliedPreferences.state }),
    ...(appliedPreferences.city && { city: appliedPreferences.city }),
    ...(appliedPreferences.date && { availableDate: appliedPreferences.date }),
    ...(appliedPreferences.minPrice && { minPrice: appliedPreferences.minPrice }),
    ...(appliedPreferences.maxPrice && { maxPrice: appliedPreferences.maxPrice }),
    ...(appliedPreferences.category && { category: appliedPreferences.category }),
  };
 
  const { data, isLoading, isFetching, isError } = useGetVendorSuggestedQuery(queryParams);
  
  const vendors = data?.data || [];
  const meta = data?.meta || {};
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.totalItems || 0;
 
  // Apply filters and reset to page 1
  const handleSearch = () => {
    setAppliedPreferences({ ...preferences });
    setCurrentPage(1);
  };
 
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
 
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
 
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
 
  return (
    <section className='w-full text-[#171717] font-raleway'>
      <MatchVendorHeader />
 
      <MatchVendorPreferences
        preferences={preferences}
        setPreferences={setPreferences}
        onSearch={handleSearch}
      />
 
      <VendorResultsSection
        vendors={vendors}
        totalCount={totalItems}
        isLoading={isLoading || isFetching}
        isError={isError}
      />
 
      {!isLoading && !isError && totalPages > 1 && (
        <MatchVendorPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
 
export default MatchVendor;