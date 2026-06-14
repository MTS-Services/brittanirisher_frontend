import React from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VendorSignupStep1 = ({ formData, onFormChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const audience = location.state?.audience || 'vendor';
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    onFormChange({ ...formData, [field]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.businessName?.trim()) {
      setError('Business name is required.');
      return;
    }

    if (!formData.highlightedServices?.trim()) {
      setError('Highlighted services are required.');
      return;
    }

    if (!formData.experience?.trim()) {
      setError('Experience is required.');
      return;
    }

    if (!formData.speciality?.trim()) {
      setError('Speciality is required.');
      return;
    }

    if (!formData.aboutMe?.trim()) {
      setError('About me is required.');
      return;
    }

    setError('');
    // Forward the vendorSignupInitialData through navigation state
    navigate('/vendor-signup-flow?step=2', {
      state: {
        ...location.state,
        audience,
      },
    });
  };

  const handlePrevious = () => {
    navigate(`/signup?audience=${audience}`, {
      state: {
        audience,
        vendorSignupFlowDraft: formData,
        vendorSignupInitialData: {
          name: formData.name || '',
          phone: formData.phone || '',
          email: formData.email || '',
          state: formData.state || '',
          city: formData.city || '',
          location: formData.location || '',
          serviceCategory: formData.serviceCategory || '',
          bartendingSpecialties: formData.bartendingSpecialties || '',
        },
      },
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
            <p className='font-raleway text-[20px] leading-6 text-white/95'>
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
        <div className='w-full max-w-162.5 space-y-4'>
          <header className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h1 className='font-playfair text-2xl leading-none text-[#070707] sm:text-3xl'>
                Complete your Profile
              </h1>
              <p className='font-raleway text-[14px] text-[#2d3036]'>
                Step 1 of 3
              </p>
            </div>
            <p className='font-raleway text-base md:text-xl leading-6 text-[#615d58]'>
              Please enter your details to continue.
            </p>
          </header>

          <div className='border-b border-black/10 pb-2'>
            <p className='font-raleway text-[16px] font-medium text-[#090909]'>
              Profile Completion
            </p>
          </div>

          {error && (
            <p className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-raleway text-[14px] text-red-600'>
              {error}
            </p>
          )}

          <form className='space-y-6'>
            {/* Business Name */}
            <div className='space-y-1'>
              <label className='block font-raleway text-[16px] text-[#2d3036]'>
                Business Name
              </label>
              <input
                type='text'
                value={formData.businessName || ''}
                onChange={handleChange('businessName')}
                placeholder='Enter your business name'
                className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#686765] focus:outline-none focus:border-[#9f8b79]'
              />
            </div>

            {/* Highlighted Services */}
            <div className='space-y-1'>
              <label className='block font-raleway text-[16px] text-[#2d3036]'>
                Highlighted Services
              </label>
              <textarea
                value={formData.highlightedServices || ''}
                onChange={handleChange('highlightedServices')}
                placeholder='Enter highlighted service names'
                rows='4'
                className='w-full rounded-lg border border-[#2d3036] bg-white px-4 py-3 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#686765] focus:outline-none focus:border-[#9f8b79]'
              />
            </div>

            {/* Experience */}
            <div className='space-y-1'>
              <label className='block font-raleway text-[16px] text-[#2d3036]'>
                Experience
              </label>
              <input
                type='text'
                value={formData.experience || ''}
                onChange={handleChange('experience')}
                placeholder='Enter your experience'
                className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#686765] focus:outline-none focus:border-[#9f8b79]'
              />
            </div>

            {/* Speciality */}
            <div className='space-y-1'>
              <label className='block font-raleway text-[16px] text-[#2d3036]'>
                Speciality
              </label>
              <input
                type='text'
                value={formData.speciality || ''}
                onChange={handleChange('speciality')}
                placeholder='Enter your speciality'
                className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#686765] focus:outline-none focus:border-[#9f8b79]'
              />
            </div>

            {/* About Me */}
            <div className='space-y-1'>
              <label className='block font-raleway text-[16px] text-[#2d3036]'>
                About Me
              </label>
              <textarea
                value={formData.aboutMe || ''}
                onChange={handleChange('aboutMe')}
                placeholder='Write about you...'
                rows='5'
                className='w-full rounded-lg border border-[#2d3036] bg-white px-4 py-3 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#686765] focus:outline-none focus:border-[#9f8b79]'
              />
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className='flex items-center justify-between gap-4 pt-4'>
            <button
              onClick={handlePrevious}
              className='flex py-2.5 items-center justify-center rounded-[10px] bg-[#e8ded2] px-4 font-raleway text-[16px] font-medium text-[#615d58] transition-transform hover:-translate-y-0.5'
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className='flex py-2.5 items-center justify-center rounded-[10px] bg-[#a7b9a6] px-4 font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5'
            >
              NEXT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorSignupStep1;
