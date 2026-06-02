import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoupleSignup from './CoupleSignup';
import VendorSignup from './VendorSignup';
import { ROUTES } from '../config';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [audience, setAudience] = useState('couple');

  useEffect(() => {
    const urlAudience = new URLSearchParams(location.search).get('audience');
    if (urlAudience === 'vendor') {
      setAudience('vendor');
    } else {
      setAudience('couple');
    }
  }, [location.search]);

  const handleAudienceChange = (newAudience) => {
    setAudience(newAudience);
    navigate(`${ROUTES.SIGNUP}?audience=${newAudience}`, { replace: true });
  };

  const componentProps = {
    audience,
    onAudienceChange: handleAudienceChange,
  };

  return (
    <div className='min-h-dvh overflow-hidden bg-[#f4f0ea] lg:flex'>
      <section className='relative flex min-h-80 md:min-h-screen items-center justify-center overflow-hidden lg:min-h-dvh lg:flex-[0_0_52%]'>
        <img
          src='/Elegant_Photography2.jpg'
          alt='Wedding couple holding hands'
          className='absolute inset-0 h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-[rgba(0,0,0,0.4)]' />

        <div className='relative z-10 flex w-full  flex-col items-center gap-10 px-6 py-12 text-center text-white sm:px-8'>
          <div className='space-y-4'>
            <h2 className='font-playfair text-3xl md:text-4xl lg:text-5xl font-semibold leading-none '>
              Begin Your Journey
            </h2>
            <p className='max-w-116.25 font-raleway text-base md:text-xl leading-6 text-white/95'>
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
              <p className='font-raleway text-base md:text-xl font-medium leading-none'>Joined by 10,000+</p>
              <p className='font-raleway text-base md:text-lg leading-6 text-white/90'>Brides & Vendors</p>
            </div>
          </div>
        </div>
      </section>

      <section className='flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-10'>
        {audience === 'vendor' ? (
          <VendorSignup {...componentProps} shellMode />
        ) : (
          <CoupleSignup {...componentProps} shellMode />
        )}
      </section>
    </div>
  );
};

export default Signup;