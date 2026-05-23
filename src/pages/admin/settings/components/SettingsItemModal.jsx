import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function SettingsItemModal({
  open,
  title,
  placeholder,
  submitLabel,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6'>
      <div className='w-full max-w-md rounded-2xl bg-white shadow-xl'>
        <div className='flex items-start justify-between border-b border-gray-100 px-5 py-4'>
          <div>
            <h3 className='text-lg font-playfair font-semibold text-gray-900'>
              {title}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Add a new entry for this settings section.
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
          >
            <X size={18} />
          </button>
        </div>

        <div className='space-y-4 px-5 py-5'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              {title}
            </label>
            <input
              type='text'
              placeholder={placeholder}
              className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#A7B9A6] focus:bg-white'
            />
          </div>

          <button
            type='button'
            className='w-full rounded-lg bg-[#A7B9A6] px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-95'
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
