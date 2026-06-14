import { createPortal } from 'react-dom';
import {
  Eye,
  CheckCircle2,
  Clock3,
  X,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useState } from 'react';

function DeleteConfirmModal({ vendor, onConfirm, onCancel, isDeleting }) {
  if (!vendor) return null;

  return createPortal(
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-black/40'
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className='relative bg-white rounded-xl shadow-xl w-[360px] p-6 flex flex-col gap-4'>
        <div className='flex items-center justify-center w-12 h-12 rounded-full bg-red-50 mx-auto'>
          <AlertTriangle size={24} className='text-red-600' />
        </div>

        <div className='text-center'>
          <h2 className='text-base font-semibold text-gray-900 mb-1'>
            Delete Vendor?
          </h2>
          <p className='text-sm text-gray-500'></p>
        </div>

        <div className='flex gap-3 mt-1'>
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className='flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-60'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className='flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-60'
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function RequestedVendorsActionMenu({
  openId,
  menuPos,
  activeMenuRef,
  vendors,
  onAction,
  isDeleting = false,
}) {
  const [pendingDelete, setPendingDelete] = useState(null);

  const currentVendor = vendors.find((vendor) => vendor.id === openId);

  const handleDeleteClick = () => {
    setPendingDelete(currentVendor);
  };

  const handleConfirmDelete = async () => {
    const didDelete = await onAction('delete', pendingDelete);
    if (didDelete) {
      setPendingDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setPendingDelete(null);
  };

  return (
    <>
      {openId &&
        menuPos &&
        createPortal(
          <div
            ref={activeMenuRef}
            style={{
              position: 'fixed',
              top: menuPos.top,
              left: menuPos.left,
              width: 176,
            }}
            className='bg-white border border-gray-100 rounded-lg shadow-lg z-50'
          >
            <ul className='py-2'>
              <li>
                <button
                  onClick={() => onAction('view', currentVendor)}
                  className='w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3'
                >
                  <Eye size={16} className='text-gray-500' /> <span>View</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onAction('status-approved', currentVendor)}
                  className='w-full text-left px-4 py-3 text-sm text-[#16A34A] hover:bg-gray-50 flex items-center gap-3'
                >
                  <CheckCircle2 size={16} className='text-[#16A34A]' />
                  <span>Set Approved</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onAction('status-pending', currentVendor)}
                  className='w-full text-left px-4 py-3 text-sm text-[#D97706] hover:bg-gray-50 flex items-center gap-3'
                >
                  <Clock3 size={16} className='text-[#D97706]' />
                  <span>Set Pending</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onAction('status-rejected', currentVendor)}
                  className='w-full text-left px-4 py-3 text-sm text-[#F97316] hover:bg-gray-50 flex items-center gap-3'
                >
                  <X size={16} className='text-[#F97316]' />{' '}
                  <span>Set Rejected</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleDeleteClick}
                  className='w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-3'
                >
                  <Trash2 size={16} className='text-red-600' />{' '}
                  <span>Delete</span>
                </button>
              </li>
            </ul>
          </div>,
          document.body,
        )}

      <DeleteConfirmModal
        vendor={pendingDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
