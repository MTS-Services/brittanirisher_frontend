import { MoreVertical } from 'lucide-react';

const UpcomingWeddingsSection = ({ weddings }) => (
  <div>
    <div className='mb-3 flex items-end justify-between'>
      <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>
        Upcoming Weddings
      </h2>
      <button
        type='button'
        className='font-raleway text-[12px] leading-4 text-[#807a74]'
      >
        View Calendar
      </button>
    </div>

    <div className='space-y-4'>
      {weddings.map((wedding) => (
        <article
          key={wedding.couple}
          className='flex items-center gap-4 rounded-xl border-l-4 border-[#596158] bg-white p-3 shadow-[0_8px_22px_rgba(0,0,0,0.08)]'
        >
          <img
            src={wedding.image}
            alt=''
            className='rounded-md object-cover'
            style={{ height: 52, width: 52 }}
          />
          <div className='min-w-0 flex-1'>
            <h3 className='font-playfair text-[18px] leading-tight text-[#2d2d2d]'>
              {wedding.couple}
            </h3>
            <p className='mt-1 font-raleway text-[14px] leading-5 text-[#807a74]'>
              {wedding.date} • {wedding.venue}
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <span className='rounded-full bg-[#edf2ed] px-3 py-1 font-raleway text-[10px] uppercase tracking-[1px] text-[#6a7363]'>
              Photography
            </span>
            <button type='button' className='text-[#807a74]'>
              <MoreVertical size={16} />
            </button>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default UpcomingWeddingsSection;
