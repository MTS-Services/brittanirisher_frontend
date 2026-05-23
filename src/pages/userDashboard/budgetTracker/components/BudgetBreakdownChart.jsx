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

const chartData = [
  { label: 'Venue', value: 15000 },
  { label: 'Photography', value: 5000 },
  { label: 'Videography', value: 12000 },
  { label: 'Floral Design', value: 7000 },
  { label: 'Catering', value: 5000 },
  { label: 'Bakery', value: 4000 },
  { label: 'Dj & Music', value: 3500 },
  { label: 'Planning', value: 2000 },
  { label: 'Hair & Makeup', value: 1000 },
];

const chartTicks = [0, 4000, 8000, 12000, 16000];

const mobileLabelMap = {
  Venue: 'Venue',
  Photography: 'Photo',
  Videography: 'Video',
  'Floral Design': 'Floral',
  Catering: 'Catering',
  Bakery: 'Bakery',
  'Dj & Music': 'DJ & Music',
  Planning: 'Planning',
  'Hair & Makeup': 'Hair/Makeup',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className='rounded-md border border-[#e7e0d6] bg-white px-3 py-2 text-sm shadow'>
      <p className='m-0 text-[#3c3c3c]'>{label}</p>
      <p className='m-0 text-[#7e5a33]'>Spent: ${payload[0].value.toLocaleString()}</p>
    </div>
  );
};

const BudgetBreakdownChart = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1024px)');
    const handleChange = (event) => setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className='mt-6 rounded-2xl border border-[#D4A57426] bg-white px-4 py-5 '>
      <h3 className='m-0 mb-4 text-2xl text-[#444444] md:text-[2rem]'>Budget Breakdown</h3>

      <div className='w-full overflow-x-auto lg:overflow-visible'>
        <div className='h-72 min-w-160 lg:min-w-0'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: -16, bottom: 26 }}
              barCategoryGap='28%'
            >
              <CartesianGrid stroke='#e7e7e7' strokeDasharray='2 4' vertical />
              <XAxis
                dataKey='label'
                interval={0}
                angle={isMobile ? -25 : 0}
                textAnchor={isMobile ? 'end' : 'middle'}
                height={isMobile ? 64 : 30}
                tickMargin={isMobile ? 12 : 0}
                tickLine={false}
                axisLine={{ stroke: '#9a9a9a' }}
                tickFormatter={(value) => (isMobile ? mobileLabelMap[value] ?? value : value)}
                tick={{ fontSize: isMobile ? 12 : 14, fill: '#2e2e2e', fontFamily: 'Raleway' }}
              />
              <YAxis
                tickCount={5}
                ticks={chartTicks}
                domain={[0, 16000]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 14, fill: '#2e2e2e' }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(210, 166, 116, 0.12)' }}
                content={<CustomTooltip />}
              />
              <Bar dataKey='value' fill='#d2a674' radius={[0, 0, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default BudgetBreakdownChart;
