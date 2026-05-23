import { Trash2 } from 'lucide-react';

export default function SettingsChipRow({ items }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item) => (
        <div
          key={item}
          className='inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs sm:text-sm text-gray-700'
        >
          <span>{item}</span>
          <Trash2 size={12} className='text-gray-400' />
        </div>
      ))}
    </div>
  );
}
