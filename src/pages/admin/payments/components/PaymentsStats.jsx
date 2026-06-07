import {
  CalendarDays,
  CircleDollarSign,
  Clock3,
  LandPlot,
  Users,
} from 'lucide-react';
import { useGetAdminPaymentCardQuery } from '../../../../store/features/admin/adminDashboard/adminDashboardApi';

const formatCurrency = (value) => {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return '$0';
  return `$${numeric.toLocaleString('en-US')}`;
};

const StatCard = ({ label, value, icon: Icon, detail }) => (
  <div className='rounded-xl border border-gray-100 bg-white shadow-sm p-4 h-full'>
    <div className='flex items-start justify-between gap-3'>
      <div>
        <p className='text-base text-[#0A0A0A] font-medium '>{label}</p>
        <p className='mt-3 text-xl sm:text-2xl font-semibold text-gray-900'>{value}</p>
        <p className='mt-1 text-sm text-gray-400'>{detail}</p>
      </div>
      <div className='text-[#717182]'>
        <Icon size={20} />
      </div>
    </div>
  </div>
);

export default function PaymentsStats() {
  const { data, isLoading } = useGetAdminPaymentCardQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  const paymentCard = data?.data || {};

  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(paymentCard.totalRevenue),
      icon: CircleDollarSign,
    },
    {
      label: 'This Month',
      value: formatCurrency(paymentCard.thisMonthRevenue),
      icon: CalendarDays,
      detail: 'Current month',
    },
    {
      label: 'Annual Revenue',
      value: formatCurrency(paymentCard.thisYearRevenue),
      icon: LandPlot,
      detail: 'This year',
    },
    {
      label: 'Active Plans',
      value: String(paymentCard.activePlansCount ?? 0),
      icon: Users,
    },
    {
      label: 'Expired Plans',
      value: String(paymentCard.expiredPlansCount ?? 0),
      icon: Clock3,
      detail: 'Requires attention',
    },
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
      {isLoading && (
        <p className='col-span-full text-sm text-gray-500'>Loading payment stats...</p>
      )}
    </div>
  );
}
