import React, { useState } from 'react';
import { X } from 'lucide-react';
import {
  useGetCoupleExpenseQuery,
  useGetCoupleExpenseByIdQuery,
} from '../../../../store/features/couple/coupleDashboard'; 

// Skeleton Component
const StatsSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 animate-pulse">
    {[1, 2, 3, 4].map((n) => (
      <div key={n} className="h-28 rounded-lg border border-[#f0eee9] bg-gray-50/50 p-6">
        <div className="h-4 w-24 rounded bg-gray-200 mb-3"></div>
        <div className="h-8 w-32 rounded bg-gray-300"></div>
      </div>
    ))}
  </div>
);

const BudgetItemsSection = () => {
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);



  const { data: expenseItems = [], isLoading, isError } = useGetCoupleExpenseQuery();
  const {
    data: selectedExpense,
    isLoading: isSelectedExpenseLoading,
  } = useGetCoupleExpenseByIdQuery(selectedExpenseId, {
    skip: !selectedExpenseId,
  });

  const getCategoryLabel = (expense) =>
    expense?.category?.name || expense?.categoryName || expense?.category || 'No Category';

  const getAmountLabel = (expense) => expense?.amount ?? expense?.expense ?? '0.00';

  const handleOpenExpense = (item) => {
    setSelectedExpenseId(item.id || item._id || null);
  };

  const handleCloseExpense = () => {
    setSelectedExpenseId(null);
  };

 if (isLoading) {
    return <StatsSkeleton />;
  }

  if (isError) {
    return <div className="text-center mt-6 font-raleway text-red-500">Something went wrong while fetching expenses!</div>;
  }

  return (
    <>
    <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5 font-raleway'>
  {expenseItems.map((item) => (
    <button
      key={item.id || item._id}
      type='button'
      onClick={() => handleOpenExpense(item)}
      className='rounded-xl border border-[#F3F4F6] bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:border-[#d9e1d8] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4b5a2] flex flex-col justify-between'
    >
      <div>
        <h3 className='m-0 text-[1.15rem] font-medium text-[#2f2f2f]'>
          {getCategoryLabel(item)}
        </h3>
    
        <p className='mb-3 mt-2 text-base leading-relaxed text-[#555555] block w-full overflow-hidden break-words line-clamp-2 h-[3rem]'>
          {item.note}
        </p>
      </div>
      
      <p className='m-0 text-[1.8rem] leading-none font-playfair text-[#1e1e1e] md:text-[2rem]'>
        ${getAmountLabel(item)}
      </p>
    </button>
  ))}
</div>

      {expenseItems.length === 0 && (
        <div className="text-center mt-6 font-raleway text-[#555555]">No expenses found.</div>
      )}

      {selectedExpenseId && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
          onClick={handleCloseExpense}
          role='presentation'
        >
          <div
            className='w-full max-w-160 rounded-2xl bg-[#f8f8f8] p-5 shadow-2xl sm:p-7'
            onClick={(event) => event.stopPropagation()}
            role='dialog'
            aria-modal='true'
            aria-labelledby='expense-details-title'
          >
            <div className='mb-4 flex items-start justify-between'>
              <h2 id='expense-details-title' className='m-0 font-playfair text-xl text-[#212121]'>
                Expense Details
              </h2>
              <button
                type='button'
                onClick={handleCloseExpense}
                className='inline-flex h-8 w-8 items-center justify-center rounded-md text-[#1e1e1e] transition hover:bg-black/5'
                aria-label='Close expense details modal'
              >
                <X size={20} />
              </button>
            </div>

            <div className='space-y-3 font-raleway'>
              {isSelectedExpenseLoading ? (
                <div className='grid grid-cols-1 gap-3 animate-pulse'>
                  <div className='h-4 w-24 rounded bg-gray-200' />
                  <div className='h-5 w-full rounded bg-gray-200' />
                  <div className='h-4 w-28 rounded bg-gray-200' />
                  <div className='h-5 w-3/4 rounded bg-gray-200' />
                </div>
              ) : (
                <>
              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Category : </p>
                <p className='m-0 mt-1 text-lg leading-none font-semibold text-[#1e1e1e]'>
                  {getCategoryLabel(selectedExpense)}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Vendor Name : </p>
                <p className='m-0 mt-1 text-lg leading-none font-semibold text-[#1e1e1e]'>
                  {selectedExpense.vendorName || 'N/A'}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Vendor Phone Number : </p>
                <p className='m-0 mt-1 text-lg font-semibold leading-none text-[#1e1e1e]'>
                  {selectedExpense.vendorPhone || 'N/A'}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Vendor Email : </p>
                <p className='m-0 mt-1 text-lg font-semibold leading-none break-all text-[#1e1e1e]'>
                  {selectedExpense.vendorEmail || 'N/A'}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Expense : </p>
                <p className='m-0 mt-1 text-lg font-semibold leading-none text-[#1e1e1e]'>
                  ৳{getAmountLabel(selectedExpense)}
                </p>
              </div>

             <div className='grid grid-cols-1  gap-1 sm:gap-4 items-baseline'>
            <p className='m-0 text-sm font-medium text-[#71717a] uppercase tracking-wider'>Note : </p>
            <p className='m-0 text-base md:text-lg font-semibold text-[#3f3f46] sm:col-span-2 break-words text-justify leading-relaxed whitespace-pre-line'>
              {selectedExpense?.note || 'No note added.'}
            </p>
          </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetItemsSection;