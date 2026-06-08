import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../../../config';

const isTruthy = (value) =>
  value === 'true' || value === '1' || value === 'yes' || value === 'success';

const VendorBillingRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const successFlag = isTruthy(searchParams.get('success'));
  const cancelFlag =
    isTruthy(searchParams.get('cancel')) ||
    isTruthy(searchParams.get('canceled')) ||
    isTruthy(searchParams.get('cancelled')) ||
    searchParams.get('status') === 'cancel';

  useEffect(() => {
    if (successFlag) {
      navigate(ROUTES.REGISTRATION_SUCCESS + window.location.search, { replace: true });
      return;
    }

    if (cancelFlag) {
      navigate(ROUTES.REGISTRATION_CANCEL + window.location.search, { replace: true });
      return;
    }

    navigate(ROUTES.VENDOR_PRICING, { replace: true });
  }, [cancelFlag, navigate, successFlag]);

  return (
    <main className='flex min-h-screen items-center justify-center bg-[#f7f3ec] px-4 py-10 font-raleway text-[#0c0c0c]'>
      <div className='rounded-2xl border border-[#e3d9cb] bg-white px-6 py-4 text-sm text-[#5e564b] shadow-sm'>
        Redirecting...
      </div>
    </main>
  );
};

export default VendorBillingRedirect;
