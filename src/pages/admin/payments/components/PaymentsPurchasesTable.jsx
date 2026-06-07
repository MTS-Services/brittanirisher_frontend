import { useMemo, useState } from 'react';
import { useGetAdminPaymentPurchasesQuery } from '../../../../store/features/admin/adminDashboard/adminDashboardApi';

const TableCell = ({ children, className = '' }) => (
  <td className={`px-4 py-4 text-sm text-gray-600 ${className}`}>{children}</td>
);

const InfoBlock = ({ label, value }) => (
  <div className='rounded-lg bg-gray-50/70 px-3 py-2'>
    <p className='text-[11px] uppercase tracking-wide text-gray-400'>{label}</p>
    <p className='mt-1 text-sm font-medium text-gray-800'>{value}</p>
  </div>
);

const formatCurrency = (value) => {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return '$0';
  return `$${numeric.toLocaleString('en-US')}`;
};

const formatDate = (value) => {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('en-GB');
};

export default function PaymentsPurchasesTable() {
  const [page, setPage] = useState(1);
  const perPage = 10;

  const query = useMemo(
    () =>
      new URLSearchParams({
        page: String(page),
        limit: String(perPage),
      }).toString(),
    [page],
  );

  const { data, isLoading } = useGetAdminPaymentPurchasesQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  const pagedPurchases = (data?.data || []).map((item) => ({
    id: item.id,
    vendorName: item.vendorName || 'N/A',
    businessName: item.businessName || 'N/A',
    plan: item.plan || 'N/A',
    price: formatCurrency(item.price),
    purchaseDate: formatDate(item.purchaseDate),
    expiryDate: formatDate(item.expiryDate),
  }));

  const meta = data?.meta || {};
  const totalItems = meta.totalItems ?? pagedPurchases.length;
  const hasNextPage = !!meta.hasNextPage;
  const hasPreviousPage = !!meta.hasPreviousPage;
  const startIndex = totalItems === 0 ? 0 : (page - 1) * perPage + 1;
  const endIndex = Math.min(page * perPage, totalItems);

  return (
    <section className='space-y-4'>
      <div>
        <h2 className='text-xl sm:text-2xl font-playfair font-semibold text-gray-900'>
          Recent Subscription Purchase
        </h2>
        <p className='mt-1 text-base font-raleway text-gray-400'>
          Latest vendor subscription activity
        </p>
      </div>

      <div className='rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden'>
        <div className='hidden lg:block overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-[#F6FBFF] border-y border-gray-100'>
                <th className='px-4 py-3 text-left font-medium text-gray-700'>Vendor Name</th>
                <th className='px-4 py-3 text-left font-medium text-gray-700'>Business name</th>
                <th className='px-4 py-3 text-left font-medium text-gray-700'>Plan</th>
                <th className='px-4 py-3 text-left font-medium text-gray-700'>Price</th>
                <th className='px-4 py-3 text-left font-medium text-gray-700'>Purchase date</th>
                <th className='px-4 py-3 text-left font-medium text-gray-700'>Expiry Date</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className='px-4 py-10 text-center text-sm text-gray-500'>
                    Loading purchases...
                  </td>
                </tr>
              ) : pagedPurchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-4 py-10 text-center text-sm text-gray-500'>
                    No purchases found.
                  </td>
                </tr>
              ) : (
                pagedPurchases.map((purchase) => (
                  <tr key={purchase.id} className='hover:bg-gray-50/60 transition-colors'>
                    <TableCell className='text-gray-800 font-medium'>{purchase.vendorName}</TableCell>
                    <TableCell>{purchase.businessName}</TableCell>
                    <TableCell>{purchase.plan}</TableCell>
                    <TableCell>{purchase.price}</TableCell>
                    <TableCell>{purchase.purchaseDate}</TableCell>
                    <TableCell>{purchase.expiryDate}</TableCell>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className='lg:hidden divide-y divide-gray-100'>
          {isLoading ? (
            <div className='p-4 sm:p-5 text-sm text-gray-500'>Loading purchases...</div>
          ) : pagedPurchases.length === 0 ? (
            <div className='p-4 sm:p-5 text-sm text-gray-500'>No purchases found.</div>
          ) : (
            pagedPurchases.map((purchase) => (
            <div
              key={purchase.id}
              className='p-4 sm:p-5'
            >
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='text-base font-semibold text-gray-900'>
                    {purchase.vendorName}
                  </p>
                  <p className='text-sm text-gray-500 mt-0.5'>
                    {purchase.businessName}
                  </p>
                </div>

                <div className='rounded-full bg-[#EAF3EA] px-3 py-1 text-xs font-semibold text-[#1FB356]'>
                  {purchase.plan}
                </div>
              </div>

              <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                <InfoBlock label='Price' value={purchase.price} />
                <InfoBlock label='Purchase date' value={purchase.purchaseDate} />
                <InfoBlock label='Expiry Date' value={purchase.expiryDate} />
              </div>
            </div>
            ))
          )}
        </div>

        <div className='flex flex-col items-center justify-between gap-4 px-4 py-4 border-t border-gray-100 sm:flex-row'>
          <p className='text-base font-medium text-[#1FB356]'>
            Showing {startIndex} to {endIndex} of {totalItems} results
          </p>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className='rounded-lg border border-[#1FB356] px-4 py-1.5 text-sm text-[#1FB356] transition hover:bg-gray-50 disabled:opacity-40'
              disabled={!hasPreviousPage}
            >
              Previous
            </button>
            <button
              type='button'
              onClick={() => setPage((prev) => prev + 1)}
              className='rounded-lg border border-[#1FB356] px-4 py-1.5 text-sm text-[#1FB356] transition hover:bg-gray-50 disabled:opacity-40'
              disabled={!hasNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
