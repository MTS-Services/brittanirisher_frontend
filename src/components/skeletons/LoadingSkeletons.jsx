import React from 'react';

const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-[#ece9e2] ${className}`} />
);

const RouteSkeleton = () => (
  <main className='min-h-screen bg-[#f7f3ec] px-4 py-8 sm:px-6 lg:px-8'>
    <div className='mx-auto flex w-full max-w-7xl flex-col gap-6'>
      <SkeletonBlock className='h-10 w-32 rounded-lg' />

      <section className='rounded-2xl border border-[#e3d9cb] bg-white p-5 shadow-sm sm:p-8'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='space-y-3'>
            <SkeletonBlock className='h-5 w-40' />
            <SkeletonBlock className='h-10 w-[min(32rem,90vw)]' />
            <SkeletonBlock className='h-4 w-[min(28rem,80vw)]' />
          </div>
          <SkeletonBlock className='h-12 w-44 rounded-lg' />
        </div>

        <div className='mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {[1, 2, 3].map((item) => (
            <div key={item} className='rounded-2xl border border-[#e9e1d7] bg-[#fcfbf8] p-5'>
              <SkeletonBlock className='h-6 w-28' />
              <SkeletonBlock className='mt-4 h-10 w-24' />
              <SkeletonBlock className='mt-5 h-4 w-full' />
              <SkeletonBlock className='mt-3 h-4 w-5/6' />
              <div className='mt-5 space-y-3'>
                <SkeletonBlock className='h-4 w-full' />
                <SkeletonBlock className='h-4 w-11/12' />
                <SkeletonBlock className='h-4 w-10/12' />
              </div>
              <SkeletonBlock className='mt-6 h-11 w-full rounded-lg' />
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
);

const PageHeaderSkeleton = () => (
  <div className='space-y-3'>
    <SkeletonBlock className='h-5 w-44' />
    <SkeletonBlock className='h-9 w-[min(28rem,90vw)]' />
    <SkeletonBlock className='h-4 w-[min(26rem,80vw)]' />
  </div>
);

const DashboardSkeleton = () => (
  <div className='space-y-6'>
    <PageHeaderSkeleton />
    <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className='rounded-2xl border border-[#e3d9cb] bg-white p-5 shadow-sm'>
          <SkeletonBlock className='h-4 w-28' />
          <SkeletonBlock className='mt-4 h-8 w-20' />
          <SkeletonBlock className='mt-3 h-3 w-36' />
        </div>
      ))}
    </div>

    <div className='grid gap-6 xl:grid-cols-[1.55fr_0.85fr]'>
      <SkeletonBlock className='h-96 w-full rounded-2xl' />
      <SkeletonBlock className='h-96 w-full rounded-2xl' />
    </div>

    <SkeletonBlock className='h-80 w-full rounded-2xl' />
  </div>
);

