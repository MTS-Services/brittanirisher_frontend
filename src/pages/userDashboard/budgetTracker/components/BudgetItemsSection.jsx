import React, { useState } from 'react';
import { X } from 'lucide-react';

const budgetItems = [
  {
    title: 'Photography',
    note: 'Family portraits before ceremony starts.',
    amount: '$2,400',
    vendorName: 'Md. Ismail Molla',
    vendorPhone: '(207) 555-0119',
    vendorEmail: 'michelle.rivera@example.com',
  },
  {
    title: 'Videography',
    note: 'Ceremony and reception full event coverage.',
    amount: '$3,200',
    vendorName: 'Rafid Hasan',
    vendorPhone: '(207) 555-0137',
    vendorEmail: 'rafid.hasan@example.com',
  },
  {
    title: 'Floral Design',
    note: 'Bouquets, stage decor, and table centerpieces.',
    amount: '$1,900',
    vendorName: 'Nusrat Jahan',
    vendorPhone: '(207) 555-0161',
    vendorEmail: 'nusrat.jahan@example.com',
  },
  {
    title: 'Catering',
    note: 'Dinner menu for 200 guests with dessert bar.',
    amount: '$5,600',
    vendorName: 'Sabbir Ahmed',
    vendorPhone: '(207) 555-0148',
    vendorEmail: 'sabbir.ahmed@example.com',
  },
  {
    title: 'Dj & Music',
    note: 'Live DJ set with sound and lighting setup.',
    amount: '$2,100',
    vendorName: 'Rifat Karim',
    vendorPhone: '(207) 555-0188',
    vendorEmail: 'rifat.karim@example.com',
  },
];

const BudgetItemsSection = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleOpenExpense = (item) => {
    setSelectedExpense(item);
  };

  const handleCloseExpense = () => {
    setSelectedExpense(null);
  };

  return (
    <>
      <div className='mt-6  grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5 font-raleway'>
        {budgetItems.map((item) => (
          <button
            key={item.title}
            type='button'
            onClick={() => handleOpenExpense(item)}
            className='rounded-xl border border-[#F3F4F6] bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition hover:border-[#d9e1d8] hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a4b5a2]'
          >
            <h3 className='m-0 text-[1.15rem] font-medium text-[#2f2f2f]'>{item.title}</h3>
            <p className='mb-3 mt-2 text-base leading-relaxed text-[#555555]'>{item.note}</p>
            <p className='m-0 text-[1.8rem] leading-none font-playfair text-[#1e1e1e] md:text-[2rem]'>
              {item.amount}
            </p>
          </button>
        ))}
      </div>

      {selectedExpense && (
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
              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Category</p>
                <p className='m-0 mt-1 text-lg leading-none text-[#1e1e1e]'>
                  {selectedExpense.title}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Vendor Name</p>
                <p className='m-0 mt-1 text-lg leading-none text-[#1e1e1e]'>
                  {selectedExpense.vendorName}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Vendor Phone Number</p>
                <p className='m-0 mt-1 text-lg leading-none text-[#1e1e1e]'>
                  {selectedExpense.vendorPhone}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Vendor Email</p>
                <p className='m-0 mt-1 text-lg leading-none break-all text-[#1e1e1e]'>
                  {selectedExpense.vendorEmail}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Expense</p>
                <p className='m-0 mt-1 text-lg leading-none text-[#1e1e1e]'>
                  {selectedExpense.amount}
                </p>
              </div>

              <div>
                <p className='m-0 text-base text-[#3a3a3a]'>Note</p>
                <p className='m-0 mt-1 text-lg leading-tight text-[#1e1e1e]'>
                  {selectedExpense.note}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetItemsSection;
