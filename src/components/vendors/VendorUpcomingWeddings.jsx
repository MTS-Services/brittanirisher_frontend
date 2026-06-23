import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const dateObj = new Date(dateString);
  if (Number.isNaN(dateObj.getTime())) return 'N/A';

  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const VendorUpcomingWeddings = ({ weddings = [] }) => (
  <section>
    <div className='mb-4 flex items-center justify-between gap-3'>
      <h2 className='font-playfair text-4xl text-[#232323]'>Upcoming Weddings</h2>
      <Link
        to={ROUTES.VENDOR_BOOKINGS}
        className='text-sm font-medium text-[#6f776f] transition-colors hover:text-[#2f352f]'
      >
        View Calendar
      </Link>
    </div>

    <div className='space-y-4'>
      {weddings.length === 0 ? (
        <div className='rounded-xl border border-dashed border-[#e8e8e8] bg-white px-5 py-8 text-center text-sm text-[#7b847b]'>
          No upcoming weddings found.
        </div>
      ) : (
        weddings.map((wedding) => (
          <article
            key={wedding.id}
            className='rounded-2xl border border-[#ececec] border-l-[5px] border-l-[#4a5448] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)] sm:px-5'
          >
            <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-center'>
              <div className='min-w-0'>
                <h3 className='font-playfair text-2xl leading-tight text-[#262626]'>
                  {wedding?.coupleName || 'Unknown Couple'}
                </h3>
                <p className='mt-1 text-base text-[#6f766f]'>
                  {formatDate(wedding?.weddingDate)} - {wedding?.venueName || 'N/A'},{' '}
                  {wedding?.location || 'N/A'}
                </p>
              </div>

              <span className='inline-flex items-center rounded-full bg-[#eff3ee] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[1.2px] text-[#5e695d]'>
                {wedding?.status || 'BOOKED'}
              </span>
            </div>
          </article>
        ))
      )}
    </div>
  </section>
);

export default VendorUpcomingWeddings;
