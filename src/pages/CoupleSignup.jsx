import React, { useState } from 'react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, Phone, MapPin, CalendarDays, Wallet, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  useCreateCoupleProfileMutation,
  useGetWeddingStylesQuery,
} from '../store/features/auth/authApi';

import { useGetStatesQuery } from '../store/features/couple/coupleDashboard';
import { ROUTES } from '../config';
import { loginSuccess } from '../store/slices/authSlice';

const CoupleSignup = ({ audience = 'couple', onAudienceChange, shellMode = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createCoupleProfile, { isLoading }] = useCreateCoupleProfileMutation();
  
  const { data: weddingStylesResponse, isLoading: isWeddingStylesLoading } =
    useGetWeddingStylesQuery(undefined, { skip: audience !== 'couple' });
  
  const { data: statesResponse, isLoading: isStatesLoading } = 
    useGetStatesQuery(undefined, { skip: audience !== 'couple' });

  const styleOptions = useMemo(
    () => weddingStylesResponse?.data || [],
    [weddingStylesResponse],
  );

  const stateOptions = useMemo(
    () => statesResponse?.data || statesResponse || [],
    [statesResponse],
  );

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    stateName: '',
    cityName: '',
    address: '',
    style: '',
    weddingDate: '',
    budget: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const selectedState = useMemo(() => {
    if (!form.state) {
      return null;
    }

    return (
      stateOptions.find((state) => {
        const stateId = state?.id || state?._id || '';
        const stateName = state?.name || '';
        return stateId === form.state || stateName.toLowerCase() === form.state.toLowerCase();
      }) || null
    );
  }, [form.state, stateOptions]);

  const cityOptions = useMemo(
    () => selectedState?.cities || [],
    [selectedState],
  );

  const selectedCity = useMemo(() => {
    if (!form.city) {
      return null;
    }

    return (
      cityOptions.find((city) => {
        const cityId = city?.id || city?._id || '';
        const cityName = city?.name || '';
        return cityId === form.city || cityName.toLowerCase() === form.city.toLowerCase();
      }) || null
    );
  }, [cityOptions, form.city]);

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => {
      const updated = { ...current, [field]: value };
      if (field === 'state') {
        updated.city = '';
        updated.cityName = '';
        const matchingState = stateOptions.find((state) => {
          const stateId = state?.id || state?._id || '';
          const stateName = state?.name || '';
          return stateId === value || stateName.toLowerCase() === value.toLowerCase();
        });
        updated.stateName = matchingState?.name || '';
      }

      if (field === 'city') {
        const matchingCity = cityOptions.find((city) => {
          const cityId = city?.id || city?._id || '';
          const cityName = city?.name || '';
          return cityId === value || cityName.toLowerCase() === value.toLowerCase();
        });
        updated.cityName = matchingCity?.name || '';
      }
      return updated;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (audience !== 'couple') {
      navigate(ROUTES.SIGNUP, { replace: true });
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!form.style || !form.weddingDate || !form.budget.trim()) {
      toast.error('Wedding style, wedding date, and budget are required.');
      return;
    }

    const resolvedStateName = selectedState?.name || form.stateName || '';
    const resolvedCityName = selectedCity?.name || form.cityName || '';
    const location = [form.address.trim(), resolvedCityName, resolvedStateName].filter(Boolean).join(', ');

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      stateId: form.state,
      cityId: form.city,
      location,
      weldingStyleId: form.style,
      password: form.password,
      weldingDate: new Date(form.weddingDate).toISOString(),
      budget: Number(String(form.budget).replace(/[^0-9.]/g, '')),
    };

    try {
      const response = await createCoupleProfile(payload).unwrap();
      const createdUser = response?.data?.user || response?.user || {
        name: form.name.trim(),
        email: form.email.trim(),
        role: 'COUPLE',
      };
      const tokens = response?.data?.tokens || response?.tokens || {};
      const accessToken = tokens?.accessToken || response?.data?.accessToken || response?.accessToken || null;

      if (accessToken) {
        dispatch(
          loginSuccess({
            user: createdUser,
            token: accessToken,
            accessToken,
            refreshToken: tokens?.refreshToken || response?.data?.refreshToken || response?.refreshToken || null,
            tokenType: tokens?.tokenType || response?.data?.tokenType || response?.tokenType || 'Bearer',
            expiresIn: tokens?.expiresIn || response?.data?.expiresIn || response?.expiresIn || null,
          }),
        );
      }

      toast.success('Account created successfully');
      navigate(ROUTES.USER_DASHBOARD, { replace: true });
    } catch (error) {
      toast.error(
        error?.data?.message || error?.message || 'Failed to create account',
      );
    }
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

      <div className='mt-10 rounded-full bg-[#efe6db] '>
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

      <div className='mt-10 flex items-center gap-8 border-b border-[#cfc7bc]'>
        <button
          type='button'
          onClick={() => navigate(ROUTES.LOGIN)}
          className='pb-4 font-raleway text-[16px] font-medium text-[#857f7a] transition-colors'
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
          
          <div>
            <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>State</label>
            <div className='relative'>
              <select
                value={form.state}
                onChange={updateField('state')}
                disabled={isStatesLoading || stateOptions.length === 0}
                className='h-12 w-full appearance-none rounded-xl border border-[#b5b5b5] bg-white px-4 pr-10 font-raleway text-[16px] text-[#2d2d2d] outline-none focus:border-[#9f8b79] disabled:cursor-not-allowed disabled:bg-[#f6f6f6]'
              >
                <option value=''>
                  {isStatesLoading ? 'Loading states...' : 'Select State'}
                </option>
                {stateOptions.map((state) => (
                  <option key={state.id || state._id || state.name} value={state.id || state._id || state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]' />
            </div>
          </div>

          {/* City and Address aligned side by side */}
          <div>
            <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>City</label>
            <div className='relative'>
              <select
                value={form.city}
                onChange={updateField('city')}
                disabled={!form.state || cityOptions.length === 0}
                className='h-12 w-full appearance-none rounded-xl border border-[#b5b5b5] bg-white px-4 pr-10 font-raleway text-[16px] text-[#2d2d2d] outline-none focus:border-[#9f8b79] disabled:cursor-not-allowed disabled:bg-[#f6f6f6]'
              >
                <option value=''>
                  {!form.state
                    ? 'Select state first'
                    : cityOptions.length === 0
                      ? 'No cities available'
                      : 'Select City'}
                </option>
                {cityOptions.map((city) => (
                  <option key={city.id || city._id || city.name} value={city.id || city._id || city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={18} className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]' />
            </div>
          </div>
          
          <Field label='Address' icon={MapPin} value={form.address} onChange={updateField('address')} placeholder='Enter Full Address' />

          <div>
            <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>Wedding Style</label>
            <div className='relative'>
              <select
                value={form.style}
                onChange={updateField('style')}
                disabled={isWeddingStylesLoading || styleOptions.length === 0}
                className='h-12 w-full appearance-none rounded-xl border border-[#b5b5b5] bg-white px-4 pr-10 font-raleway text-[16px] text-[#2d2d2d] outline-none focus:border-[#9f8b79] disabled:cursor-not-allowed disabled:bg-[#f6f6f6]'
              >
                <option value='' disabled>
                  {isWeddingStylesLoading ? 'Loading wedding styles...' : 'Select wedding style'}
                </option>
                {styleOptions.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
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

          <PasswordField 
            label='Password' 
            value={form.password} 
            onChange={updateField('password')} 
            showPassword={showPassword} 
            setShowPassword={setShowPassword} 
          />
          <PasswordField 
            label='Confirm Password' 
            value={form.confirmPassword} 
            onChange={updateField('confirmPassword')} 
            showPassword={showConfirmPassword} 
            setShowPassword={setShowConfirmPassword} 
          />
        </div>

        <button
          type='submit'
          disabled={isLoading || !form.style}
          className='inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#a7b9a6] font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70'
        >
          <ArrowRight size={18} />
          {isLoading ? 'Creating...' : 'Create Account'}
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
  );

  if (shellMode) return RightContent;

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
            <h2 className='font-playfair text-3xl leading-none sm:text-5xl'>
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

      <section className='flex flex-1  items-center bg-white px-5 py-10 '>
        <div className='mx-auto max-w-162.5 w-full'>
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

          <div className='mt-4 flex items-center gap-8 border-b border-[#cfc7bc]'>
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
              
              <div>
                <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>State</label>
                <div className='relative'>
                  <select
                    value={form.state}
                    onChange={updateField('state')}
                    disabled={isStatesLoading || stateOptions.length === 0}
                    className='h-12 w-full appearance-none rounded-xl border border-[#b5b5b5] bg-white px-4 pr-10 font-raleway text-[16px] text-[#2d2d2d] outline-none focus:border-[#9f8b79] disabled:cursor-not-allowed disabled:bg-[#f6f6f6]'
                  >
                    <option value=''>
                      {isStatesLoading ? 'Loading states...' : 'Select State'}
                    </option>
                    {stateOptions.map((state) => (
                      <option key={state.id || state._id || state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]' />
                </div>
              </div>

              {/* City and Address aligned side by side */}
              <div>
                <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>City</label>
                <div className='relative'>
                  <select
                    value={form.city}
                    onChange={updateField('city')}
                    disabled={!form.state || cityOptions.length === 0}
                    className='h-12 w-full appearance-none rounded-xl border border-[#b5b5b5] bg-white px-4 pr-10 font-raleway text-[16px] text-[#2d2d2d] outline-none focus:border-[#9f8b79] disabled:cursor-not-allowed disabled:bg-[#f6f6f6]'
                  >
                    <option value=''>
                      {!form.state
                        ? 'Select state first'
                        : cityOptions.length === 0
                          ? 'No cities available'
                          : 'Select City'}
                    </option>
                    {cityOptions.map((city) => (
                      <option key={city.id || city._id || city.name} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]' />
                </div>
              </div>
              
              <Field label='Address' icon={MapPin} value={form.address} onChange={updateField('address')} placeholder='Enter Full Address' />

              <div>
                <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>Wedding Style</label>
                <div className='relative'>
                  <select
                    value={form.style}
                    onChange={updateField('style')}
                    disabled={isWeddingStylesLoading || styleOptions.length === 0}
                    className='h-12 w-full appearance-none rounded-xl border border-[#b5b5b5] bg-white px-4 pr-10 font-raleway text-[16px] text-[#2d2d2d] outline-none focus:border-[#9f8b79] disabled:cursor-not-allowed disabled:bg-[#f6f6f6]'
                  >
                    <option value='' disabled>
                      {isWeddingStylesLoading ? 'Loading wedding styles...' : 'Select wedding style'}
                    </option>
                    {styleOptions.map((style) => (
                      <option key={style.id} value={style.id}>
                        {style.name}
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

              <PasswordField 
                label='Password' 
                value={form.password} 
                onChange={updateField('password')} 
                showPassword={showPassword} 
                setShowPassword={setShowPassword} 
              />
              <PasswordField 
                label='Confirm Password' 
                value={form.confirmPassword} 
                onChange={updateField('confirmPassword')} 
                showPassword={showConfirmPassword} 
                setShowPassword={setShowConfirmPassword} 
              />
            </div>

            <button
              type='submit'
              disabled={isLoading || !form.style}
              className='inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#a7b9a6] font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70'
            >
              <ArrowRight size={18} />
              {isLoading ? 'Creating...' : 'Create Account'}
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

const PasswordField = ({ label, value, onChange, showPassword, setShowPassword, placeholder = '••••••••' }) => (
  <div>
    <label className='mb-2 block font-raleway text-[16px] text-[#615d58]'>{label}</label>
    <div className='relative'>
      <ShieldCheck size={18} className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]' />
      
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='h-12 w-full rounded-xl border border-[#b5b5b5] bg-white px-4 pl-11 pr-11 font-raleway text-[16px] text-[#2d2d2d] outline-none transition-colors placeholder:text-[#b5b5b5] focus:border-[#9f8b79]'
      />

      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c] hover:text-[#2d2d2d] transition-colors focus:outline-none'
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default CoupleSignup;