import React from 'react';
import { CalendarDays, ChevronDown, Sparkles } from 'lucide-react';

const MatchVendorPreferences = ({ preferences, setPreferences }) => {
  return (
    <section className='mb-6 rounded-2xl border border-[#D4A57426] bg-white px-4 py-5 md:px-5'>
      <div className='mb-4 flex items-center gap-2'>
        <Sparkles className='h-4 w-4 text-[#d49a57]' />
        <h2 className='m-0 font-playfair text-[34px] leading-none text-[#4b4b4b]'>Your Preferences</h2>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto] lg:items-end'>
        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>Budget Range</label>
          <input
            type='text'
            value={preferences.budget}
            onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
            className='h-10 w-full rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
          />
        </div>

        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>Wedding Style</label>
          <div className='relative'>
            <select
              value={preferences.weddingStyle}
              onChange={(e) => setPreferences({ ...preferences, weddingStyle: e.target.value })}
              className='h-10 w-full appearance-none rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 pr-9 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
            >
              <option>Romantic elegant</option>
              <option>Modern minimalist</option>
              <option>Rustic charm</option>
              <option>Bohemian</option>
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6f6f]' />
          </div>
        </div>

        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>Date</label>
          <div className='relative'>
            <input
              type='text'
              value={preferences.date}
              onChange={(e) => setPreferences({ ...preferences, date: e.target.value })}
              placeholder='DD/MM/YY'
              className='h-10 w-full rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 pr-9 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
            />
            <CalendarDays className='pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6f6f6f]' />
          </div>
        </div>

        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>Location</label>
          <input
            type='text'
            value={preferences.location}
            onChange={(e) => setPreferences({ ...preferences, location: e.target.value })}
            className='h-10 w-full rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
          />
        </div>

        <div>
          <div>
            <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>Category</label>
            <div className='relative'>
              <select
                value={preferences.category}
                onChange={(e) => setPreferences({ ...preferences, category: e.target.value })}
                className='h-10 w-full appearance-none rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 pr-9 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
              >
                <option>Photography</option>
                <option>Videography</option>
                <option>Catering</option>
                <option>Florist</option>
                <option>DJ & Music</option>
              </select>
              <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6f6f]' />
            </div>
          </div>
        </div>

        <button
          type='button'
          className='h-10 min-w-23 rounded-md bg-[#9cae9b] px-4 font-raleway text-sm font-medium text-[#455344] transition hover:bg-[#8ea08d]'
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default MatchVendorPreferences;
