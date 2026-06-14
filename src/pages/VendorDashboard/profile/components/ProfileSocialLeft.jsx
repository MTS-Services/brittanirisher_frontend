import React, { useEffect, useState } from 'react';
import { useUpdateVendorProfileMutation } from '../../../../store/features/vendor/vendorDashboardApi';
import toast from 'react-hot-toast';

const ProfileSocialLeft = ({ vendor }) => {
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [pinterest, setPinterest] = useState('');
  const [twitter, setTwitter] = useState('');

  const [updateVendorProfile, { isLoading }] = useUpdateVendorProfileMutation();

  useEffect(() => {
    if (vendor) {
      setFacebook(vendor.socialLinks?.facebook || '');
      setInstagram(vendor.socialLinks?.instagram || '');
      setLinkedin(vendor.socialLinks?.linkedin || '');
      setYoutube(vendor.socialLinks?.youtube || '');
      setTiktok(vendor.socialLinks?.tiktok || '');
      setPinterest(vendor.socialLinks?.pinterest || '');
      setTwitter(vendor.socialLinks?.twitter || '');
    }
  }, [vendor]);

  const handelSave = async () => {
    const socialLinks = {
      facebook,
      instagram,
      linkedin,
      youtube,
      tiktok,
      pinterest,
      twitter,
    };

    const formData = new FormData();

    formData.append('socialLinks', JSON.stringify(socialLinks));

    try {
      const response = await updateVendorProfile(formData).unwrap();
      console.log('Social links updated successfully:', response);
      toast.success('Social links updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update social links. Please try again.');
    }
  };

  return (
    <div className='rounded-lg border border-[#F6F8F6] bg-[#F6F8F6] p-3 sm:p-4'>
      <h3 className='mb-3 font-playfair text-2xl text-[#1f2522]'>
        Social Media Links
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {[
          {
            id: 'facebook',
            label: 'Facebook',
            value: facebook,
            setter: setFacebook,
            placeholder: 'https://facebook.com/yourpage',
          },
          {
            id: 'instagram',
            label: 'Instagram',
            value: instagram,
            setter: setInstagram,
            placeholder: 'https://instagram.com/yourhandle',
          },
          {
            id: 'linkedin',
            label: 'LinkedIn',
            value: linkedin,
            setter: setLinkedin,
            placeholder: 'https://linkedin.com/in/yourprofile',
          },
          {
            id: 'youtube',
            label: 'YouTube',
            value: youtube,
            setter: setYoutube,
            placeholder: 'https://youtube.com/@yourchannel',
          },
          // { id: 'tiktok', label: 'TikTok', value: tiktok, setter: setTiktok, placeholder: 'https://tiktok.com/@yourhandle' },
          {
            id: 'pinterest',
            label: 'Pinterest',
            value: pinterest,
            setter: setPinterest,
            placeholder: 'https://pinterest.com/yourprofile',
          },
          {
            id: 'twitter',
            label: 'Twitter / X',
            value: twitter,
            setter: setTwitter,
            placeholder: 'https://x.com/yourhandle',
          },
        ].map(({ id, label, value, setter, placeholder }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className='mb-1.5 block text-xs font-medium text-[#5d635f]'
            >
              {label}
            </label>
            <input
              id={id}
              type='url'
              value={value}
              placeholder={placeholder}
              onChange={(e) => setter(e.target.value)}
              className='h-10 w-full rounded-md border border-transparent bg-[#e9eeea] px-3 text-sm text-[#5d635f] outline-none focus:border-[#b9c3b8]'
            />
          </div>
        ))}
      </div>
      <button
        type='button'
        onClick={handelSave}
        disabled={isLoading}
        className='mt-4 rounded-md bg-[#9baf9a] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#839682] disabled:opacity-60'
      >
        {isLoading ? 'Loading...' : 'Save'}
      </button>
    </div>
  );
};

export default ProfileSocialLeft;
