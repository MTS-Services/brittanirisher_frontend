import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MatchVendorPagination = ({ currentPage, totalPages, onPrevPage, onNextPage, onPageChange }) => {
  return (
    <div className='flex items-center justify-center gap-2'>
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className='inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#d5d1cb] bg-white text-[#6a6a6a] transition hover:bg-[#f5f5f5] disabled:opacity-50'
      >
        <ChevronLeft size={16} />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition ${
            currentPage === i + 1
              ? 'bg-[#d0d0d0] text-[#666]'
              : 'border border-[#d5d1cb] bg-white text-[#6a6a6a] hover:bg-[#f5f5f5]'
          }`}
        >
          {i + 1}
        </button>
      ))}

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

export default MatchVendorPagination;
