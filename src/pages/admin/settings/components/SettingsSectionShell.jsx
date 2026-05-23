import { Plus } from 'lucide-react';

export default function SettingsSectionShell({
  title,
  actionLabel,
  children,
  onActionClick,
}) {
  return (
    <section className='rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden'>
      <div className='flex items-center justify-between px-4 py-3 border-b border-gray-100'>
        <h2 className='text-lg sm:text-xl font-playfair font-semibold text-gray-900'>
          {title}
        </h2>
        <button
          type='button'
          onClick={onActionClick}
          className='inline-flex items-center gap-1 rounded-sm bg-[#A7B9A6] px-3 py-2 text-sm text-white shadow-sm'
        >
          <Plus size={16} />
          {actionLabel}
        </button>
      </div>
      <div className='px-4 py-4'>{children}</div>
    </section>
  );
}
