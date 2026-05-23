import React from 'react';
import { X } from 'lucide-react';

const AddTaskModal = ({ isOpen, taskForm, onFieldChange, onClose, onSave }) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave();
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4'
      onClick={onClose}
      role='presentation'
    >
      <div
        className='w-full max-w-140 rounded-xl bg-[#f8f8f8] px-4 py-4 shadow-2xl sm:px-5'
        onClick={(event) => event.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='task-modal-title'
      >
        <div className='mb-3 flex items-center justify-between'>
          <h2 id='task-modal-title' className='m-0 text-[2rem] text-[#212121]'>
            Add Task
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-8 w-8 items-center justify-center rounded-md text-[#1e1e1e] transition hover:bg-black/5'
            aria-label='Close add task modal'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-3'>
          <div>
            <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='task-title'>
              Task Title
            </label>
            <input
              id='task-title'
              type='text'
              value={taskForm.taskTitle}
              onChange={onFieldChange('taskTitle')}
              className='h-10 w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none focus:border-[#a9b9a6]'
            />
          </div>

          <div>
            <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='task-name'>
              Task Name
            </label>
            <input
              id='task-name'
              type='text'
              value={taskForm.taskName}
              onChange={onFieldChange('taskName')}
              className='h-10 w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none focus:border-[#a9b9a6]'
            />
          </div>

          <button
            type='submit'
            className='rounded-md bg-[#a4b5a2] px-5 py-2 text-base text-[#2f3a2f] transition hover:bg-[#94a592]'
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;