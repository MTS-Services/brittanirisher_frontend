import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Suspense } from 'react';

import VendorSignupStep1 from './VendorSignupStep1';
import VendorSignupStep2 from './VendorSignupStep2';
import VendorSignupStep3 from './VendorSignupStep3';
import VendorSignupStep4 from './VendorSignupStep4';

const STORAGE_KEY = 'vendor-signup-flow-draft';

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

const fileToSerializableImage = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        kind: 'file',
        name: file.name,
        type: file.type,
        lastModified: file.lastModified,
        dataUrl: String(reader.result || ''),
      });
    };
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });

const serializePortfolioImages = async (portfolioImages = []) =>
  Promise.all(
    portfolioImages.map(async (item) => {
      if (item instanceof File) {
        return fileToSerializableImage(item);
      }

      return item;
    }),
  );

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
    newFeature:
      typeof draft.newFeature === 'string' ? draft.newFeature : '',
  };
};

const loadDraft = (initialDraft = {}) => {
  if (typeof window === 'undefined') {
    return normalizeDraft(initialDraft);
  }

  try {
    const storedDraft = window.sessionStorage.getItem(STORAGE_KEY);
    const parsedDraft = storedDraft ? JSON.parse(storedDraft) : {};
    return normalizeDraft({ ...parsedDraft, ...initialDraft });
  } catch {
    return normalizeDraft(initialDraft);
  }
};

const VendorSignupFlow = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentStep = searchParams.get('step') || '1';
  const initialVendorDraft = location.state?.vendorSignupInitialData || {};

  const [formData, setFormData] = useState(() =>
    loadDraft(initialVendorDraft),
  );

  useEffect(() => {
    let cancelled = false;

    const persistDraft = async () => {
      try {
        const serializableDraft = {
          ...formData,
          portfolioImages: await serializePortfolioImages(
            formData.portfolioImages,
          ),
        };

        if (!cancelled) {
          window.sessionStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(serializableDraft),
          );
        }
      } catch {
        // Session storage is best-effort only.
      }
    };

    persistDraft();

    return () => {
      cancelled = true;
    };
  }, [formData]);

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
      case '4':
        return <VendorSignupStep4 formData={formData} onFormChange={handleFormChange} />;
      default:
        return <VendorSignupStep1 formData={formData} onFormChange={handleFormChange} />;
    }
  };

  return <Suspense fallback={<div>Loading...</div>}>{renderStep()}</Suspense>;
};

export default VendorSignupFlow;
