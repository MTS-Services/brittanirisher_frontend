import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, RefreshCw } from 'lucide-react';

const VendorSignupStep2 = ({ formData, onFormChange }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [previews, setPreviews] = useState(() => {
    const imgs = formData.portfolioImages || [];
    return imgs.map((item) => (typeof item === 'string' ? item : URL.createObjectURL(item)));
  });
  const createdURLsRef = useRef([]);
  const replaceFileInputRef = useRef(null);
  const replaceIndexRef = useRef(null);

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const portfolioImages = [...(formData.portfolioImages || []), ...files];
    onFormChange({ ...formData, portfolioImages });
    const newPreviews = files.map((f) => {
      const url = URL.createObjectURL(f);
      createdURLsRef.current.push(url);
      return url;
    });
    setPreviews((p) => [...p, ...newPreviews]);
  };

  const handleReplaceFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const idx = replaceIndexRef.current;
    const portfolioImages = [...(formData.portfolioImages || [])];
    // revoke old preview URL if we created it
    const oldPreview = previews[idx];
    if (createdURLsRef.current.includes(oldPreview)) {
      URL.revokeObjectURL(oldPreview);
      createdURLsRef.current = createdURLsRef.current.filter((u) => u !== oldPreview);
    }
    const newUrl = URL.createObjectURL(file);
    createdURLsRef.current.push(newUrl);
    const newPreviews = [...previews];
    newPreviews[idx] = newUrl;
    setPreviews(newPreviews);
    // update parent data
    portfolioImages[idx] = file;
    onFormChange({ ...formData, portfolioImages });
    // reset input
    e.target.value = '';
    replaceIndexRef.current = null;
  };

  useEffect(() => {
    // If parent provides initial images (strings or Files), ensure previews reflect them
    if (formData.portfolioImages && formData.portfolioImages.length > 0) {
      const imgs = formData.portfolioImages.map((item) => (typeof item === 'string' ? item : URL.createObjectURL(item)));
      // track only those we created in this effect so we can revoke later
      imgs.forEach((url, i) => {
        if (typeof formData.portfolioImages[i] !== 'string') createdURLsRef.current.push(url);
      });
      setPreviews(imgs);
    }
    return () => {
      // revoke created object URLs on unmount
      createdURLsRef.current.forEach((u) => URL.revokeObjectURL(u));
      createdURLsRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <h2 className='font-playfair text-3xl leading-none sm:text-5xl]'>
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
        <div className='w-full max-w-162.5 space-y-4'>
          <header className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h1 className='font-playfair text-2xl leading-none text-[#070707] sm:text-3xl'>
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

          <div className='space-y-3 rounded-2xl border border-[#e9eaeb] bg-white p-4'>
            {/* Add Your Portfolio Images */}
            <div className='space-y-2'>
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
              <input
                ref={replaceFileInputRef}
                type='file'
                accept='image/*'
                onChange={handleReplaceFileChange}
                className='hidden'
              />

              {/* Tip */}
              <p className='font-raleway text-[14px] text-[#6b6b6b]'>
                Tip: Upload your best work! High-quality portfolio photos get 5x more inquiries.
              </p>

              {/* Preview Images */}
              {previews && previews.length > 0 && (
                <div className='grid grid-cols-2 gap-4'>
                  {previews.map((src, idx) => (
                    <div key={idx} className='relative'>
                      <img src={src} alt={`preview-${idx}`} className='h-32 w-full rounded-lg object-cover' />
                      <div className='absolute right-2 top-2 flex gap-2'>
                        <button
                          type='button'
                          onClick={() => {
                            // remove image
                            const portfolioImages = [...(formData.portfolioImages || [])];
                            const removed = previews[idx];
                            if (createdURLsRef.current.includes(removed)) {
                              URL.revokeObjectURL(removed);
                              createdURLsRef.current = createdURLsRef.current.filter((u) => u !== removed);
                            }
                            const newPreviews = previews.filter((_, i) => i !== idx);
                            setPreviews(newPreviews);
                            portfolioImages.splice(idx, 1);
                            onFormChange({ ...formData, portfolioImages });
                          }}
                          className='rounded bg-white/80 p-1'
                          aria-label='Remove image'
                        >
                          <X size={16} />
                        </button>
                        <button
                          type='button'
                          onClick={() => {
                            replaceIndexRef.current = idx;
                            replaceFileInputRef.current?.click();
                          }}
                          className='rounded bg-white/80 p-1'
                          aria-label='Replace image'
                        >
                          <RefreshCw size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Placeholder Images */}
              {(!previews || previews.length === 0) && (
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

export default VendorSignupStep2;
