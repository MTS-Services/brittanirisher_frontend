import { User, CalendarDays } from 'lucide-react';
import { useGetAdminStatusQuery } from '../../../store/features/admin/adminDashboard/adminDashboardApi';
import { SkeletonBlock } from '../../skeletons/LoadingSkeletons';

const StatCard = ({ label, value, icon: Icon }) => (
  <div className='bg-white rounded-lg border border-[#0000002E] p-6 flex flex-col'>
    <div className='mb-6'>
      <Icon size={24} className='text-black' strokeWidth={1.5} />
    </div>
    <p className='text-base font-raleway text-[#7E849A] mb-2'>{label}</p>
    <p className='text-2xl leading-none font-bold text-black tracking-tight'>
      {value}
    </p>
  </div>
);

export default function StatCardsSection() {
  const { data, isLoading } = useGetAdminStatusQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`dashboard-stat-skeleton-${index}`}
            className='bg-white rounded-lg border border-[#0000002E] p-6'
          >
            <SkeletonBlock className='h-5 w-5 rounded' />
            <SkeletonBlock className='mt-6 h-4 w-28 rounded' />
            <SkeletonBlock className='mt-3 h-8 w-24 rounded' />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
      <StatCard
        label='Total Couple'
        value={data?.data?.totalCouples ?? '0'}
        icon={User}
      />
      <StatCard
        label='Total Vendors'
        value={data?.data?.totalVendors ?? '0'}
        icon={User}
      />
      <StatCard
        label='Total Bookings'
        value={data?.data?.totalBookings ?? '0'}
        icon={CalendarDays}
      />
      <StatCard
        label='Monthly Revenue'
        value={`$ ${data?.data?.thisMonthRevenueData}` ?? '0'}
        icon={CalendarDays}
      />
    </div>
  );
}
