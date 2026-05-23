import { useState } from 'react';
import PaymentsHeader from './components/PaymentsHeader';
import PaymentsStats from './components/PaymentsStats';
import PaymentsRevenueChart from './components/PaymentsRevenueChart';
import PaymentsPurchasesTable from './components/PaymentsPurchasesTable';

export default function Payments() {
  const [filter, setFilter] = useState('Active');

  return (
    <div className='space-y-6 sm:space-y-8'>
      <PaymentsHeader filter={filter} setFilter={setFilter} />
      <PaymentsStats />
      <PaymentsRevenueChart />
      <PaymentsPurchasesTable />
    </div>
  );
}
