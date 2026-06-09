import BookingCard from './BookingCard';

const BookingsGrid = ({ bookings, onViewDetails, onDelete }) => (
  <section className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
    {bookings.length ? (
      bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onViewDetails={onViewDetails}
          onDelete={onDelete}
        />
      ))
    ) : (
      <div className='col-span-full rounded-2xl border border-dashed border-[#d4c8bf] bg-[#f7f1ec] p-8 text-center text-[#7a6e65]'>
        No bookings found for this filter.
      </div>
    )}
  </section>
);

export default BookingsGrid;
