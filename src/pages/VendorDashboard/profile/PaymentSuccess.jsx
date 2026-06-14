import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planName = searchParams.get('planName') || 'Plan';
  const planPrice = searchParams.get('planPrice') || '0';
  const updated = searchParams.get('updated') === 'true';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='flex min-h-[80vh] w-full items-center justify-center px-4 font-raleway'>
      <div className='w-full max-w-md text-center'>
        {/* Icon */}
        <div className='mb-6 flex justify-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf3e8]'>
            <CheckCircle
              size={40}
              className='text-[#5a8a57]'
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className='mb-2 font-playfair text-3xl text-[#1b1b1b]'>
          Payment {updated ? 'Updated' : 'Successful'}!
        </h1>
        <p className='mb-8 text-base text-[#7a7a7a]'>
          {updated
            ? 'Your subscription plan has been updated successfully.'
            : 'Your subscription is now active. Welcome aboard!'}
        </p>

        {/* Plan Card */}
        <div className='mb-8 rounded-xl border border-[#e0dcd7] bg-white p-6 text-left'>
          <p className='mb-4 text-xs font-medium uppercase tracking-widest text-[#aaa]'>
            Subscription Summary
          </p>

          <div className='flex items-center justify-between border-b border-[#f0ede8] pb-3 mb-3'>
            <span className='text-sm text-[#7a7a7a]'>Plan</span>
            <span className='text-sm font-medium text-[#2a2a2a]'>
              {planName}
            </span>
          </div>

          <div className='flex items-center justify-between border-b border-[#f0ede8] pb-3 mb-3'>
            <span className='text-sm text-[#7a7a7a]'>Amount</span>
            <span className='text-sm font-medium text-[#2a2a2a]'>
              ${planPrice} / month
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-[#7a7a7a]'>Status</span>
            <span className='inline-flex items-center gap-1.5 rounded-full bg-[#eaf3e8] px-3 py-0.5 text-xs font-medium text-[#3d7a3a]'>
              <span className='h-1.5 w-1.5 rounded-full bg-[#3d7a3a]' />
              Active
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex flex-col gap-3'>
          <button
            onClick={() => navigate('/vendor/dashboard')}
            className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#556151] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#465146]'
          >
            Go to Dashboard
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => navigate('/vendor/profile')}
            className='inline-flex w-full items-center justify-center rounded-lg border border-[#d5d1cb] bg-white px-6 py-3 text-sm font-medium text-[#5a5a5a] transition hover:bg-[#f8f6f3]'
          >
            View Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
