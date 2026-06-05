import React from 'react';
import PackagesPricingSection from './components/PackagesPricingSection';
import ProfileDetailsSection from './components/ProfileDetailsSection';
import ProfileHeroSection from './components/ProfileHeroSection';
import { useGetVendorStatusQuery } from '../../../store/features/vendor/vendorDashboardApi';

const VendorProfile = () => {
  const { data: response, isLoading, isError } = useGetVendorStatusQuery();

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center text-lg text-gray-500">
        Loading vendor profile...
      </div>
    );
  }

  if (isError || !response?.success) {
    return (
      <div className="flex h-96 w-full items-center justify-center text-lg text-red-500">
        Failed to load vendor profile details.
      </div>
    );
  }

  const vendorData = response?.data || {};

  return (
    <section className='w-full font-raleway text-[#2e322f]'>
      <div className='space-y-10'>
        <ProfileHeroSection vendor={vendorData} />
        
        <ProfileDetailsSection vendor={vendorData} />
        
        <PackagesPricingSection packages={vendorData.packages || []} />
      </div>
    </section>
  );
};

export default VendorProfile;