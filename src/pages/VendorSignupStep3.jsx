import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { ROUTES } from '../config';
import { useCreateVendorProfileMutation } from '../store/features/vendor/vendorSignupApi';

const VendorSignupStep3 = ({ formData, onFormChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // vendorSignupInitialData contains: name, email, location, state, city, serviceCategory
  // passed via router state from VendorSignup → Step1 → Step2 → Step3
  const vendorSignupInitialData = location.state?.vendorSignupInitialData || {};

  const [createVendorProfile, { isLoading }] = useCreateVendorProfileMutation();

  const [packages, setPackages] = useState(
    Array.isArray(formData.packages) ? formData.packages : [],
  );
  const [currentPackage, setCurrentPackage] = useState({
    packageName: '', // ✅ was: name
    badge: '', // ✅ new field
    features: [],
    price: '',
  });

  const featuresRef = useRef([]);
  const [newFeature, setNewFeature] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState(formData.password || '');
  const [confirmPassword, setConfirmPassword] = useState(
    formData.confirmPassword || '',
  );
  const [error, setError] = useState('');

  const handleAddPackage = () => {
    if (currentPackage.packageName && currentPackage.price) {
      setPackages([...packages, currentPackage]);
      setCurrentPackage({
        packageName: '',
        badge: '',
        features: [],
        price: '',
      });
      setNewFeature('');
    }
  };

  const handleAddFeature = () => {
    const val = newFeature.trim();
    if (!val) return;
    setCurrentPackage((prev) => ({
      ...prev,
      features: [...prev.features, val],
    }));
    setNewFeature('');
    setTimeout(() => {
      const idx = featuresRef.current.length - 1;
      if (featuresRef.current[idx]) featuresRef.current[idx].focus();
    }, 0);
  };

  const handleRemoveFeature = (index) => {
    setCurrentPackage((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
    featuresRef.current = featuresRef.current.filter((_, i) => i !== index);
  };

  const handleRemovePackage = (index) => {
    setPackages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    setError('');

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const stagedPackages = Array.isArray(packages) ? [...packages] : [];
    if (currentPackage.packageName?.trim() && currentPackage.price !== '') {
      stagedPackages.push({
        ...currentPackage,
        packageName: currentPackage.packageName.trim(),
      });
    }
    if (!stagedPackages.length) {
      setError('Please add at least one package before continuing.');
      return;
    }

    const updatedFormData = {
      ...formData,
      packages: stagedPackages,
      password,
      confirmPassword,
    };
    onFormChange(updatedFormData);

    const cleanPackages = stagedPackages.map((pkg) => ({
      packageName: String(pkg.packageName || '').trim(),
      price: Number.isFinite(Number(pkg.price)) ? Number(pkg.price) : 0,
      badge: String(pkg.badge || '').trim(),
      isActive: true,
      features: Array.isArray(pkg.features)
        ? pkg.features
            .map((feature) => String(feature || '').trim())
            .filter(Boolean)
        : [],
    }));

    if (
      cleanPackages.some(
        (pkg) => !pkg.packageName || !pkg.badge || !Number.isFinite(pkg.price),
      )
    ) {
      setError(
        'Each package must include package name, badge, and a valid price.',
      );
      return;
    }

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

    const highlightedServices = normalizeHighlightedServices(
      updatedFormData.highlightedServices,
    );

    const buildVendorFormData = () => {
      const fd = new FormData();

      // Fields from VendorSignup (step 0) — passed via router state
      fd.append('name', vendorSignupInitialData.name || '');
      fd.append('phone', vendorSignupInitialData.phone || '');
      fd.append('email', vendorSignupInitialData.email || '');
      fd.append('location', vendorSignupInitialData.location || '');
      fd.append('stateId', vendorSignupInitialData.state || '');
      fd.append('cityId', vendorSignupInitialData.city || '');
      fd.append('categoryId', vendorSignupInitialData.serviceCategory || '');

      // Fields from Step 1
      fd.append('businessName', updatedFormData.businessName || '');
      fd.append('highlightedServices', JSON.stringify(highlightedServices));
      fd.append('experienceYears', updatedFormData.experience || '');
      fd.append('speciality', updatedFormData.speciality || '');
      fd.append('aboutMe', updatedFormData.aboutMe || '');

      (updatedFormData.portfolioImages || []).forEach((img) => {
        if (img instanceof File) {
          fd.append('images', img);
        }
      });
      fd.append('package', JSON.stringify(cleanPackages));
      fd.append('password', password);
      return fd;
    };

    try {
      const body = buildVendorFormData();
      await createVendorProfile(body).unwrap();
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (lastError) {
      console.error('Vendor profile creation failed:', lastError);
      setError(
        lastError?.data?.message ||
          lastError?.data?.error ||
          'Something went wrong. Please try again.',
      );
    }
  };

  const handlePrevious = () => {
    onFormChange({
      ...formData,
      packages,
      password,
      confirmPassword,
    });
    navigate('/vendor-signup-flow?step=2', {
      state: location.state,
    });
  };

  return (
    <div className='min-h-dvh overflow-hidden bg-[#f4f0ea] lg:flex'>
      {/* Left Section - Image */}
      <section className='relative flex min-h-130 items-center justify-center overflow-hidden lg:min-h-dvh lg:flex-[0_0_52%]'>
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
                    backgroundColor: [
                      '#b7c3b3',
                      '#d8c3b4',
                      '#cbb7a1',
                      '#9f8b79',
                    ][index],
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
      </section>

      {/* Right Section - Form */}
      <section className='flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-10'>
        <div className='w-full max-w-162.5 space-y-8'>
          <header className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h1 className='font-playfair text-2xl leading-none text-[#070707] sm:text-3xl'>
                {/* Complete your Profile */}
              </h1>
              <p className='font-raleway text-[14px] text-[#2d3036]'>
                Step 3 of 3
              </p>
            </div>
            <p className='font-raleway text-[20px] leading-6 text-[#615d58]'>
              Please enter your details to continue.
            </p>
          </header>

          <div className='border-b border-black/10 pb-3'>
            <p className='font-raleway text-[16px] font-medium text-[#090909]'>
              Profile Completion
            </p>
          </div>

          <form className='space-y-2'>
            {/* Add Detailed Pricing */}
            <div className='space-y-2'>
              <h3 className='font-playfair text-[24px] font-medium text-[#1c1c1c]'>
                Add Detailed Pricing
              </h3>

              {/* Package Name */}
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>
                  Package Name
                </label>
                <input
                  type='text'
                  value={currentPackage.packageName} // ✅ was: currentPackage.name
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
                      packageName: e.target.value,
                    })
                  }
                  placeholder='Enter Package Name'
                  className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                />
              </div>

              {/* ✅ Package Badge — new field */}
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>
                  Package Badge
                </label>
                <input
                  type='text'
                  value={currentPackage.badge}
                  onChange={(e) =>
                    setCurrentPackage({
                      ...currentPackage,
                      badge: e.target.value,
                    })
                  }
                  placeholder='e.g. Best Seller, Popular, Premium'
                  className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                />
              </div>

              {/* Package Features */}
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>
                  Package Features
                </label>
                <div className='space-y-2'>
                  {currentPackage.features.map((f, i) => (
                    <div key={i} className='flex gap-2'>
                      <input
                        ref={(el) => (featuresRef.current[i] = el)}
                        type='text'
                        value={f}
                        onChange={(e) =>
                          setCurrentPackage((prev) => ({
                            ...prev,
                            features: prev.features.map((fv, idx) =>
                              idx === i ? e.target.value : fv,
                            ),
                          }))
                        }
                        placeholder={`Feature ${i + 1}`}
                        className='flex-1 rounded-lg border border-[#2d3036] bg-white px-4 py-2 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                      />
                      <button
                        type='button'
                        onClick={() => handleRemoveFeature(i)}
                        className='flex h-12 items-center justify-center rounded-lg bg-[#f0e9e1] p-2'
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  <div className='flex gap-2'>
                    <input
                      type='text'
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder='Type a feature then click +'
                      className='flex-1 rounded-lg border border-[#2d3036] bg-white px-4 py-2 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                    />
                    <button
                      type='button'
                      onClick={handleAddFeature}
                      className='flex h-12 items-center justify-center rounded-lg bg-[#f0e9e1] p-2'
                      aria-label='Add new feature'
                    >
                      <Plus size={24} className='text-[#2d3036]' />
                    </button>
                  </div>
                </div>
              </div>

              {/* Package Price */}
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>
                  Package Price
                </label>
                <div className='flex items-center'>
                  <input
                    type='number'
                    value={currentPackage.price}
                    onChange={(e) =>
                      setCurrentPackage({
                        ...currentPackage,
                        price: e.target.value,
                      })
                    }
                    placeholder='$0.00'
                    className='h-12 flex-1 rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                  />
                </div>
              </div>

              {/* Add New Package Button */}
              <button
                type='button'
                onClick={handleAddPackage}
                className='flex items-center justify-center gap-2 rounded-lg bg-[#a7b9a6] px-6 py-3 font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5'
              >
                Add New Package
              </button>

              {/* Packages List */}
              {packages.length > 0 && (
                <div className='space-y-2 rounded-lg bg-[#f4f0ea] p-4'>
                  {packages.map((pkg, idx) => (
                    <div key={idx} className='rounded bg-white p-3'>
                      <div className='flex items-start justify-between'>
                        <div>
                          <p className='font-raleway font-medium text-[#2d3036]'>
                            {pkg.packageName}
                          </p>
                          {pkg.badge && (
                            <span className='inline-block rounded-full bg-[#a7b9a6] px-2 py-0.5 font-raleway text-[12px] text-[#464e46]'>
                              {pkg.badge}
                            </span>
                          )}
                          <p className='font-raleway text-[14px] text-[#615d58]'>
                            ${pkg.price}
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <button
                            type='button'
                            onClick={() => handleRemovePackage(idx)}
                            className='text-sm text-[#9ca1aa]'
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      {pkg.features && pkg.features.length > 0 && (
                        <ul className='mt-3 space-y-1'>
                          {pkg.features.map((f, i) => (
                            <li key={i} className='text-[14px] text-[#615d58]'>
                              • {f}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Password Fields */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='••••••••'
                    className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 pr-12 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((s) => !s)}
                    className='absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#6b6b6b]'
                    aria-label={
                      showPassword ? 'Hide password' : 'Show password'
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='••••••••'
                    className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 pr-12 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    className='absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#6b6b6b]'
                    aria-label={
                      showConfirmPassword
                        ? 'Hide confirm password'
                        : 'Show confirm password'
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className='font-raleway text-[14px] text-red-500'>{error}</p>
            )}
          </form>

          {/* Navigation Buttons */}
          <div className='flex items-center justify-between gap-4 pt-6'>
            <button
              onClick={handlePrevious}
              disabled={isLoading}
              className='flex py-2.5 items-center justify-center rounded-[10px] bg-[#e8ded2] px-6 font-raleway text-[16px] font-medium text-[#615d58] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={isLoading}
              className='flex py-2.5 items-center justify-center rounded-[10px] bg-[#a7b9a6] px-6 font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Submitting...' : 'NEXT'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorSignupStep3;
