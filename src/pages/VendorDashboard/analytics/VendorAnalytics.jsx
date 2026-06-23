import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VendorAnalyticsStatsCards from '../../../components/vendors/VendorAnalyticsStatsCards';
import VendorRevenueAnalyticsChart from '../../../components/vendors/VendorRevenueAnalyticsChart';
import VendorUpcomingWeddings from '../../../components/vendors/VendorUpcomingWeddings';
import VendorNewInquiries from '../../../components/vendors/VendorNewInquiries';
import { ROUTES } from '../../../config';
import { DashboardSkeleton } from '../../../components/skeletons/LoadingSkeletons';
import { selectUser } from '../../../store/slices/authSlice';
import {
  useGetVendorAnalyticsChartQuery,
  useGetVendorDashboardDataQuery,
} from '../../../store/features/vendor/vendorDashboardApi';

const VendorAnalytics = () => {
  const user = useSelector(selectUser);
  const isAnalyticsUser = user?.isAnalyticsUser === true;

  const {
    data: dashboardResponse,
    isLoading: isDashboardLoading,
    isError: isDashboardError,
  } = useGetVendorDashboardDataQuery(undefined, {
    skip: !isAnalyticsUser,
  });

  const {
    data: chartResponse,
    isLoading: isChartLoading,
    isError: isChartError,
  } = useGetVendorAnalyticsChartQuery(undefined, {
    skip: !isAnalyticsUser,
  });

  if (!isAnalyticsUser) {
    return <Navigate to={ROUTES.VENDOR_DASHBOARD} replace />;
  }

  if (isDashboardLoading || isChartLoading) {
    return <DashboardSkeleton />;
  }

  if (isDashboardError || isChartError) {
    return (
      <div className='flex min-h-[300px] w-full items-center justify-center rounded-xl border border-red-100 bg-red-50 px-4 text-sm text-red-600'>
        Failed to load analytics data. Please try again later.
      </div>
    );
  }

  const dashboardData = dashboardResponse?.data || {};
  const chartData = Array.isArray(chartResponse?.data) ? chartResponse.data : [];
  const upcomingWeddings = Array.isArray(dashboardData?.upcomingBookings)
    ? dashboardData.upcomingBookings
    : [];
  const inquiries = Array.isArray(dashboardData?.resentEnquiry)
    ? dashboardData.resentEnquiry
    : [];

  return (
    <main className='space-y-6'>
      <VendorAnalyticsStatsCards dashboardData={dashboardData} />

      <VendorRevenueAnalyticsChart data={chartData} />

      <section className='grid grid-cols-1 gap-6 xl:grid-cols-[1.55fr_0.85fr]'>
        <VendorUpcomingWeddings weddings={upcomingWeddings} />
        <VendorNewInquiries inquiries={inquiries} />
      </section>
    </main>
  );
};

export default VendorAnalytics;
