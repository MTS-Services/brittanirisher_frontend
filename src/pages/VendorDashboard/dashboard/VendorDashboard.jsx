import React from 'react';
import { BookCopy, CalendarDays, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SubscriptionBanner from './components/SubscriptionBanner';
import StatsCardsSection from './components/StatsCardsSection';
import UpcomingWeddingsSection from './components/UpcomingWeddingsSection';
import NewInquiriesSection from './components/NewInquiriesSection';
import TotalLeadsSection from './components/TotalLeadsSection';
import { DashboardSkeleton } from '../../../components/skeletons/LoadingSkeletons';
import { ROUTES } from '../../../config';
import { useGetVendodasrhboarStatusQuery,useGetVendorChartDataQuery } from '../../../store/features/vendor/vendorDashboardApi'; 
const VendorDashboard = () => {
  const navigate = useNavigate();
  const { 
    data: statusResponse, 
    isLoading: isStatusLoading, 
    error: statusError 
  } = useGetVendodasrhboarStatusQuery();

 
  const { 
    data: chartResponse, 
    isLoading: isChartLoading, 
    error: chartError 
  } = useGetVendorChartDataQuery();

  if (isStatusLoading || isChartLoading) {
    return <DashboardSkeleton />;
  }

  if (statusError || chartError) {
    return (
      <div className="flex min-h-100 w-full items-center justify-center font-raleway text-red-600">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  const dashboardData = statusResponse?.data;
  const subscription = dashboardData?.lastSubscription;
  const rawChartData = chartResponse?.data || [];

  const leadBars = rawChartData.map((item, index) => ({
    ...item,
    fill: index === rawChartData.length - 1 ? '#596158' : '#e1e6df',
  }));

  const statCards = [
    { 
      label: 'New Leads', 
      value: String(dashboardData?.newLeedsEnquiry ?? 0), 
      icon: Mail 
    },
    {
      label: 'Upcoming Wedding Program',
      value: dashboardData?.upcomingWeddingCard ? '1' : '0',
      sub: 'Programs Available',
      icon: CalendarDays,
    },
    { 
      label: 'Total Booking', 
      value: String(dashboardData?.totalBookings ?? 0), 
      icon: BookCopy 
    },
  ];

  const upcomingWeddings = dashboardData?.upcomingBookings || [];
  const inquiries = dashboardData?.resentEnquiry || [];

  let formattedExpiryDate = 'N/A';
  if (subscription?.endsAt) {
    const dateObj = new Date(subscription.endsAt);
    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    
    formattedExpiryDate = `${day}/${month}/${year}`;
  }

  return (
    <main className='font-raleway text-[#0c0c0c]'>
      <SubscriptionBanner 
        planName={subscription?.plan?.planName}
        planPrice={`$${subscription?.plan?.priceMonthly || '0'}`}
        expiryDate={formattedExpiryDate}
        isActive={subscription?.status === 'ACTIVE'}
        description={subscription?.plan?.sortDescription}
        onUpgrade={() => navigate(ROUTES.VENDOR_PRICING)}
      />

      <StatsCardsSection cards={statCards} />

      <section className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[1.55fr_0.85fr]">
        <UpcomingWeddingsSection weddings={upcomingWeddings} />
        <NewInquiriesSection inquiries={inquiries} />
      </section>

      <TotalLeadsSection data={leadBars} />
    </main>
  );
};

export default VendorDashboard;