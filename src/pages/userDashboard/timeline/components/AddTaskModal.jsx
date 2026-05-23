import React from 'react';
import { Calendar, X } from 'lucide-react';

const AddTaskModal = ({
  isOpen,
  onClose,
  taskForm,
  setTaskForm,
  sections,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed font-raleway  inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
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

        <form onSubmit={onSubmit} className="mt-3 space-y-3">
          <div>
            <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Task Name</label>
            <input
              type="text"
              placeholder="e.g. Book wedding photographer"
              value={taskForm.name}
              onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
              className="h-9 w-full rounded-lg border border-[#d7d7d7] bg-white px-3 font-raleway text-sm text-[#2f2f2f] placeholder:text-[#a2a2a2] focus:border-[#9bae99] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Phase/Category</label>
              <select
                value={taskForm.sectionId}
                onChange={(e) => setTaskForm({ ...taskForm, sectionId: Number(e.target.value) })}
                className="h-9 w-full rounded-lg border border-[#d7d7d7] bg-white px-3 font-raleway text-xs text-[#5a5a5a] focus:border-[#9bae99] focus:outline-none"
              >
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={taskForm.dueDate}
                  onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                  className="h-9 w-full rounded-lg border border-[#d7d7d7] bg-white px-3 pr-9 font-raleway text-xs text-[#5a5a5a] focus:border-[#9bae99] focus:outline-none"
                />
                <Calendar className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9a9a9a]" />
              </div>
            </div>
          </div>

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

          <div>
            <label className="mb-1 block font-raleway text-base text-[#2f2f2f]">Notes</label>
            <textarea
              value={taskForm.notes}
              onChange={(e) => setTaskForm({ ...taskForm, notes: e.target.value })}
              placeholder="Add vendor details or reminders..."
              className="min-h-20 w-full resize-none rounded-lg border border-[#d7d7d7] bg-white p-3 font-raleway text-xs text-[#5a5a5a] placeholder:text-[#a2a2a2] focus:border-[#9bae99] focus:outline-none"
            ></textarea>
          </div>

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
