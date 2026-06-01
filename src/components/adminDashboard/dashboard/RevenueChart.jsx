import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { useGetAdminDashboardChartsQuery } from '../../../store/features/admin/adminDashboard/adminDashboardApi';

// const revenueData = [
//   { month: 'Jan', value: 3200 },
//   { month: 'Feb', value: 2800 },
//   { month: 'Mar', value: 5200 },
//   { month: 'Apr', value: 4100 },
//   { month: 'May', value: 4600 },
//   { month: 'Jun', value: 3900 },
//   { month: 'Jul', value: 4300 },
//   { month: 'Aug', value: 5800 },
//   { month: 'Sep', value: 7200 },
//   { month: 'Oct', value: 6100 },
//   { month: 'Nov', value: 5400 },
//   { month: 'Dec', value: 6800 },
// ];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = Number(payload[0]?.value) || 0;
    return (
      <div className='bg-white border border-gray-100 shadow-lg rounded-xl px-3 py-2 text-sm'>
        <p className='text-gray-500 font-medium'>{label}</p>
        <p className='text-gray-900 font-bold'>${value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const PERIOD_OPTIONS = [
  { label: 'This year', value: 'this_year', points: 12 },
  { label: 'Previous year', value: 'previous_year', points: 12 },
];

const parseAmount = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
  if (typeof value === 'string') {
    const sanitized = value.replace(/[^\d.-]/g, '');
    const parsed = Number(sanitized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const extractChartData = (payload) => {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data?.chartData)) return payload.data.chartData;
  if (Array.isArray(payload?.chartData)) return payload.chartData;

  if (payload?.data && typeof payload.data === 'object') {
    const objectEntries = Object.entries(payload.data);
    const monthLikeEntries = objectEntries.filter(([key]) =>
      /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)$/i.test(key),
    );

    if (monthLikeEntries.length > 0) {
      return monthLikeEntries.map(([month, revenue]) => ({ month, revenue }));
    }
  }

  return [];
};

const toChartLabel = (item, index) => {
  if (item?.month) return item.month;
  if (item?.label) return item.label;
  if (item?.date) {
    const date = new Date(item.date);
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleString('en-US', { month: 'short' });
    }
  }
  return `P${index + 1}`;
};

export default function RevenueChart() {
  const [period, setPeriod] = useState('this_year');

  const { data, isLoading, isError } = useGetAdminDashboardChartsQuery(period, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  const rawData = extractChartData(data);

  const normalizedData = rawData.map((item, index) => ({
    month: toChartLabel(item, index),
    value: parseAmount(
      item?.revenue ?? item?.value ?? item?.totalRevenue ?? item?.amount ?? 0,
    ),
  }));

  const selectedPeriod = PERIOD_OPTIONS.find(
    (option) => option.value === period,
  );
  const revenueData = normalizedData.slice(
    -((selectedPeriod && selectedPeriod.points) || 12),
  );

  const hasData = revenueData.length > 0;

  const formatYAxisValue = (value) => {
    const safeValue = parseAmount(value);
    if (safeValue >= 1000) return `$${(safeValue / 1000).toFixed(1)}k`;
    return `$${Math.round(safeValue)}`;
  };

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
        <div className='relative shrink-0'>
          <ChevronDown
            size={14}
            className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
          />
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className='appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-xs text-gray-600 transition hover:bg-gray-50 sm:text-sm'
            aria-label='Filter revenue period'
          >
            {PERIOD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='w-full h-52 sm:h-64 lg:h-72'>
        {isLoading ? (
          <div className='flex h-full items-center justify-center text-sm font-raleway text-gray-500'>
            Loading chart...
          </div>
        ) : isError ? (
          <div className='flex h-full items-center justify-center rounded-lg border border-red-100 bg-red-50 px-3 text-sm font-raleway text-red-600'>
            Failed to load revenue chart.
          </div>
        ) : !hasData ? (
          <div className='flex h-full items-center justify-center rounded-lg border border-gray-100 bg-gray-50 px-3 text-sm font-raleway text-gray-500'>
            No revenue data available for this period.
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={revenueData}
              margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
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
                tickFormatter={formatYAxisValue}
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
