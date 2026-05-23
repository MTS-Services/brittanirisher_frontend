import React from 'react';
import { ChevronDown, X } from 'lucide-react';

const initialExpenseForm = {
  category: 'Photography',
  vendorName: '',
  vendorPhone: '',
  vendorEmail: '',
  expense: '$00.00',
  note: '',
};

const AddExpenseModal = ({ isOpen, expenseForm, onFormChange, onClose, onSave }) => {
  if (!isOpen) {
    return null;
  }

  const handleFormFieldChange = (field) => (event) => {
    onFormChange(field, event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
      onClick={onClose}
      role='presentation'
    >
      <div
        className='flex max-h-[90vh] w-full max-w-140 flex-col overflow-hidden rounded-xl bg-[#f8f8f8] shadow-2xl'
        onClick={(event) => event.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='expense-modal-title'
      >
        <div className='sticky top-0 z-10 mb-0 flex items-center justify-between bg-[#f8f8f8] px-4 py-4 sm:px-5'>
          <h2 id='expense-modal-title' className='m-0 text-[2rem] text-[#212121]'>
            Add Expense
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-8 w-8 items-center justify-center rounded-md text-[#1e1e1e] transition hover:bg-black/5'
            aria-label='Close add expense modal'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='flex min-h-0 flex-1 flex-col'>
          <div className='min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-4 sm:px-5'>
            <div>
              <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='expense-category'>
                Category
              </label>
              <div className='relative'>
                <select
                  id='expense-category'
                  value={expenseForm.category}
                  onChange={handleFormFieldChange('category')}
                  className='h-10 w-full appearance-none rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 pr-10 text-[0.95rem] text-[#535353] outline-none focus:border-[#a9b9a6]'
                >
                  <option>Photography</option>
                  <option>Videography</option>
                  <option>Floral Design</option>
                  <option>Catering</option>
                  <option>Dj & Music</option>
                  <option>Bakery</option>
                </select>
                <ChevronDown
                  size={18}
                  className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#676767]'
                  aria-hidden='true'
                />
              </div>
            </div>

            <div>
              <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='vendor-name'>
                Vendor Name
              </label>
              <input
                id='vendor-name'
                type='text'
                value={expenseForm.vendorName}
                onChange={handleFormFieldChange('vendorName')}
                placeholder='Write vendor name'
                className='h-10 w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none placeholder:text-[#909090] focus:border-[#a9b9a6]'
              />
            </div>

            <div>
              <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='vendor-phone'>
                Vendor phone number
              </label>
              <input
                id='vendor-phone'
                type='text'
                value={expenseForm.vendorPhone}
                onChange={handleFormFieldChange('vendorPhone')}
                placeholder='Write vendor phone number'
                className='h-10 w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none placeholder:text-[#909090] focus:border-[#a9b9a6]'
              />
            </div>

            <div>
              <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='vendor-email'>
                Vendor Email
              </label>
              <input
                id='vendor-email'
                type='email'
                value={expenseForm.vendorEmail}
                onChange={handleFormFieldChange('vendorEmail')}
                placeholder='Write vendor email'
                className='h-10 w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none placeholder:text-[#909090] focus:border-[#a9b9a6]'
              />
            </div>

            <div>
              <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='expense-value'>
                Expense
              </label>
              <input
                id='expense-value'
                type='text'
                value={expenseForm.expense}
                onChange={handleFormFieldChange('expense')}
                placeholder='$00.00'
                className='h-10 w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none placeholder:text-[#909090] focus:border-[#a9b9a6]'
              />
            </div>

            <div>
              <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='expense-note'>
                Note
              </label>
              <textarea
                id='expense-note'
                value={expenseForm.note}
                onChange={handleFormFieldChange('note')}
                placeholder='Write a note'
                rows={4}
                className='w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 py-2 text-[0.95rem] text-[#535353] outline-none placeholder:text-[#909090] focus:border-[#a9b9a6]'
              />
            </div>
          </div>

          <div className='sticky bottom-0 z-10 border-t border-[#e6e6e6] bg-[#f8f8f8] px-4 py-3 sm:px-5'>
            <button
              type='submit'
              className='rounded-md bg-[#a4b5a2] px-5 py-2 text-base text-[#2f3a2f] transition hover:bg-[#94a592]'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
