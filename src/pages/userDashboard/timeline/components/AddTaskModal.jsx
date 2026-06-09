import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast'; 

const AddTaskModal = ({
  isOpen,
  onClose,
  taskForm,
  setTaskForm,
  onSubmit,
}) => {
  
  const staticCategories = [
    "1 Year Out",
    "6 Months Out",
    "3 Months Out",
    "The Month of"
  ];

  useEffect(() => {
    if (isOpen && !taskForm.category && staticCategories.length > 0) {
      setTaskForm(prev => ({ ...prev, category: staticCategories[0] }));
    }
  }, [isOpen, taskForm.category, setTaskForm]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskForm.taskName.trim()) {
      toast.error("Task name is required");
      return;
    }

    try {
      await onSubmit(e);
      
      toast.success(`"${taskForm.taskName}" added successfully!`);
    } catch (error) {
      toast.error("Failed to save");
    }
  };

  return (
    <div className="fixed font-raleway inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="relative w-full max-w-lg rounded-xl bg-[#f7f7f7] p-5 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-[#1f1f1f] transition hover:bg-black/5"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="font-raleway text-2xl font-semibold text-[#1f1f1f]">Add New Task</h3>

        <form onSubmit={handleSubmit} className="mt-3 space-y-3">
          {/* Task Name */}
          <div>
            <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Task Name</label>
            <input
              type="text"
              placeholder="e.g. Book wedding photographer"
              value={taskForm.taskName}
              onChange={(e) => setTaskForm({ ...taskForm, taskName: e.target.value })}
              className="h-9 w-full rounded-lg border border-[#d7d7d7] bg-white px-3 font-raleway text-sm text-[#2f2f2f] placeholder:text-[#a2a2a2] focus:border-[#9bae99] focus:outline-none"
              required
            />
          </div>

          {/* Phase & Due Date */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Phase/Category</label>
              <select
                value={taskForm.category || staticCategories[0]}
                onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                className="h-9 w-full rounded-lg border border-[#d7d7d7] bg-white px-3 font-raleway text-xs text-[#5a5a5a] focus:border-[#9bae99] focus:outline-none"
              >
                {staticCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={taskForm.dueDate || ''}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  className="h-9 w-full rounded-lg border border-[#d7d7d7] bg-white px-3 pr-9 font-raleway text-xs text-[#5a5a5a] focus:border-[#9bae99] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {['LOW', 'MEDIUM', 'HIGH'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setTaskForm({ ...taskForm, priority: level })}
                  className={`h-8 rounded-lg border font-raleway text-xs transition ${
                    taskForm.priority === level
                      ? 'border-[#9bae99] bg-[#e9efe8] text-[#5a6d58]'
                      : 'border-[#d7d7d7] bg-white text-[#8a8a8a] hover:bg-[#f4f4f4]'
                  }`}
                >
                  {level.charAt(0) + level.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Notes</label>
            <textarea
              value={taskForm.taskNotes || ''}
              onChange={(e) => setTaskForm({ ...taskForm, taskNotes: e.target.value })}
              placeholder="Add vendor details or reminders..."
              className="min-h-20 w-full resize-none rounded-lg border border-[#d7d7d7] bg-white p-3 font-raleway text-xs text-[#5a5a5a] placeholder:text-[#a2a2a2] focus:border-[#9bae99] focus:outline-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#8c8c8c] bg-white px-4 py-1.5 font-raleway text-xs text-[#3f3f3f] transition hover:bg-[#f1f1f1]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-[#A7B9A6] px-4 py-1.5 font-raleway text-xs text-white transition hover:bg-[#8a9d88]"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;