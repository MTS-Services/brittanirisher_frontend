import React, { useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  useGetVendorCalendarQuery,
  useGetVendorPackagesQuery,
  useSaveBulkMonthAvailabilityMutation,
} from '../../../store/features/vendor/vendorDashboardApi';

const today = new Date();
const currentRealYear = today.getFullYear();
const currentRealMonth = today.getMonth();

const initialMonth = new Date(currentRealYear, currentRealMonth, 1);

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const dateKey = (date) => date.toISOString().slice(0, 10);
const toLocalDate = (year, month, day) => new Date(year, month, day, 12, 0, 0, 0);
const getMondayIndex = (dayIndex) => (dayIndex === 0 ? 6 : dayIndex - 1);
const getMonthTitle = (date) => `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
const normalizeStatus = (status) => String(status || '').trim().toLowerCase();
const formatDisplayDate = (dateString) => {
  if (!dateString) return null;
  const [year, month, day] = String(dateString).split('-');
  if (!year || !month || !day) return dateString;
  return `${day}/${month}/${year}`;
};

const getApiDateKey = (dayData) => {
  const rawDate = dayData?.blockedDate || dayData?.date || dayData?.blocked_date;
  return rawDate ? String(rawDate).slice(0, 10) : null;
};

const getGridCells = (monthDate, apiBookedDays, overrides) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = toLocalDate(year, month, 1);
  const lastDay = toLocalDate(year, month + 1, 0);
  const startOffset = getMondayIndex(firstDay.getDay());
  const endOffset = 42 - (startOffset + lastDay.getDate());

  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

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

    const compareDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const isPastDay = compareDate < startOfToday;

    const defaultStatus = 'available';
    const apiDayData = apiBookedDays.find((dayData) => getApiDateKey(dayData) === key);
    const apiStatus = normalizeStatus(apiDayData?.status);

    cells.push({
      key,
      day,
      date: currentDate,
      inMonth: true,
      status: isPastDay ? 'unavailable' : (overrides[key] || (apiStatus === 'booked' ? 'booked' : defaultStatus)),
    });
  }

  for (let day = 1; day <= endOffset; day += 1) {
    const nextDate = toLocalDate(year, month + 1, day);
    cells.push({
      key: dateKey(nextDate),
      day: nextDate.getDate(),
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
  const [selectedDate, setSelectedDate] = useState(dateKey(today));

  const currentYear = monthDate.getFullYear();
  const currentMonthValue = monthDate.getMonth() + 1;

  const { data: vendorPackagesResponse } = useGetVendorPackagesQuery();

  const resolvedVendorId = useMemo(() => {
    const packages = Array.isArray(vendorPackagesResponse?.data)
      ? vendorPackagesResponse.data
      : [];

    if (!packages.length) return null;

    const firstPackage = packages[0] || {};
    return (
      firstPackage.vendorId ||
      firstPackage.vendor_id ||
      firstPackage.vendorProfileId ||
      firstPackage.vendorProfile?.id ||
      firstPackage.vendor?.id ||
      null
    );
  }, [vendorPackagesResponse]);

  const { data: apiResponse, isLoading } = useGetVendorCalendarQuery({
    vendorId: resolvedVendorId,
    year: currentYear,
    month: currentMonthValue
  }, {
    skip: !resolvedVendorId,
  });

  const [saveBulkMonth] = useSaveBulkMonthAvailabilityMutation();

  const apiBookedDays = apiResponse?.data?.days || [];

  useEffect(() => {
    setOverrides({});
  }, [monthDate]);

  const cells = useMemo(() => {
    return getGridCells(monthDate, apiBookedDays, overrides);
  }, [monthDate, apiBookedDays, overrides]);

  const monthLabel = getMonthTitle(monthDate);

  const handleDayClick = (cell) => {
    if (!cell.inMonth || cell.status === 'unavailable') return;

    const nextStatus = cell.status === 'booked' ? 'available' : 'booked';

    setOverrides((current) => ({
      ...current,
      [cell.key]: nextStatus,
    }));
    setSelectedDate(cell.key);
  };

  const handleSave = async () => {
    try {
      const bulkPayload = cells
        .filter(cell => cell.inMonth && cell.status !== 'unavailable')
        .map(cell => ({
          date: cell.key,
          status: cell.status === 'booked' ? 'BOOKED' : 'AVAILABLE'
        }));

      if (bulkPayload.length === 0) {
        toast.error("No valid future dates found to update.");
        return;
      }

      await saveBulkMonth(bulkPayload).unwrap();
      const selectedDisplayDate = formatDisplayDate(selectedDate);
      toast.success(
        selectedDisplayDate
          ? `Availability published successfully for ${selectedDisplayDate}.`
          : `Availability published successfully for ${monthLabel}.`
      );
      setOverrides({});
    } catch (error) {
      console.error("Failed to save calendar data: ", error);
      toast.error(error?.data?.message || 'Error updating calendar. Try again.');
    }
  };

  return (
    <div className='w-full text-[#2c241f]'>
      <main className='flex w-full flex-col'>
        <header>
          <h1 className='mb-3 text-2xl font-playfair text-[#1a1a1a] md:text-4xl'>Set Your Availability</h1>
          <p className='mt-2.5 font-raleway text-base font-light text-[#606060]'>
            Brides will see your available dates when they browse your profile.
          </p>
        </header>

        <section className='mt-8 w-full flex-1'>
          <div className='flex items-center justify-between gap-4'>
            <h2 className='font-playfair text-2xl leading-none text-[#2b221d] lg:text-3xl'>{monthLabel}</h2>
            <div className='flex items-center gap-3'>
              <button
                type='button'
                onClick={() => setMonthDate((current) => toLocalDate(current.getFullYear(), current.getMonth() - 1, 1))}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c7b1] text-[#2c241f] transition hover:bg-[#f3f6f1]'
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type='button'
                onClick={() => setMonthDate((current) => toLocalDate(current.getFullYear(), current.getMonth() + 1, 1))}
                className='flex h-10 w-10 items-center justify-center rounded-full border border-[#b9c7b1] text-[#2c241f] transition hover:bg-[#f3f6f1]'
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-96 text-gray-400">Loading calendar availability...</div>
          ) : (
            <div className='mt-5 overflow-hidden rounded-sm border border-[#bfd0b8]'>
              <div className='grid grid-cols-7 border-b border-[#bfd0b8] bg-white'>
                {weekdayLabels.map((label) => (
                  <div key={label} className='border-r border-[#bfd0b8] py-3 text-center text-[16px] font-medium tracking-wide text-[#2b221d] sm:py-4 lg:py-5 last:border-r-0'>
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
                      className={`relative aspect-square border-r border-b border-[#bfd0b8] text-center transition last:border-r-0 lg:aspect-auto lg:h-22 ${
                        isUnavailable
                          ? 'bg-[#fafafa] text-[#d4d4d4] cursor-not-allowed'
                          : isBooked
                            ? 'bg-[#a4b1a0] text-white hover:brightness-[0.98]'
                            : 'bg-white text-[#26211f] hover:bg-[#f4f7f2]'
                      } ${isSelected && !isUnavailable ? 'ring-2 ring-inset ring-[#62715f]' : ''}`}
                      disabled={isUnavailable}
                    >
                      <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18px] font-normal leading-none sm:text-[20px] lg:text-[22px]'>
                        {cell.day}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className='mt-6'>
            <AvailabilityLegend />
          </div>

          <div className='mt-6 border-t border-[#bfd0b8]' />

          <div className='mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start'>
            <button
              type='button'
              onClick={handleSave}
              className='inline-flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#556151] px-4 text-base text-white shadow-[0_6px_16px_rgba(85,97,81,0.25)] transition hover:bg-[#465146] sm:h-16 sm:w-auto sm:min-w-55 sm:px-6'
            >
              <span>Save &amp; Publish</span>
              <span className='text-base leading-none'><MoveRight size={18} /></span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VendorAvailability;