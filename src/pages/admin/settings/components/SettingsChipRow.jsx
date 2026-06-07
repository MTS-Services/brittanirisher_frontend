import { Trash2 } from 'lucide-react';

export default function SettingsChipRow({ items, onDelete }) {
  return (
    <div className='flex flex-wrap gap-2'>
      {items.map((item) => {
        const itemId = typeof item === 'string' ? item : item.id;
        const itemLabel = typeof item === 'string' ? item : item.name;

        return (
        <div
          key={itemId}
          className='inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm sm:text-base text-gray-700'
        >
          <span>{itemLabel}</span>
          <button
            type='button'
            onClick={() => onDelete?.(item)}
            className='inline-flex items-center justify-center text-gray-400 transition hover:text-red-500'
            aria-label={`Delete ${itemLabel}`}
          >
            <Trash2 size={12} />
          </button>
        </div>
        );
      })}
    </div>
  );
}
