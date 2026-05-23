import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoupleSignup from './CoupleSignup';
import VendorSignup from './VendorSignup';
import { ROUTES } from '../config';

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [audience, setAudience] = useState('couple');

  useEffect(() => {
    const urlAudience = new URLSearchParams(location.search).get('audience');
    if (urlAudience === 'vendor') {
      setAudience('vendor');
    } else {
      setAudience('couple');
    }
  }, [location.search]);

  const handleAudienceChange = (newAudience) => {
    setAudience(newAudience);
    navigate(`${ROUTES.SIGNUP}?audience=${newAudience}`, { replace: true });
  };

  const componentProps = {
    audience,
    onAudienceChange: handleAudienceChange,
  };

  if (audience === 'vendor') {
    return <VendorSignup {...componentProps} />;
  }

  return <CoupleSignup {...componentProps} />;
};

export default Signup;