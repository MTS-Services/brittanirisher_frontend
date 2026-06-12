import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useForgotPasswordMutation } from '../../src/store/features/auth/authApi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success('OTP sent to your email successfully!');
      setTimeout(() => {
        navigate('/otp-verify', { state: { email } });
      }, 1500);
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>

      <div className="flex min-h-screen items-center justify-center bg-[#f5f1eb] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">

          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Forgot Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your email address and we'll send you an OTP code.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-[#5b6351] focus:outline-none focus-ring-2 focus:ring-[#5b6351] sm:text-sm"
                placeholder="Email address"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#5b6351] py-2 px-4 text-sm font-medium text-white hover:bg-[#5b6361] focus:outline-none focus:ring-2 focus:ring-[#5b6351] focus:ring-offset-2 disabled:bg-[#5b6351] disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default ForgotPassword;