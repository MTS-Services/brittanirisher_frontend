import React from 'react';
import ProfileSocialLeft from './ProfileSocialLeft';
import ProfileSocialRight from './ProfileSocialRight';

const ProfileSocial = ({ vendor }) => {
  return (
    <div className='mt-4 grid gap-5 lg:grid-cols-2'>
      <ProfileSocialLeft vendor={vendor} />
      <ProfileSocialRight vendor={vendor} />
    </div>
  );
};

export default ProfileSocial;
