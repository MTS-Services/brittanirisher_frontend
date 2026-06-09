import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ROUTES } from '../config';
import { useCreateVendorProfileMutation } from '../store/features/vendor/vendorSignupApi';
import VendorPricingPlansSection from './VendorDashboard/dashboard/components/VendorPricingPlansSection';

const STORAGE_KEY = 'vendor-signup-flow-draft';

const imageItemToFile = (item, fallbackName = 'portfolio-image.jpg') => {
  if (item instanceof File) {
    return item;
  }

  if (item && typeof item === 'object' && item.dataUrl) {
    const [header, base64Data = ''] = String(item.dataUrl).split(',');
    const mimeMatch = header.match(/data:(.*?);base64/);
    const mimeType = mimeMatch?.[1] || item.type || 'image/jpeg';
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);

    for (let index = 0; index < binaryString.length; index += 1) {
      bytes[index] = binaryString.charCodeAt(index);
    }

    return new File([bytes], item.name || fallbackName, {
      type: mimeType,
      lastModified: item.lastModified || Date.now(),
    });
  }

  return null;
};

const normalizeHighlightedServices = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || '').trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const resolvePackageIdFromPlan = (plan, fallbackPlanId) => {
  if (!plan || typeof plan !== 'object') {
    return fallbackPlanId || '';
  }

  return (
    plan.packageId ||
    plan.package?.id ||
    plan.package?._id ||
    plan.id ||
    plan._id ||
    fallbackPlanId ||
    ''
  );
};

