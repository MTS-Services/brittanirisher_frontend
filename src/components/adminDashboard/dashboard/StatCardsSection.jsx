import { User, CalendarDays, Loader2 } from 'lucide-react';
import { useGetAdminStatusQuery } from '../../../store/features/admin/adminDashboard/adminDashboardApi';

const StatCard = ({ label, value, icon: Icon, isLoading = false }) => (
  <div className='bg-white rounded-lg border border-[#0000002E] p-6 flex flex-col'>
    <div className='mb-6'>
      <Icon size={24} className='text-black' strokeWidth={1.5} />
    </div>
    <p className='text-base font-raleway text-[#7E849A] mb-2'>{label}</p>
    <p className='text-2xl leading-none font-bold text-black tracking-tight'>
      {isLoading ? (
        <>
          <Loader2 className=' size-4 animate-spin' />
        </>
      ) : (
        value
      )}
    </p>
  </div>
);

export default function StatCardsSection() {
  const { data, isLoading,error } = useGetAdminStatusQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'>
      <StatCard
        label='Total Couple'
        value={data?.data?.totalCouples ?? '0'}
        icon={User}
        isLoading={isLoading}
      />
      <StatCard
        label='Total Vendors'
        value={data?.data?.totalVendors ?? '0'}
        icon={User}
        isLoading={isLoading}
      />
      <StatCard
        label='Total Bookings'
        value={data?.data?.totalBookings ?? '0'}
        icon={CalendarDays}
        isLoading={isLoading}
      />
      <StatCard
        label='Monthly Revenue'
        value={`$ ${data?.data?.thisMonthRevenueData}` ?? '0'}
        icon={CalendarDays}
        isLoading={isLoading}
      />
    </div>
  );
}
