import { ChevronDown, X } from 'lucide-react';
import ModalShell from './ModalShell';

const NewBookingModal = ({
  formData,
  onChange,
  onClose,
  onSubmit,
  isSubmitting,
  packageOptions,
}) => (
  <ModalShell onClose={onClose} widthClass='max-w-lg'>
    <div className='flex items-center justify-between border-b border-[#d7dce6] px-5 py-4 max-sm:px-4 max-sm:py-3'>
      <h2 className='font-playfair text-[26px] text-[#212121] max-sm:text-[22px]'>
        New Booking
      </h2>
      <button
        aria-label='Close new booking modal'
        onClick={onClose}
        className='border-none bg-transparent p-0 text-[#24324b] outline-none ring-0 focus:outline-none focus:ring-0'
      >
        <X size={26} />
      </button>
    </div>

    <form
      className='max-h-[calc(100dvh-8.5rem)] space-y-4 overflow-y-auto px-5 py-5 max-sm:max-h-[calc(100dvh-7rem)] max-sm:px-4 max-sm:py-4'
      onSubmit={onSubmit}
    >
      {[
        {
          key: 'coupleName',
          label: 'Couple Name',
          placeholder: 'Enter Couple Name here',
        },
        {
          key: 'email',
          label: 'E-mail',
          placeholder: 'Enter E-mail here',
          type: 'email',
        },
        {
          key: 'phone',
          label: 'Phone Number',
          placeholder: 'Enter Phone Number Here',
        },
        {
          key: 'venueName',
          label: 'Venue Name',
          placeholder: 'Enter Venue name',
        },
        { key: 'location', label: 'Location', placeholder: 'Enter Location' },
        {
          key: 'weddingDate',
          label: 'Wedding Date',
          placeholder: 'mm/dd/yyyy',
          type: 'date',
        },
        {
          key: 'price',
          label: 'Price',
          placeholder: '75000.50',
          type: 'number',
        },
      ].map((field) => (
        <label key={field.key} className='block'>
          <span className='mb-2 block text-[15px] text-[#1f1f1f]'>
            {field.label}
          </span>
          <input
            type={field.type || 'text'}
            value={formData[field.key]}
            onChange={(event) => onChange(field.key, event.target.value)}
            placeholder={field.placeholder}
            className='h-8.75 w-full rounded-sm border border-[#dfe5ef] bg-[#fafcff] px-3 text-[13px] text-[#3c3f44] outline-none placeholder:text-[#9ea6b3]'
          />
        </label>
      ))}

      <div className='grid grid-cols-1 gap-4'>
        <label className='block'>
          <span className='mb-2 block text-[15px] text-[#1f1f1f]'>Package</span>
          <div className='relative'>
            <select
              value={formData.packageId}
              onChange={(event) => onChange('packageId', event.target.value)}
              className='h-8.75 w-full appearance-none rounded-sm border border-[#dfe5ef] bg-[#fafcff] px-3 text-[13px] text-[#3c3f44] outline-none'
            >
              <option value=''>Select package</option>
              {packageOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.packageName}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#68707d]'
            />
          </div>
          <p className='mt-1 text-xs text-[#7d8794]'>
            Dropdown shows only package name; the selected id is sent to the
            API.
          </p>
        </label>
      </div>

      <div className='flex items-center justify-end gap-3 pt-2'>
        <button
          type='button'
          onClick={onClose}
          className='h-10 rounded-sm border border-[#e0e6ef] bg-white px-5 text-[14px] text-[#7a7f87]'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isSubmitting}
          className='h-10 rounded-sm bg-[#6f7969] px-6 text-[14px] text-white disabled:opacity-60'
        >
          {isSubmitting ? 'Adding...' : 'Add Booking'}
        </button>
      </div>
    </form>
  </ModalShell>
);

export default NewBookingModal;
