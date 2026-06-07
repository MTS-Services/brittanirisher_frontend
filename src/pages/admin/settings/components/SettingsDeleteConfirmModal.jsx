import { AlertTriangle, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function SettingsDeleteConfirmModal({
  open,
  title,
  itemName,
  isDeleting,
  onConfirm,
  onClose,
}) {
  if (!open) {
    return null;
  }

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6'>
      <div className='w-full max-w-md rounded-2xl bg-white shadow-xl'>
        <div className='flex items-start justify-between border-b border-gray-100 px-5 py-4'>
          <div className='flex items-start gap-3'>
            <div className='mt-0.5 rounded-full bg-red-50 p-2 text-red-500'>
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 className='text-lg font-playfair font-semibold text-gray-900'>
                {title}
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                This action cannot be undone.
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700'
          >
            <X size={18} />
          </button>
        </div>

        <div className='space-y-5 px-5 py-5'>
          <p className='text-sm text-gray-700'>
            Are you sure you want to delete{' '}
            <span className='font-semibold text-gray-900'>{itemName}</span>?
          </p>

          <div className='flex items-center justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50'
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={onConfirm}
              disabled={isDeleting}
              className='rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}