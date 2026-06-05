import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast'; 
import { 
  useGetCoupleProfileQuery, 
  useUpdateCoupleProfileMutation,
  useGetStatesQuery
} from '../../../store/features/couple/coupleDashboard';
import { useChangePasswordMutation } from '../../../store/features/auth/authApi'; 

const ProfileSkeleton = () => (
  <div className="w-full animate-pulse">
    <div className="mb-6 h-8 w-48 rounded bg-[#ece9e2]"></div>
    <div className="mb-8 rounded-lg border border-[#e0dcd7] bg-white p-6">
      <div className="mb-6 h-6 w-32 rounded bg-[#ece9e2]"></div>
      <div className="mb-6 flex gap-4">
        <div className="h-16 w-16 rounded-full bg-[#ece9e2]"></div>
        <div className="space-y-2">
          <div className="h-5 w-40 rounded bg-[#ece9e2]"></div>
          <div className="h-4 w-52 rounded bg-[#ece9e2]"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="space-y-2">
            <div className="h-4 w-24 rounded bg-[#ece9e2]"></div>
            <div className="h-10 w-full rounded bg-[#ece9e2]"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Profile = () => {
  const { data: profileResponse, isLoading: isProfileLoading } = useGetCoupleProfileQuery();
  const { data: statesResponse } = useGetStatesQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateCoupleProfileMutation();
  const [changePassword, { isLoading: isPasswordUpdating }] = useChangePasswordMutation();

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

  useEffect(() => {
    if (profileResponse?.data) {
      const serverData = profileResponse.data;
      
      let formattedDate = '';
      if (serverData.weddingDate) {
        const dateObj = new Date(serverData.weddingDate);
        formattedDate = !isNaN(dateObj.getTime()) 
          ? dateObj.toLocaleDateString('en-US') 
          : '';
      }

      setProfileForm((prev) => ({
        ...prev,
        fullName: serverData.name || '',
        phoneNumber: serverData.phone || '',
        weddingDate: formattedDate,
        weddingBudget: serverData.budget !== undefined ? String(serverData.budget) : '',
        streetAddress: serverData.location || '',
      }));
    }
  }, [profileResponse]);

  useEffect(() => {
    if (profileForm.selectedState && statesResponse?.data) {
      const stateObj = statesResponse.data.find(
        (s) => s.name.toLowerCase() === profileForm.selectedState.toLowerCase() || s.id === profileForm.selectedState
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
        selectedCity: '' 
      });
    } else {
      setProfileForm({ ...profileForm, [name]: value });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const numericBudget = Number(profileForm.weddingBudget.replace(/[^0-9.-]+/g, ""));
      
      const fullLocationString = [
        profileForm.streetAddress,
        profileForm.selectedCity,
        profileForm.selectedState
      ].filter(Boolean).join(', ');

      const payload = {
        name: profileForm.fullName,
        phone: profileForm.phoneNumber,
        location: fullLocationString,
        budget: isNaN(numericBudget) ? 0 : numericBudget,
      };

      if (profileForm.weddingDate) {
        const parsedDate = new Date(profileForm.weddingDate);
        if (!isNaN(parsedDate.getTime())) {
          payload.weddingDate = parsedDate.toISOString();
        }
      }

      await updateProfile(payload).unwrap();
      toast.success('Profile details updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error(error?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  const handleSavePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
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
        confirmPassword: passwordForm.confirmPassword
      }).unwrap();

      toast.success('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Failed to change password:', error);
      toast.error(error?.data?.message || 'Failed to change password. Please try again.');
    }
  };

  if (isProfileLoading) {
    return <ProfileSkeleton />;
  }

  const statesList = statesResponse?.data || [];

  return (
    <section className='w-full text-[#171717] font-raleway'>
      <header className='mb-6'>
        <h1 className='m-0 font-playfair text-2xl leading-tight text-[#1b1b1b] md:text-4xl'>Profile</h1>
        <p className='mt-2 text-base text-[#7a7a7a]'>Manage your wedding details and personal information</p>
      </header>

      {/* Account Details Section */}
      <article className='mb-8 rounded-lg border border-[#e0dcd7] bg-white px-4 py-6'>
        <h2 className='mb-6 text-lg font-semibold text-[#1b1b1b]'>Account Details</h2>

        <div className='mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
          <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#d2a674] text-center text-lg font-bold text-white overflow-hidden'>
            {profileResponse?.data?.profileImage ? (
              <img 
                src={`https://api-brittanirisher.maktechgroup.tech${profileResponse.data.profileImage}`} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            ) : (
              'E&M'
            )}
          </div>
          <div>
            <h3 className='m-0 text-base font-semibold text-[#2a2a2a]'>
              {profileForm.fullName || 'Emma & Michael'}
            </h3>
            {profileForm.weddingDate && (
              <p className='mt-1 text-sm text-[#7a7a7a]'>Getting married on {profileForm.weddingDate}</p>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Full Name</label>
            <input
              type='text'
              name='fullName'
              value={profileForm.fullName}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Phone Number</label>
            <input
              type='tel'
              name='phoneNumber'
              value={profileForm.phoneNumber}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>State</label>
            <select
              name='selectedState'
              value={profileForm.selectedState}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            >
              <option value="">Select State</option>
              {statesList.map((state) => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>City</label>
            <select
              name='selectedCity'
              value={profileForm.selectedCity}
              onChange={handleProfileChange}
              disabled={!profileForm.selectedState}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1] disabled:bg-gray-50 disabled:text-gray-400'
            >
              <option value="">Select City</option>
              {availableCities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Street Address</label>
            <input
              type='text'
              name='streetAddress'
              value={profileForm.streetAddress}
              onChange={handleProfileChange}
              placeholder="House no, Street name, Apt..."
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Wedding Date</label>
            <input
              type='text'
              name='weddingDate'
              value={profileForm.weddingDate}
              onChange={handleProfileChange}
              placeholder='MM/DD/YYYY'
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Wedding Budget</label>
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
        <h2 className='mb-6 text-lg font-semibold text-[#1b1b1b]'>Change Password</h2>

        <div className='grid grid-cols-1 gap-6'>
          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Old Password</label>
            <input
              type='password'
              name='currentPassword' 
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>New Password</label>
            <input
              type='password'
              name='newPassword'
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Confirm New Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
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