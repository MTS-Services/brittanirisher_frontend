import React from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import SuggestedCard from './SuggestedCard';

const CardSkeleton = () => (
  <div className="flex h-full flex-col rounded-lg border border-[#f0eee9] p-4 animate-pulse bg-white">
    <div className="mb-4 flex items-center justify-between">
      <div className="h-5 w-20 rounded-full bg-[#ece9e2]"></div>
      <div className="h-4 w-16 rounded bg-[#ece9e2]"></div>
    </div>
    <div className="mb-2 h-6 w-3/4 rounded bg-[#ece9e2]"></div>
    <div className="mb-5 h-5 w-1/2 rounded bg-[#ece9e2]"></div>
    <div className="mt-auto h-10 w-full rounded-lg bg-[#ece9e2]"></div>
  </div>
);

const SuggestedForYou = ({ items = [], meta, isLoading, onPageChange }) => {
  const hasNextPage = meta?.hasNextPage || false;
  const hasPreviousPage = meta?.hasPreviousPage || false;
  const currentPage = meta?.currentPage || 1;

  return (
    <section className='mt-8 rounded-lg border border-[#ebe5db] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] sm:p-8'>
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Sparkles size={22} className='text-[#D4A574]' />
          <h2 className='text-2xl font-raleway font-medium text-[#2d2d2d]'>Suggested For You</h2>
        </div>
        <button className='text-sm font-raleway font-medium text-[#9a9a9a] hover:text-[#5a5a5a]'>
          View all
        </button>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
          {[1, 2, 3, 4].map((n) => <CardSkeleton key={n} />)}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-[#9a9a9a] font-raleway text-sm">
          No suggestions available at the moment.
        </div>
      ) : (
        <>
          <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {items.map((vendor) => (
              <SuggestedCard key={vendor.id} item={vendor} />
            ))}
          </div>

          {meta && meta.totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4 font-raleway">
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPreviousPage}
                className="flex items-center justify-center rounded-lg border border-[#ebe5db] p-2 text-[#6b6b6b] transition-colors hover:bg-[#F6F5F2] disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft size={18} />
              </button>
              
              <span className="text-sm font-medium text-[#2d2d2d]">
                Page {currentPage} of {meta.totalPages}
              </span>

              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNextPage}
                className="flex items-center justify-center rounded-lg border border-[#ebe5db] p-2 text-[#6b6b6b] transition-colors hover:bg-[#F6F5F2] disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default SuggestedForYou;