import React, { useState } from "react";
import TimelineHeader from "./components/TimelineHeader";
import OverallProgressCard from "./components/OverallProgressCard";
import ChecklistSectionCard from "./components/ChecklistSectionCard";
import WeddingScheduleCard from "./components/WeddingScheduleCard";
import AddScheduleModal from "./components/AddScheduleModal";
import AddTaskModal from "./components/AddTaskModal";
import {
  useGetCoupleTimelineQuery,
  useUpdateTimelineTaskStatusMutation,
  useUpdateTimelineSectionNoteMutation,
  useCreateTimelineTaskMutation,
  useCreateCoupleScheduleMutation,
} from "../../../store/features/couple/coupleDashboard";

// ─── Skeleton ─────────────────────────────────────────────────
const TimelineSkeleton = () => (
  <div className="w-full animate-pulse space-y-6">
    <div className="h-12 bg-gray-200 rounded-xl w-1/3" />
    <div className="h-24 bg-gray-200 rounded-2xl w-full" />
    <div className="h-48 bg-gray-200 rounded-2xl w-full" />
  </div>
);

// ─── Main Component ───────────────────────────────────────────
const Timeline = () => {
  const { data: timelineSections = [], isLoading, isError } = useGetCoupleTimelineQuery();
  const [updateTimelineTaskStatus] = useUpdateTimelineTaskStatusMutation();
  const [updateTimelineSectionNote] = useUpdateTimelineSectionNoteMutation();
  const [createTimelineTask] = useCreateTimelineTaskMutation();
  const [createCoupleSchedule] = useCreateCoupleScheduleMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    taskName: "",
    category: "1 Year Out",
    dueDate: "",
    priority: "LOW",
    taskNotes: "",
  });

  if (isLoading) return <TimelineSkeleton />;
  if (isError) return (
    <div className="text-center py-10 text-red-500">
      Failed to load timeline data.
    </div>
  );

  // ─── Progress Calculation ──────────────────────────────────
  let totalTasks = 0;
  let completedTasks = 0;

  timelineSections.forEach((section) => {
    if (section.tasks && Array.isArray(section.tasks)) {
      totalTasks += section.tasks.length;
      completedTasks += section.tasks.filter((t) => t.isCompleted).length;
    }
  });

  const overallProgressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // ─── Handlers ─────────────────────────────────────────────
  const handleToggleTask = async (sectionId, taskId, currentStatus) => {
    try {
      await updateTimelineTaskStatus({
        taskId,
        isCompleted: !currentStatus,
      }).unwrap();
    } catch (err) {
      console.error("Toggle task failed:", err);
    }
  };

  const handleSaveNote = async (sectionId, noteValue) => {
    try {
      await updateTimelineSectionNote({
        timelineSectionId: sectionId,
        note: noteValue,
      }).unwrap();
    } catch (err) {
      console.error("Save note failed:", err);
    }
  };

  const handleOpenTaskModal = () => {
    setNewTask({
      taskName: "",
      category: "1 Year Out",
      dueDate: "",
      priority: "LOW",
      taskNotes: "",
    });
    setIsTaskModalOpen(true);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newTask,
        dueDate: newTask.dueDate
          ? new Date(newTask.dueDate).toISOString()
          : new Date().toISOString(),
        isCompleted: false,
        order: 1,
      };
      await createTimelineTask(payload).unwrap();
      setIsTaskModalOpen(false);
    } catch (err) {
      console.error("Add task failed:", err);
    }
  };

  const handleAddSchedule = async (formData) => {
    await createCoupleSchedule(formData).unwrap();
  };

  // ─── Priority Style ────────────────────────────────────────
  const getPriorityStyle = (priority) => {
    if (priority === "HIGH") return "bg-[#FFF0EE] text-[#FF6A5A]";
    if (priority === "MEDIUM") return "bg-[#FFF7E6] text-[#FFB03A]";
    if (priority === "LOW") return "bg-[#F0F5FF] text-[#597EF7]";
    return "hidden";
  };

  // ─── Render ────────────────────────────────────────────────
  return (
    <div className="w-full text-[#171717] font-raleway space-y-6">
      <TimelineHeader onAddTaskClick={handleOpenTaskModal} />

      <OverallProgressCard overallProgressPercentage={overallProgressPercentage} />

      {timelineSections.map((section) => (
        <ChecklistSectionCard
          key={section.id}
          section={section}
          onToggleTask={handleToggleTask}
          onSaveNote={handleSaveNote}
          getPriorityStyle={getPriorityStyle}
        />
      ))}

      <WeddingScheduleCard onOpenModal={() => setIsModalOpen(true)} />

      <AddScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onScheduleAdded={handleAddSchedule}
      />

      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskForm={newTask}
        setTaskForm={setNewTask}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default Timeline;