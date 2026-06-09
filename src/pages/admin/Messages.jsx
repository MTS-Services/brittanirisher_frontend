import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { MailOpen, Trash2, RefreshCcw } from 'lucide-react';
import {
  useDeleteAdminMessageMutation,
  useGetAdminMessagesQuery,
} from '../../store/features/admin/adminMessage/adminMessageApi';
import { SkeletonBlock } from '../../components/skeletons/LoadingSkeletons';

const formatDateTime = (value) => {
  if (!value) return '-';
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '-';

  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const fullName = (item) => {
  const first = item?.firstName || '';
  const last = item?.lastName || '';
  const name = `${first} ${last}`.trim();
  return name || 'N/A';
};

export default function Messages() {
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

  const {
    data: messageResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetAdminMessagesQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnWindowFocus: true,
  });

  const [deleteAdminMessage, { isLoading: isDeleting }] =
    useDeleteAdminMessageMutation();

  const messages = messageResponse?.data || [];
  const meta = messageResponse?.meta || {};
  const totalItems = meta.totalItems ?? messages.length;
  const currentPage = meta.currentPage || page;
  const totalPages = meta.totalPages || 1;
  const hasNextPage = !!meta.hasNextPage;
  const hasPreviousPage = !!meta.hasPreviousPage;

  const handleDelete = async (id) => {
    if (!id) {
      toast.error('Message id is missing.');
      return;
    }

    const shouldDelete = window.confirm(
      'Are you sure you want to delete this message?',
    );

    if (!shouldDelete) return;

    try {
      await deleteAdminMessage({ id }).unwrap();
      toast.success('Message deleted successfully.');
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete message.');
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Messages</h1>
          <p className='text-sm text-gray-500 mt-1'>
            View and manage all contact messages from users.
          </p>
        </div>

        <button
          type='button'
          onClick={refetch}
          disabled={isFetching}
          className='inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <RefreshCcw size={16} className={isFetching ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <div className='rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden'>
        <div className='hidden lg:grid grid-cols-[1.3fr_1fr_1.7fr_2.5fr_0.9fr_1fr] gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 border-b border-gray-100'>
          <span>Name</span>
          <span>Email</span>
          <span>Subject</span>
          <span>Message</span>
          <span>Status</span>
          <span className='text-right'>Action</span>
        </div>

        {isLoading ? (
          <div className='divide-y divide-gray-100'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={`message-skeleton-${index}`} className='p-4 sm:p-5'>
                <div className='hidden lg:grid grid-cols-[1.3fr_1fr_1.7fr_2.5fr_0.9fr_1fr] gap-4 items-start'>
                  <SkeletonBlock className='h-10 w-full rounded' />
                  <SkeletonBlock className='h-4 w-full rounded mt-1' />
                  <SkeletonBlock className='h-4 w-full rounded mt-1' />
                  <SkeletonBlock className='h-4 w-full rounded mt-1' />
                  <SkeletonBlock className='h-7 w-20 rounded-full' />
                  <div className='flex justify-end'>
                    <SkeletonBlock className='h-8 w-20 rounded-lg' />
                  </div>
                </div>

                <div className='lg:hidden space-y-2'>
                  <SkeletonBlock className='h-5 w-32 rounded' />
                  <SkeletonBlock className='h-4 w-40 rounded' />
                  <SkeletonBlock className='h-4 w-full rounded' />
                  <SkeletonBlock className='h-4 w-11/12 rounded' />
                </div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className='px-5 py-16 flex flex-col items-center justify-center gap-2 text-center text-gray-400'>
            <MailOpen size={34} className='text-gray-300' aria-hidden='true' />
            <p className='text-sm'>No messages found.</p>
          </div>
        ) : (
          <div className='divide-y divide-gray-100'>
            {messages.map((item) => (
              <div key={item.id} className='p-4 sm:p-5'>
                <div className='hidden lg:grid grid-cols-[1.3fr_1fr_1.7fr_2.5fr_0.9fr_1fr] gap-4 items-start'>
                  <div>
                    <p className='text-sm font-semibold text-gray-900'>
                      {fullName(item)}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>
                      {formatDateTime(item.createdAt)}
                    </p>
                  </div>

                  <p className='text-sm text-gray-700 break-all'>{item.email || '-'}</p>

                  <p className='text-sm text-gray-800 leading-6'>
                    {item.subject || '-'}
                  </p>

                  <p className='text-sm text-gray-600 leading-6 line-clamp-3'>
                    {item.message || '-'}
                  </p>

                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                      item.isRead
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {item.isRead ? 'Read' : 'Unread'}
                  </span>

                  <div className='flex justify-end'>
                    <button
                      type='button'
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting}
                      className='inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
                    >
                      <Trash2 size={14} aria-hidden='true' />
                      Delete
                    </button>
                  </div>
                </div>

                <div className='lg:hidden space-y-2'>
                  <div className='flex items-start justify-between gap-2'>
                    <div>
                      <p className='text-sm font-semibold text-gray-900'>
                        {fullName(item)}
                      </p>
                      <p className='text-xs text-gray-500'>{item.email || '-'}</p>
                    </div>
                    <span
                      className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        item.isRead
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.isRead ? 'Read' : 'Unread'}
                    </span>
                  </div>

                  <p className='text-xs font-medium text-gray-700'>
                    {item.subject || '-'}
                  </p>
                  <p className='text-sm text-gray-600 leading-6'>{item.message || '-'}</p>

                  <div className='flex items-center justify-between gap-2 pt-1'>
                    <p className='text-xs text-gray-500'>
                      {formatDateTime(item.createdAt)}
                    </p>
                    <button
                      type='button'
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting}
                      className='inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
                    >
                      <Trash2 size={14} aria-hidden='true' />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-sm text-gray-500'>
            Showing page {currentPage} of {totalPages} ({totalItems} total messages)
          </p>

          <div className='flex items-center gap-2'>
            <button
              type='button'
              disabled={!hasPreviousPage}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              className='rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Previous
            </button>
            <button
              type='button'
              disabled={!hasNextPage}
              onClick={() => setPage((prev) => prev + 1)}
              className='rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
