export default function UserManagementPagination({ page, setPage, perPage, rowsLength }) {
  return (
    <div className='px-4 py-4 border-t border-gray-100 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between'>
      <p className='text-sm sm:text-base font-medium text-[#1FB356] text-center sm:text-left'>
        Showing 1 to {Math.min(perPage, rowsLength)} of {rowsLength} results
      </p>
      <div className='flex items-center gap-2 w-full justify-center sm:w-auto sm:justify-start'>
        <button
          type='button'
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={page === 1}
          className='px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex-1 sm:flex-none'
        >
          Previous
        </button>
        <button
          type='button'
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * perPage >= rowsLength}
          className='px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex-1 sm:flex-none'
        >
          Next
        </button>
      </div>
    </div>
  );
}
