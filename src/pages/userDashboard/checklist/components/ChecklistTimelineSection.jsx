import React, { useEffect, useRef } from 'react';
import { CircleCheck, Circle } from 'lucide-react';
import toast from 'react-hot-toast'; // টোস্ট ইমপোর্ট করা হয়েছে

const ChecklistTimelineSection = ({ section, onToggleTask, onAddAnotherTask }) => {
  const tasks = section.tasks || [];
  const completedCount = tasks.filter(task => task.isCompleted).length;
  const totalCount = tasks.length;

  const isFirstRender = useRef(true);

  useEffect(() => {
   
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

   
    if (totalCount > 0 && completedCount === totalCount) {
      toast.success(`"${section.title}" section completed! `, {
        id: `completed-${section.id || section.title}`, 
      });
    }
  }, [completedCount, totalCount, section.title, section.id]);

  return (
    <section className='rounded-2xl border border-[#D4A57426] bg-white px-4 py-4 font-raleway'>
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='m-0 text-[1.35rem] text-[#2f2f2f]'>{section.title}</h3>
        <span className='text-xs text-[#b2b2b2]'>
          {completedCount}/{totalCount} complete
        </span>
      </div>

      <div className='space-y-2'>
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onToggleTask(task.id, !task.isCompleted)}
            className='flex min-h-10 cursor-pointer items-center rounded-lg border border-[#D4A57426] bg-[#FDFCFC] px-3 select-none transition hover:bg-[#F9F7F5]'
            role='checkbox'
            aria-checked={task.isCompleted}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggleTask(task.id, !task.isCompleted);
              }
            }}
          >
            <div className='flex items-center justify-center mr-3'>
              {task.isCompleted ? (
                <CircleCheck size={20} className='text-[#9bae99] fill-[#9bae99] stroke-white' />
              ) : (
                <Circle size={20} className='text-[#aaaaaa] bg-white rounded-full' />
              )}
            </div>
            
            <span
              className={`text-base font-raleway ${task.isCompleted ? 'text-[#a8a8a8] line-through' : 'text-[#5a5a5a]'}`}
            >
              {task.taskName}
            </span>
          </div>
        ))}
      </div>

      <button
        type='button'
        onClick={() => onAddAnotherTask(section)}
        className='mt-3 border-none bg-transparent p-0 text-sm text-[#778376] transition hover:text-[#707070] underline'
      >
        Add another task
      </button>
    </section>
  );
};

export default ChecklistTimelineSection;