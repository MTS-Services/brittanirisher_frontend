import { UserCircle } from 'lucide-react';

export default function AdminProfileCard() {
  return (
    <div className='flex gap-2 rounded-lg'>
      <div className='inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gray-200'>
        <UserCircle size={32} className='text-gray-400' />
      </div>
      <div>
        <h2 className='text-lg font-semibold text-gray-900'>Admin Profile</h2>
        <p className='mt-1 text-sm text-gray-500'>
          Update your account photo and personal details.
        </p>
      </div>
    </div>
  );
}
