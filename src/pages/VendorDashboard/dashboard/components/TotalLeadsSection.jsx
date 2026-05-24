import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const TotalLeadsSection = ({ data }) => {
  const yTicks = useMemo(() => [0, 100, 200, 300, 400], []);

  return (
    <section className='mt-8 rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-[0_8px_22px_rgba(0,0,0,0.05)]'>
      <div className='flex items-center justify-between gap-3'>
        <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>
          Total Leads
        </h2>
        <button
          type='button'
          className='inline-flex items-center gap-1 rounded-sm border border-[#e2e2e2] bg-[#fdfdfc] px-2 py-1 font-raleway text-[10px] leading-4 text-[#807a74]'
        >
          This year
          <ChevronDown size={12} />
        </button>
      </div>

      <div className='mt-4 h-80 w-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            barSize={56}
            margin={{ top: 12, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid stroke='#ececec' strokeDasharray='4 4' vertical={false} />
            <XAxis
              dataKey='month'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={yTicks}
              domain={[0, 450]}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(167,185,166,0.08)' }}
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e2e2e2',
                background: '#fff',
                fontSize: 12,
              }}
            />
            <Bar dataKey='leads' radius={[0, 0, 0, 0]} fill='#e1e6df' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TotalLeadsSection;
