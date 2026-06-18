import React, { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetCoupleExpenseQuery } from '../../../../store/features/couple/coupleDashboard';

const ChartSkeleton = () => (
  <div className='mt-6 rounded-2xl border border-[#D4A57426] bg-white p-5 animate-pulse'>
    {/* Title Skeleton */}
    <div className='h-7 w-48 rounded bg-[#ece9e2]0 mb-6'></div>

    <div className='w-full overflow-x-auto lg:overflow-visible'>
      <div className='h-72 min-w-160 lg:min-w-0 flex items-end gap-6 px-4 pb-8 border-b border-l border-gray-200'>
        <div className='h-[40%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[75%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[25%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[25%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[25%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[60%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[90%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[45%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[25%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[60%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[90%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[45%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[60%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[90%] w-full bg-[#ece9e2] rounded-t-md'></div>
        <div className='h-[45%] w-full bg-[#ece9e2] rounded-t-md'></div>
      </div>
    </div>

    {/* Bottom Labels Skeleton */}
    <div className='flex justify-between mt-3 px-2'>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
      <div className='h-3 w-12 rounded bg-[#ece9e2]'></div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className='rounded-md border border-[#e7e0d6] bg-white px-3 py-2 text-sm shadow font-raleway'>
      <p className='m-0 font-semibold text-[#3c3c3c]'>{label}</p>
      <p className='m-0 text-[#7e5a33]'>
        Spent: ৳{payload[0].value.toLocaleString()}
      </p>
    </div>
  );
};

const BudgetBreakdownChart = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  const {
    data: expenseItems = [],
    isLoading,
    isError,
  } = useGetCoupleExpenseQuery();

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 1024px)');
    const smallQuery = window.matchMedia('(max-width: 480px)');

    const handleMobileChange = (event) => setIsMobile(event.matches);
    const handleSmallChange = (event) => setIsSmallMobile(event.matches);

    setIsMobile(mobileQuery.matches);
    setIsSmallMobile(smallQuery.matches);

    mobileQuery.addEventListener('change', handleMobileChange);
    smallQuery.addEventListener('change', handleSmallChange);

    return () => {
      mobileQuery.removeEventListener('change', handleMobileChange);
      smallQuery.removeEventListener('change', handleSmallChange);
    };
  }, []);

  const chartData = expenseItems.map((item) => {
    const label = item?.category?.name || item?.vendorName || 'Other';
    const value = Number(item?.amount) || 0;
    return { label, value };
  });

  const maxAmount =
    chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 1000;
  const highestTick = Math.ceil((maxAmount > 0 ? maxAmount : 1000) / 100) * 100;
  const chartTicks = [
    0,
    highestTick * 0.25,
    highestTick * 0.5,
    highestTick * 0.75,
    highestTick,
  ];

  const labelMaxChars = isSmallMobile ? 6 : isMobile ? 8 : 14;

  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <div className='mt-6 rounded-2xl border border-[#D4A57426] bg-white p-6 text-center text-red-500 font-raleway'>
        Failed to load chart data!
      </div>
    );
  }

  return (
    <section className='mt-6 rounded-2xl border border-[#D4A57426] bg-white px-3 py-4 sm:px-4 sm:py-5'>
      <h3 className='m-0 mb-4 text-xl sm:text-2xl text-[#444444] md:text-[2rem] font-playfair'>
        Budget Breakdown
      </h3>

      <div className='w-full'>
        <div className='h-56 sm:h-64 md:h-72'>
          {chartData.length === 0 ? (
            <div className='h-full flex items-center justify-center text-gray-400 font-raleway text-sm text-center px-4'>
              No expenses available to display chart.
            </div>
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={chartData}
                margin={{
                  top: 8,
                  right: isSmallMobile ? 0 : 8,
                  left: isSmallMobile ? -18 : -10,
                  bottom: isMobile ? 30 : 26,
                }}
                barCategoryGap={isSmallMobile ? '15%' : '28%'}
              >
                <CartesianGrid
                  stroke='#e7e7e7'
                  strokeDasharray='2 4'
                  vertical
                />
                <XAxis
                  dataKey='label'
                  interval={0}
                  angle={isMobile ? -35 : 0}
                  textAnchor={isMobile ? 'end' : 'middle'}
                  height={isMobile ? 56 : 30}
                  tickMargin={isMobile ? 10 : 6}
                  tickLine={false}
                  axisLine={{ stroke: '#9a9a9a' }}
                  tickFormatter={(value) =>
                    value.length > labelMaxChars
                      ? `${value.substring(0, labelMaxChars)}...`
                      : value
                  }
                  tick={{
                    fontSize: isSmallMobile ? 9 : isMobile ? 10 : 13,
                    fill: '#2e2e2e',
                    fontFamily: 'Inter',
                  }}
                />
                <YAxis
                  tickCount={5}
                  ticks={chartTicks}
                  domain={[0, highestTick]}
                  tickLine={false}
                  axisLine={false}
                  width={isSmallMobile ? 48 : 60}
                  tickFormatter={(value) =>
                    isSmallMobile
                      ? `$${Math.round(value / 1000)}k`.replace('$0k', '$0')
                      : ` $${value.toLocaleString()}`
                  }
                  tick={{
                    fontSize: isSmallMobile ? 10 : 12,
                    fill: '#2e2e2e',
                    fontFamily: 'Inter',
                  }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(210, 166, 116, 0.12)' }}
                  content={<CustomTooltip />}
                />
                <Bar
                  dataKey='value'
                  fill='#d2a674'
                  radius={[4, 4, 0, 0]}
                  maxBarSize={isSmallMobile ? 22 : 40}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default BudgetBreakdownChart;
