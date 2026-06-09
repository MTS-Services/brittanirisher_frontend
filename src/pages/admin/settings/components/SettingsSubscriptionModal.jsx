import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { SkeletonBlock } from '../../../../components/skeletons/LoadingSkeletons';

export default function SettingsSubscriptionModal({
  open,
  mode,
  form,
  isSubmitting,
  isLoading,
  onClose,
  onSubmit,
  onChange,
  onFeatureChange,
  onAddFeature,
  onRemoveFeature,
}) {
  if (!open) {
    return null;
  }

  const isEdit = mode === 'edit';

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black/35 px-0 py-0 sm:items-center sm:px-4 sm:py-6'>
      <div className='w-full max-w-2xl overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl max-h-[95dvh] sm:max-h-[90vh] flex flex-col'>
        
        {/* Header */}
        <div className='flex shrink-0 items-center justify-between border-b border-gray-100 bg-[#ececec] px-4 py-3 sm:px-5 sm:py-4'>
          <h3 className='text-xl sm:text-2xl font-playfair font-semibold text-gray-700'>
            {isEdit ? 'Edit Subscription' : 'New Subscription'}
          </h3>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition hover:bg-gray-50'
            aria-label='Close subscription modal'
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className='overflow-y-auto flex-1 space-y-4 px-4 py-4 sm:space-y-5 sm:px-6 sm:py-6'>
          {isLoading ? (
            <div className='space-y-4'>
              <SkeletonBlock className='h-11 w-full rounded-lg' />
              <SkeletonBlock className='h-28 w-full rounded-lg' />
              <div className='grid gap-4 sm:grid-cols-3'>
                <SkeletonBlock className='h-11 w-full rounded-lg' />
                <SkeletonBlock className='h-11 w-full rounded-lg' />
                <SkeletonBlock className='h-11 w-full rounded-lg' />
              </div>
              <SkeletonBlock className='h-11 w-full rounded-lg' />
              <SkeletonBlock className='h-11 w-36 rounded-lg' />
            </div>
          ) : (
            <>
              {/* Title */}
              <div>
                <label className='mb-2 block text-[15px] font-medium text-gray-700'>
                  Subscription Title
                </label>
                <input
                  type='text'
                  placeholder='Enter Subscription title here'
                  value={form.planName}
                  onChange={(event) => onChange('planName', event.target.value)}
                  className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
                />
              </div>

              {/* Description */}
              <div>
                <label className='mb-2 block text-[15px] font-medium text-gray-700'>
                  Subscription Description
                </label>
                <textarea
                  rows='4'
                  placeholder='Description'
                  value={form.sortDescription}
                  onChange={(event) => onChange('sortDescription', event.target.value)}
                  className='w-full resize-none rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
                />
              </div>

              {/* Valid For / Price / Portfolio — stack on mobile, 3-col on sm+ */}
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4'>
                <div>
                  <label className='mb-2 block text-[15px] font-medium text-gray-700'>
                    Valid For
                  </label>
                  <input
                    type='text'
                    placeholder='1 Month'
                    value={form.validFor}
                    onChange={(event) => onChange('validFor', event.target.value)}
                    className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
                  />
                </div>

                <div>
                  <label className='mb-2 block text-[15px] font-medium text-gray-700'>
                    Price Monthly
                  </label>
                  <input
                    type='number'
                    min='0'
                    placeholder='0'
                    value={form.priceMonthly}
                    onChange={(event) => onChange('priceMonthly', event.target.value)}
                    className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
                  />
                </div>

                <div>
                  <label className='mb-2 block text-[15px] font-medium text-gray-700'>
                    Portfolio Limit
                  </label>
                  <input
                    type='number'
                    min='0'
                    placeholder='0'
                    value={form.portfolioLimit}
                    onChange={(event) => onChange('portfolioLimit', event.target.value)}
                    className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
                  />
                </div>
              </div>

              {/* Features */}
              <div>
                <label className='mb-2 block text-[15px] font-medium text-gray-700'>
                  Features Allowed
                </label>
                <div className='space-y-2'>
                  {form.featuresAllowed.map((feature, index) => (
                    <div
                      key={`${feature.name}-${index}`}
                      className='flex flex-col gap-2 sm:grid sm:grid-cols-[1fr_auto_auto]'
                    >
                      <input
                        type='text'
                        placeholder='Feature name'
                        value={feature.name}
                        onChange={(event) =>
                          onFeatureChange(index, 'name', event.target.value)
                        }
                        className='w-full rounded-lg border-0 bg-[#e9e9e9] px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#A7B9A6]/40'
                      />
                      <div className='flex items-center gap-2'>
                        <label className='inline-flex flex-1 items-center gap-2 rounded-lg bg-[#e9e9e9] px-3 py-2 text-sm text-gray-700 sm:flex-none'>
                          <input
                            type='checkbox'
                            checked={!!feature.isIncluded}
                            onChange={(event) =>
                              onFeatureChange(index, 'isIncluded', event.target.checked)
                            }
                          />
                          Included
                        </label>
                        <button
                          type='button'
                          onClick={() => onRemoveFeature(index)}
                          className='rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50'
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type='button'
                  onClick={onAddFeature}
                  className='mt-3 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50'
                >
                  Add Feature
                </button>
              </div>
            </>
          )}

          {/* Submit */}
          <div className='pt-3 pb-1 sm:pt-5'>
            <button
              type='button'
              onClick={onSubmit}
              disabled={isSubmitting || isLoading}
              className='w-full sm:w-auto inline-flex justify-center rounded-lg bg-[#A7B9A6] px-5 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:opacity-95 disabled:opacity-60'
            >
              {isSubmitting ? 'Saving...' : isEdit ? 'Update Subscription' : 'Add Subscription'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}