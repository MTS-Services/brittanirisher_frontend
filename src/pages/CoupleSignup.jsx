import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, Phone, MapPin, CalendarDays, Wallet, ChevronDown } from 'lucide-react';
import { ROUTES } from '../config';

const STYLE_OPTIONS = ['Minimalist Modern', 'Romantic Classic', 'Garden Luxe', 'Editorial Chic'];

const CoupleSignup = ({ audience = 'couple', onAudienceChange }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    style: STYLE_OPTIONS[0],
    weddingDate: '2026-12-24',
    budget: '$10,000',
    password: '',
    confirmPassword: '',
  });

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <div className='min-h-dvh overflow-hidden bg-[#f4f0ea] lg:flex'>
      <section className='relative flex min-h-112 items-center justify-center overflow-hidden lg:min-h-dvh lg:flex-[0_0_52%]'>
        <img
          src='/Elegant_Photography.jpg'
          alt='Wedding couple holding hands'
          className='absolute inset-0 h-full w-full object-cover object-center'
        />
        <div className='absolute inset-0 bg-[rgba(30,24,18,0.36)]' />

        <div className='relative z-10 mx-auto flex w-full max-w-130 flex-col items-center px-6 py-12 text-center text-white lg:px-10'>
          <div className='mb-8 flex items-center justify-center'>
            <div className='rounded-full bg-white/15 px-4 py-2 text-[12px] uppercase tracking-[0.32em] text-white/85'>
              Vow &amp; Vendor
            </div>
          </div>

          <div style={{ maxWidth: 420 }}>
            <h2 className='font-playfair text-[48px] leading-none sm:text-[56px]'>
              Begin Your Journey
            </h2>
            <p className='mx-auto mt-5 font-raleway text-[20px] leading-8 text-white/90'>
              Sign up to plan every detail of your dream wedding with curated vendor connections.
            </p>
          </div>

          <div className='mt-14 flex flex-col items-center gap-4'>
            <div className='flex items-center justify-center -space-x-3'>
              {['AR', 'KW', 'JL', '+'].map((label, index) => (
                <div
                  key={label}
                  className='flex h-11 w-11 items-center justify-center rounded-full border-2 border-white text-[12px] font-semibold text-white shadow-md'
                  style={{ backgroundColor: ['#b7c3b3', '#d8c3b4', '#cbb7a1', '#9f8b79'][index] }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div>
              <p className='font-raleway text-[18px] leading-6'>Joined by 10,000+</p>
              <p className='font-raleway text-[14px] leading-6 text-white/75'>Brides &amp; Vendors</p>
            </div>
          </div>
        </div>
      </section>

      <section className='flex flex-1 items-center justify-center bg-white px-5 py-10 sm:px-8 lg:px-10'>
        <div style={{ maxWidth: 560 }} className='w-full'>
          <div className='mb-5 flex items-center justify-between gap-3'>
            <h1 className='font-playfair text-[40px] leading-none text-[#070707] sm:text-[48px]'>
              Create an Account
            </h1>
          </div>
          <p className='font-raleway text-[20px] leading-8 text-[#615d58]'>
            Please enter your details to continue.
          </p>

          <div className='mt-8 rounded-full bg-[#efe6db] p-1'>
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

          <div className='mt-6 flex items-center gap-8 border-b border-[#cfc7bc]'>
            <button
              type='button'
              onClick={() => navigate(ROUTES.LOGIN)}
              className='pb-3 font-raleway text-[16px] font-medium text-[#857f7a] transition-colors'
            >
              Login
            </button>
            <button type='button' className='border-b-2 border-[#2d2d2d] pb-3 font-raleway text-[16px] font-medium text-[#2d2d2d]'>
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className='mt-7 space-y-5'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <Field label='Name' icon={Mail} value={form.name} onChange={updateField('name')} placeholder='Enter your name' />
              <Field label='Phone' icon={Phone} value={form.phone} onChange={updateField('phone')} placeholder='Write your phone number' />
              <Field label='Email' icon={Mail} value={form.email} onChange={updateField('email')} placeholder='Write your email' />
              <Field label='Location' icon={MapPin} value={form.location} onChange={updateField('location')} placeholder='Enter Location' />

              <div>
                <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>Wedding Style</label>
                <div className='relative'>
                  <select
                    value={form.style}
                    onChange={updateField('style')}
                    className='h-12 w-full appearance-none rounded-xl border border-[#b5b5b5] bg-white px-4 pr-10 font-raleway text-[16px] text-[#2d2d2d] outline-none focus:border-[#9f8b79]'
                  >
                    {STYLE_OPTIONS.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]' />
                </div>
              </div>

              <Field label='Wedding Date' icon={CalendarDays} value={form.weddingDate} onChange={updateField('weddingDate')} placeholder='24 December, 2026' type='date' />

              <div className='sm:col-span-2'>
                <Field label='Budget' icon={Wallet} value={form.budget} onChange={updateField('budget')} placeholder='$10,000' />
              </div>

              <Field label='Password' icon={ShieldCheck} value={form.password} onChange={updateField('password')} placeholder='••••••••' type='password' />
              <Field label='Confirm Password' icon={ShieldCheck} value={form.confirmPassword} onChange={updateField('confirmPassword')} placeholder='••••••••' type='password' />
            </div>

            <button
              type='submit'
              className='inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#a7b9a6] font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5'
            >
              <ArrowRight size={18} />
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
      </section>
    </div>
  );
};

const Field = ({ label, icon: Icon, type = 'text', value, onChange, placeholder }) => (
  <div>
    <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>{label}</label>
    <div className='relative'>
      <Icon size={18} className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]' />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='h-12 w-full rounded-xl border border-[#b5b5b5] bg-white px-4 pl-11 font-raleway text-[16px] text-[#2d2d2d] outline-none transition-colors placeholder:text-[#b5b5b5] focus:border-[#9f8b79]'
      />
    </div>
  </div>
);

export default CoupleSignup;