import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../../../config';
import VendorManagementHeader from '../../../components/adminDashboard/requestVendors/VendorManagementHeader';
import RequestedVendorsTable from '../../../components/adminDashboard/requestVendors/RequestedVendorsTable';
import RequestedVendorsMobileList from '../../../components/adminDashboard/requestVendors/RequestedVendorsMobileList';
import RequestedVendorsActionMenu from '../../../components/adminDashboard/requestVendors/RequestedVendorsActionMenu';
import RequestedVendorsPagination from '../../../components/adminDashboard/requestVendors/RequestedVendorsPagination';
import {
  useDeleteVendorMutation,
  useGetAdminVendorQuery,
  useUpdateVendorStatusMutation,
} from '../../../store/features/admin/adminVendor/adminVendorApi';

const FILTER_TO_STATUS = {
  approved: 'APPROVED',
  rejected: 'REJECTED',
  pending: 'PENDING',
};

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

export default function RequestedVendors() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const activeMenuRef = useRef(null);
  const [menuPos, setMenuPos] = useState(null);
  const perPage = 10;

  const [updateVendorStatus] = useUpdateVendorStatusMutation();
  const [deleteVendor, { isLoading: isDeletingVendor }] =
    useDeleteVendorMutation();

  const query = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(perPage),
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

    const status = FILTER_TO_STATUS[filter];
    if (status) {
      params.set('status', status);
    }

    return params.toString();
  }, [filter, page]);

  const { data, isLoading } = useGetAdminVendorQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  const paged = (data?.data || []).map((item) => ({
    id: item.id,
    name: item.name || 'Unknown Vendor',
    category: item.category || '-',
    date: formatDate(item.joinedAt),
    status: item.status || 'PENDING',
    raw: item,
  }));

  const meta = data?.meta || {};
  const totalResults = meta.totalItems ?? 0;
  const totalPages = meta.totalPages || 1;
  const hasNextPage = !!meta.hasNextPage;
  const hasPreviousPage = !!meta.hasPreviousPage;

  useEffect(() => {
    setPage(1);
  }, [filter]);

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

    if (!vendor?.id) {
      toast.error('Vendor not found.');
      return;
    }

    if (action === 'view') {
      navigate(
        ROUTES.ADMIN_VENDOR_DETAILS.replace(':vendorId', String(vendor.id)),
        { state: { vendor } },
      );
      return;
    }

    if (action === 'status-approved') {
      try {
        await updateVendorStatus({
          id: vendor.id,
          status: 'APPROVED',
        }).unwrap();
        toast.success('Vendor status updated to APPROVED.');
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to update vendor status.');
      }
      return;
    }

    if (action === 'status-pending') {
      try {
        await updateVendorStatus({
          id: vendor.id,
          status: 'PENDING',
        }).unwrap();
        toast.success('Vendor status updated to PENDING.');
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to update vendor status.');
      }
      return;
    }

    if (action === 'status-rejected') {
      try {
        await updateVendorStatus({
          id: vendor.id,
          status: 'REJECTED',
        }).unwrap();
        toast.success('Vendor status updated to REJECTED.');
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to update vendor status.');
      }
      return;
    }

    if (action === 'delete') {
      try {
        await deleteVendor({ id: vendor.id }).unwrap();
        toast.success('Vendor deleted successfully.');
        return true;
      } catch (error) {
        toast.error(error?.data?.message || 'Failed to delete vendor.');
        return false;
      }
    }

    return true;
  };

  const toggleMenu = (id, evt) => {
    if (openId === id) {
      setOpenId(null);
      setMenuPos(null);
      return;
    }

    const btn = evt.currentTarget;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 176;
    const left = Math.min(
      Math.max(rect.right - menuWidth, 8),
      window.innerWidth - menuWidth - 8,
    );
    const top = rect.bottom + 8;

    setOpenId(id);
    setMenuPos({ top, left });
  };

  const emptyMessage =
    filter === 'all' ? 'No vendors found.' : `No ${filter} vendors found.`;

  return (
    <div className='space-y-8'>
      <div>
        <VendorManagementHeader filter={filter} setFilter={setFilter} />

        <div className='bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden'>
          <RequestedVendorsTable
            paged={paged}
            openId={openId}
            toggleMenu={toggleMenu}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />

          <RequestedVendorsMobileList
            paged={paged}
            openId={openId}
            toggleMenu={toggleMenu}
            isLoading={isLoading}
            emptyMessage={emptyMessage}
          />

          <RequestedVendorsActionMenu
            openId={openId}
            menuPos={menuPos}
            activeMenuRef={activeMenuRef}
            vendors={paged}
            onAction={handleAction}
            isDeleting={isDeletingVendor}
          />

          <RequestedVendorsPagination
            page={page}
            setPage={setPage}
            perPage={meta.itemsPerPage || perPage}
            totalResults={totalResults}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            hasPreviousPage={hasPreviousPage}
          />
        </div>
      </div>
    </div>
  );
}
