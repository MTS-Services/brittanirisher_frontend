import React, { useState } from 'react';

const ChecklistTimelineSection = ({ section }) => {

  const [tasks, setTasks] = useState(section.tasks);

  const handleToggle = (taskName) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.name === taskName ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <section className='rounded-2xl border border-[#D4A57426] bg-white px-4 py-4 font-raleway'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='m-0 text-[1.35rem] text-[#2f2f2f]'>{section.title}</h3>
        <span className='text-xs text-[#b2b2b2]'>{section.completeLabel}</span>
      </div>

      <div className='space-y-2'>
        {tasks.map((task) => (
          <label
            key={task.name}
            className='flex min-h-10 cursor-pointer items-center rounded-lg border border-[#D4A57426] bg-[#FDFCFC] px-3'
          >
            <input
              type='checkbox'
              checked={task.done} 
              onChange={() => handleToggle(task.name)} 
              className='h-4 w-4 appearance-none rounded-full border border-[#aaaaaa] bg-white checked:border-[#9bae99] checked:bg-[#9bae99]'
            />
            <span
              className={`ml-3 text-base font-raleway ${task.done ? 'text-[#a8a8a8] line-through' : 'text-[#5a5a5a]'}`}
            >
              {task.name}
            </span>
          </label>
        ))}
      </div>

      {section.showAddTask ? (
        <button
          type='button'
          className='mt-3 border-none bg-transparent p-0 text-sm text-[#9a9a9a] transition hover:text-[#707070]'
        >
          Add another task
        </button>
      ) : null}
    </section>
  );
};

export default ChecklistTimelineSection;