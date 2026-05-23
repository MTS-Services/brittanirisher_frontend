const PURCHASES = [
  {
    vendorName: 'Sarah',
    businessName: 'Sarah Photography',
    plan: 'Starter',
    price: '$29',
    purchaseDate: '4/12/2026',
    expiryDate: '5/12/2026',
  },
  {
    vendorName: 'Juhan',
    businessName: 'Elite Catering Co',
    plan: 'Professional',
    price: '$70',
    purchaseDate: '4/10/2026',
    expiryDate: '5/10/2026',
  },
  {
    vendorName: 'Zepher',
    businessName: 'Floral Dreams Studio',
    plan: 'Premium',
    price: '$149',
    purchaseDate: '4/8/2026',
    expiryDate: '5/8/2026',
  },
  {
    vendorName: 'Liyana',
    businessName: 'Premier DJ Services',
    plan: 'Starter',
    price: '$29',
    purchaseDate: '4/10/2026',
    expiryDate: '5/12/2026',
  },
  {
    vendorName: 'Lisa',
    businessName: 'Cake Artistry',
    plan: 'Professional',
    price: '$70',
    purchaseDate: '4/10/2026',
    expiryDate: '5/10/2026',
  },
  {
    vendorName: 'Zarah',
    businessName: 'Premier DJ Services',
    plan: 'Premium',
    price: '$149',
    purchaseDate: '4/10/2026',
    expiryDate: '4/10/2026',
  },
];

const TableCell = ({ children, className = '' }) => (
  <td className={`px-4 py-4 text-sm text-gray-600 ${className}`}>{children}</td>
);

const InfoBlock = ({ label, value }) => (
  <div className='rounded-lg bg-gray-50/70 px-3 py-2'>
    <p className='text-[11px] uppercase tracking-wide text-gray-400'>{label}</p>
    <p className='mt-1 text-sm font-medium text-gray-800'>{value}</p>
  </div>
);

export default function PaymentsPurchasesTable() {
  const pagedPurchases = PURCHASES;

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
              {pagedPurchases.map((purchase) => (
                <tr key={`${purchase.vendorName}-${purchase.businessName}`} className='hover:bg-gray-50/60 transition-colors'>
                  <TableCell className='text-gray-800 font-medium'>{purchase.vendorName}</TableCell>
                  <TableCell>{purchase.businessName}</TableCell>
                  <TableCell>{purchase.plan}</TableCell>
                  <TableCell>{purchase.price}</TableCell>
                  <TableCell>{purchase.purchaseDate}</TableCell>
                  <TableCell>{purchase.expiryDate}</TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='lg:hidden divide-y divide-gray-100'>
          {pagedPurchases.map((purchase) => (
            <div
              key={`${purchase.vendorName}-${purchase.businessName}`}
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
          ))}
        </div>

        <div className='flex flex-col items-center justify-between gap-4 px-4 py-4 border-t border-gray-100 sm:flex-row'>
          <p className='text-base font-medium text-[#1FB356]'>
            Showing 1 to {Math.min(7, pagedPurchases.length)} of {pagedPurchases.length} results
          </p>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              className='rounded-lg border border-[#1FB356] px-4 py-1.5 text-sm text-[#1FB356] transition hover:bg-gray-50 disabled:opacity-40'
              disabled
            >
              Previous
            </button>
            <button
              type='button'
              className='rounded-lg border border-[#1FB356] px-4 py-1.5 text-sm text-[#1FB356] transition hover:bg-gray-50 disabled:opacity-40'
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
