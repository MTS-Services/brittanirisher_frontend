import { Funnel, ChevronDown } from 'lucide-react';

export default function UserTypeTabs({
  activeTab,
  setActiveTab,
  setPage,
  vendorFilter,
  setVendorFilter,
}) {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <div className='inline-flex w-full sm:w-auto rounded-lg bg-white border border-gray-200 p-2'>
        <button
          type='button'
          onClick={() => {
            setActiveTab('couple');
            setPage(1);
          }}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'couple'
              ? 'bg-[#A7B9A6] text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Couple
        </button>
        <button
          type='button'
          onClick={() => {
            setActiveTab('vendor');
            setPage(1);
          }}
          className={`flex-1 sm:flex-none px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'vendor'
              ? 'bg-[#A7B9A6] text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          Vendor
        </button>
      </div>

      {/* {activeTab === 'vendor' && (
        <label className='flex items-center gap-2 text-base text-gray-600 sm:self-auto'>
          <span className='inline-flex items-center gap-2 shrink-0'>
            <Funnel size={16} />
            <span className='hidden sm:inline'>Filter:</span>
          </span>
          <div className='relative flex-1 sm:flex-none'>
            <select
              value={vendorFilter}
              onChange={(e) => {
                setVendorFilter(e.target.value);
                setPage(1);
              }}
              className='w-full sm:w-auto appearance-none border border-gray-200 rounded-md px-3 py-1.5 pr-8 bg-white text-sm'
            >
              <option value='active'>Active</option>
              <option value='all'>All</option>
            </select>
            <ChevronDown
              size={14}
              className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400'
            />
          </div>
        </label>
      )} */}
    </div>
  );
}
