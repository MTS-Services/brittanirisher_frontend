import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Suspense } from 'react';

import VendorSignupStep1 from './VendorSignupStep1';
import VendorSignupStep2 from './VendorSignupStep2';
import VendorSignupStep3 from './VendorSignupStep3';
import VendorSignupStep4 from './VendorSignupStep4';

const DEFAULT_FORM_DATA = {
  businessName: '',
  highlightedServices: '',
  experience: '',
  speciality: '',
  aboutMe: '',
  portfolioImages: [],
  packages: [],
  currentPackage: {
    packageName: '',
    badge: '',
    features: [],
    price: '',
  },
  newFeature: '',
  password: '',
  confirmPassword: '',
};

const normalizeDraft = (draft) => {
  if (!draft || typeof draft !== 'object') {
    return DEFAULT_FORM_DATA;
  }

  const currentPackage = draft.currentPackage;

  return {
    ...DEFAULT_FORM_DATA,
    ...draft,
    portfolioImages: Array.isArray(draft.portfolioImages)
      ? draft.portfolioImages
      : [],
    packages: Array.isArray(draft.packages) ? draft.packages : [],
    currentPackage:
      currentPackage && typeof currentPackage === 'object'
        ? {
            ...DEFAULT_FORM_DATA.currentPackage,
            ...currentPackage,
            features: Array.isArray(currentPackage.features)
              ? currentPackage.features
              : [],
          }
        : DEFAULT_FORM_DATA.currentPackage,
    newFeature: typeof draft.newFeature === 'string' ? draft.newFeature : '',
  };
};

const VendorSignupFlow = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentStep = searchParams.get('step') || '1';
  const initialVendorDraft = {
    ...(location.state?.vendorSignupFlowDraft || {}),
    ...(location.state?.vendorSignupInitialData || {}),
  };

  const [formData, setFormData] = useState(() =>
    normalizeDraft(initialVendorDraft),
  );

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case '1':
        return (
          <VendorSignupStep1
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      case '2':
        return (
          <VendorSignupStep2
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      case '3':
        return (
          <VendorSignupStep3
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      case '4':
        return (
          <VendorSignupStep4
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
      default:
        return (
          <VendorSignupStep1
            formData={formData}
            onFormChange={handleFormChange}
          />
        );
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderStep()}</Suspense>;
};

export default VendorSignupFlow;
