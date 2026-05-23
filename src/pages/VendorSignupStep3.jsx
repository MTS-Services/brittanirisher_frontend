import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { ROUTES } from '../config';

const VendorSignupStep3 = ({ formData, onFormChange }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState(formData.packages || []);
  const [currentPackage, setCurrentPackage] = useState({
    name: '',
    features: '',
    price: '',
  });
  const [password, setPassword] = useState(formData.password || '');
  const [confirmPassword, setConfirmPassword] = useState(formData.confirmPassword || '');

  const handleAddPackage = () => {
    if (currentPackage.name && currentPackage.price) {
      setPackages([...packages, currentPackage]);
      setCurrentPackage({ name: '', features: '', price: '' });
    }
  };

  const handleNext = () => {
    if (password === confirmPassword && password.length >= 6) {
      onFormChange({
        ...formData,
        packages,
        password,
        confirmPassword,
      });
      navigate(ROUTES.LOGIN, { replace: true });
    }
  };

  const handlePrevious = () => {
    navigate('/vendor-signup-flow?step=2');
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
            <h2 className='font-playfair text-[48px] font-semibold leading-none sm:text-[56px]'>
              Begin Your Journey
            </h2>
            <p className='font-raleway text-[20px] leading-6 text-white/95'>
              Plan every detail of your dream wedding with our professional tools and curated vendor connections.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <div className='flex items-center'>
              {['AR', 'KW', 'JL', '+'].map((label, index) => (
                <div
                  key={label}
                  className='-ml-3 flex h-10.25 w-10.25 items-center justify-center rounded-full border-2 border-white text-[12px] font-semibold text-white shadow-md first:ml-0'
                  style={{ backgroundColor: ['#b7c3b3', '#d8c3b4', '#cbb7a1', '#9f8b79'][index] }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className='text-left text-white'>
              <p className='font-raleway text-[24px] font-medium leading-none'>Joined by 10,000+</p>
              <p className='font-raleway text-[16px] leading-6 text-white/90'>Brides & Vendors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Right Section - Form */}
      <section className='flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-10'>
        <div className='w-full max-w-162.5 space-y-8'>
          <header className='space-y-4'>
            <div className='flex items-center justify-between'>
              <h1 className='font-playfair text-[40px] font-semibold leading-none text-[#070707] sm:text-[48px]'>
                Complete your Profile
              </h1>
              <p className='font-raleway text-[14px] text-[#2d3036]'>Step 3 of 3</p>
            </div>
            <p className='font-raleway text-[20px] leading-6 text-[#615d58]'>
              Please enter your details to continue.
            </p>
          </header>

          <div className='border-b border-black/10 pb-6'>
            <p className='font-raleway text-[16px] font-medium text-[#090909]'>Profile Completion</p>
          </div>

          <form className='space-y-6'>
            {/* Add Detailed Pricing */}
            <div className='space-y-4'>
              <h3 className='font-playfair text-[24px] font-medium text-[#1c1c1c]'>Add Detailed Pricing</h3>

              {/* Package Name */}
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>Package Name</label>
                <input
                  type='text'
                  value={currentPackage.name}
                  onChange={(e) => setCurrentPackage({ ...currentPackage, name: e.target.value })}
                  placeholder='Enter Package Name'
                  className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                />
              </div>

              {/* Package Features */}
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>Package Features</label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={currentPackage.features}
                    onChange={(e) => setCurrentPackage({ ...currentPackage, features: e.target.value })}
                    placeholder='Enter your company name here'
                    className='flex-1 rounded-lg border border-[#2d3036] bg-white px-4 py-2 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                  />
                  <button
                    type='button'
                    className='flex h-12 items-center justify-center rounded-lg bg-[#f0e9e1] p-2'
                  >
                    <Plus size={24} className='text-[#2d3036]' />
                  </button>
                </div>
              </div>

              {/* Package Price */}
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>Package Price</label>
                <div className='flex items-center'>
                  <span className='font-raleway text-[16px] text-[#9ca1aa]'>$</span>
                  <input
                    type='number'
                    value={currentPackage.price}
                    onChange={(e) => setCurrentPackage({ ...currentPackage, price: e.target.value })}
                    placeholder='0.00'
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
                    <div key={idx} className='flex items-center justify-between rounded bg-white p-3'>
                      <div>
                        <p className='font-raleway font-medium text-[#2d3036]'>{pkg.name}</p>
                        <p className='font-raleway text-[14px] text-[#615d58]'>${pkg.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Password Fields */}
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>Password</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                />
              </div>
              <div className='space-y-2'>
                <label className='block font-raleway text-[16px] text-[#2d3036]'>Confirm Password</label>
                <input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='••••••••'
                  className='h-12 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] placeholder:text-[#9ca1aa] focus:outline-none focus:border-[#9f8b79]'
                />
              </div>
            </div>
          </form>

          {/* Navigation Buttons */}
          <div className='flex items-center justify-between gap-4 pt-6'>
            <button
              onClick={handlePrevious}
              className='flex h-14 items-center justify-center rounded-[10px] bg-[#e8ded2] px-6 font-raleway text-[16px] font-medium text-[#615d58] transition-transform hover:-translate-y-0.5'
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className='flex h-14 items-center justify-center rounded-[10px] bg-[#a7b9a6] px-6 font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5'
            >
              NEXT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorSignupStep3;
