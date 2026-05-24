const BookingsHeader = ({ vendorName, subtitle }) => (
  <header className='mb-4'>
    <h1 className='mb-3 text-2xl text-[#1a1a1a] md:text-4xl'>Welcome back, {vendorName}</h1>
    <p className='mt-2.5 font-raleway text-base font-light text-[#606060]'>{subtitle}</p>
  </header>
);

export default BookingsHeader;
