import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useResetPasswordMutation } from '../../src/store/features/auth/authApi';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email') || '';
  const code = queryParams.get('code') || '';

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !code) {
      toast.error('Session expired or invalid request. Please start again.');
      return navigate('/forgot-password');
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    try {
      await resetPassword({
        email,
        code,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      }).unwrap();

      toast.success('Password reset successful! Please login with your new password.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to reset password.');
    }
  };

  return (
    <>
   

      <div className="flex min-h-screen items-center justify-center bg-[#f5f1eb] px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md">

          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter your new password below.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="relative mt-1">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 focus:border-[#5b6351] focus:outline-none focus:ring-[#5b6351] sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="relative mt-1">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 focus:border-[#5b6351] focus:outline-none focus:ring-[#5b6351] sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#5b6351] py-2 px-4 text-sm font-medium text-white hover:bg-[#5b6351] focus:outline-none "
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;