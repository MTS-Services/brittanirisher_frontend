import React, { useRef } from 'react';
import { CalendarDays, ChevronDown, Sparkles } from 'lucide-react';
import {
  useGetCategoriesQuery,
  useGetStatesQuery,
} from '../../../../store/features/couple/coupleDashboard';

const PreferencesSkeleton = () => (
  <section className='mb-6 rounded-2xl border border-[#D4A57426] bg-white px-4 py-5 md:px-5 animate-pulse'>
    <div className='mb-4 flex items-center gap-2'>
      <div className='h-5 w-5 rounded bg-[#ece9e2]' />
      <div className='h-8 w-48 rounded bg-[#ece9e2]' />
    </div>

    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] lg:items-end'>
      {[...Array(6)].map((_, index) => (
        <div key={index} className='space-y-1.5'>
          <div className='h-4 w-16 rounded bg-[#ece9e2]' />
          <div className='h-10 w-full rounded bg-[#ece9e2]' />
        </div>
      ))}
      <div className='h-10 w-24 rounded bg-[#ece9e2]' />
    </div>
  </section>
);

const MatchVendorPreferences = ({ preferences, setPreferences, onSearch }) => {
  const dateInputRef = useRef(null);

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const { data: statesData, isLoading: isStatesLoading } = useGetStatesQuery();
  const states = statesData?.data || statesData || [];

  const handleDateChange = (e) => {
    const raw = e.target.value;
    if (!raw) {
      setPreferences({ ...preferences, date: '', _dateDisplay: '' });
      return;
    }

    setPreferences({ ...preferences, date: raw, _dateDisplay: raw });
  };

  if (isCategoriesLoading || isStatesLoading) {
    return <PreferencesSkeleton />;
  }

  return (
    <section className='mb-6 rounded-2xl border border-[#D4A57426] bg-white px-4 py-5 md:px-5'>
      <div className='mb-4 flex items-center gap-2'>
        <Sparkles className='h-4 w-4 text-[#d49a57]' />
        <h2 className='m-0 font-playfair text-[20px] md:text-[34px] leading-none text-[#4b4b4b]'>
          Your Preferences
        </h2>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] lg:items-end'>
        {/* Min Price */}
        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>
            Min Price ($)
          </label>
          <input
            type='number'
            value={preferences.minPrice || ''}
            onChange={(e) =>
              setPreferences({ ...preferences, minPrice: e.target.value })
            }
            placeholder='e.g. 1000'
            className='h-10 w-full rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
          />
        </div>

        {/* Max Price */}
        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>
            Max Price ($)
          </label>
          <input
            type='number'
            value={preferences.maxPrice || ''}
            onChange={(e) =>
              setPreferences({ ...preferences, maxPrice: e.target.value })
            }
            placeholder='e.g. 5000'
            className='h-10 w-full rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
          />
        </div>

        {/* Date Picker */}
        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>
            Date
          </label>
          <div className='relative'>
            <input
              ref={dateInputRef}
              type='date'
              value={preferences._dateDisplay || ''}
              onChange={handleDateChange}
              className='h-10 w-full rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 pr-9 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9] [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer'
            />
            <CalendarDays className='pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6f6f6f]' />
          </div>
        </div>

        {/* State dropdown */}
        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>
            State
          </label>
          <div className='relative'>
            <select
              value={preferences.state || ''}
              onChange={(e) => {
                setPreferences({
                  ...preferences,
                  state: e.target.value,
                  city: '',
                });
              }}
              className='h-10 w-full appearance-none rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 pr-9 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
            >
              <option value=''>All States</option>
              {states.map((state) => (
                <option
                  key={state.id || state.slug || state.name}
                  value={state.slug || state.name}
                >
                  {state.name}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6f6f]' />
          </div>
        </div>

        {/* City dropdown */}
        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>
            City
          </label>
          <div className='relative'>
            <select
              value={preferences.city || ''}
              onChange={(e) =>
                setPreferences({ ...preferences, city: e.target.value })
              }
              disabled={!preferences.state}
              className='h-10 w-full appearance-none rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 pr-9 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9] disabled:cursor-not-allowed disabled:opacity-50'
            >
              <option value=''>All Cities</option>
              {preferences.state &&
                states
                  .find((s) => (s.slug || s.name) === preferences.state)
                  ?.[statesData?.data ? 'cities' : 'cities']?.map((city) => (
                    <option
                      key={city.id || city.slug || city.name}
                      value={city.slug || city.name}
                    >
                      {city.name}
                    </option>
                  ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6f6f]' />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className='mb-1.5 block font-raleway text-base font-medium text-[#2f2f2f]'>
            Category
          </label>
          <div className='relative'>
            <select
              value={preferences.category || ''}
              onChange={(e) =>
                setPreferences({ ...preferences, category: e.target.value })
              }
              className='h-10 w-full appearance-none rounded-md border border-[#D4A57426] bg-[#FDFCFC] px-3 pr-9 font-raleway text-sm text-[#303030] outline-none focus:border-[#aebea9]'
            >
              <option value=''>All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id || cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f6f6f]' />
          </div>
        </div>

        {/* Search Button */}
        <button
          type='button'
          onClick={onSearch}
          className='h-10 min-w-23 rounded-md bg-[#9cae9b] px-4 font-raleway text-sm font-medium text-[#455344] transition hover:bg-[#8ea08d]'
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default MatchVendorPreferences;
