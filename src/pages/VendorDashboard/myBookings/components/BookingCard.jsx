import { Trash2 } from 'lucide-react';

const BookingCard = ({ booking, onViewDetails, onDelete }) => {
  const normalizedStatus = String(booking.status || '').toUpperCase();
  const badgeText =
    normalizedStatus === 'COMPLETED'
      ? 'COMPLETED'
      : normalizedStatus === 'BOOKED'
        ? 'BOOKED'
        : normalizedStatus === 'CANCELED'
          ? 'CANCELED'
          : 'PENDING';
  const badgeClass =
    normalizedStatus === 'COMPLETED'
      ? 'bg-lime-100 text-lime-600'
      : normalizedStatus === 'BOOKED'
        ? 'bg-orange-100 text-orange-600'
        : normalizedStatus === 'CANCELED'
          ? 'bg-red-100 text-red-600'
          : 'bg-amber-100 text-amber-700';

  return (
    <article className='rounded-[18px] bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)]'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-4'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-lg font-medium text-neutral-700'>
            {booking.initials}
          </div>
          <div>
            <h3 className='text-lg leading-tight text-neutral-800'>{booking.name || 'Unknown Couple'}</h3>
            <p className='text-base text-neutral-600'>{booking.event || 'Event'}</p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>
          <span className='h-2 w-2 rounded-full bg-current' />
          {badgeText}
        </div>
      </div>

      <div className='my-5 border-t border-[#e8d6d2]' />

      <div className='grid grid-cols-2 gap-6'>
        <div>
          <p className='text-base uppercase tracking-[0.02em] text-neutral-500'>Date</p>
          <p className='mt-2 text-lg text-neutral-800'>{booking.date || 'N/A'}</p>
        </div>
        <div className='text-right'>
          <p className='text-base uppercase tracking-[0.02em] text-neutral-500'>Value</p>
          <p className='mt-2 text-lg text-neutral-800'>{booking.price || 'N/A'}</p>
        </div>
      </div>

      <div className='my-5 border-t border-[#e8d6d2]' />

      <div className='flex items-center justify-between gap-3'>
        <button
          type='button'
          className='inline-flex items-center justify-center rounded-md bg-[#6f7969] px-6 py-3 text-[15px] text-white transition hover:bg-[#5f6959]'
          onClick={() => onViewDetails?.(booking)}
        >
          View Details
        </button>

        <button
          type='button'
          aria-label='Delete booking'
          className='inline-flex h-12 w-12 items-center justify-center rounded-md border border-red-200 bg-red-50 text-red-600 transition hover:bg-red-100'
          onClick={() => onDelete?.(booking.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
};

export default BookingCard;
