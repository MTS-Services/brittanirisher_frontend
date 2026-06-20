import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { Camera, Eye, EyeOff } from 'lucide-react';
import {
  useGetCoupleProfileQuery,
  useUpdateCoupleProfileMutation,
  useGetStatesQuery,
} from '../../../store/features/couple/coupleDashboard';
import { useChangePasswordMutation } from '../../../store/features/auth/authApi';
import { API_CONFIG } from '../../../config';

const ProfileSkeleton = () => (
  <div className='w-full animate-pulse'>
    <div className='mb-6 h-8 w-48 rounded bg-[#ece9e2]'></div>
    <div className='mb-8 rounded-lg border border-[#e0dcd7] bg-white p-6'>
      <div className='mb-6 h-6 w-32 rounded bg-[#ece9e2]'></div>
      <div className='mb-6 flex gap-4'>
        <div className='h-16 w-16 rounded-full bg-[#ece9e2]'></div>
        <div className='space-y-2'>
          <div className='h-5 w-40 rounded bg-[#ece9e2]'></div>
          <div className='h-4 w-52 rounded bg-[#ece9e2]'></div>
        </div>
      </div>/
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className='space-y-2'>
            <div className='h-4 w-24 rounded bg-[#ece9e2]'></div>
            <div className='h-10 w-full rounded bg-[#ece9e2]'></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const formatDateForInput = (value) => {
  if (!value) return '';

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }

  const dateObj = new Date(value);
  if (Number.isNaN(dateObj.getTime())) return '';

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (value) => {
  if (!value) return '';

  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? `${value}T00:00:00`
    : value;

  const dateObj = new Date(normalized);
  if (Number.isNaN(dateObj.getTime())) return value;

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};

const getProfileImageUrl = (url) => {
  if (!url) return '';
  if (
    url.startsWith('blob:') ||
    url.startsWith('http://') ||
    url.startsWith('https://')
  ) {
    return url;
  }
  return `${API_CONFIG.BASE_URL}${url}`;
};

const resolveProfileImage = (serverData) => {
  if (!serverData) return '';
  if (serverData.profileImage) return serverData.profileImage;
  if (Array.isArray(serverData.images) && serverData.images.length > 0) {
    const first = serverData.images[0];
    return typeof first === 'string' ? first : first?.mediaUrl || first?.url || '';
  }
  return '';
};

const Profile = () => {
  const { data: profileResponse, isLoading: isProfileLoading } =
    useGetCoupleProfileQuery();
  const { data: statesResponse } = useGetStatesQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateCoupleProfileMutation();
  const [changePassword, { isLoading: isPasswordUpdating }] =
    useChangePasswordMutation();

  const [profileForm, setProfileForm] = useState({
    fullName: '',
    phoneNumber: '',
    selectedState: '',
    selectedCity: '',
    streetAddress: '',
    weddingDate: '',
    weddingBudget: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [availableCities, setAvailableCities] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileImageInputRef = useRef(null);
  const createdProfileImageRef = useRef(null);

  useEffect(() => {
    if (profileResponse?.data) {
      const serverData = profileResponse.data;

      const resolvedWeddingDate =
        serverData.weddingDate || serverData.weldingDate || '';

      const formatted = resolvedWeddingDate
        ? resolvedWeddingDate.slice(0, 10)
        : '';

      setProfileForm((prev) => ({
        ...prev,
        fullName: serverData.name || '',
        phoneNumber: serverData.phone || '',
        weddingDate: formatted,
        weddingBudget:
          serverData.budget !== undefined ? String(serverData.budget) : '',
        streetAddress: serverData.location || '',
        selectedState: serverData.stateId,
        selectedCity: serverData.cityId,
      }));

      if (!profileImageFile) {
        setProfileImage(resolveProfileImage(serverData));
      }
    }
  }, [profileResponse, profileImageFile]);

  useEffect(() => {
    return () => {
      if (createdProfileImageRef.current) {
        URL.revokeObjectURL(createdProfileImageRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (profileForm.selectedState && statesResponse?.data) {
      const stateObj = statesResponse.data.find(
        (s) =>
          s.name.toLowerCase() === profileForm.selectedState.toLowerCase() ||
          s.id === profileForm.selectedState,
      );
      setAvailableCities(stateObj ? stateObj.cities : []);
    } else {
      setAvailableCities([]);
    }
  }, [profileForm.selectedState, statesResponse]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    if (name === 'selectedState') {
      setProfileForm({
        ...profileForm,
        selectedState: value,
        selectedCity: '',
      });
    } else {
      setProfileForm({ ...profileForm, [name]: value });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleProfileImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (createdProfileImageRef.current) {
      URL.revokeObjectURL(createdProfileImageRef.current);
    }

    const blobUrl = URL.createObjectURL(file);
    createdProfileImageRef.current = blobUrl;
    setProfileImage(blobUrl);
    setProfileImageFile(file);
    event.target.value = '';
  };

  const handleSaveProfile = async () => {
    try {
      const numericBudget = Number(
        profileForm.weddingBudget.replace(/[^0-9.-]+/g, ''),
      );

      const formData = new FormData();
      formData.append('name', profileForm.fullName);
      formData.append('phone', profileForm.phoneNumber);
      formData.append('location', profileForm.streetAddress);
      formData.append('budget', isNaN(numericBudget) ? 0 : numericBudget);

      if (profileForm.selectedState) {
        formData.append('stateId', profileForm.selectedState);
      }
      if (profileForm.selectedCity) {
        formData.append('cityId', profileForm.selectedCity);
      }

      if (profileForm.weddingDate) {
        formData.append(
          'weldingDate',
          `${profileForm.weddingDate}T12:00:00.000Z`,
        );
      }

      if (profileImageFile) {
        formData.append('images', profileImageFile);
      }

      await updateProfile(formData).unwrap();
      setProfileImageFile(null);
      toast.success('Profile details updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error(
        error?.data?.message || 'Failed to update profile. Please try again.',
      );
    }
  };

  const handleSavePassword = async () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match!');
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      }).unwrap();

      toast.success('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error(
        error?.data?.message || 'Failed to change password. Please try again.',
      );
    }
  };

  if (isProfileLoading) {
    return <ProfileSkeleton />;
  }

  const statesList = statesResponse?.data || [];

  return (
    <section className='w-full text-[#171717] font-raleway'>
      <header className='mb-6'>
        <h1 className='m-0 font-playfair text-2xl leading-tight text-[#1b1b1b] md:text-4xl'>
          Profile
        </h1>
        <p className='mt-2 text-base text-[#7a7a7a]'>
          Manage your wedding details and personal information
        </p>
      </header>

      {/* Account Details Section */}
      <article className='mb-8 rounded-lg border border-[#e0dcd7] bg-white px-4 py-6'>
        <h2 className='mb-6 text-lg font-semibold text-[#1b1b1b]'>
          Account Details
        </h2>

        <div className='mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
          <div className='relative shrink-0'>
            {profileImage ? (
              <img
                src={getProfileImageUrl(profileImage)}
                alt='Profile'
                className='h-16 w-16 rounded-full object-cover'
              />
            ) : (
              <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#ece9e2] text-[#9a9a9a]'>
                <Camera size={22} />
              </div>
            )}
            <button
              type='button'
              onClick={() => profileImageInputRef.current?.click()}
              className='absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#d5d1cb] bg-white text-[#5f6661] shadow-sm transition hover:bg-[#f7f7f7]'
              aria-label='Upload profile image'
            >
              <Camera size={13} />
            </button>
            <input
              ref={profileImageInputRef}
              type='file'
              accept='image/*'
              onChange={handleProfileImageUpload}
              className='hidden'
            />
          </div>
          <div>
            <h3 className='m-0 text-base font-semibold text-[#2a2a2a]'>
              {profileForm.fullName || 'Emma & Michael'}
            </h3>
            {profileForm.weddingDate && (
              <p className='mt-1 text-sm text-[#7a7a7a]'>
                Getting married on{' '}
                {formatDateForDisplay(profileForm.weddingDate)}
              </p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              Full Name
            </label>
            <input
              type='text'
              name='fullName'
              value={profileForm.fullName}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              Phone Number
            </label>
            <input
              type='tel'
              name='phoneNumber'
              value={profileForm.phoneNumber}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              State
            </label>
            <select
              name='selectedState'
              value={profileForm.selectedState}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            >
              <option value=''>Select State</option>
              {statesList.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              City
            </label>
            <select
              name='selectedCity'
              value={profileForm.selectedCity}
              onChange={handleProfileChange}
              disabled={!profileForm.selectedState}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1] disabled:bg-gray-50 disabled:text-gray-400'
            >
              <option value=''>Select City</option>
              {availableCities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className='sm:col-span-2'>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              Street Address
            </label>
            <input
              type='text'
              name='streetAddress'
              value={profileForm.streetAddress}
              onChange={handleProfileChange}
              placeholder='House no, Street name, Apt...'
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              Wedding Date
            </label>
            <input
              type='date'
              name='weddingDate'
              value={profileForm.weddingDate}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              Wedding Budget
            </label>
            <input
              type='text'
              name='weddingBudget'
              value={profileForm.weddingBudget}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          disabled={isUpdating}
          className='mt-6 rounded-md bg-[#b4c4b1] px-6 py-2 text-sm font-medium text-[#2f3a2f] transition hover:bg-[#a4b5a2] disabled:opacity-50'
        >
          {isUpdating ? 'Saving...' : 'Save'}
        </button>
      </article>

      {/* Change Password Section */}
      <article className='rounded-lg border border-[#e0dcd7] bg-white px-4 py-6'>
        <h2 className='mb-6 text-lg font-semibold text-[#1b1b1b]'>
          Change Password
        </h2>

        <div className='grid grid-cols-1 gap-6'>
          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              Old Password
            </label>
            <div className='relative'>
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                name='currentPassword'
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 pr-10 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
              />
              <button
                type='button'
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7a7a]'
                aria-label={
                  showCurrentPassword ? 'Hide old password' : 'Show old password'
                }
              >
                {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              New Password
            </label>
            <div className='relative'>
              <input
                type={showNewPassword ? 'text' : 'password'}
                name='newPassword'
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 pr-10 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
              />
              <button
                type='button'
                onClick={() => setShowNewPassword((prev) => !prev)}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7a7a]'
                aria-label={
                  showNewPassword ? 'Hide new password' : 'Show new password'
                }
              >
                {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>
              Confirm New Password
            </label>
            <div className='relative'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 pr-10 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
              />
              <button
                type='button'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className='absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7a7a]'
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSavePassword}
          disabled={isPasswordUpdating}
          className='mt-6 rounded-md bg-[#b4c4b1] px-6 py-2 text-sm font-medium text-[#2f3a2f] transition hover:bg-[#a4b5a2] disabled:opacity-50'
        >
          {isPasswordUpdating ? 'Changing...' : 'Save'}
        </button>
      </article>
    </section>
  );
};

export default Profile;