const VendorSignupStep4 = ({ formData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const audience = location.state?.audience || 'vendor';
  const vendorSignupInitialData = location.state?.vendorSignupInitialData || {};

  const [createVendorProfile, { isLoading }] = useCreateVendorProfileMutation();

  const validateFormData = () => {
    if (!vendorSignupInitialData.name?.trim()) return 'Please complete your name in the first signup page.';
    if (!vendorSignupInitialData.phone?.trim()) return 'Please complete your phone in the first signup page.';
    if (!vendorSignupInitialData.email?.trim()) return 'Please complete your email in the first signup page.';
    if (!vendorSignupInitialData.state) return 'Please select a state in the first signup page.';
    if (!vendorSignupInitialData.city) return 'Please select a city in the first signup page.';
    if (!vendorSignupInitialData.location?.trim()) return 'Please complete your location in the first signup page.';
    if (!vendorSignupInitialData.serviceCategory) return 'Please choose a service category in the first signup page.';

    if (!formData.businessName?.trim()) return 'Please complete step 1 business name.';
    if (!formData.highlightedServices?.trim()) return 'Please complete step 1 highlighted services.';
    if (!formData.experience?.trim()) return 'Please complete step 1 experience.';
    if (!formData.speciality?.trim()) return 'Please complete step 1 speciality.';
    if (!formData.aboutMe?.trim()) return 'Please complete step 1 about me section.';

    if (!Array.isArray(formData.portfolioImages) || formData.portfolioImages.length === 0) {
      return 'Please upload at least one portfolio image in step 2.';
    }

    if (!Array.isArray(formData.packages) || formData.packages.length === 0) {
      return 'Please add at least one package in step 3.';
    }

    if (!formData.password || formData.password.length < 6) {
      return 'Please set a valid password in step 3.';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Password and confirm password do not match.';
    }

    return null;
  };

  const handleChoosePlan = async ({ planId, plan }) => {
    if (!planId) {
      toast.error('Invalid package id. Please choose again.');
      return;
    }

    const packageId = resolvePackageIdFromPlan(plan, planId);
    if (!packageId) {
      toast.error('Package id not found. Please choose a package again.');
      return;
    }

    const validationMessage = validateFormData();
    if (validationMessage) {
      toast.error(validationMessage);
      navigate('/vendor-signup-flow?step=1', {
        replace: true,
        state: {
          ...location.state,
          audience,
        },
      });
      return;
    }

    const cleanPackages = formData.packages.map((pkg) => ({
      packageName: String(pkg.packageName || '').trim(),
      price: Number.isFinite(Number(pkg.price)) ? Number(pkg.price) : 0,
      badge: String(pkg.badge || '').trim(),
      isActive: true,
      features: Array.isArray(pkg.features)
        ? pkg.features.map((feature) => String(feature || '').trim()).filter(Boolean)
        : [],
    }));

    if (
      cleanPackages.some(
        (pkg) => !pkg.packageName || !pkg.badge || !Number.isFinite(pkg.price),
      )
    ) {
      toast.error('Please fix package information in step 3 before continuing.');
      navigate('/vendor-signup-flow?step=3', {
        state: {
          ...location.state,
          audience,
        },
      });
      return;
    }

    const highlightedServices = normalizeHighlightedServices(formData.highlightedServices);

    const body = new FormData();
    body.append('name', vendorSignupInitialData.name || '');
    body.append('phone', vendorSignupInitialData.phone || '');
    body.append('email', vendorSignupInitialData.email || '');
    body.append('location', vendorSignupInitialData.location || '');
    body.append('stateId', vendorSignupInitialData.state || '');
    body.append('cityId', vendorSignupInitialData.city || '');
    body.append('categoryId', vendorSignupInitialData.serviceCategory || '');

    body.append('businessName', formData.businessName || '');
    body.append('highlightedServices', JSON.stringify(highlightedServices));
    body.append('experienceYears', formData.experience || '');
    body.append('speciality', formData.speciality || '');
    body.append('aboutMe', formData.aboutMe || '');

    (formData.portfolioImages || []).forEach((img) => {
      const file = imageItemToFile(img);
      if (file) {
        body.append('images', file);
      }
    });

    body.append('package', JSON.stringify(cleanPackages));
    body.append('password', formData.password || '');
    body.append('packageId', String(packageId));

    try {
      const response = await createVendorProfile(body).unwrap();
      const redirectUrl =
        response?.url ||
        response?.data?.url ||
        response?.paymentUrl ||
        response?.data?.paymentUrl ||
        response?.checkoutUrl ||
        response?.data?.checkoutUrl;

      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage cleanup failures.
      }

      if (redirectUrl) {
        window.location.assign(redirectUrl);
        return;
      }

      toast.success('Profile completed successfully.');
    //   navigate(`${ROUTES.LOGIN}?audience=${audience}`, { replace: true });
    } catch (error) {
      toast.error(
        error?.data?.message || error?.data?.error || 'Failed to complete vendor profile.',
      );
    }
  };

  const handlePrevious = () => {
    navigate('/vendor-signup-flow?step=3', {
      state: {
        ...location.state,
        audience,
      },
    });
  };

  return (
    <div className='min-h-dvh overflow-hidden bg-[#f4f0ea] lg:flex'>
      {/* <section className='relative flex min-h-130 items-center justify-center overflow-hidden lg:min-h-dvh lg:flex-[0_0_52%]'>
        <img
          src='/Elegant_Photography.jpg'
          alt='Wedding couple holding hands'
          className='absolute inset-0 h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-[rgba(0,0,0,0.4)]' />

        <div className='relative z-10 flex w-full max-w-116.25 flex-col items-center gap-10 px-6 py-12 text-center text-white sm:px-8'>
          <div className='max-w-116.25 space-y-4'>
            <h2 className='font-playfair text-3xl leading-none sm:text-5xl'>
              Begin Your Journey
            </h2>
            <p className='font-raleway text-base md:text-xl leading-6 text-white/95'>
              Plan every detail of your dream wedding with our professional
              tools and curated vendor connections.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='flex items-center'>
              {['AR', 'KW', 'JL', '+'].map((label, index) => (
                <div
                  key={label}
                  className='-ml-3 flex h-10.25 w-10.25 items-center justify-center rounded-full border-2 border-white text-[12px] font-semibold text-white shadow-md first:ml-0'
                  style={{
                    backgroundColor: ['#b7c3b3', '#d8c3b4', '#cbb7a1', '#9f8b79'][index],
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className='text-left text-white'>
              <p className='font-raleway text-[24px] font-medium leading-none'>
                Joined by 10,000+
              </p>
              <p className='font-raleway text-[16px] leading-6 text-white/90'>
                Brides & Vendors
              </p>
            </div>
          </div>
        </div>
      </section> */}

      <section className='flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-10'>
        <div className='w-full max-w-6xl'>
          <div className='flex items-center justify-between'>
            <button
              type='button'
              onClick={handlePrevious}
              className='rounded-[10px] bg-[#e8ded2] px-4 py-2 font-raleway text-[14px] font-medium text-[#615d58] transition-transform hover:-translate-y-0.5'
            >
              Previous
            </button>
            <p className='font-raleway text-[14px] text-[#2d3036]'>Step 4 of 4</p>
          </div>

          <VendorPricingPlansSection
            title='Select Package to Continue'
            subtitle=''
            actionLabel='Select Plan '
            submittingLabel={isLoading ? 'Submitting...' : 'Select Plan'}
            onChoosePlan={handleChoosePlan}
          />
        </div>
      </section>
    </div>
  );
};

export default VendorSignupStep4;
