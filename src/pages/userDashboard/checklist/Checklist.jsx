import React, { useState } from 'react';
import ChecklistHeader from './components/ChecklistHeader';
import OverallProgressCard from './components/OverallProgressCard';
import ChecklistTimelineSection from './components/ChecklistTimelineSection';
import AddTaskModal from './components/AddTaskModal';
import { useGetCoupleChecklistQuery, useUpdateTaskStatusMutation,useCreateCoupleChecklistMutation,useUpdateCoupleChecklistMutation, } from '../../../store/features/couple/coupleDashboard'; 
const Checklist = () => {
  const { data: sections = [], isLoading, isError } = useGetCoupleChecklistQuery();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const [createCoupleChecklist, { isLoading: isCreating }] = useCreateCoupleChecklistMutation();
  const [updateCoupleChecklist, { isLoading: isUpdating }] = useUpdateCoupleChecklistMutation();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  if (isLoading) {
    return <div className="text-center py-10">Loading checklist...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load checklist data.</div>;
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