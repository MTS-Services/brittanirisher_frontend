import React, { useEffect, useState } from 'react';
import { useUpdateVendorProfileMutation } from '../../../../store/features/vendor/vendorDashboardApi';

const ProfileDetailsRightPanel = ({ vendor }) => {
  const [businessName, setBusinessName] = useState(vendor?.businessName || '');
  const [location, setLocation] = useState(vendor?.location || '');
  const [speciality, setSpeciality] = useState(vendor?.speciality || '');
  const [category, setCategory] = useState(vendor?.category || '');
  const [experienceYears, setExperienceYears] = useState(vendor?.experienceYears || '');
  const [highlightedServices, setHighlightedServices] = useState(
    vendor?.highlightedServices ? vendor.highlightedServices.join('\n') : ''
  );
  const [stateId] = useState(vendor?.stateId || '');
  const [cityId] = useState(vendor?.cityId || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [updateVendorProfile, { isLoading }] = useUpdateVendorProfileMutation();

  useEffect(() => {
    setBusinessName(vendor?.businessName || '');
    setLocation(vendor?.location || '');
    setSpeciality(vendor?.speciality || '');
    setCategory(vendor?.category || '');
    setExperienceYears(vendor?.experienceYears || '');
    setHighlightedServices(
      vendor?.highlightedServices ? vendor.highlightedServices.join('\n') : ''
    );
  }, [vendor]);

  const handleProfileSave = async () => {
    try {
      const formData = new FormData();
      formData.append('businessName', businessName);
      formData.append('location', location);
      formData.append('speciality', speciality);
      formData.append('category', category);
      formData.append('experienceYears', experienceYears);

      const servicesArray = highlightedServices
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      formData.append('highlightedServices', JSON.stringify(servicesArray));

      if (stateId) formData.append('stateId', stateId);
      if (cityId) formData.append('cityId', cityId);

      await updateVendorProfile(formData).unwrap();
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const handlePasswordSave = async () => {
    if (!password || !confirmPassword) {
      setPasswordError('Please fill in both password fields.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setPasswordError('');
    try {
      const formData = new FormData();
      formData.append('password', password);
      await updateVendorProfile(formData).unwrap();
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Password update failed:', error);
    }
  };

  return (
    <div className='space-y-5'>
      <div className='space-y-3 rounded-lg border border-[#F6F8F6] bg-[#F6F8F6] p-4 sm:p-5'>
        <div>
          <label htmlFor='companyName' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Company Name</label>
          <input id='companyName' type='text' value={businessName} onChange={(e) => setBusinessName(e.target.value)} className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]' />
        </div>

        <div>
          <label htmlFor='location' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Location</label>
          <input id='location' type='text' value={location} onChange={(e) => setLocation(e.target.value)} className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]' />
        </div>

        <div>
          <label htmlFor='specialty' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Specialty</label>
          <input id='specialty' type='text' value={speciality} onChange={(e) => setSpeciality(e.target.value)} className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]' />
        </div>

        <div>
          <label htmlFor='category' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Category</label>
          <input id='category' type='text' value={category} onChange={(e) => setCategory(e.target.value)} className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]' />
        </div>

        <div>
          <label htmlFor='experienceYears' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Experience Years</label>
          <input id='experienceYears' type='text' value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]' />
        </div>

        <div>
          <label htmlFor='highlightedServices' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Highlighted Services</label>
          <textarea
            id='highlightedServices'
            value={highlightedServices}
            onChange={(e) => setHighlightedServices(e.target.value)}
            placeholder='service'
            className='min-h-22 w-full resize-none rounded-md border border-transparent bg-[#e9eeea] px-3 py-2.5 text-sm leading-5 text-[#5d635f] outline-none focus:border-[#b9c3b8]'
          />
        </div>

        <button type="button" onClick={handleProfileSave} disabled={isLoading} className='mt-4 rounded-md bg-[#9baf9a] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#839682] disabled:opacity-60'>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <div className='rounded-lg border border-[#F6F8F6] bg-[#F6F8F6] p-3 sm:p-4'>
        <h3 className='mb-3 font-playfair text-2xl text-[#1f2522]'>Set Your Password</h3>
        <div className='space-y-3'>
          <div>
            <label htmlFor='password' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Password</label>
            <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter new password' className='h-10 w-full rounded-md border border-transparent bg-[#E4E9E3] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]' />
          </div>
          <div>
            <label htmlFor='confirmPassword' className='mb-1.5 block text-base font-medium text-[#3f4441]'>Confirm Password</label>
            <input id='confirmPassword' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm new password' className='h-10 w-full rounded-md border border-transparent bg-[#E4E9E3] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]' />
          </div>
          {passwordError && <p className='text-sm text-red-500'>{passwordError}</p>}
        </div>
        <button type="button" onClick={handlePasswordSave} disabled={isLoading} className='mt-4 rounded-md bg-[#9baf9a] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#839682] disabled:opacity-60'>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default ProfileDetailsRightPanel;