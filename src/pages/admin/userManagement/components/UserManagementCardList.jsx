import { MoreVertical } from 'lucide-react';

const Field = ({ label, value }) => (
  <div className='rounded-lg bg-gray-50/70 px-3 py-2'>
    <p className='text-[11px] uppercase tracking-wide text-gray-400'>{label}</p>
    <p className='mt-1 text-sm font-medium text-gray-800'>{value}</p>
  </div>
);

export default function UserManagementCardList({
  activeTab,
  pagedRows,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className='lg:hidden px-5 py-8 text-center text-sm text-gray-500'>
        Loading users...
      </div>
    );
  }

  if (!pagedRows.length) {
    return (
      <div className='lg:hidden px-5 py-8 text-center text-sm text-gray-500'>
        No users found.
      </div>
    );
  }

  return (
    <div className='lg:hidden divide-y divide-gray-100'>
      {pagedRows.map((row) => (
        <div key={row.id || row.email} className='p-4 sm:p-5'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <p className='text-base font-semibold text-gray-900'>{row.name}</p>
              <p className='text-sm text-gray-500 mt-0.5'>{row.email}</p>
            </div>

            {activeTab === 'vendor' && (
              <button
                type='button'
                className='text-gray-400 hover:text-gray-600 transition'
                aria-label='Row actions'
              >
                <MoreVertical size={18} />
              </button>
            )}
          </div>

          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <Field label='Phone Number' value={row.phone} />
            <Field label='Location' value={row.location} />

            {activeTab === 'couple' ? (
              <>
                <Field label='Wedding Style' value={row.weddingStyle} />
                <Field label='Wedding Date' value={row.weddingDate} />
                <Field label='Budget' value={row.budget} />
                <Field label='Spent' value={row.spent} />
                <Field label='Remaining' value={row.remaining} />
              </>
            ) : (
              <>
                <Field label='Subscription Name' value={row.subscriptionName} />
                <Field label='Price' value={row.price} />
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
