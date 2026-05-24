const BookingCard = ({ booking, onViewDetails }) => {
  const badgeText = booking.status === 'completed' ? 'COMPLETED' : booking.status === 'booked' ? 'BOOKED' : 'PENDING';
  const badgeClass =
    booking.status === 'completed'
      ? 'bg-lime-100 text-lime-600'
      : booking.status === 'booked'
        ? 'bg-orange-100 text-orange-600'
        : 'bg-amber-100 text-amber-700';

  return (
    <article className='rounded-[18px] bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)]'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-4'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-lg font-medium text-neutral-700'>
            {booking.initials}
          </div>
          <div>
            <h3 className='text-[18px] leading-tight text-neutral-800'>{booking.name}</h3>
            <p className='text-[16px] text-neutral-600'>{booking.event}</p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-semibold ${badgeClass}`}>
          <span className='h-2 w-2 rounded-full bg-current' />
          {badgeText}
        </div>
      </div>

      <div className='my-5 border-t border-[#e8d6d2]' />

      <div className='grid grid-cols-2 gap-6'>
        <div>
          <p className='text-[18px] uppercase tracking-[0.02em] text-neutral-500'>Date</p>
          <p className='mt-2 text-[20px] text-neutral-800'>{booking.date}</p>
        </div>
        <div className='text-right'>
          <p className='text-[18px] uppercase tracking-[0.02em] text-neutral-500'>Value</p>
          <p className='mt-2 text-[20px] text-neutral-800'>{booking.value}</p>
        </div>
      </div>

      <div className='my-5 border-t border-[#e8d6d2]' />

      <button
        type='button'
        className='inline-flex items-center justify-center rounded-md bg-[#6f7969] px-6 py-3 text-[15px] text-white transition hover:bg-[#5f6959]'
        onClick={() => onViewDetails?.(booking)}
      >
        View Details
      </button>
    </article>
  );
};

export default BookingCard;
