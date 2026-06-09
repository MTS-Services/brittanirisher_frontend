import React, { useState } from "react";
import { X, Clock3 } from "lucide-react";

// ─── Custom Time Picker ───────────────────────────────────────
const TimePicker = ({ value, onChange }) => {
  // Parse existing value like "07:30 PM"
  const parseTime = (val) => {
    if (!val) return { hour: "07", minute: "00", period: "AM" };
    const match = val.match(/^(\d{2}):(\d{2})\s?(AM|PM)$/i);
    if (match) return { hour: match[1], minute: match[2], period: match[3].toUpperCase() };
    return { hour: "07", minute: "00", period: "AM" };
  };

  const { hour, minute, period } = parseTime(value);

  const update = (newHour, newMinute, newPeriod) => {
    onChange(`${newHour}:${newMinute} ${newPeriod}`);
  };

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = ["00", "15", "30", "45"];

  return (
    <div className="flex items-center gap-2 h-11 w-full rounded-lg border border-[#d8d8d8] bg-[#f3f3f3] px-3 focus-within:border-[#9bae99] transition">
      <Clock3 className="h-4 w-4 text-[#9bae99] shrink-0" />

      {/* Hour */}
      <select
        value={hour}
        onChange={(e) => update(e.target.value, minute, period)}
        className="bg-transparent text-base text-[#363636] outline-none cursor-pointer"
      >
        {hours.map((h) => (
          <option key={h} value={h}>{h}</option>
        ))}
      </select>

      <span className="text-[#8c8c8c] font-semibold">:</span>

      {/* Minute */}
      <select
        value={minute}
        onChange={(e) => update(hour, e.target.value, period)}
        className="bg-transparent text-base text-[#363636] outline-none cursor-pointer"
      >
        {minutes.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {/* AM/PM */}
      <div className="ml-auto flex gap-1">
        {["AM", "PM"].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => update(hour, minute, p)}
            className={`px-2 py-0.5 rounded text-xs font-semibold transition ${
              period === p
                ? "bg-[#9bae99] text-white"
                : "text-[#8c8c8c] hover:bg-[#e8e8e8]"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────
const AddScheduleModal = ({ isOpen, onClose, onScheduleAdded }) => {
  const [form, setForm] = useState({
    eventName: "",
    location: "",
    startTime: "07:00 AM",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.eventName || !form.startTime) return;

    setIsSubmitting(true);
    try {
      await onScheduleAdded(form);
      setForm({ eventName: "", location: "", startTime: "07:00 AM" });
      onClose();
    } catch (err) {
      console.error("Failed to add schedule:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm({ eventName: "", location: "", startTime: "07:00 AM" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#f8f8f8] p-5 shadow-2xl md:p-6">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-md p-1 text-[#121212] transition hover:bg-black/5"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" strokeWidth={1.75} />
        </button>

        <h3 className="font-serif text-lg text-[#1f1f1f]">Add Schedule</h3>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="text-base font-medium text-[#1f1f1f]">Event Name</label>
            <input
              type="text"
              placeholder="e.g., First Look Photos"
              value={form.eventName}
              onChange={(e) => setForm({ ...form, eventName: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#d8d8d8] bg-[#f3f3f3] px-3 text-base text-[#363636] placeholder:text-[#8c8c8c] focus:border-[#9bae99] focus:outline-none"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-base font-medium text-[#1f1f1f]">Location</label>
            <input
              type="text"
              placeholder="e.g., Garden Courtyard"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="h-11 w-full rounded-lg border border-[#d8d8d8] bg-[#f3f3f3] px-3 text-base text-[#363636] placeholder:text-[#8c8c8c] focus:border-[#9bae99] focus:outline-none"
            />
          </div>

          {/* Time Picker */}
          <div className="space-y-2">
            <label className="text-base font-medium text-[#1f1f1f]">Time</label>
            <TimePicker
              value={form.startTime}
              onChange={(val) => setForm({ ...form, startTime: val })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 rounded-lg bg-[#8d9f8b] px-6 py-2 text-base font-medium text-[#445247] transition hover:bg-[#7f927e] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScheduleModal;