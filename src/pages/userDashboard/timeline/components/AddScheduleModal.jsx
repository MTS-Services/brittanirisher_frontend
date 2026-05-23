import React from 'react';
import { X } from 'lucide-react';

const AddScheduleModal = ({ isOpen, onClose, newSchedule, setNewSchedule, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#f8f8f8] p-5 shadow-2xl md:p-6">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1 text-[#121212] transition hover:bg-black/5"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>
        <h3 className="font-serif text-lg text-[#1f1f1f]">Add Schedule</h3>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div className="space-y-2">
            <label className="text-base font-medium text-[#1f1f1f]">Name</label>
            <input
              type="text"
              placeholder="e.g., First Look Photos"
              value={newSchedule.name}
              onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#d8d8d8] bg-[#f3f3f3] px-3 text-base text-[#363636] placeholder:text-[#8c8c8c] focus:border-[#9bae99] focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-[#1f1f1f]">Location</label>
            <input
              type="text"
              placeholder="e.g., Garden Courtyard"
              value={newSchedule.location}
              onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#d8d8d8] bg-[#f3f3f3] px-3 text-base text-[#363636] placeholder:text-[#8c8c8c] focus:border-[#9bae99] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-[#1f1f1f]">Time</label>
            <input
              type="text"
              placeholder="-- : --"
              value={newSchedule.time}
              onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#d8d8d8] bg-[#f3f3f3] px-3 text-base text-[#363636] placeholder:text-[#8c8c8c] focus:border-[#9bae99] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-1 rounded-lg bg-[#8d9f8b] px-6 py-2 text-base font-medium text-[#445247] transition hover:bg-[#7f927e]"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScheduleModal;
