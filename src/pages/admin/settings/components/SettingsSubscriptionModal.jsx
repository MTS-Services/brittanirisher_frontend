import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function SettingsSubscriptionModal({ open, onClose }) {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6'>
      <div className='w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl'>
        <div className='flex items-center justify-between border-b border-gray-100 bg-[#ececec] px-5 py-4'>
          <h3 className='text-2xl font-playfair font-semibold text-gray-700'>
            New Subscription
          </h3>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-50'
            aria-label='Close subscription modal'
          >
            <X size={22} />
          </button>
        </div>

        <div className='space-y-5 px-5 py-5 sm:px-6 sm:py-6'>
          <div>
            <label className='mb-2 block text-[15px] font-medium text-gray-700'>
              Subscription Tittle
            </label>
            <input
              type='text'
              placeholder='Enter Subscription tittle here'
              className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
            />
          </div>

          <div>
            <label className='mb-2 block text-[15px] font-medium text-gray-700'>
              Subscription Description
            </label>
            <textarea
              rows='4'
              placeholder='Description'
              className='w-full resize-none rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
            />
          </div>

          <div>
            <label className='mb-2 block text-[15px] font-medium text-gray-700'>
              Valid For
            </label>
            <input
              type='text'
              placeholder='1 Month'
              className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
            />
          </div>

          <div>
            <label className='mb-2 block text-[15px] font-medium text-gray-700'>
              What's include
            </label>
            <textarea
              rows='4'
              placeholder="write what's include"
              className='w-full resize-none rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
            />
          </div>

          <div>
            <label className='mb-2 block text-[15px] font-medium text-gray-700'>
              Price
            </label>
            <input
              type='text'
              placeholder='$0.00'
              className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
            />
          </div>

          <div className='pt-5'>
            <button
              type='button'
              className='inline-flex rounded-lg bg-[#A7B9A6] px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:opacity-95'
            >
              Add Subscription
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
