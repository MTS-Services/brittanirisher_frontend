import React from 'react';
import { Link } from 'react-router-dom';

const DummyRoutePage = ({ eyebrow, title, description, bullets, backHref }) => {
  return (
    <section className='mx-auto flex min-h-[calc(100vh-8rem)] max-w-5xl items-center px-4 py-16 sm:px-6 lg:px-8'>
      <div className='relative w-full overflow-hidden rounded-4xl border border-[#d7dfd6] bg-[#f6f2eb] px-6 py-12 shadow-[0_24px_70px_rgba(63,73,63,0.12)] sm:px-10 lg:px-14'>
        <div className='absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d7dfd6]/70 blur-3xl' />
        <div className='absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#c9b7a5]/40 blur-3xl' />

        <div className='relative z-10 mx-auto max-w-3xl text-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.35em] text-[#6f775f]'>
            {eyebrow}
          </p>
          <h1 className='mt-4 font-playfair text-4xl font-semibold text-[#2f3a31] sm:text-5xl'>
            {title}
          </h1>
          <p className='mx-auto mt-5 max-w-2xl text-base leading-8 text-[#5f665c] sm:text-lg'>
            {description}
          </p>

          {Array.isArray(bullets) && bullets.length > 0 && (
            <div className='mt-10 grid gap-4 sm:grid-cols-3'>
              {bullets.map((item) => (
                <div
                  key={item}
                  className='rounded-2xl border border-[#d7dfd6] bg-white/70 px-4 py-5 text-sm font-medium text-[#3f493f] shadow-sm'
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          <div className='mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Link
              to={backHref}
              className='inline-flex h-11 items-center justify-center rounded-full bg-[#4f5b4d] px-6 text-sm font-medium text-white transition-colors hover:bg-[#3f493f]'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DummyRoutePage;