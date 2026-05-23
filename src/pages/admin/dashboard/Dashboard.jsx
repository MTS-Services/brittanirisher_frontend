import StatCardsSection from '../../../components/adminDashboard/dashboard/StatCardsSection';
import RevenueChart from '../../../components/adminDashboard/dashboard/RevenueChart';
import PendingVendorApprovals from '../../../components/adminDashboard/dashboard/PendingVendorApprovals';

export default function SystemOverviewDashboard() {
  return (
    <div className=" space-y-8 min-h-screen">
      {/* ── Header ── */}
      <div className=''>
        <h1 className="font-playfair text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-base font-raleway text-[#717182] mt-2">
          Real-time pulse of Vow &amp; Vendor ecosystem.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <StatCardsSection />

      {/* ── Revenue Chart ── */}
      <RevenueChart />

      {/* ── Pending Vendor Approvals ── */}
      <PendingVendorApprovals />
    </div>
  );
}
