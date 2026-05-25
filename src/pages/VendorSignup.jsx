import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ROUTES } from '../config';

const SERVICE_OPTIONS = [
  'Photography',
  'Videography',
  'Floral Design',
  'Catering',
  'Bartending Specialist',
  'Bakery',
  'Venue',
  'DJ & Music',
  'Planning',
  'Hair & Makeup',
];
const SPECIALTY_OPTIONS = ['None', 'Bar Service', 'Mixology', 'Signature Cocktails'];

const VendorSignup = ({ audience = 'vendor', onAudienceChange, shellMode = false }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    serviceCategory: SERVICE_OPTIONS[0],
    bartendingSpecialties: SPECIALTY_OPTIONS[0],
  });

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/vendor-signup-flow?step=1', { replace: true });
  };

  const RightContent = (
    <div className='w-full max-w-162.5'>
      <header className='space-y-4'>
        <h1 className='font-playfair text-[40px] leading-none text-[#070707] sm:text-[48px]'>
          Create an Account
        </h1>
        <p className='font-raleway text-[20px] leading-6 text-[#615d58]'>
          Please enter your details to continue.
        </p>
      </header>

      <div className='mt-10 rounded-3xl border border-[#e9eaeb] bg-[#f4f0ea] p-2'>
        <div className='grid grid-cols-2 gap-2'>
          <button
            type='button'
            onClick={() => onAudienceChange('couple')}
            className={`rounded-[47px] px-4 py-2.5 text-center font-raleway text-[16px] font-medium transition-colors ${
              audience === 'couple' ? 'bg-[#e8ded2] text-[#2d3036]' : 'bg-transparent text-[#090909]'
            }`}
          >
            Couple
          </button>
          <button
            type='button'
            onClick={() => onAudienceChange('vendor')}
            className={`rounded-[47px] px-4 py-2.5 text-center font-raleway text-[16px] font-medium transition-colors ${
              audience === 'vendor' ? 'bg-[#e8ded2] text-[#2d3036]' : 'bg-transparent text-[#090909]'
            }`}
          >
            Vendor
          </button>
        </div>
      </div>

      <div className='mt-10'>
        <div className='flex items-center gap-8 border-b border-black/20 text-[16px] font-medium text-[#6b6b6b]'>
          <button
            type='button'
            onClick={() => navigate(ROUTES.LOGIN)}
            className='pb-4 font-raleway transition-colors hover:text-[#090909]'
          >
            Login
          </button>
          <button type='button' className='border-b-2 border-[#090909] pb-4 font-raleway text-[#090909]'>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className='mt-6 space-y-10'>
          <div className='space-y-5'>
            <div className='grid gap-3 sm:grid-cols-2'>
              <FormField
                label='Name'
                placeholder='Enter your Full Name here'
                value={form.name}
                onChange={updateField('name')}
              />
              <FormField
                label='Phone'
                placeholder='Enter your phone number'
                value={form.phone}
                onChange={updateField('phone')}
              />
            </div>

            <div className='grid gap-3 sm:grid-cols-2'>
              <FormField
                label='Email'
                placeholder='Enter your E-mail here'
                value={form.email}
                onChange={updateField('email')}
              />
              <FormField
                label='Location'
                placeholder='Enter your Location here'
                value={form.location}
                onChange={updateField('location')}
              />
            </div>

            <DropdownField
              label='Service Category'
              value={form.serviceCategory}
              onChange={updateField('serviceCategory')}
              options={SERVICE_OPTIONS}
            />

            <DropdownField
              label='BARTENDING SPECIALTIES'
              value={form.bartendingSpecialties}
              onChange={updateField('bartendingSpecialties')}
              options={SPECIALTY_OPTIONS}
            />
          </div>

          <button
            type='submit'
            className='flex h-14.75 w-full items-center justify-center rounded-[10px] bg-[#a7b9a6] font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5'
          >
            Create Account
          </button>

          <p className='flex items-end justify-center gap-2 text-right font-raleway text-[16px] font-medium text-[#464e46]'>
            <span>Already have an account?</span>
            <button
              type='button'
              onClick={() => navigate(ROUTES.LOGIN)}
              className='text-[20px] text-[#090909] underline decoration-[#090909] underline-offset-4'
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );

  if (shellMode) return RightContent;

  return (
    <div className='min-h-dvh overflow-hidden bg-[#f4f0ea] lg:flex'>
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

      <section className='flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-10'>
        <div className='w-full max-w-162.5'>
          <header className='space-y-4'>
            <h1 className='font-playfair text-2xl leading-none text-[#070707] sm:text-3xl'>
              Create an Account
            </h1>
            <p className='font-raleway text-base md:text-xl leading-6 text-[#615d58]'>
              Please enter your details to continue.
            </p>
          </header>

          <div className='mt-8 rounded-full bg-[#efe6db]'>
            <div className='grid grid-cols-2 gap-2'>
              <button
                type='button'
                onClick={() => onAudienceChange('couple')}
                className={`rounded-full px-5 py-2.5 text-center font-raleway text-[16px] font-medium transition-colors ${
                  audience === 'couple' ? 'bg-[#e7dccb] text-[#2d2d2d]' : 'bg-transparent text-[#857f7a]'
                }`}
              >
                Couple
              </button>
              <button
                type='button'
                onClick={() => onAudienceChange('vendor')}
                className={`rounded-full px-5 py-2.5 text-center font-raleway text-[16px] font-medium transition-colors ${
                  audience === 'vendor' ? 'bg-[#e7dccb] text-[#2d2d2d]' : 'bg-transparent text-[#857f7a]'
                }`}
              >
                Vendor
              </button>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex items-center gap-8 border-b border-black/20 text-[16px] font-medium text-[#6b6b6b]'>
              <button
                type='button'
                onClick={() => navigate(ROUTES.LOGIN)}
                className='pb-4 font-raleway transition-colors hover:text-[#090909]'
              >
                Login
              </button>
              <button type='button' className='border-b-2 border-[#090909] pb-4 font-raleway text-[#090909]'>
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className='mt-6 space-y-10'>
              <div className='space-y-5'>
                <div className='grid gap-3 sm:grid-cols-2'>
                  <FormField
                    label='Name'
                    placeholder='Enter your Full Name here'
                    value={form.name}
                    onChange={updateField('name')}
                  />
                  <FormField
                    label='Phone'
                    placeholder='Enter your phone number'
                    value={form.phone}
                    onChange={updateField('phone')}
                  />
                </div>

                <div className='grid gap-3 sm:grid-cols-2'>
                  <FormField
                    label='Email'
                    placeholder='Enter your E-mail here'
                    value={form.email}
                    onChange={updateField('email')}
                  />
                  <FormField
                    label='Location'
                    placeholder='Enter your Location here'
                    value={form.location}
                    onChange={updateField('location')}
                  />
                </div>

                <DropdownField
                  label='Service Category'
                  value={form.serviceCategory}
                  onChange={updateField('serviceCategory')}
                  options={SERVICE_OPTIONS}
                />

           
              </div>

              <button
                type='submit'
                className='flex h-14.75 w-full items-center justify-center rounded-[10px] bg-[#a7b9a6] font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5'
              >
                Create Account
              </button>

            <p className='pt-2 text-center font-raleway text-[14px] text-[#857f7a]'>
                        Already have an account?{' '}
                        <button
                          type='button'
                          onClick={() => navigate(ROUTES.LOGIN)}
                          className='font-medium text-[#2d2d2d] underline decoration-[#2d2d2d] underline-offset-4'
                        >
                          Log In
                        </button>
                      </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

const FormField = ({ label, placeholder, value, onChange }) => (
  <label className='block'>
    <span className='mb-2 block font-raleway text-[16px] font-normal text-[#2d3036]'>{label}</span>
    <input
      type='text'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className='h-13.5 w-full rounded-lg border border-[#2d3036] bg-white px-4 font-raleway text-[16px] text-[#2d3036] outline-none placeholder:text-[#9ca1aa] focus:border-[#9ca1aa]'
    />
  </label>
);

const DropdownField = ({ label, value, onChange, options }) => (
  <label className='block'>
    <span className='mb-2 block font-raleway text-[16px] font-normal uppercase text-[#2d3036]'>{label}</span>
    <div className='relative'>
      <select
        value={value}
        onChange={onChange}
        className='h-13.5 w-full appearance-none rounded-lg border border-[#2d3036] bg-white px-4 pr-11 font-raleway text-[16px] text-[#2d3036] outline-none focus:border-[#9ca1aa]'
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        size={18}
        className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#2d3036]'
      />
    </div>
  </label>
);

export default VendorSignup;