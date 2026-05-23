import React, { useState } from 'react';
import ChecklistHeader from './components/ChecklistHeader';
import OverallProgressCard from './components/OverallProgressCard';
import ChecklistTimelineSection from './components/ChecklistTimelineSection';
import AddTaskModal from './components/AddTaskModal';

const checklistSections = [
  {
    title: '12+ Months Before',
    completeLabel: '4/5 complete',
    tasks: [
      { name: 'Set wedding date', done: true },
      { name: 'Determine budget', done: true },
      { name: 'Create guest list', done: true },
      { name: 'Book venue', done: true },
      { name: 'Hire wedding planner (optional)', done: false },
    ],
    showAddTask: true,
  },
  {
    title: '3-4 Months Before',
    completeLabel: '0/5 complete',
    tasks: [
      { name: 'Send save-the-dates', done: false },
      { name: 'Order invitations', done: false },
      { name: 'Book hair & makeup artist', done: false },
      { name: 'Reserve hotel blocks', done: false },
      { name: 'Plan ceremony details', done: false },
    ],
    showAddTask: false,
  },
  {
    title: 'Wedding Week',
    completeLabel: '0/5 complete',
    tasks: [
      { name: 'Confirm final guest count', done: false },
      { name: 'Pack for honeymoon', done: false },
      { name: 'Final dress fitting', done: false },
      { name: 'Confirm vendor arrival times', done: false },
      { name: 'Rehearsal', done: false },
    ],
    showAddTask: false,
  },
];

const Checklist = () => {
  const progressPercent = 31;
  const progressText = '8 of 26 tasks completed';
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({
    taskTitle: '3-4 Months Before',
    taskName: 'Send save-the-dates',
  });

  const openTaskModal = () => setIsTaskModalOpen(true);
  const closeTaskModal = () => setIsTaskModalOpen(false);

  const handleTaskFormChange = (field) => (event) => {
    setTaskForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleTaskSave = (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsTaskModalOpen(false);
  };

  return (
    <>
      <section className='w-full text-[#171717] font-playfair'>
        <ChecklistHeader onAddTask={openTaskModal} />
        <OverallProgressCard progressPercent={progressPercent} completedText={progressText} />

        <div className='space-y-4'>
          {checklistSections.map((section) => (
            <ChecklistTimelineSection key={section.title} section={section} />
          ))}
        </div>
      </section>

      <AddTaskModal
        isOpen={isTaskModalOpen}
        taskForm={taskForm}
        onFieldChange={handleTaskFormChange}
        onClose={closeTaskModal}
        onSave={handleTaskSave}
      />
    </>
  );
};

export default Checklist;
