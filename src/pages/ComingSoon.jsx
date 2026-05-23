import React, { memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../config';

const prettify = (slug) =>
  slug
    .replace(/(^-|-$)/g, '')
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

const ComingSoon = memo(() => {
  const { slug } = useParams();
  const title = slug ? prettify(slug) : 'Page';

  return (
    <div className='mx-auto max-w-3xl px-4 py-20 text-center'>
      <h1 className='text-4xl font-bold text-gray-900'>Coming Soon</h1>
      <p className='mt-4 text-lg text-gray-600'>The <strong>{title}</strong> page is coming soon. Check back later.</p>
      <div className='mt-8'>
        <Link to={ROUTES.HOME} className='rounded-full bg-[#4f5b4d] px-5 py-3 text-white'>Back to Home</Link>
      </div>
    </div>
  );
});

ComingSoon.displayName = 'ComingSoon';

export default ComingSoon;