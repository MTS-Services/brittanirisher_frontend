import { BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../config';

const ProfileHeroSection = ({ vendor }) => {
  const navigate = useNavigate();
  const vendorDisplayName =
    vendor?.businessName ||
    vendor?.companyName ||
    vendor?.name ||
    vendor?.fullName ||
    'Vendor';

  return (
    <section className='relative flex w-full overflow-hidden rounded-lg border border-[#ebe5db] bg-[#F7F5F1] px-4 py-4 shadow-sm sm:px-6 sm:py-6 lg:px-8 lg:py-8'>
    <div className='absolute inset-y-0 right-0 z-0 hidden w-1/2 lg:block'>
      <img
        src='/right.webp'
        alt='Background Pattern'
        className='h-full w-full object-cover object-top-left opacity-90'
      />
    </div>

    <div className='relative z-10 w-full max-w-2xl lg:w-[60%]'>
      <span className='inline-flex items-center gap-1.5 rounded-full bg-[#B6C5B1] px-3.5 py-1.5 text-xs font-medium text-white shadow-sm'>
        <BadgeCheck size={16} strokeWidth={2} />
        Subscription Active
      </span>

      <h1 className='mt-5 max-w-xl font-playfair text-2xl font-medium leading-tight text-[#111111] sm:text-4xl'>
        Welcome back, {vendorDisplayName}
      </h1>

      <p className='mt-4 max-w-xl text-base leading-relaxed text-[#57534e]'>
        Manage your subscription, keep your profile active, and continue receiving quality leads from brides.
      </p>

      <div className='mt-8 flex flex-wrap gap-10 sm:gap-14'>
        <div>
          <div className='text-base text-black'>Active Package</div>
          <div className='mt-2 text-2xl font-medium text-[#111111]'>Starter</div>
        </div>

        <div>
          <div className='text-base text-black'>Price</div>
          <div className='mt-2 text-2xl font-medium text-[#111111]'>
            $79
            <span className='ml-1 text-[13px] font-normal text-[#7a756f]'>/month</span>
          </div>
        </div>

        <div>
          <div className='text-base text-black'>Expiry Date</div>
          <div className='mt-2 text-2xl font-medium text-[#111111]'>5/12/2026</div>
        </div>
      </div>

      <button
        type='button'
        onClick={() => navigate(ROUTES.VENDOR_PRICING)}
        className='mt-8 inline-flex items-center rounded-xl bg-[#A3B79C] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#8d9f87]'
      >
        Upgrade Plan
      </button>
    </div>
  </section>
  );
};

export default ProfileHeroSection;
