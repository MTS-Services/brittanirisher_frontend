import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const toAmount = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatCompactCurrency = (value) => {
  const safeValue = toAmount(value);
  if (safeValue >= 1000000) return `$${(safeValue / 1000000).toFixed(1)}M`;
  if (safeValue >= 1000) return `$${(safeValue / 1000).toFixed(1)}K`;
  return `$${Math.round(safeValue)}`;
};

const RevenueTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const value = toAmount(payload[0]?.value);

  return (
    <div className='rounded-xl border border-[#e6e6e6] bg-white px-3 py-2 text-sm shadow-md'>
      <p className='font-medium text-[#6d746d]'>{label}</p>
      <p className='text-base font-bold text-[#1f2320]'>
        {value.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

const VendorRevenueAnalyticsChart = ({ data = [] }) => {
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        month: item?.month || '',
        revenue: toAmount(item?.revenue),
      }))
    : [];

  const hasData = chartData.length > 0;

  return (
    <section className='mt-6 rounded-xl border border-[#ebe8e1] bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)] md:p-6'>
      <h2 className='font-playfair text-3xl text-[#232323]'>Total Revenue</h2>
      <div className='mt-5 h-[300px] w-full md:h-[360px]'>
        {!hasData ? (
          <div className='flex h-full items-center justify-center rounded-xl border border-dashed border-[#e8e8e8] bg-[#fafaf8] text-sm text-[#7b847b]'>
            No revenue data available.
          </div>
        ) : (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id='vendorRevenueFill' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor='#889686' stopOpacity={0.4} />
                  <stop offset='100%' stopColor='#889686' stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke='#edf0ec' strokeDasharray='4 4' vertical={false} />
              <XAxis
                dataKey='month'
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8f978f', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#8f978f', fontSize: 12 }}
                tickFormatter={formatCompactCurrency}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Area
                type='monotone'
                dataKey='revenue'
                stroke='#5f6b5d'
                strokeWidth={2}
                fill='url(#vendorRevenueFill)'
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#5f6b5d',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default VendorRevenueAnalyticsChart;
