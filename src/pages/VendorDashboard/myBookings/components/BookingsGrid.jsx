import BookingCard from './BookingCard';

const BookingsGrid = ({ bookings, onViewDetails }) => (
  <section className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
    {bookings.map((booking) => (
      <BookingCard key={booking.id} booking={booking} onViewDetails={onViewDetails} />
    ))}
  </section>
);

export default BookingsGrid;
