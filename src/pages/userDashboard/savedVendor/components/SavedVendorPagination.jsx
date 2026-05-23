import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SavedVendorPagination = ({ currentPage, totalPages, onPrevPage, onNextPage, onPageChange }) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d5d1cb] bg-white text-[#6a6a6a] transition hover:bg-[#f5f5f5] disabled:opacity-50'
      >
        <ChevronLeft size={16} />
      </button>

      <span className='px-2 text-sm text-[#6a6a6a]'>Previous</span>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition ${
            currentPage === index + 1
              ? 'bg-[#b4c4b1] text-[#2f3a2f]'
              : 'border border-[#d5d1cb] bg-white text-[#6a6a6a] hover:bg-[#f5f5f5]'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <span className='px-2 text-sm text-[#6a6a6a]'>Next</span>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d5d1cb] bg-white text-[#6a6a6a] transition hover:bg-[#f5f5f5] disabled:opacity-50'
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default SavedVendorPagination;