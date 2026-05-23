import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Suspense } from 'react';

import VendorSignupStep1 from './VendorSignupStep1';
import VendorSignupStep2 from './VendorSignupStep2';
import VendorSignupStep3 from './VendorSignupStep3';

const VendorSignupFlow = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentStep = searchParams.get('step') || '1';

  const [formData, setFormData] = useState({
    businessName: '',
    highlightedServices: '',
    experience: '',
    speciality: '',
    aboutMe: '',
    portfolioImages: [],
    packages: [],
    password: '',
    confirmPassword: '',
  });

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case '1':
        return <VendorSignupStep1 formData={formData} onFormChange={handleFormChange} />;
      case '2':
        return <VendorSignupStep2 formData={formData} onFormChange={handleFormChange} />;
      case '3':
        return <VendorSignupStep3 formData={formData} onFormChange={handleFormChange} />;
      default:
        return <VendorSignupStep1 formData={formData} onFormChange={handleFormChange} />;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderStep()}</Suspense>;
};

export default VendorSignupFlow;
