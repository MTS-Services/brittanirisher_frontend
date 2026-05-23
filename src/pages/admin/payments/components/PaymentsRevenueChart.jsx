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

const revenueData = [
  { month: 'Jan', value: 3200 },
  { month: 'Feb', value: 2800 },
  { month: 'Mar', value: 5200 },
  { month: 'Apr', value: 4100 },
  { month: 'May', value: 4600 },
  { month: 'Jun', value: 3900 },
  { month: 'Jul', value: 4300 },
  { month: 'Aug', value: 5800 },
  { month: 'Sep', value: 7200 },
  { month: 'Oct', value: 6100 },
  { month: 'Nov', value: 5400 },
  { month: 'Dec', value: 6800 },
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
  const [period, setPeriod] = useState('This year');

  return (
    <div className='bg-white rounded-lg border border-gray-100 shadow-sm p-5 sm:p-6'>
      <div className='flex items-start justify-between gap-3 mb-5'>
        <div>
          <h2 className='text-xl sm:text-2xl font-playfair font-semibold text-gray-900'>
            Platform Revenue
          </h2>
          <p className='text-base font-raleway text-gray-400 mt-0.5'>
            Monthly earnings from subscriptions and bookings
          </p>
        </div>

        <button
          className='flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50 transition shrink-0'
          onClick={() => {}}
        >
          {period}
          <ChevronDown size={14} className='text-gray-400' />
        </button>
      </div>

      <div className='w-full h-52 sm:h-64 lg:h-72'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 4, left: -30, bottom: 0 }}
          >
            <defs>
              <linearGradient id='revenueGrad' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='0%' stopColor='#4A4A4A' stopOpacity={0.45} />
                <stop offset='100%' stopColor='#794E0500' stopOpacity={0.02} />
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
      </div>
    </div>
  );
}
