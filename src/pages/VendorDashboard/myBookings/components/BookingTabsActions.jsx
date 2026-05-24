import { Plus } from 'lucide-react';

const BookingTabsActions = ({ tabs, activeTab, onTabChange, onCreate }) => (
  <section className='mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
    <div className='flex items-end gap-10 border-b border-[#8a9084] pb-4'>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className='relative pb-3 text-left'
          >
            <span className={`text-[23px] ${isActive ? 'font-semibold text-[#6f7969]' : 'text-[#565656]'}`}>
              {tab.label}
            </span>
            <span className={`ml-2 rounded-full px-2.5 py-0.5 text-[12px] ${isActive ? 'bg-[#aab9a2] text-white' : 'bg-[#d7e0d1] text-[#6d7a67]'}`}>
              {tab.count}
            </span>
            <span
              className={`absolute left-0 w-full rounded-full ${isActive ? 'bg-[#6f7969]' : 'bg-transparent'}`}
              style={{ bottom: '-17px', height: '4px' }}
            />
          </button>
        );
      })}
    </div>

    <button
      type='button'
      className='inline-flex items-center justify-center gap-3 rounded-xl bg-[#6f7969] px-8 py-4 text-[18px] text-white shadow-[0_12px_26px_rgba(95,105,89,0.22)] transition hover:bg-[#5f6959]'
      style={{ minWidth: '214px' }}
      onClick={onCreate}
    >
      <Plus size={22} />
      New Booking
    </button>
  </section>
);

export default BookingTabsActions;
