import {
  CalendarDays,
  CircleDollarSign,
  Clock3,
  LandPlot,
  Users,
} from 'lucide-react';

const STATS = [
  { label: 'Total Revenue', value: '$48,250', icon: CircleDollarSign,  },
  { label: 'This Month', value: '$4,120', icon: CalendarDays, detail: 'May 2026' },
  { label: 'Annual Revenue', value: '$49,440', icon: LandPlot, detail: 'Projected 2026' },
  { label: 'Active Plans', value: '182', icon: Users, },
  { label: 'Expired Plans', value: '23', icon: Clock3, detail: 'Requires attention' },
];

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
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
