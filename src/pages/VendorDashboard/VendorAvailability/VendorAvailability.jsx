import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const initialMonth = new Date(2025, 8, 1);

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekdayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const baseBookings = {
  '2025-09-06': 'booked',
  '2025-09-07': 'booked',
  '2025-09-13': 'booked',
  '2025-09-14': 'booked',
  '2025-09-20': 'booked',
  '2025-09-21': 'booked',
  '2025-09-27': 'booked',
  '2025-09-28': 'booked',
};

const dateKey = (date) => date.toISOString().slice(0, 10);

const toLocalDate = (year, month, day) => new Date(year, month, day, 12, 0, 0, 0);

const getMondayIndex = (dayIndex) => (dayIndex === 0 ? 6 : dayIndex - 1);

const getMonthTitle = (date) => `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

const getGridCells = (monthDate, overrides) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = toLocalDate(year, month, 1);
  const lastDay = toLocalDate(year, month + 1, 0);
  const startOffset = getMondayIndex(firstDay.getDay());
  const endOffset = 42 - (startOffset + lastDay.getDate());

  const cells = [];

  for (let index = startOffset; index > 0; index -= 1) {
    const previousDate = toLocalDate(year, month, 1 - index);
    cells.push({
      key: dateKey(previousDate),
      day: previousDate.getDate(),
      date: previousDate,
      inMonth: false,
      status: 'unavailable',
    });
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const currentDate = toLocalDate(year, month, day);
    const key = dateKey(currentDate);
    const defaultStatus = currentDate.getDay() === 0 || currentDate.getDay() === 6 ? 'booked' : 'available';

    cells.push({
      key,
      day,
      date: currentDate,
      inMonth: true,
      status: overrides[key] || baseBookings[key] || defaultStatus,
    });
  }

  for (let day = 1; day <= endOffset; day += 1) {
    const nextDate = toLocalDate(year, month + 1, day);
    cells.push({
      key: dateKey(nextDate),
      day,
      date: nextDate,
      inMonth: false,
      status: 'unavailable',
    });
  }

  return cells;
};

const AvailabilityLegend = () => (
  <div className='flex flex-wrap items-center gap-8 text-[18px] text-[#2d2d2d] sm:gap-10'>
    <div className='flex items-center gap-3'>
      <span className='h-4 w-4 rounded-full bg-[#26211f]' />
      <span>Available</span>
    </div>
    <div className='flex items-center gap-3'>
      <span className='h-4 w-4 rounded-full bg-[#a4b1a0]' />
      <span>Booked</span>
    </div>
    <div className='flex items-center gap-3'>
      <span className='inline-flex h-4 w-4 items-center justify-center rounded-sm border border-[#b6b6b6] bg-white' />
      <span>Unavailable</span>
    </div>
  </div>
);

const VendorAvailability = () => {
  const [monthDate, setMonthDate] = useState(initialMonth);
  const [overrides, setOverrides] = useState({});
  const [selectedDate, setSelectedDate] = useState('2025-09-11');
  const [saveState, setSaveState] = useState('');

  const cells = useMemo(() => getGridCells(monthDate, overrides), [monthDate, overrides]);

  const monthLabel = getMonthTitle(monthDate);

  const handleDayClick = (cell) => {
    if (!cell.inMonth) {
      return;
    }

    const nextStatus = cell.status === 'booked' ? 'available' : 'booked';

    setOverrides((current) => ({
      ...current,
      [cell.key]: nextStatus,
    }));
    setSelectedDate(cell.key);
    setSaveState('');
  };

  const handleSave = () => {
    setSaveState(`Published ${Object.values(overrides).filter((value) => value === 'booked').length || 0} booked dates`);
  };

  return (
    <div className='min-h-screen  text-[#2c241f]'>
      <main className='mx-auto flex min-h-screen w-full flex-col ' >
        <header >
          <h1 className='font-playfair text-[36px] leading-[1.12] text-[#2b221d] sm:text-[54px] lg:text-[62px]'>Set Your Availability</h1>
          <p className='mt-4 text-[18px] leading-[1.65] text-[#706761] sm:text-[24px] lg:text-[28px]' style={{ maxWidth: '820px' }}>
            Brides will see your available dates when they browse your profile.
          </p>
        </header>

        <section className='mt-8 flex-1' style={{ maxWidth: '1120px' }}>
          <div className='flex items-center justify-between gap-4'>
            <h2 className='font-playfair text-[28px] leading-none text-[#2b221d] sm:text-[36px] lg:text-[42px]'>{monthLabel}</h2>
            <div className='flex items-center gap-3'>
              <button
                type='button'
                aria-label='Previous month'
                onClick={() => setMonthDate((current) => toLocalDate(current.getFullYear(), current.getMonth() - 1, 1))}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c7b1] text-[#2c241f] transition hover:bg-[#f3f6f1]'
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type='button'
                aria-label='Next month'
                onClick={() => setMonthDate((current) => toLocalDate(current.getFullYear(), current.getMonth() + 1, 1))}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c7b1] text-[#2c241f] transition hover:bg-[#f3f6f1]'
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          <div className='mt-5 overflow-hidden rounded-sm border border-[#bfd0b8]'>
            <div className='grid grid-cols-7 border-b border-[#bfd0b8] bg-white'>
              {weekdayLabels.map((label) => (
                <div key={label} className='border-r border-[#bfd0b8] py-3 text-center text-[16px] font-medium tracking-wide text-[#2b221d] sm:py-4 sm:text-[18px] lg:py-5 lg:text-[20px] last:border-r-0'>
                  {label}
                </div>
              ))}
            </div>

            <div className='grid grid-cols-7'>
              {cells.map((cell) => {
                const isSelected = selectedDate === cell.key;
                const isBooked = cell.status === 'booked';
                const isUnavailable = cell.status === 'unavailable';

                return (
                  <button
                    key={cell.key}
                    type='button'
                    onClick={() => handleDayClick(cell)}
                    className={`relative aspect-square border-r border-b border-[#bfd0b8] text-center transition last:border-r-0 ${
                      isUnavailable
                        ? 'bg-[#fafafa] text-[#d4d4d4]'
                        : isBooked
                          ? 'bg-[#a1af9b] text-white hover:brightness-[0.98]'
                          : 'bg-white text-[#26211f] hover:bg-[#f4f7f2]'
                    } ${isSelected ? 'ring-2 ring-inset ring-[#62715f]' : ''}`}
                    disabled={isUnavailable}
                  >
                    <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] leading-none sm:text-[20px] lg:text-[22px] ${cell.inMonth ? 'font-normal' : 'font-normal'}`}>
                      {cell.day}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='mt-6'>
            <AvailabilityLegend />
          </div>

          <div className='mt-6 border-t border-[#bfd0b8]' />

          <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start'>
            <button
              type='button'
              onClick={handleSave}
              className='inline-flex h-14 items-center justify-center gap-3 rounded-[28px] bg-[#556151] px-7 text-[18px] text-white shadow-[0_6px_16px_rgba(85,97,81,0.25)] transition hover:bg-[#465146] sm:h-16 sm:px-8 sm:text-[20px]'
              style={{ minWidth: '220px' }}
            >
              <span>Save &amp; Publish</span>
              <span className='text-[26px] leading-none'>→</span>
            </button>
            {saveState ? <p className='text-[16px] text-[#62715f]'>{saveState}</p> : null}
          </div>

          <div className='mt-8 flex items-center gap-4 text-[14px] text-[#6a6a6a] sm:text-[18px]'>
            <span className='inline-flex items-center gap-2 rounded-full bg-[#f6f6f6] px-3 py-1'>
              <Calendar size={18} />
              Click a date to mark it booked.
            </span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VendorAvailability;