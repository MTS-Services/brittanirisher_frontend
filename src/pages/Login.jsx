import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import { ROUTES } from '../config';
import { useLoginMutation } from '../store/features/auth/authApi';

import {
  LogIn,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Wallet,
  ChevronDown,
  Home,
} from 'lucide-react';
import toast from 'react-hot-toast';

const AUDIENCE_OPTIONS = [
  { id: 'couple', label: 'Couple' },
  { id: 'vendor', label: 'Vendor' },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STYLE_OPTIONS = [
  'Minimalist Modern',
  'Romantic Classic',
  'Garden Luxe',
  'Editorial Chic',
];

const AVATAR_STYLES = [
  'bg-[#b7c3b3]',
  'bg-[#d8c3b4]',
  'bg-[#cbb7a1]',
  'bg-[#9f8b79]',
];

const roleDashboardMap = {
  ADMIN: ROUTES.ADMIN_DASHBOARD,
  VENDOR: ROUTES.VENDOR_DASHBOARD,
  COUPLE: ROUTES.USER_DASHBOARD,
};

const Login = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [authMode, setAuthMode] = useState(initialMode);
  const [audience, setAudience] = useState('couple');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    setAuthMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (authMode === 'signup') {
      navigate(`${ROUTES.SIGNUP}?audience=${audience}`, { replace: true });
    }
  }, [authMode, audience, navigate]);

  const validate = () => {
    const errs = {};
    if (!loginEmail.trim()) {
      errs.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(loginEmail)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!loginPassword) {
      errs.password = 'Password is required.';
    }
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const response = await login({
        email: loginEmail.trim(),
        password: loginPassword,
      }).unwrap();

      const user = response?.data?.user || null;
      const tokens = response?.data?.tokens || {};
      const accessToken = tokens?.accessToken || null;

      if (!user || !accessToken) {
        setErrors({ form: 'Invalid login response. Please try again.' });
        return;
      }

      dispatch(
        loginSuccess({
          user,
          token: accessToken,
          accessToken,
          refreshToken: tokens?.refreshToken || null,
          tokenType: tokens?.tokenType || 'Bearer',
          expiresIn: tokens?.expiresIn || null,
        }),
      );

      const redirectRoute = roleDashboardMap[user.role] || ROUTES.HOME;
      toast.success('Login successful! Redirecting...');
      navigate(redirectRoute, { replace: true });
    } catch (error) {
      setErrors({
        form:
          error?.data?.message ||
          error?.message ||
          'Login failed. Please check your credentials.',
      });

      toast.error(
        error?.data?.message ||
          error?.message ||
          'Login failed. Please check your credentials.',
      );
    }
  };

  const isLogin = authMode === 'login';

  // const handleDummyLogin = (role) => {
  //   const normalizedRole = role.toUpperCase();

  //   dispatch(
  //     loginSuccess({
  //       user: {
  //         id: Math.random().toString(36).substr(2, 9),
  //         name: role.charAt(0).toUpperCase() + role.slice(1) + ' User',
  //         email: `${role}@test.com`,
  //         role: normalizedRole,
  //       },
  //       token: `demo-token-${Date.now()}`,
  //     }),
  //   );
  //   navigate(roleDashboardMap[normalizedRole], { replace: true });
  // };
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
              Welcome Back
            </h2>
            <p className='mx-auto mt-5 font-raleway text-[20px] leading-8 text-white/90'>
              Sign in to continue managing your account and planning tools.
            </p>
          </div>

          <div className='mt-14 flex flex-col items-center gap-4'>
            <div className='flex items-center justify-center -space-x-3'>
              {AVATAR_STYLES.map((className, index) => (
                <div
                  key={className}
                  className={`flex h-11 w-11 items-center justify-center rounded-full border-2 border-white ${className} text-[12px] font-semibold text-white shadow-md`}
                >
                  {['AR', 'KW', 'JL', '+'][index]}
                </div>
              ))}
            </div>
            <div>
              <p className='font-raleway text-[18px] leading-6'>
                Joined by 10,000+
              </p>
              <p className='font-raleway text-[14px] leading-6 text-white/75'>
                Brides &amp; Vendors
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='flex flex-1 items-center  bg-white px-5 py-10 sm:px-8 lg:px-10'>
        <div className='w-full mx-auto max-w-162.5'>
          <div className='mb-5 flex items-center justify-between gap-3'>
            <h1 className='font-playfair text-3xl leading-none text-[#070707] md:text-4xl lg:text-5xl'>
              Sign In
            </h1>
          </div>
          <p className='font-raleway text-[20px] leading-8 text-[#615d58]'>
            Enter your details to continue.
          </p>

          <div className='mt-8 rounded-3xl border border-[#e9eaeb] bg-[#f4f0ea]'>
            <div className='grid grid-cols-2 gap-2'>
              {AUDIENCE_OPTIONS.map((option) => {
                const active = audience === option.id;
                return (
                  <button
                    key={option.id}
                    type='button'
                    onClick={() => setAudience(option.id)}
                    className={`rounded-[47px] px-4 py-2.5 text-center font-raleway text-[16px] font-medium transition-colors ${
                      active
                        ? 'bg-[#e8ded2] text-[#2d3036]'
                        : 'bg-transparent text-[#090909]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='mt-6 flex items-center gap-8 border-b border-[#cfc7bc]'>
            <button
              type='button'
              onClick={() => setAuthMode('login')}
              className={`pb-3 font-raleway text-[16px] font-medium transition-colors ${
                isLogin
                  ? 'border-b-2 border-[#2d2d2d] text-[#2d2d2d]'
                  : 'text-[#857f7a]'
              }`}
            >
              Login
            </button>
            <button
              type='button'
              onClick={() => setAuthMode('signup')}
              className={`pb-3 font-raleway text-[16px] font-medium transition-colors ${
                !isLogin
                  ? 'border-b-2 border-[#2d2d2d] text-[#2d2d2d]'
                  : 'text-[#857f7a]'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleLogin} noValidate className='mt-7 space-y-5'>
            <div>
              <label
                htmlFor='login-email'
                className='mb-2 block font-raleway text-[16px] text-[#615d58]'
              >
                Email
              </label>
              <div className='relative'>
                <Mail
                  size={18}
                  className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]'
                />
                <input
                  type='email'
                  id='login-email'
                  autoComplete='email'
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  placeholder='Write your email'
                  aria-invalid={!!errors.email}
                  aria-describedby={
                    errors.email ? 'login-email-error' : undefined
                  }
                  className='h-12 w-full rounded-xl border border-[#b5b5b5] bg-white px-11 font-raleway text-[16px] text-[#2d2d2d] outline-none transition-colors placeholder:text-[#b5b5b5] focus:border-[#9f8b79]'
                />
              </div>
              {errors.email && (
                <p
                  id='login-email-error'
                  className='mt-2 font-raleway text-[14px] text-red-600'
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='login-password'
                className='mb-2 block font-raleway text-[16px] text-[#615d58]'
              >
                Password
              </label>
              <div className='relative'>
                <button
                  type='button'
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-[#8c8c8c]'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='login-password'
                  autoComplete='current-password'
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  placeholder='••••••••'
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? 'login-password-error' : undefined
                  }
                  className='h-12 w-full rounded-xl border border-[#b5b5b5] bg-white px-4 pr-11 font-raleway text-[16px] text-[#2d2d2d] outline-none transition-colors placeholder:text-[#b5b5b5] focus:border-[#9f8b79]'
                />
              </div>
              {errors.password && (
                <p
                  id='login-password-error'
                  className='mt-2 font-raleway text-[14px] text-red-600'
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div className='flex items-center justify-between gap-4 text-[14px] font-raleway text-[#857f7a]'>
              <label className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  className='h-4 w-4 rounded border-[#b5b5b5]'
                />
                Remember me
              </label>
              <button
                type='button'
                className='font-medium text-[#2d2d2d] underline decoration-[#2d2d2d] underline-offset-4'
              >
                Forgot password?
              </button>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#a7b9a6] font-raleway text-[16px] font-medium text-[#464e46] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isLoading ? (
                <span className='h-4 w-4 animate-spin rounded-full border-2 border-[#464e46] border-t-transparent' />
              ) : (
                <LogIn size={18} />
              )}
              {isLoading ? 'Signing in…' : 'Login'}
            </button>

            {errors.form && (
              <p className='rounded-lg border border-red-200 bg-red-50 px-3 py-2 font-raleway text-[14px] text-red-700'>
                {errors.form}
              </p>
            )}

            {/* <div className='mt-6 space-y-3 border-t border-[#e9eaeb] pt-6'>
              <p className='text-center font-raleway text-[14px] text-[#615d58]'>Or try demo login:</p>
              <div className='grid grid-cols-3 gap-3'>
                <button
                  type='button'
                  onClick={() => handleDummyLogin('admin')}
                  className='rounded-lg border border-[#a7b9a6] bg-white px-4 py-2 font-raleway text-[14px] font-medium text-[#a7b9a6] transition-colors hover:bg-[#a7b9a6] hover:text-white'
                >
                  Admin
                </button>
                <button
                  type='button'
                  onClick={() => handleDummyLogin('vendor')}
                  className='rounded-lg border border-[#a7b9a6] bg-white px-4 py-2 font-raleway text-[14px] font-medium text-[#a7b9a6] transition-colors hover:bg-[#a7b9a6] hover:text-white'
                >
                  Vendor
                </button>
                <button
                  type='button'
                  onClick={() => handleDummyLogin('user')}
                  className='rounded-lg border border-[#a7b9a6] bg-white px-4 py-2 font-raleway text-[14px] font-medium text-[#a7b9a6] transition-colors hover:bg-[#a7b9a6] hover:text-white'
                >
                  User
                </button>
              </div>
            </div> */}
            <p className='pt-2 text-center font-raleway text-[14px] text-[#857f7a]'>
              Don&apos;t have an account?{' '}
              <button
                type='button'
                onClick={() => setAuthMode('signup')}
                className='font-medium text-[#2d2d2d] underline decoration-[#2d2d2d] underline-offset-4'
              >
                Sign Up
              </button>
            </p>

            <button
              type='button'
              onClick={() => navigate(ROUTES.HOME)}
              className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#d4c8bc] bg-white px-4 py-3 font-raleway text-[14px] font-medium text-[#2d2d2d] transition-colors hover:bg-[#f4f0ea]'
            >
              <Home size={16} />
              Go to Home
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
