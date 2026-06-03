import React, { useState } from 'react';
import ChecklistHeader from './components/ChecklistHeader';
import OverallProgressCard from './components/OverallProgressCard';
import ChecklistTimelineSection from './components/ChecklistTimelineSection';
import AddTaskModal from './components/AddTaskModal';
import { useGetCoupleChecklistQuery, useUpdateTaskStatusMutation,useCreateCoupleChecklistMutation,useUpdateCoupleChecklistMutation, } from '../../../store/features/couple/coupleDashboard'; 
// Skeleton Loader Component
const SkeletonLoader = () => {
  return (
    <div className='w-full animate-pulse space-y-4'>
      {/* Header Skeleton */}
      <div className='flex items-center justify-between py-2'>
        <div className='h-8 w-48 rounded bg-gray-200' />
        <div className='h-10 w-32 rounded-md bg-gray-200' />
      </div>

      {/* Progress Card Skeleton */}
      <div className='rounded-xl border border-gray-100 bg-white p-4 shadow-sm'>
        <div className='mb-3 flex items-center justify-between'>
          <div className='space-y-2'>
            <div className='h-7 w-36 rounded bg-gray-200' />
            <div className='h-4 w-48 rounded bg-gray-200' />
          </div>
          <div className='h-9 w-14 rounded bg-gray-200' />
        </div>
        <div className='h-2.5 w-full rounded-full bg-gray-200' />
      </div>

      {/* Section List Skeletons */}
      {[1, 2, 3].map((index) => (
        <div key={index} className='rounded-2xl border border-gray-100 bg-white p-4 shadow-sm space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='h-6 w-40 rounded bg-gray-200' />
            <div className='h-4 w-16 rounded bg-gray-200' />
          </div>
          <div className='space-y-2'>
            {[1, 2, 3].map((taskIndex) => (
              <div key={taskIndex} className='flex h-10 items-center rounded-lg bg-gray-50 px-3'>
                <div className='mr-3 h-5 w-5 rounded-full bg-gray-200' />
                <div className='h-4 w-1/2 rounded bg-gray-200' />
              </div>
            ))}
          </div>
          <div className='h-4 w-28 rounded bg-gray-200 mt-2' />
        </div>
      ))}
    </div>
  );
};

const Checklist = () => {
  const { data: sections = [], isLoading, isError } = useGetCoupleChecklistQuery();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [createCoupleChecklist, { isLoading: isCreating }] = useCreateCoupleChecklistMutation();
  const [updateCoupleChecklist, { isLoading: isUpdating }] = useUpdateCoupleChecklistMutation();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  if (isLoading) {
    return (
      <section className='w-full font-playfair px-1'>
        <SkeletonLoader />
      </section>
    );
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500 font-raleway">Failed to load checklist data.</div>;
  }

  let totalTasks = 0;
  let completedTasks = 0;

  sections.forEach(section => {
    if (section.tasks && Array.isArray(section.tasks)) {
      totalTasks += section.tasks.length;
      completedTasks += section.tasks.filter(task => task.isCompleted).length;
    }
  });

  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const progressText = `${completedTasks} of ${totalTasks} tasks completed`;

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      await updateTaskStatus({ taskId, isCompleted: currentStatus }).unwrap();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleTaskSave = async (formattedData) => {
    try {
      if (selectedSection) {
        await updateCoupleChecklist({
          taskSectionId: selectedSection.id,
          body: formattedData
        }).unwrap();
      } else {
        await createCoupleChecklist(formattedData).unwrap();
      }
      closeTaskModal();
    } catch (error) {
      console.error("Failed to save checklist section:", error);
    }
  };

  const openNewTaskModal = () => {
    setSelectedSection(null);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (section) => {
    setSelectedSection(section);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setSelectedSection(null);
    setIsTaskModalOpen(false);
  };

  return (
    <>
      <section className='w-full text-[#171717] font-playfair'>
        <ChecklistHeader onAddTask={openNewTaskModal} />
        <OverallProgressCard progressPercent={progressPercent} completedText={progressText} />

        <div className='space-y-4'>
          {sections.map((section) => (
            <ChecklistTimelineSection 
              key={section.id} 
              section={section} 
              onToggleTask={handleToggleTask}
              onAddAnotherTask={openEditTaskModal}
            />
          ))}
        </div>
      </section>

      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        onSave={handleTaskSave}
        isSubmitting={isCreating || isUpdating}
        editSection={selectedSection}
      />
    </>
  );
};

export default Checklist;