import React, { useState } from "react";
import TimelineHeader from "./components/TimelineHeader";
import OverallProgressCard from "./components/OverallProgressCard";
import ChecklistSectionCard from "./components/ChecklistSectionCard";
import WeddingScheduleCard from "./components/WeddingScheduleCard";
import AddScheduleModal from "./components/AddScheduleModal";
import AddTaskModal from "./components/AddTaskModal";

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([
    {
      id: 1,
      phase: "THE FOUNDATION",
      title: "1 Year Out",
      notes: "",
      tasks: [
        { id: 101, name: "Determine your budget", done: true, priority: "" },
        {
          id: 102,
          name: "Pick a wedding date & venue",
          done: true,
          priority: "",
        },
        {
          id: 103,
          name: "Create guest list draft",
          done: false,
          priority: "MEDIUM",
        },
        {
          id: 104,
          name: "Hire a wedding planner",
          done: false,
          priority: "MEDIUM",
        },
        {
          id: 105,
          name: "Shop for wedding attire",
          done: false,
          priority: "HIGH",
        },
      ],
    },
    {
      id: 2,
      phase: "THE DETAILS",
      title: "6 Months Out",
      notes: "",
      tasks: [
        {
          id: 201,
          name: "Choose your wedding party",
          done: false,
          priority: "MEDIUM",
        },
        {
          id: 202,
          name: "Book florist & caterer",
          done: false,
          priority: "HIGH",
        },
        { id: 203, name: "Secure hotel blocks", done: false, priority: "LOW" },
        { id: 204, name: "Plan your honeymoon", done: false, priority: "LOW" },
      ],
    },
    {
      id: 3,
      phase: "THE LOGISTICS",
      title: "The Month Of",
      notes: "",
      tasks: [
        {
          id: 301,
          name: "Review final details with vendors",
          done: false,
          priority: "HIGH",
        },
        { id: 302, name: "Final gown fitting", done: false, priority: "HIGH" },
        {
          id: 303,
          name: "Pick up wedding license",
          done: false,
          priority: "HIGH",
        },
        {
          id: 304,
          name: "Confirm seating chart",
          done: false,
          priority: "MEDIUM",
        },
        {
          id: 305,
          name: "Write vows & speeches",
          done: false,
          priority: "MEDIUM",
        },
      ],
    },
  ]);

  const [schedules, setSchedules] = useState([
    { time: "10:00 AM", name: "Hair & Makeup", location: "Bridal Suite" },
    {
      time: "1:00 PM",
      name: "First Look Photos",
      location: "Garden Courtyard",
    },
    {
      time: "2:00 PM",
      name: "Wedding Party Photos",
      location: "Venue Grounds",
    },
    { time: "4:00 PM", name: "Ceremony Begins", location: "Main Venue" },
    { time: "5:00 PM", name: "Cocktail Hour", location: "Terrace" },
    { time: "6:00 PM", name: "Reception Begins", location: "Ballroom" },
    { time: "7:00 PM", name: "First Dance", location: "Dance Floor" },
    { time: "7:30 PM", name: "Dinner Service", location: "Ballroom" },
    { time: "9:00 PM", name: "Cake Cutting", location: "Main Stage" },
    { time: "11:00 PM", name: "Send Off", location: "Entrance" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    location: "",
    time: "",
  });
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    sectionId: 1,
    dueDate: "",
    priority: "LOW",
    notes: "",
  });

  const handleToggleTask = (sectionId, taskId) => {
    setTimelineData((prevData) =>
      prevData.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map((task) =>
              task.id === taskId ? { ...task, done: !task.done } : task,
            ),
          };
        }
        return section;
      }),
    );
  };

  const handleNotesChange = (sectionId, value) => {
    setTimelineData((prevData) =>
      prevData.map((section) =>
        section.id === sectionId ? { ...section, notes: value } : section,
      ),
    );
  };

  const totalTasks = timelineData.reduce(
    (acc, curr) => acc + curr.tasks.length,
    0,
  );
  const completedTasks = timelineData.reduce(
    (acc, curr) => acc + curr.tasks.filter((t) => t.done).length,
    0,
  );
  const overallProgressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newSchedule.name || !newSchedule.time) return;
    setSchedules([...schedules, newSchedule]);
    setNewSchedule({ name: "", location: "", time: "" });
    setIsModalOpen(false);
  };

  const handleOpenTaskModal = () => {
    setNewTask((prev) => ({
      ...prev,
      sectionId: timelineData[0]?.id || 1,
    }));
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.name.trim()) return;

    const createdTask = {
      id: Date.now(),
      name: newTask.name.trim(),
      done: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      notes: newTask.notes,
    };

    setTimelineData((prevData) =>
      prevData.map((section) =>
        section.id === newTask.sectionId
          ? { ...section, tasks: [...section.tasks, createdTask] }
          : section,
      ),
    );

    setNewTask({
      name: "",
      sectionId: timelineData[0]?.id || 1,
      dueDate: "",
      priority: "LOW",
      notes: "",
    });
    setIsTaskModalOpen(false);
  };

  const getPriorityStyle = (priority) => {
    if (priority === "HIGH") return "bg-[#FFF0EE] text-[#FF6A5A]";
    if (priority === "MEDIUM") return "bg-[#FFF7E6] text-[#FFB03A]";
    if (priority === "LOW") return "bg-[#F0F5FF] text-[#597EF7]";
    return "hidden";
  };

  return (
    <div className="w-full text-[#171717] font-raleway space-y-6">
    
        <TimelineHeader onAddTaskClick={handleOpenTaskModal} />

        <OverallProgressCard
          overallProgressPercentage={overallProgressPercentage}
        />

        {timelineData.map((section) => (
          <ChecklistSectionCard
            key={section.id}
            section={section}
            onToggleTask={handleToggleTask}
            onNotesChange={handleNotesChange}
            getPriorityStyle={getPriorityStyle}
          />
        ))}

        <WeddingScheduleCard
          schedules={schedules}
          onOpenModal={() => setIsModalOpen(true)}
        />
      

      <AddScheduleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newSchedule={newSchedule}
        setNewSchedule={setNewSchedule}
        onSubmit={handleAddSchedule}
      />

      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        taskForm={newTask}
        setTaskForm={setNewTask}
        sections={timelineData}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default Timeline;
