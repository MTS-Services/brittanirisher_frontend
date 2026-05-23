import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

const VendorSignupStep2 = ({ formData, onFormChange }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const portfolioImages = [...(formData.portfolioImages || []), ...files];
    onFormChange({ ...formData, portfolioImages });
  };

  const handleNext = () => {
    navigate('/vendor-signup-flow?step=3');
  };

  const handlePrevious = () => {
    navigate('/vendor-signup-flow?step=1');
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
              <p className='font-raleway text-[14px] text-[#2d3036]'>Step 2 of 3</p>
            </div>
            <p className='font-raleway text-[20px] leading-6 text-[#615d58]'>
              Please enter your details to continue.
            </p>
          </header>

          <div className='border-b border-black/10 pb-6'>
            <p className='font-raleway text-[16px] font-medium text-[#090909]'>Profile Completion</p>
          </div>

          <div className='space-y-6 rounded-2xl border border-[#e9eaeb] bg-white p-8'>
            {/* Add Your Portfolio Images */}
            <div className='space-y-4'>
              <h3 className='font-playfair text-[24px] font-medium text-[#1c1c1c]'>Add Your Portfolio Images</h3>

              {/* Upload Area */}
              <button
                onClick={handleAddPhoto}
                className='flex h-48 w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#5c665b]'
              >
                <div className='flex flex-col items-center gap-2'>
                  <Plus size={40} className='text-[#5c665b]' />
                  <p className='font-raleway text-[16px] text-[#5c665b]'>Add Photo</p>
                </div>
              </button>

              <input
                ref={fileInputRef}
                type='file'
                multiple
                accept='image/*'
                onChange={handleFileChange}
                className='hidden'
              />

              {/* Tip */}
              <p className='font-raleway text-[14px] text-[#6b6b6b]'>
                💡 Tip: Upload your best work! High-quality portfolio photos get 5x more inquiries.
              </p>

              {/* Preview Images */}
              {formData.portfolioImages && formData.portfolioImages.length > 0 && (
                <div className='grid grid-cols-2 gap-4'>
                  {formData.portfolioImages.map((image, idx) => (
                    <div key={idx} className='h-32 rounded-lg bg-[#c4d0c3]' />
                  ))}
                </div>
              )}

              {/* Placeholder Images */}
              {(!formData.portfolioImages || formData.portfolioImages.length === 0) && (
                <div className='grid grid-cols-2 gap-4'>
                  <div className='h-32 rounded-lg bg-[#c4d0c3]' />
                  <div className='h-32 rounded-lg bg-[#c4d0c3]' />
                </div>
              )}
            </div>
          </div>

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

export default VendorSignupStep2;
