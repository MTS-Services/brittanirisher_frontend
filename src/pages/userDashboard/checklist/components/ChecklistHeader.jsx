import React from 'react';

const ChecklistHeader = ({ onAddTask }) => {
  return (
    <header className='mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center'>
      <div>
        <h1 className='m-0 text-2xl leading-tight text-[#1b1b1b] md:text-4xl'>Wedding Checklist</h1>
        <p className='mt-2 text-base font-raleway text-[#7a7a7a]'>Stay on track with your planning timeline</p>
      </div>
      <button
        type='button'
        onClick={onAddTask}
        className='rounded-md bg-[#A7B9A6] px-4 py-2 text-sm text-white transition hover:bg-[#a4b5a2]'
      >
        Add Custom Task
      </button>
    </header>
  );
};

export default ChecklistHeader;