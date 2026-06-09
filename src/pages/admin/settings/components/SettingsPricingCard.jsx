import { Check, Pencil, Search, Trash2, X } from 'lucide-react';

export default function SettingsPricingCard({
  title,
  price,
  description,
  features,
  disabled,
  featured,
  onEdit,
  onDelete,
  isActionLoading,
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-xl border p-5 shadow-sm ${
        featured
          ? 'border-[#464E46] bg-[#464E46] text-white'
          : 'border-gray-100 bg-white text-gray-900'
      }`}
    >
      <div className='mt-8'>
        <h3 className='text-2xl font-playfair font-semibold'>{title}</h3>
        <div className='mt-4 flex items-end gap-2'>
          <span className='text-4xl font-playfair font-semibold'>{price}</span>
          <span className={`pb-1 text-base ${featured ? 'text-white/70' : 'text-gray-500'}`}>
            / month
          </span>
        </div>
        <p className={`mt-3 text-base font-raleway leading-6 ${featured ? 'text-white/80' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>

      <div className={`my-5 border-t ${featured ? 'border-white/20' : 'border-gray-200'}`} />

      <ul className='space-y-2 text-base font-raleway'>
        {features.map((feature) => (
          <li key={feature} className='flex items-start gap-2'>
            <span className='mt-0.5 text-[#1FB356]'><Check /></span>
            <span className={featured ? 'text-white/90' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
        {disabled.map((feature) => (
          <li key={feature} className='flex items-start gap-2'>
            <span className={`mt-0.5 ${featured ? 'text-white/60' : 'text-gray-400'}`}>
              <X />
            </span>
            <span className={featured ? 'text-white/70' : 'text-gray-400'}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className='mt-auto grid grid-cols-2 gap-2 pt-6'>
        <button
          type='button'
          onClick={onEdit}
          disabled={isActionLoading}
          className='inline-flex items-center justify-center gap-2 rounded-sm bg-[#A7B9A6] px-3 py-2 text-sm text-white'
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          type='button'
          onClick={onDelete}
          disabled={isActionLoading}
          className={`inline-flex items-center justify-center gap-2 rounded-sm border px-3 py-2 text-sm ${
            featured ? 'border-white/35 text-white' : 'border-gray-300 text-gray-700'
          }`}
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </div>
  );
}
