import React, { useState } from 'react';

const Profile = () => {
  const [profileForm, setProfileForm] = useState({
    fullName: 'MD Ismail Molla',
    phoneNumber: '(316) 555-0116',
    email: 'jackson.graham@example.com',
    location: '2464 Royal Ln. Mesa, New Jersey 45463',
    weddingStyle: 'Minimalistic Modern',
    weddingDate: '6/17/2026',
    weddingBudget: '$50,000',
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({ ...profileForm, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  const handleSaveProfile = () => {
    console.log('Profile saved:', profileForm);
  };

  const handleSavePassword = () => {
    if (passwordForm.newPassword === passwordForm.confirmPassword) {
      console.log('Password changed successfully');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <section className='w-full  text-[#171717] font-raleway'>
      <header className='mb-6'>
        <h1 className='m-0 font-playfair text-2xl leading-tight text-[#1b1b1b] md:text-4xl'>Profile</h1>
        <p className='mt-2 font-raleway text-base font-raleway text-[#7a7a7a]'>Manage your wedding details and personal information</p>
      </header>

      <article className='mb-8 rounded-lg border border-[#e0dcd7] bg-white px-4 py-6'>
        <h2 className='mb-6 text-lg font-semibold text-[#1b1b1b]'>Account Details</h2>

        <div className='mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
          <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#d2a674] text-center text-lg font-bold text-white'>
            E&M
          </div>
          <div>
            <h3 className='m-0 text-base font-semibold text-[#2a2a2a]'>Emma & Michael</h3>
            <p className='mt-1 text-sm text-[#7a7a7a]'>Getting married on August 15, 2026</p>
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
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Email</label>
            <input
              type='email'
              name='email'
              value={profileForm.email}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Location</label>
            <input
              type='text'
              name='location'
              value={profileForm.location}
              onChange={handleProfileChange}
              className='w-full rounded-md border border-[#d5d1cb] bg-white px-3 py-2 text-sm text-[#3a3a3a] outline-none focus:border-[#b4c4b1]'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Wedding Style</label>
            <input
              type='text'
              name='weddingStyle'
              value={profileForm.weddingStyle}
              onChange={handleProfileChange}
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
          className='mt-6 rounded-md bg-[#b4c4b1] px-6 py-2 text-sm font-medium text-[#2f3a2f] transition hover:bg-[#a4b5a2]'
        >
          Save
        </button>
      </article>

      <article className='rounded-lg border border-[#e0dcd7] bg-white px-4 py-6'>
        <h2 className='mb-6 text-lg font-semibold text-[#1b1b1b]'>Change Password</h2>

        <div className='grid grid-cols-1 gap-6'>
          <div>
            <label className='mb-2 block text-sm font-medium text-[#2a2a2a]'>Old Password</label>
            <input
              type='password'
              name='oldPassword'
              value={passwordForm.oldPassword}
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
          className='mt-6 rounded-md bg-[#b4c4b1] px-6 py-2 text-sm font-medium text-[#2f3a2f] transition hover:bg-[#a4b5a2]'
        >
          Save
        </button>
      </article>
    </section>
  );
};

export default Profile;
