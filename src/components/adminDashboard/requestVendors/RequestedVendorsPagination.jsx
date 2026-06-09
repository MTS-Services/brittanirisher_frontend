export default function RequestedVendorsPagination({
  page,
  setPage,
  perPage,
  totalResults,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}) {
  const startIndex = totalResults === 0 ? 0 : (page - 1) * perPage + 1;
  const endIndex = Math.min(page * perPage, totalResults);

  return (
    <div className="px-5 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-base font-medium text-[#1FB356]">
        Showing {startIndex} to {endIndex} of {totalResults} results
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          disabled={!hasPreviousPage || page === 1}
          className="px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage || page >= totalPages}
          className="px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
