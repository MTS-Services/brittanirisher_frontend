import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useOtpVerifyMutation } from '../../src/store/features/auth/authApi';

const OtpVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputRefs = useRef([]);
  const [otpVerify, { isLoading }] = useOtpVerifyMutation();

  const email = location.state?.email || '';

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; 
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); 
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = Array(6).fill('');
    pasted.split('').forEach((char, i) => (newOtp[i] = char));
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email not found. Please start over.');
      return navigate('/forgot-password');
    }

    const code = otp.join('');
    if (code.length < 6) {
      toast.error('Please enter the complete 6-digit OTP.');
      return;
    }

    try {
      await otpVerify({ email, code }).unwrap();
      toast.success('OTP Verified Successfully!');
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`);
      }, 1000);
    } catch (error) {
      toast.error(
        error?.data?.message ||
        error?.data?.errors?.[0]?.message ||
        'Invalid OTP code.'
      );
    }
  };

  return (
    <>
      {/* <Toaster position="top-right" /> */}

      <div className="flex min-h-screen items-center justify-center bg-[#f5f1eb] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">

          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Verify OTP
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              An OTP has been sent to{' '}
              <span className="font-semibold text-[#5b6351] underline">{email}</span>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* 6-box OTP input */}
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-11 h-12 rounded-md border border-gray-300 text-center text-xl font-bold text-gray-900 focus:border-[#5b6351] focus:outline-none focus:ring-2 focus:ring-[#5b6351]"
                />
              ))}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#5b6351] py-2 px-4 text-sm font-medium text-white hover:bg-[#5b6351] focus:outline-none focus:ring-2 focus:ring-[#5b6351] focus:ring-offset-2 disabled:bg-[#5b6351] disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default OtpVerify;