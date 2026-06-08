import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../config';
import VendorPricingPlansSection from '../dashboard/components/VendorPricingPlansSection';

const VendorPricing = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.VENDOR_DASHBOARD);
  };

  return (
    <main className='min-h-screen bg-[#f7f3ec] px-4 py-8 font-raleway text-[#0c0c0c] sm:px-6 lg:px-8'>
      <div className='mx-auto w-full max-w-7xl'>
        <button
          type='button'
          onClick={handleBack}
          className='inline-flex items-center gap-2 rounded-lg border border-[#d9d0c3] bg-white px-4 py-2 text-sm font-medium text-[#47433d] transition hover:bg-[#f3eee6]'
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <VendorPricingPlansSection />
      </div>
    </main>
  );
};

export default VendorPricing;
