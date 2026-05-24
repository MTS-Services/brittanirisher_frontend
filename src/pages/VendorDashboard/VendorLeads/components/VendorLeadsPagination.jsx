export default function VendorLeadsPagination({
  page,
  setPage,
  perPage,
  totalResults,
}) {
  return (
    <div className='flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:px-6'>
      <p className='text-base font-medium text-[#1FB356]'>
        Showing 1 to {Math.min(perPage, totalResults)} of {totalResults} results
      </p>
      <div className='flex items-center gap-2'>
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className='rounded-lg border border-[#1FB356] px-4 py-1.5 text-sm text-[#1FB356] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * perPage >= totalResults}
          className='rounded-lg border border-[#1FB356] px-4 py-1.5 text-sm text-[#1FB356] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40'
        >
          Next
        </button>
      </div>
    </div>
  );
}
