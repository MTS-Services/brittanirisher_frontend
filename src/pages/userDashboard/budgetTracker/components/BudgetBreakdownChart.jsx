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
  <div className="mt-6 rounded-2xl border border-[#D4A57426] bg-white p-5 animate-pulse">
    {/* Title Skeleton */}
    <div className="h-7 w-48 rounded bg-gray-200 mb-6"></div>
    
    <div className="w-full overflow-x-auto lg:overflow-visible">
      <div className="h-72 min-w-160 lg:min-w-0 flex items-end gap-6 px-4 pb-8 border-b border-l border-gray-200">
       
        <div className="h-[40%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[75%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[25%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[25%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[25%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[60%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[90%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[45%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[25%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[60%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[90%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[45%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[60%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[90%] w-full bg-gray-200/70 rounded-t-md"></div>
        <div className="h-[45%] w-full bg-gray-200/70 rounded-t-md"></div>
      </div>
    </div>
    
    {/* Bottom Labels Skeleton */}
    <div className="flex justify-between mt-3 px-2">
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
      <div className="h-3 w-12 rounded bg-gray-200"></div>
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
      <p className='m-0 text-[#7e5a33]'>Spent: ৳{payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const BudgetBreakdownChart = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  
  const { data: expenseItems = [], isLoading, isError } = useGetCoupleExpenseQuery();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  
  const chartData = expenseItems.map((item) => {
    const label = item?.category?.name || item?.vendorName || 'Other';
    const value = Number(item?.amount) || 0;
    return { label, value };
  });


  const maxAmount = chartData.length > 0 ? Math.max(...chartData.map(d => d.value)) : 1000;
  const highestTick = Math.ceil((maxAmount > 0 ? maxAmount : 1000) / 100) * 100; 
  const chartTicks = [0, highestTick * 0.25, highestTick * 0.5, highestTick * 0.75, highestTick];


  if (isLoading) {
    return <ChartSkeleton />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-2xl border border-[#D4A57426] bg-white p-6 text-center text-red-500 font-raleway">
        Failed to load chart data!
      </div>
    );
  }

  return (
    <section className='mt-6 rounded-2xl border border-[#D4A57426] bg-white px-4 py-5 '>
      <h3 className='m-0 mb-4 text-2xl text-[#444444] md:text-[2rem] font-playfair'>Budget Breakdown</h3>

      <div className='w-full overflow-x-auto lg:overflow-visible'>
        <div className='h-72 min-w-160 lg:min-w-0'>
          {chartData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 font-raleway">
              No expenses available to display chart.
            </div>
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -10, bottom: 26 }}
                barCategoryGap='28%'
              >
                <CartesianGrid stroke='#e7e7e7' strokeDasharray='2 4' vertical />
                <XAxis
                  dataKey='label'
                  interval={0}
                  angle={isMobile ? -25 : 0}
                  textAnchor={isMobile ? 'end' : 'middle'}
                  height={isMobile ? 64 : 30}
                  tickMargin={isMobile ? 12 : 6}
                  tickLine={false}
                  axisLine={{ stroke: '#9a9a9a' }}
                  tickFormatter={(value) => 
                    isMobile && value.length > 10 ? `${value.substring(0, 10)}...` : value
                  }
                  tick={{ fontSize: isMobile ? 11 : 13, fill: '#2e2e2e', fontFamily: 'Inter' }}
                />
                <YAxis
                  tickCount={5}
                  ticks={chartTicks}
                  domain={[0, highestTick]}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => ` $${value.toLocaleString()}`}
                  tick={{ fontSize: 12, fill: '#2e2e2e', fontFamily: 'Inter' }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(210, 166, 116, 0.12)' }}
                  content={<CustomTooltip />}
                />
                <Bar dataKey='value' fill='#d2a674' radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default BudgetBreakdownChart;