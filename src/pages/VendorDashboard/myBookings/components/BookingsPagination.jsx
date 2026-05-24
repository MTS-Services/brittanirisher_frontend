const BookingsPagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='mt-9 flex items-center justify-center gap-2'>
      <button
        type='button'
        className='rounded-md border border-[#e2d7cf] bg-[#f1ebe6] px-4 py-2 text-[14px] text-[#8b7f76] disabled:cursor-not-allowed disabled:opacity-50'
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type='button'
          className={`rounded-md px-3.5 py-2 text-[14px] ${
            page === currentPage
              ? 'bg-[#2d2c2d] text-white'
              : 'border border-[#e2d7cf] bg-[#f1ebe6] text-[#8b7f76]'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        type='button'
        className='rounded-md border border-[#e2d7cf] bg-[#f1ebe6] px-4 py-2 text-[14px] text-[#8b7f76] disabled:cursor-not-allowed disabled:opacity-50'
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default BookingsPagination;
