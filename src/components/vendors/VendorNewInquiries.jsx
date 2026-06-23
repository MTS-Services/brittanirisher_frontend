import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';

const formatTime = (dateString) => {
  if (!dateString) return '';
  const dateObj = new Date(dateString);
  if (Number.isNaN(dateObj.getTime())) return '';

  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
};

const VendorNewInquiries = ({ inquiries = [] }) => (
  <aside className='rounded-2xl border border-[#ececec] bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.03)]'>
    <div className='mb-5 flex items-center justify-between gap-2'>
      <h2 className='font-playfair text-4xl text-[#232323]'>New Inquiries</h2>
      <Link
        to={ROUTES.VENDOR_LEADS}
        className='text-xs font-semibold text-[#6f776f] transition-colors hover:text-[#2f352f]'
      >
        See all inquiries
      </Link>
    </div>

    <div className='space-y-4'>
      {inquiries.length === 0 ? (
        <p className='py-6 text-center text-sm text-[#7b847b]'>
          No new inquiries found.
        </p>
      ) : (
        inquiries.map((item) => (
          <article
            key={item.id}
            className='border-b border-[#efefef] pb-4 last:border-b-0 last:pb-0'
          >
            <div className='flex items-start justify-between gap-2'>
              <p className='text-xl font-semibold text-[#232323]'>
                {item?.senderName || 'Unknown'}
              </p>
              <span className='text-[11px] font-semibold text-[#6f776f]'>
                {formatTime(item?.createdAt)}
              </span>
            </div>
            <p className='mt-1 text-sm text-[#707770]'>
              {item?.senderEmail || 'No email'}
            </p>
            <p className='mt-2 line-clamp-2 text-sm italic text-[#828882]'>
              "{item?.message || ''}"
            </p>
          </article>
        ))
      )}
    </div>
  </aside>
);

export default VendorNewInquiries;
