import { Check, Mail, Phone, SquareX } from 'lucide-react';
import ModalShell from './ModalShell';

const formatModalDate = (dateString) => {
  if (!dateString) {
    return 'Wedding Date Oct 12, 2023';
  }

  return `Wedding Date ${dateString}`;
};

const DetailRow = ({ label, value }) => (
  <div>
    <p className='text-[13px] text-[#7d7d7d]'>{label}</p>
    <p className='mt-1 text-[15px] text-[#2f3d63]'>{value}</p>
  </div>
);

const ViewDetailsModal = ({ booking, onClose }) => {
  if (!booking) {
    return null;
  }

  return (
    <ModalShell onClose={onClose} widthClass='max-w-[585px]'>
      <div className='flex items-start justify-between px-6 pb-4 pt-5'>
        <div className='flex items-start gap-4'>
          <div className='relative'>
            <div
              className='flex h-20.5 w-20.5 items-center justify-center rounded-full border-[3px] border-[#cfd6ea] bg-[#b8b3b3] text-[22px] text-[#4a2e35]'
              style={{ height: '82px', width: '82px' }}
            >
              {booking.initials}
            </div>
            <span className='absolute bottom-0 right-1 h-4 w-4 rounded-full bg-[#80e0a8] ring-4 ring-white' />
          </div>

          <div>
            <h2 className='font-playfair text-[43px] leading-none text-[#17305d]'>{booking.name}</h2>
            <div className='mt-2 space-y-1 text-[14px] text-[#7d7d7d]'>
              <div className='flex items-center gap-2'>
                <Mail size={14} />
                <span>{booking.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone size={14} />
                <span>{booking.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <button aria-label='Close details modal' onClick={onClose} className='text-[#111]'>
          <SquareX size={28} />
        </button>
      </div>

      <div className='mx-6 mb-6 rounded-xl border border-[#cfd6ea] p-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2 text-[22px] text-[#17305d]'>
            <Check size={18} className='text-[#6f7969]' />
            <span className='font-playfair'>Couple Details</span>
          </div>
          <div className='text-[15px] text-[#2b2b2b]'>{formatModalDate(booking.weddingDate)}</div>
        </div>

        <div className='mt-4 rounded-[10px] bg-[#f7f3ea] px-4 py-4'>
          <p className='text-[11px] uppercase tracking-[0.08em] text-[#8f8575]'>Venue</p>
          <p className='mt-1 text-[20px] text-[#2f2f2f]'>{booking.venue}</p>
        </div>

        <div className='mt-3 rounded-xl border border-[#e8edf4] px-4 py-4'>
          <div className='flex items-center gap-2 text-[14px] text-[#7d7d7d]'>
            <span className='inline-flex h-6 w-6 items-center justify-center rounded-sm border border-[#91a0b6] text-[12px] text-[#637085]'>
              i
            </span>
            <span>Detailed information</span>
          </div>

          <div className='mt-4 grid grid-cols-3 gap-4'>
            <DetailRow label='Location' value={booking.location} />
            <DetailRow label='Package' value={booking.packageName} />
            <DetailRow label='Price' value={booking.price} />
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

export default ViewDetailsModal;
