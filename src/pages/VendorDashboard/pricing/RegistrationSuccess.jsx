import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../../config';

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const referenceId =
    searchParams.get('transactionId') ||
    searchParams.get('trxId') ||
    searchParams.get('ref') ||
    searchParams.get('reference') ||
    'N/A';

  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4 py-10 font-raleway text-[#0c0c0c] sm:px-6 lg:px-8'>
      <section
        data-gsap-reveal
        className='w-full max-w-2xl rounded-2xl border border-[#e3d9cb] bg-white p-8 text-center shadow-sm sm:p-10'
      >
        <div className='mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-[#e6efe3] text-[#50614e]'>
          <CheckCircle2 size={44} />
        </div>

        <h1 className='mt-6 font-playfair text-3xl text-[#171411] sm:text-4xl'>Registration Successful</h1>
        <p className='mx-auto mt-4 max-w-xl text-sm leading-7 text-[#5e564b] sm:text-base'>
          Your vendor registration and subscription setup were completed successfully.
        </p>

        <div className='mx-auto mt-6 max-w-lg rounded-lg bg-[#f5f1ea] px-4 py-3 text-left'>
          <p className='text-xs uppercase tracking-wider text-[#7d7468]'>Reference</p>
          <p className='mt-1 break-all text-sm font-medium text-[#332d26]'>{referenceId}</p>
        </div>

        <div className='mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <button
            type='button'
            onClick={() => navigate(ROUTES.VENDOR_DASHBOARD)}
            className='inline-flex items-center justify-center rounded-lg bg-[#50614e] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#445341]'
          >
            Go to Dashboard
          </button>

          <button
            type='button'
            onClick={() => navigate(ROUTES.VENDOR_PRICING)}
            className='inline-flex items-center justify-center rounded-lg border border-[#d8ccba] bg-white px-6 py-3 text-sm font-medium text-[#3f3a33] transition hover:bg-[#f8f3ea]'
          >
            Back to Pricing
          </button>
        </div>
      </section>
    </main>
  );
};

export default RegistrationSuccess;
