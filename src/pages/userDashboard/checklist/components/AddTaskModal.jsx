import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus } from 'lucide-react';

const AddTaskModal = ({ isOpen, onClose, onSave, isSubmitting, editSection }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [currentTaskName, setCurrentTaskName] = useState('');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      if (editSection) {
        setTaskTitle(editSection.title || '');
        const existingTasks = editSection.tasks?.map(t => t.taskName) || [];
        setTaskList(existingTasks);
      } else {
        setTaskTitle('');
        setTaskList([]);
      }
      setCurrentTaskName('');
    }
  }, [isOpen, editSection]);

  if (!isOpen) {
    return null;
  }

  const handleAddTaskToList = () => {
    if (!currentTaskName.trim()) return;
    setTaskList((prev) => [...prev, currentTaskName.trim()]);
    setCurrentTaskName('');
  };

  const handleRemoveTaskFromList = (indexToRemove) => {
    setTaskList((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskTitle.trim() || taskList.length === 0) return;

    onSave({
      title: taskTitle.trim(),
      tasks: taskList,
    });
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
            {editSection ? 'Update Section' : 'Add Task Section'}
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

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='task-title'>
              Task Title (Section Name)
            </label>
            <input
              id='task-title'
              type='text'
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className='h-10 w-full rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none focus:border-[#a9b9a6]'
              placeholder='e.g., 3-4 Months Before'
              required
            />
          </div>

          <div>
            <label className='mb-1 block text-[1.1rem] text-[#343434]' htmlFor='task-name'>
              Task Name
            </label>
            <div className='flex gap-2'>
              <input
                id='task-name'
                type='text'
                value={currentTaskName}
                onChange={(e) => setCurrentTaskName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTaskToList();
                  }
                }}
                className='h-10 flex-1 rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] px-3 text-[0.95rem] text-[#535353] outline-none focus:border-[#a9b9a6]'
                placeholder='e.g., Send save-the-dates'
              />
              <button
                type='button'
                onClick={handleAddTaskToList}
                className='inline-flex h-10 items-center gap-1 rounded-md bg-[#a4b5a2] px-4 text-base text-[#2f3a2f] transition hover:bg-[#94a592]'
              >
                <Plus size={18} /> Add
              </button>
            </div>
          </div>

          {taskList.length > 0 && (
            <div className='max-h-40 overflow-y-auto rounded-md border border-[#d8d8d8] bg-white p-2 space-y-1.5'>
              {taskList.map((task, index) => (
                <div key={index} className='flex items-center justify-between rounded bg-[#fdfcfc] p-2 border border-[#D4A57415]'>
                  <span className='text-sm text-[#5a5a5a] font-raleway'>{task}</span>
                  <button
                    type='button'
                    onClick={() => handleRemoveTaskFromList(index)}
                    className='text-red-400 hover:text-red-600 transition'
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='flex justify-end pt-2'>
            <button
              type='submit'
              disabled={isSubmitting || !taskTitle.trim() || taskList.length === 0}
              className='rounded-md bg-[#2f3a2f] px-6 py-2 text-base text-white transition hover:bg-[#202920] disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Saving...' : editSection ? 'Update Section' : 'Save Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;