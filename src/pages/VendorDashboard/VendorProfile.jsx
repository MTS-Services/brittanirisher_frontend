import React from 'react';
import DummyRoutePage from '../../components/DummyRoutePage';
import { ROUTES } from '../../config';

const VendorProfile = () => (
  <DummyRoutePage
    eyebrow='Dashboard Section'
    title='My Profile'
    description='Keep your public profile updated so couples can understand your services and style.'
    bullets={['Brand Info', 'Portfolio', 'Packages']}
    backHref={ROUTES.HOME}
  />
);

export default VendorProfile;
