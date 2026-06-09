  import React from 'react';
  import ProfileDetailsLeftPanel from './ProfileDetailsLeftPanel';
  import ProfileDetailsRightPanel from './ProfileDetailsRightPanel';

  const ProfileDetailsSection = ({ vendor }) => {
    
    return (
      <section className='mt-4 grid gap-5 lg:grid-cols-2'>
        <ProfileDetailsLeftPanel vendor={vendor} />
        
        <ProfileDetailsRightPanel vendor={vendor} />
      </section>
    );
  };

  export default ProfileDetailsSection;