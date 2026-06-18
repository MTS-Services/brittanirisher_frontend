import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { useGetAdminDashboardChartsQuery } from '../../../../store/features/admin/adminDashboard/adminDashboardApi';
import { SkeletonBlock } from '../../../../components/skeletons/LoadingSkeletons';

const PERIOD_OPTIONS = [
  { value: 'this_year', label: 'This Year' },
  { value: 'previous_year', label: 'Previous Year' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white border border-gray-100 shadow-lg rounded-xl px-3 py-2 text-sm'>
        <p className='text-gray-500 font-medium'>{label}</p>
        <p className='text-gray-900 font-bold'>
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export default function PaymentsRevenueChart() {
  const [period, setPeriod] = useState('this_year');

  const { data, isLoading } = useGetAdminDashboardChartsQuery(period, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  const revenueData = (data?.data || []).map((item) => ({
    month: item.month,
    value: Number(item.revenue) || 0,
  }));

  return (
    <div className='bg-white rounded-lg border border-gray-100 shadow-sm p-5 sm:p-6'>
      <div className='flex items-start justify-between flex-col md:flex-row gap-3 mb-5'>
        <div>
          <h2 className='text-xl sm:text-2xl font-playfair font-semibold text-gray-900'>
            Platform Revenue
          </h2>
          <p className='text-base font-raleway text-gray-400 mt-0.5'>
            Monthly earnings from subscriptions and bookings
          </p>
        </div>

        <div className='relative shrink-0'>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className='appearance-none text-xs sm:text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 pr-7 bg-white hover:bg-gray-50 transition'
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400'
          />
        </div>
      </div>

      <div className='w-full h-52 sm:h-64 lg:h-72'>
        {isLoading ? (
          <div className='h-full rounded-lg border border-gray-100 bg-[#fcfbf8] p-4'>
            <div className='mb-4 flex items-end justify-between'>
              <SkeletonBlock className='h-16 w-7 rounded' />
              <SkeletonBlock className='h-24 w-7 rounded' />
              <SkeletonBlock className='h-20 w-7 rounded' />
              <SkeletonBlock className='h-32 w-7 rounded' />
              <SkeletonBlock className='h-28 w-7 rounded' />
              <SkeletonBlock className='h-18 w-7 rounded' />
              <SkeletonBlock className='h-24 w-7 rounded' />
            </div>
            <SkeletonBlock className='h-3 w-full rounded' />
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 4, left: -30, bottom: 0 }}
            >
              <defs>
                <linearGradient id='revenueGrad' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#4A4A4A' stopOpacity={0.45} />
                  <stop
                    offset='100%'
                    stopColor='#794E0500'
                    stopOpacity={0.02}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='0'
                stroke='#f0f0ec'
                vertical={false}
              />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 14, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 14, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ stroke: '#794E0500', strokeWidth: 1 }}
              />
              <Area
                type='monotone'
                dataKey='value'
                stroke='#4A4A4A'
                strokeWidth={2}
                fill='url(#revenueGrad)'
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#4A4A4A',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
