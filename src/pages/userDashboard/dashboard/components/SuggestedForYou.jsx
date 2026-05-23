import React from 'react';
import { Sparkles } from 'lucide-react';
import SuggestedCard from './SuggestedCard';

const SuggestedForYou = ({ items }) => (
  <section className='mt-8 rounded-lg border border-[#ebe5db] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] sm:p-8'>
    <div className='mb-6 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Sparkles size={22} className='text-[#D4A574]' />
        <h2 className='text-2xl font-raleway font-medium text-[#2d2d2d]'>Suggested For You</h2>
      </div>
      <button className='text-sm font-raleway font-medium text-[#9a9a9a] hover:text-[#5a5a5a]'>
        View all
      </button>
    </div>

    <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
      {items.map((s) => (
        <SuggestedCard key={s.id} item={s} />
      ))}
    </div>
  </section>
);

export default SuggestedForYou;
