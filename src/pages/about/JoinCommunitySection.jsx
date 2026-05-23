import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../config';

export default function JoinCommunitySection() {
  return (
    <div className='mt-12 rounded-2xl bg-[#d6ded5] px-6 py-10 shadow-[0_14px_34px_rgba(63,73,63,0.08)]'>
      <div style={{ maxWidth: 633 }} className='mx-auto'>
        <div className='inline-flex items-center rounded-full bg-[rgba(255,255,255,0.65)] px-5 py-1.5 font-raleway text-[16px] font-medium text-[#615d58]'>
          Join Our Community
        </div>
        <h3 className='mt-4 font-playfair text-[48px] leading-none text-[#2d2d2d]'>Ready to Start Your Journey?</h3>
        <p className='mt-4 font-raleway text-[20px] leading-8 text-[#615d58]'>Whether you are planning a wedding or helping couples build one, we are here to make the process simpler, calmer, and more beautiful.</p>
        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          <Link to={ROUTES.BROWSE_VENDORS} className='inline-flex items-center justify-center rounded-lg bg-[#a7b9a6] px-5 py-3 font-raleway text-[16px] leading-6 text-[#464e46]'>
            Browse Vendors
          </Link>
          <Link to={ROUTES.CONTACT} className='inline-flex items-center justify-center rounded-lg border border-[#464e46] bg-transparent px-5 py-3 font-raleway text-[16px] leading-6 text-[#464e46]'>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
