const NewInquiriesSection = ({ inquiries }) => (
  <aside className='rounded-xl bg-white p-4 shadow-[0_8px_22px_rgba(0,0,0,0.08)]'>
    <div className='flex items-center justify-between'>
      <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>
        New Inquiries
      </h2>
      <button
        type='button'
        className='font-raleway text-[12px] leading-4 text-[#807a74]'
      >
        See all inquiries
      </button>
    </div>

    <div className='mt-4 space-y-4'>
      {inquiries.map((item) => (
        <article
          key={item.name}
          className='border-b border-[#edf0ec] pb-4 last:border-b-0 last:pb-0'
        >
          <div className='flex items-start justify-between gap-4'>
            <div className='min-w-0 flex-1'>
              <div className='flex items-center gap-1 font-raleway text-[14px] leading-5 text-[#4a5154]'>
                <span className='font-semibold text-[#2d2d2d]'>{item.name}</span>
                <span>•</span>
                <span>{item.service}</span>
              </div>
              <p className='mt-2 font-raleway text-[14px] italic leading-5 text-[#807a74]'>
                {item.note}
              </p>
              <button
                type='button'
                className='mt-3 inline-flex items-center rounded-md bg-[#596158] px-3 py-1.5 font-inter text-[14px] font-medium leading-5 text-white'
              >
                See Details
              </button>
            </div>

            <div className='shrink-0 text-right font-raleway text-[12px] font-medium leading-4 text-[#4a5154]'>
              {item.time}
            </div>
          </div>
        </article>
      ))}
    </div>
  </aside>
);

export default NewInquiriesSection;
