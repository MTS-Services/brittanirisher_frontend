import { useMemo, useState } from 'react';
import UserManagementHeader from './components/UserManagementHeader';
import UserTypeTabs from './components/UserTypeTabs';
import UserManagementTable from './components/UserManagementTable';
import UserManagementCardList from './components/UserManagementCardList';
import UserManagementPagination from './components/UserManagementPagination';
import { useGetAdminCoupleProfilesQuery } from '../../../store/features/admin/adminDashboard/adminDashboardApi';
import { useGetAdminVendorQuery } from '../../../store/features/admin/adminVendor/adminVendorApi';

const BASE_USERS = [
  { name: 'Sarah', email: 'sarah@gmail.com', phone: '+123 6543 875', location: 'New York, NY' },
  { name: 'Juhan', email: 'juhan@gmail.com', phone: '+123 6543 875', location: 'Los Angeles, CA' },
  { name: 'Zepher', email: 'zepher@gmail.com', phone: '+123 6543 875', location: 'Chicago, IL' },
  { name: 'Liyana', email: 'liyana@gmail.com', phone: '+123 6543 875', location: 'Miami, FL' },
  { name: 'Lisa', email: 'lisana@gmail.com', phone: '+123 6543 875', location: 'Atlanta, GA' },
  { name: 'Zarah', email: 'zara@gmail.com', phone: '+123 6543 875', location: 'Dallas, TX' },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('couple');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const coupleQuery = useMemo(
    () =>
      new URLSearchParams({
        page: String(page),
        limit: String(perPage),
      }).toString(),
    [page],
  );

  const { data: coupleResponse, isLoading: isCoupleLoading } =
    useGetAdminCoupleProfilesQuery(coupleQuery, {
      skip: activeTab !== 'couple',
      refetchOnMountOrArgChange: true,
      refetchOnWindowFocus: true,
    });

  const vendorQuery = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(perPage),
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });

    return params.toString();
  }, [page]);

  const { data: vendorResponse, isLoading: isVendorLoading } =
    useGetAdminVendorQuery(vendorQuery, {
      skip: activeTab !== 'vendor',
      refetchOnMountOrArgChange: true,
      refetchOnWindowFocus: true,
    });

  const coupleMeta = coupleResponse?.meta || {};
  const vendorMeta = vendorResponse?.meta || {};

  const formatDate = (dateValue) => {
    if (!dateValue) return '-';
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return '-';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatMoney = (value) => {
    if (value === null || value === undefined || value === '') return '$0';
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return `$${value}`;
    return `$${numeric.toLocaleString('en-US')}`;
  };

  const rows = useMemo(() => {
    if (activeTab === 'couple') {
      return (coupleResponse?.data || []).map((item) => ({
        id: item.id,
        name: item.name || 'N/A',
        email: item.email || 'N/A',
        phone: item.phone || 'N/A',
        location: item.location || 'N/A',
        weddingStyle: item.weldingStyle || 'N/A',
        weddingDate: formatDate(item.weldingDate || item.eventDate),
        budget: formatMoney(item.budget),
        spent: formatMoney(item.expendBudget),
        remaining: formatMoney(item.remainingBudget),
      }));
    }

    return (vendorResponse?.data || [])
      .map((item) => ({
        id: item.id,
        name: item.name || 'N/A',
        email: item.email || 'N/A',
        phone: item.phone || 'N/A',
        location: item.location || 'N/A',
        subscriptionName: item.subscriptionPlan || 'N/A',
        price: formatMoney(item.price),
        subscriptionStatus: item.subscriptionStatus || 'N/A',
      }))
      .filter((row) =>
        vendorFilter === 'active' ? row.subscriptionStatus === 'ACTIVE' : true,
      );
  }, [activeTab, coupleResponse, vendorFilter, vendorResponse]);

  const pagedRows =
    activeTab === 'couple'
      ? rows
      : rows;

  const totalResults =
    activeTab === 'couple'
      ? (coupleMeta.totalItems ?? rows.length)
      : (vendorMeta.totalItems ?? rows.length);

  const totalPages =
    activeTab === 'couple'
      ? (coupleMeta.totalPages || 1)
      : (vendorMeta.totalPages || 1);

  const hasNextPage =
    activeTab === 'couple'
      ? !!coupleMeta.hasNextPage
      : !!vendorMeta.hasNextPage;

  const hasPreviousPage =
    activeTab === 'couple'
      ? !!coupleMeta.hasPreviousPage
      : !!vendorMeta.hasPreviousPage;

  const isTableLoading =
    (activeTab === 'couple' && isCoupleLoading) ||
    (activeTab === 'vendor' && isVendorLoading);

  return (
    <div className='space-y-8'>
      <UserManagementHeader />

      <UserTypeTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setPage={setPage}
        vendorFilter={vendorFilter}
        setVendorFilter={setVendorFilter}
      />

      <div className='bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden'>
        <UserManagementCardList
          activeTab={activeTab}
          pagedRows={pagedRows}
          isLoading={isTableLoading}
        />
        <UserManagementTable
          activeTab={activeTab}
          pagedRows={pagedRows}
          isLoading={isTableLoading}
        />

        <UserManagementPagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          rowsLength={totalResults}
          totalPages={totalPages}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  );
}
