import React, { useEffect, useState } from 'react';
import { useUpdateVendorProfileMutation } from '../../../../store/features/vendor/vendorDashboardApi';
import toast from 'react-hot-toast';

const ProfileSocialRight = ({ vendor }) => {
  const [whatsapp, setWhatsapp] = useState('');
  const [messenger, setMessenger] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');

  const [updateVendorProfile, { isLoading }] = useUpdateVendorProfileMutation();

  useEffect(() => {
    if (vendor) {
      setWhatsapp(vendor.contactLinks?.whatsapp || '');
      setMessenger(vendor.contactLinks?.messenger || '');
      setTelegram(vendor.contactLinks?.telegram || '');
      setEmail(vendor.contactLinks?.email || '');
      setPhone(vendor.contactLinks?.phone || '');
      setWebsite(vendor.contactLinks?.website || '');
    }
  }, [vendor]);

  const handelSave = async () => {
    const socialLinks = {
      whatsapp,
      messenger,
      telegram,
      email,
      phone,
      website,
    };

    const formData = new FormData();

    formData.append('contactLinks', JSON.stringify(socialLinks));

    try {
      const response = await updateVendorProfile(formData).unwrap();
      console.log('Contact information updated successfully:', response);
      toast.success('Contact information updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update contact information. Please try again.');
    }
  };

  return (
    <div className='rounded-lg border border-[#F6F8F6] bg-[#F6F8F6] p-3 sm:p-4'>
      <h3 className='mb-3 font-playfair text-2xl text-[#1f2522]'>
        Contact Information
      </h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {[
          {
            id: 'whatsapp',
            label: 'WhatsApp',
            value: whatsapp,
            setter: setWhatsapp,
            type: 'tel',
            placeholder: '+1 (555) 000-0000',
          },
          {
            id: 'messenger',
            label: 'Messenger',
            value: messenger,
            setter: setMessenger,
            type: 'text',
            placeholder: 'facebook.com/yourname',
          },
          {
            id: 'telegram',
            label: 'Telegram',
            value: telegram,
            setter: setTelegram,
            type: 'text',
            placeholder: '@yourusername',
          },
          {
            id: 'email',
            label: 'Email',
            value: email,
            setter: setEmail,
            type: 'email',
            placeholder: 'you@example.com',
          },
          {
            id: 'phone',
            label: 'Phone',
            value: phone,
            setter: setPhone,
            type: 'tel',
            placeholder: '+1 (555) 000-0000',
          },
          {
            id: 'website',
            label: 'Website',
            value: website,
            setter: setWebsite,
            type: 'url',
            placeholder: 'https://www.yourwebsite.com',
          },
        ].map(({ id, label, value, setter, type, placeholder }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className='mb-1.5 block text-xs font-medium text-[#5d635f]'
            >
              {label}
            </label>
            <input
              id={id}
              type={type}
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

export default ProfileSocialRight;
