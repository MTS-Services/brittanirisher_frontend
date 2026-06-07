import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordSection({
  passwords,
  onPasswordChange,
  onSave,
  isSaving,
}) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section>
      <div className='space-y-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm'>
        <h3 className='mb-5 text-xl font-playfair md:text-2xl font-semibold text-gray-900'>
          Change Password
        </h3>

        <div>
          <label className='mb-2 block text-base font-medium text-gray-700'>
            Old Password
          </label>
          <div className='relative'>
            <input
              type={showOld ? 'text' : 'password'}
              name='oldPassword'
              value={passwords.oldPassword}
              onChange={onPasswordChange}
              placeholder='••••••'
              className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm outline-none transition focus:border-[#A7B9A6] focus:bg-white'
            />
            <button
              type='button'
              onClick={() => setShowOld((s) => !s)}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'
              aria-label={showOld ? 'Hide old password' : 'Show old password'}
            >
              {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className='mb-2 block text-base font-medium text-gray-700'>
            New Password
          </label>
          <div className='relative'>
            <input
              type={showNew ? 'text' : 'password'}
              name='newPassword'
              value={passwords.newPassword}
              onChange={onPasswordChange}
              placeholder='••••••'
              className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm outline-none transition focus:border-[#A7B9A6] focus:bg-white'
            />
            <button
              type='button'
              onClick={() => setShowNew((s) => !s)}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'
              aria-label={showNew ? 'Hide new password' : 'Show new password'}
            >
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className='mb-2 block text-base font-medium text-gray-700'>
            Confirm New Password
          </label>
          <div className='relative'>
            <input
              type={showConfirm ? 'text' : 'password'}
              name='confirmPassword'
              value={passwords.confirmPassword}
              onChange={onPasswordChange}
              placeholder='••••••'
              className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm outline-none transition focus:border-[#A7B9A6] focus:bg-white'
            />
            <button
              type='button'
              onClick={() => setShowConfirm((s) => !s)}
              className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500'
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className='pt-4'>
          <button
            type='button'
            onClick={onSave}
            disabled={isSaving}
            className='inline-flex rounded-lg bg-[#A7B9A6] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-95'
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </section>
  );
}