const ListSkeleton = ({ rows = 8 }) => (
  <div className='space-y-4'>
    <PageHeaderSkeleton />
    <div className='overflow-hidden rounded-2xl border border-[#e3d9cb] bg-white shadow-sm'>
      <div className='hidden border-b border-[#f0e8de] px-6 py-4 md:grid md:grid-cols-5 md:gap-4'>
        {[1, 2, 3, 4, 5].map((item) => (
          <SkeletonBlock key={item} className='h-4 w-24 rounded' />
        ))}
      </div>

      <div className='divide-y divide-[#f3eee5]'>
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className='grid gap-3 px-5 py-4 md:grid-cols-5 md:items-center md:px-6'>
            <SkeletonBlock className='h-4 w-3/4 md:w-full' />
            <SkeletonBlock className='h-4 w-5/6 md:w-full' />
            <SkeletonBlock className='h-4 w-2/3 md:w-full' />
            <SkeletonBlock className='h-8 w-24 rounded-full' />
            <SkeletonBlock className='h-10 w-12 rounded-lg md:justify-self-end' />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PricingSkeleton = () => (
  <div className='space-y-6'>
    <PageHeaderSkeleton />
    <div className='rounded-2xl border border-[#e3d9cb] bg-white p-5 shadow-sm sm:p-8'>
      <div className='grid gap-5 xl:grid-cols-3'>
        {[1, 2, 3].map((item) => (
          <div key={item} className='rounded-2xl border border-[#e9e1d7] bg-[#fcfbf8] p-5'>
            <SkeletonBlock className='h-6 w-28' />
            <SkeletonBlock className='mt-4 h-12 w-20' />
            <SkeletonBlock className='mt-4 h-4 w-full' />
            <div className='mt-6 space-y-3'>
              {[1, 2, 3, 4, 5].map((line) => (
                <SkeletonBlock key={line} className='h-4 w-full' />
              ))}
            </div>
            <SkeletonBlock className='mt-6 h-11 w-full rounded-lg' />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BookingsSkeleton = () => (
  <div className='space-y-6'>
    <PageHeaderSkeleton />

    <div className='grid gap-4 xl:grid-cols-3'>
      {[1, 2, 3].map((item) => (
        <div key={item} className='rounded-2xl border border-[#e3d9cb] bg-white p-5 shadow-sm'>
          <SkeletonBlock className='h-4 w-24' />
          <SkeletonBlock className='mt-4 h-8 w-20' />
          <SkeletonBlock className='mt-3 h-3 w-32' />
        </div>
      ))}
    </div>

    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className='rounded-2xl border border-[#e3d9cb] bg-white p-5 shadow-sm'>
          <SkeletonBlock className='h-5 w-28' />
          <SkeletonBlock className='mt-4 h-4 w-3/4' />
          <SkeletonBlock className='mt-3 h-4 w-2/3' />
          <SkeletonBlock className='mt-6 h-10 w-full rounded-lg' />
        </div>
      ))}
    </div>

    <div className='flex items-center justify-center gap-2'>
      <SkeletonBlock className='h-10 w-24 rounded-lg' />
      <SkeletonBlock className='h-10 w-10 rounded-lg' />
      <SkeletonBlock className='h-10 w-10 rounded-lg' />
      <SkeletonBlock className='h-10 w-24 rounded-lg' />
    </div>
  </div>
);

const CalendarSkeleton = () => (
  <div className='space-y-6'>
    <div className='flex items-center justify-between gap-4'>
      <div className='space-y-3'>
        <SkeletonBlock className='h-5 w-40' />
        <SkeletonBlock className='h-9 w-64' />
      </div>
      <div className='flex gap-3'>
        <SkeletonBlock className='h-10 w-10 rounded-full' />
        <SkeletonBlock className='h-10 w-10 rounded-full' />
      </div>
    </div>

    <div className='overflow-hidden rounded-2xl border border-[#d7dfd6] bg-white shadow-sm'>
      <div className='grid grid-cols-7 border-b border-[#d7dfd6] bg-[#faf8f4]'>
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonBlock key={index} className='h-14 rounded-none border-r border-[#d7dfd6] last:border-r-0' />
        ))}
      </div>

      <div className='grid grid-cols-7'>
        {Array.from({ length: 42 }).map((_, index) => (
          <SkeletonBlock key={index} className='aspect-square rounded-none border-r border-b border-[#d7dfd6] last:border-r-0' />
        ))}
      </div>
    </div>

    <div className='flex flex-wrap items-center gap-5'>
      <SkeletonBlock className='h-4 w-24 rounded-full' />
      <SkeletonBlock className='h-4 w-24 rounded-full' />
      <SkeletonBlock className='h-4 w-28 rounded-full' />
    </div>

    <SkeletonBlock className='h-14 w-52 rounded-xl' />
  </div>
);

export {
  SkeletonBlock,
  RouteSkeleton,
  DashboardSkeleton,
  ListSkeleton,
  PricingSkeleton,
  BookingsSkeleton,
  CalendarSkeleton,
};
