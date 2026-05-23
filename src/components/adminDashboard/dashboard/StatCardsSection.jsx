import { User, CalendarDays } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon }) => (
  <div className="bg-white rounded-lg border border-[#0000002E] p-6 flex flex-col">
    <div className="mb-6">
      <Icon size={24} className="text-black" strokeWidth={1.5} />
    </div>
    <p className="text-base font-raleway text-[#7E849A] mb-2">{label}</p>
    <p className="text-2xl leading-none font-bold text-black tracking-tight">
      {value}
    </p>
  </div>
);



export default function StatCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      <StatCard label="Total Couple" value="12,543" icon={User} />
      <StatCard label="Total Vendors" value="3,210" icon={User} />
      <StatCard label="Total Bookings" value="894" icon={CalendarDays} />
      <StatCard label="Monthly Revenue" value="$245,000" icon={CalendarDays} />
    </div>
  );
}
