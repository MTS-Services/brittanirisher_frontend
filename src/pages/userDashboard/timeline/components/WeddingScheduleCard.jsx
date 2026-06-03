import React, { useState } from "react";
import { CalendarDays, Clock3, MapPin, Pencil, Trash2, X, Check } from "lucide-react";
import {
  useGetCoupleScheduleQuery,
  useUpdateCoupleScheduleMutation,
  useDeleteCoupleScheduleMutation,
} from "../../../../store/features/couple/coupleDashboard";


const ScheduleSkeleton = () => (
  <div className="w-full animate-pulse space-y-6">
    <div className="h-12 bg-gray-200 rounded-xl w-1/3" />
    <div className="h-24 bg-gray-200 rounded-2xl w-full" />
    <div className="h-48 bg-gray-200 rounded-2xl w-full" />
  </div>
);

// ─── Inline Edit Row ──────────────────────────────────────────
const EditRow = ({ schedule, onSave, onCancel }) => {
  const [form, setForm] = useState({
    eventName: schedule.eventName || "",
    location: schedule.location || "",
    startTime: schedule.startTime || "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="flex flex-col gap-2 p-3 border border-[#9bae99] bg-[#f7fbf7] rounded-xl">
      <div className="flex gap-2 flex-wrap">
        <input
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          placeholder="Time (e.g. 10:00 AM)"
          className="border border-[#EBEBEB] rounded-lg px-2 py-1 text-xs w-full sm:w-[130px] outline-none focus:border-[#9bae99]"
        />
        <input
          name="eventName"
          value={form.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          className="border border-[#EBEBEB] rounded-lg px-2 py-1 text-xs flex-1 outline-none focus:border-[#9bae99]"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border border-[#EBEBEB] rounded-lg px-2 py-1 text-xs flex-1 outline-none focus:border-[#9bae99]"
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => onSave(form)}
          className="flex items-center gap-1 bg-[#9bae99] text-white text-xs px-3 py-1 rounded-lg hover:bg-[#8aa088] transition"
        >
          <Check className="h-3 w-3" /> Save
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 border border-[#EBEBEB] text-[#707070] text-xs px-3 py-1 rounded-lg hover:bg-[#f5f5f5] transition"
        >
          <X className="h-3 w-3" /> Cancel
        </button>
      </div>
    </div>
  );
};

// ─── Delete Confirm Overlay ───────────────────────────────────
const DeleteConfirm = ({ onConfirm, onCancel }) => (
  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center gap-3 z-10">
    <span className="text-xs text-[#707070]">Delete this event?</span>
    <button
      onClick={onConfirm}
      className="bg-red-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-600 transition"
    >
      Yes, Delete
    </button>
    <button
      onClick={onCancel}
      className="border border-[#EBEBEB] text-[#707070] text-xs px-3 py-1 rounded-lg hover:bg-[#f5f5f5] transition"
    >
      Cancel
    </button>
  </div>
);

// ─── Schedule Item ────────────────────────────────────────────
const ScheduleItem = ({ schedule, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="relative flex items-center gap-4 p-3 border border-[#F5F5F5] bg-[#FDFCFC] rounded-xl group">
      <div className="flex flex-col items-center justify-center bg-[#FFFBF7] border border-[#F7EAD9] rounded-lg p-2 min-w-[75px]">
        <Clock3 className="h-3.5 w-3.5 text-[#FFB03A]" />
        <span className="text-[11px] font-bold text-[#707070] mt-0.5 whitespace-nowrap">
          {schedule.startTime}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#2f2f2f] truncate">
          {schedule.eventName}
        </h4>
        <p className="text-xs text-[#9a9a9a] mt-0.5 flex items-center gap-1">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{schedule.location || "Not Specified"}</span>
        </p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => onEdit(schedule)}
          className="p-1.5 rounded-lg hover:bg-[#f0f5f0] text-[#9bae99] transition"
          title="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="p-1.5 rounded-lg hover:bg-[#fff0ee] text-[#FF6A5A] transition"
          title="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {showDeleteConfirm && (
        <DeleteConfirm
          onConfirm={() => {
            onDelete(schedule.id);
            setShowDeleteConfirm(false);
          }}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────
const WeddingScheduleCard = ({ onOpenModal }) => {
  const { data: schedules = [], isLoading, isError } = useGetCoupleScheduleQuery();
  const [updateCoupleSchedule] = useUpdateCoupleScheduleMutation();
  const [deleteCoupleSchedule] = useDeleteCoupleScheduleMutation();
  const [editingId, setEditingId] = useState(null);

  if (isLoading) return <ScheduleSkeleton />;
  if (isError) return (
    <div className="text-center py-10 text-red-500">
      Failed to load schedule data.
    </div>
  );

  const handleEdit = (schedule) => setEditingId(schedule.id);

  const handleSaveEdit = async (id, formData) => {
    try {
      await updateCoupleSchedule({ id, body: formData }).unwrap();
      setEditingId(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCoupleSchedule(id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="bg-white font-raleway border border-[#EBEBEB] rounded-xl p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-[#8aa088]" />
          <h2 className="text-2xl font-serif text-[#2f2f2f]">Wedding Day Schedule</h2>
        </div>
        <button
          onClick={onOpenModal}
          className="bg-[#9bae99] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#8aa088] transition"
        >
          + Add Schedule
        </button>
      </div>

      {schedules.length > 0 && (
        <p className="text-xs text-[#9a9a9a]">
          {schedules.length} event{schedules.length !== 1 ? "s" : ""} planned
        </p>
      )}

      {schedules.length === 0 ? (
        <div className="text-center py-10 text-[#c0c0c0] text-sm">
          No events added yet. Click{" "}
          <span className="text-[#9bae99] font-medium">+ Add Schedule</span> to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {schedules.map((schedule) =>
            editingId === schedule.id ? (
              <EditRow
                key={schedule.id}
                schedule={schedule}
                onSave={(formData) => handleSaveEdit(schedule.id, formData)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <ScheduleItem
                key={schedule.id}
                schedule={schedule}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default WeddingScheduleCard;