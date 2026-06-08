import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../config';
import {
  useDeleteVendorMutation,
  useGetAdminVendorQuery,
  useUpdateVendorStatusMutation,
} from '../../../store/features/admin/adminVendor/adminVendorApi';
import { SkeletonBlock } from '../../skeletons/LoadingSkeletons';

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const StatusBadge = ({ status }) => {
  const normalized = String(status || '').toUpperCase();
  const isApproved = normalized === 'APPROVED';
  const isRejected = normalized === 'REJECT' || normalized === 'REJECTED';
  const label = normalized.charAt(0) + normalized.slice(1).toLowerCase();

  const statusClass = isApproved
    ? 'bg-[#D5F5E2] text-[#00C950]'
    : isRejected
      ? 'bg-[#FEE2E2] text-[#DC2626]'
      : 'bg-[#FFF2DD] text-[#F59E0B]';

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${statusClass}`}
    >
      {label || 'Pending'}
    </span>
  );
};

export default function PendingVendorApprovals({
  filter = 'all',
  title = 'Pending Vendor Approvals',
}) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const activeMenuRef = useRef(null);
  const [menuPos, setMenuPos] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const perPage = 10;
  const [updateVendorStatus] = useUpdateVendorStatusMutation();
  const [deleteVendor, { isLoading: isDeleting }] = useDeleteVendorMutation();

  const query = `status=PENDING&page=${page}&limit=${perPage}`;
  const { data, isLoading } = useGetAdminVendorQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  const mappedVendors = (data?.data || []).map((item) => ({
    id: item.id,
    name: item.name || 'Unknown Vendor',
    category: item.category || '-',
    date: formatDate(item.joinedAt),
    status: item.status || 'PENDING',
    raw: item,
  }));

  const filtered = mappedVendors.filter((v) => {
    if (!filter || filter === 'all') return true;
    if (filter === 'approved') return v.status.toLowerCase() === 'approved';
    if (filter === 'reject') {
      const status = v.status.toLowerCase();
      return status === 'reject' || status === 'rejected';
    }
    return true;
  });

  const meta = data?.meta || {};
  const currentPage = meta.currentPage || page;
  const totalResults = meta.totalItems ?? filtered.length;
  const totalPages = meta.totalPages || 1;
  const paged = filtered;

  useEffect(() => {
    function handleDocClick(e) {
      if (activeMenuRef.current && !activeMenuRef.current.contains(e.target)) {
        setOpenId(null);
        setMenuPos(null);
      }
    }

    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const handleAction = async (action, vendor) => {
    setOpenId(null);
    setMenuPos(null);

    if (action === 'details' && vendor?.id) {
      navigate(
        ROUTES.ADMIN_VENDOR_DETAILS.replace(':vendorId', String(vendor.id)),
        { state: { vendor } },
      );
      return;
    }

    if (!vendor?.id) {
      toast.error('Vendor data not found.');
      return;
    }

    if (action === 'approve') {
      try {
        await updateVendorStatus({
          id: vendor.id,
          status: 'APPROVED',
        }).unwrap();
        toast.success('Vendor approved successfully.');
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to approve vendor.');
      }
      return;
    }

    if (action === 'reject') {
      try {
        await updateVendorStatus({
          id: vendor.id,
          status: 'REJECTED',
        }).unwrap();
        toast.success('Vendor rejected successfully.');
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to reject vendor.');
      }
      return;
    }

    if (action === 'delete') {
      setDeleteTarget(vendor);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget?.id) return;

    try {
      await deleteVendor({ id: deleteTarget.id }).unwrap();
      toast.success('Vendor deleted successfully.');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete vendor.');
    }
  };

  const toggleMenu = (id, evt) => {
    if (openId === id) {
      setOpenId(null);
      setMenuPos(null);
      return;
    }

    const btn = evt.currentTarget;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 176; // matches w-44
    const menuHeight = 140; // approximate
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < menuHeight;
    const left = Math.min(
      Math.max(rect.right - menuWidth, 8),
      window.innerWidth - menuWidth - 8,
    );
    // when opening upward, add a little extra gap so the menu sits slightly higher
    const EXTRA_UP_OFFSET = 16;
    const top = openUp
      ? rect.top - menuHeight - 8 - EXTRA_UP_OFFSET
      : rect.bottom + 8;

    setOpenId(id);
    setMenuPos({ top, left, openUp });
  };

  return (
    <div className='bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden'>
      <div className='px-5 sm:px-6 pt-5 pb-4'>
        <h2 className='text-xl font-playfair md:text-2xl font-semibold text-gray-900'>
          {title}
        </h2>
      </div>

      {/* Desktop / Tablet Table */}
      <div className='hidden sm:block overflow-x-auto'>
        <table className='w-full text-base font-raleway'>
          <thead>
            <tr className='bg-[#F6FBFF] border-y border-gray-100'>
              <th className='text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide'>
                Vendor
              </th>
              <th className='text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide'>
                Category
              </th>
              <th className='text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide'>
                Date Joined
              </th>
              <th className='text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide'>
                Status
              </th>
              <th className='text-center px-6 py-3 text-base font-medium text-[#000000] tracking-wide'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={`pending-vendor-skeleton-${index}`}>
                  <td className='px-6 py-3.5'>
                    <SkeletonBlock className='h-4 w-28 rounded' />
                  </td>
                  <td className='px-6 py-3.5'>
                    <SkeletonBlock className='h-4 w-20 rounded' />
                  </td>
                  <td className='px-6 py-3.5'>
                    <SkeletonBlock className='h-4 w-24 rounded' />
                  </td>
                  <td className='px-6 py-3.5'>
                    <SkeletonBlock className='h-7 w-20 rounded-full' />
                  </td>
                  <td className='px-6 py-3.5'>
                    <div className='flex justify-center'>
                      <SkeletonBlock className='h-8 w-8 rounded-lg' />
                    </div>
                  </td>
                </tr>
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className='px-6 py-10 text-center text-sm font-raleway text-gray-500'
                >
                  No pending vendors found.
                </td>
              </tr>
            ) : (
              paged.map((v) => (
                <tr
                  key={v.id}
                  className='hover:bg-gray-50/50 transition-colors'
                >
                  <td className='px-6 py-3.5 text-gray-800 font-medium text-sm'>
                    {v.name}
                  </td>
                  <td className='px-6 py-3.5 text-gray-500 text-sm'>
                    {v.category}
                  </td>
                  <td className='px-6 py-3.5 text-gray-500 text-sm'>
                    {v.date}
                  </td>
                  <td className='px-6 py-3.5'>
                    <StatusBadge status={v.status} />
                  </td>
                  <td className='px-6 py-3.5 align-middle text-center'>
                    <div className='relative inline-block'>
                      <button
                        aria-expanded={openId === v.id}
                        onClick={(e) => toggleMenu(v.id, e)}
                        className='text-gray-400 hover:text-gray-600 transition'
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className='sm:hidden divide-y divide-gray-50'>
        {isLoading ? (
          <div className='px-5 py-4 space-y-3'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`pending-mobile-skeleton-${index}`} className='space-y-2'>
                <SkeletonBlock className='h-4 w-32 rounded' />
                <SkeletonBlock className='h-3 w-44 rounded' />
              </div>
            ))}
          </div>
        ) : paged.length === 0 ? (
          <div className='px-5 py-6 text-center text-sm font-raleway text-gray-500'>
            No pending vendors found.
          </div>
        ) : (
          paged.map((v) => (
            <div
              key={v.id}
              className='px-5 py-4 flex items-center justify-between gap-3'
            >
              <div className='min-w-0'>
                <p className='text-sm font-semibold text-gray-800 truncate'>
                  {v.name}
                </p>
                <p className='text-xs text-gray-400 mt-0.5'>
                  {v.category} · {v.date}
                </p>
              </div>
              <div className='flex items-center gap-2 shrink-0 relative'>
                <StatusBadge status={v.status} />
                <button
                  aria-expanded={openId === v.id}
                  onClick={(e) => toggleMenu(v.id, e)}
                  className='text-gray-400 hover:text-gray-600 transition'
                >
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Portal menu rendered to body so it isn't clipped by overflow-hidden */}
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
                  onClick={() =>
                    handleAction(
                      'details',
                      paged.find((x) => x.id === openId),
                    )
                  }
                  className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                >
                  See Details
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleAction(
                      'approve',
                      paged.find((x) => x.id === openId),
                    )
                  }
                  className='w-full text-left px-4 py-2 text-sm text-[#1FB356] hover:bg-gray-50'
                >
                  Approve
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleAction(
                      'reject',
                      paged.find((x) => x.id === openId),
                    )
                  }
                  className='w-full text-left px-4 py-2 text-sm text-[#F97316] hover:bg-gray-50'
                >
                  Reject
                </button>
              </li>
              <li>
                <button
                  onClick={() =>
                    handleAction(
                      'delete',
                      paged.find((x) => x.id === openId),
                    )
                  }
                  className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50'
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>,
          document.body,
        )}

      {/* Pagination */}
      <div className='px-5 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <p className='text-base font-medium text-[#1FB356]'>
          Showing {(currentPage - 1) * perPage + (paged.length ? 1 : 0)} to{' '}
          {(currentPage - 1) * perPage + paged.length} of {totalResults} results
        </p>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className='px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition'
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={currentPage >= totalPages}
            className='px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition'
          >
            Next
          </button>
        </div>
      </div>

      {deleteTarget &&
        createPortal(
          <div className='fixed inset-0 z-60 flex items-center justify-center bg-black/40 px-4'>
            <div className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
              <h3 className='font-playfair text-2xl text-gray-900'>
                Confirm Delete
              </h3>
              <p className='mt-2 text-sm font-raleway text-gray-600'>
                Are you sure you want to delete vendor{' '}
                <span className='font-semibold text-gray-800'>
                  {deleteTarget.name}
                </span>
                ?
              </p>
              <div className='mt-6 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeleting}
                  className='rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className='rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
