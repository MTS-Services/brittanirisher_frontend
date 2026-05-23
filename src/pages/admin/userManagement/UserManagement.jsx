import { useMemo, useState } from 'react';
import UserManagementHeader from './components/UserManagementHeader';
import UserTypeTabs from './components/UserTypeTabs';
import UserManagementTable from './components/UserManagementTable';
import UserManagementCardList from './components/UserManagementCardList';
import UserManagementPagination from './components/UserManagementPagination';

const BASE_USERS = [
  { name: 'Sarah', email: 'sarah@gmail.com', phone: '+123 6543 875', location: 'New York, NY' },
  { name: 'Juhan', email: 'juhan@gmail.com', phone: '+123 6543 875', location: 'Los Angeles, CA' },
  { name: 'Zepher', email: 'zepher@gmail.com', phone: '+123 6543 875', location: 'Chicago, IL' },
  { name: 'Liyana', email: 'liyana@gmail.com', phone: '+123 6543 875', location: 'Miami, FL' },
  { name: 'Lisa', email: 'lisana@gmail.com', phone: '+123 6543 875', location: 'Atlanta, GA' },
  { name: 'Zarah', email: 'zara@gmail.com', phone: '+123 6543 875', location: 'Dallas, TX' },
];

const COUPLE_ROWS = [
  { weddingStyle: 'Classic Elegant', weddingDate: '2024-05-10', budget: '$5,000', spent: '$2,450', remaining: '$1,550' },
  { weddingStyle: 'Modern Luxury', weddingDate: '2024-05-10', budget: '$10,000', spent: '$5,800', remaining: '$4,200' },
  { weddingStyle: 'Rustic Romance', weddingDate: '2024-05-10', budget: '$15,000', spent: '$8,200', remaining: '$6,800' },
  { weddingStyle: 'Bohemian Chic', weddingDate: '2024-05-10', budget: '$20,000', spent: '$12,750', remaining: '$7,250' },
  { weddingStyle: 'Garden Wedding', weddingDate: '2024-05-10', budget: '$30,000', spent: '$18,400', remaining: '$13,100' },
  { weddingStyle: 'Beach Wedding', weddingDate: '2024-05-10', budget: '$40,000', spent: '$26,900', remaining: '$10,500' },
];

const VENDOR_ROWS = [
  { subscriptionName: 'Starter Plan', price: '$299 / Month', status: 'active' },
  { subscriptionName: 'Basic Plan', price: '$499 / Month', status: 'active' },
  { subscriptionName: 'Standard Plan', price: '$799 / Month', status: 'active' },
  { subscriptionName: 'Professional Plan', price: '$1,200 / Month', status: 'active' },
  { subscriptionName: 'Growth Plan', price: '$1,800 / Month', status: 'active' },
  { subscriptionName: 'Premium Plan', price: '$2,500 / Month', status: 'active' },
];

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('couple');
  const [vendorFilter, setVendorFilter] = useState('active');
  const [page, setPage] = useState(1);
  const perPage = 7;

  const rows = useMemo(() => {
    if (activeTab === 'couple') {
      return BASE_USERS.map((user, index) => ({ ...user, ...COUPLE_ROWS[index] }));
    }

    return BASE_USERS.map((user, index) => ({ ...user, ...VENDOR_ROWS[index] })).filter(
      (row) => (vendorFilter === 'all' ? true : row.status === vendorFilter),
    );
  }, [activeTab, vendorFilter]);

  const pagedRows = rows.slice((page - 1) * perPage, page * perPage);

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
        <UserManagementCardList activeTab={activeTab} pagedRows={pagedRows} />
        <UserManagementTable activeTab={activeTab} pagedRows={pagedRows} />

        <UserManagementPagination
          page={page}
          setPage={setPage}
          perPage={perPage}
          rowsLength={rows.length}
        />
      </div>
    </div>
  );
}
