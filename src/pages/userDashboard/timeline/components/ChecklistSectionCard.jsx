import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ChecklistSectionCard = ({ section, onToggleTask, onSaveNote, getPriorityStyle }) => {
  const tasks = section.tasks || [];
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.isCompleted).length;
  
  const [noteText, setNoteText] = useState(section.note || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setNoteText(section.note || "");
  }, [section.note]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleTaskChange = async (taskId, currentStatus) => {
    await onToggleTask(section.id, taskId, currentStatus);

    
    const nextCompletedCount = currentStatus ? completedCount - 1 : completedCount + 1;

    if (totalCount > 0 && nextCompletedCount === totalCount) {
      const sectionName = section.category || "Timeline Phase";
      toast.success(`"${sectionName}" section completed! `, {
        id: `card-completed-${section.id || sectionName}`,
      });
    }
  };

  const handleSaveNote = async () => {
    setIsSaving(true);
    try {
      await onSaveNote(section.id, noteText);
      toast.success("Note saved successfully!");
    } catch (error) {
      toast.error("Failed to save note.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#9a9a9a] uppercase">
            {section.phase || "WEDDING TIMELINE"}
          </span>
          <h2 className="text-2xl font-serif text-[#2f2f2f] mt-0.5">
            {section.category || "Timeline Phase"}
          </h2>
        </div>
        <div className="text-right flex items-center gap-3">
          <div>
            <span className="block text-[10px] font-bold text-[#b2b2b2] tracking-wider uppercase">COMPLETION</span>
            <span className="text-sm font-semibold text-[#5a5a5a]">
              {completedCount}/{totalCount} Tasks
            </span>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex flex-col rounded-xl border border-[#EBEBEB] bg-[#FDFCFC] p-4 space-y-2 transition hover:bg-gray-50">
            <label className="flex cursor-pointer items-center justify-between select-none">
              <div className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleTaskChange(task.id, task.isCompleted)} 
                  className="h-5 w-5 rounded border border-[#aaaaaa] bg-white accent-[#9bae99] cursor-pointer transition-all"
                />
                <span
                  className={`ml-3 text-base transition-all ${
                    task.isCompleted ? 'text-[#a8a8a8] line-through' : 'text-[#5a5a5a]'
                  }`}
                >
                  {task.taskName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {task.dueDate && (
                  <span className="text-xs text-[#9a9a9a]">
                    {formatDate(task.dueDate)}
                  </span>
                )}
                {task.priority && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getPriorityStyle(task.priority)}`}>
                    {task.priority}
                  </span>
                )}
              </div>
            </label>
            
            {task.taskNotes && (
              <p className="text-xs text-[#8a8a8a] pl-8 italic">
                {task.taskNotes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Phase Notes Section */}
      <div className="space-y-2 pt-2 border-t border-gray-100">
        <label className="text-xs font-bold text-[#707070] uppercase tracking-wider">PHASE NOTES</label>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Write vendor names, reminders, or confirmation numbers..."
          className="w-full min-h-[100px] p-3 text-sm border border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#9bae99] resize-none placeholder-gray-300"
        />
        <div className="flex justify-end">
          <button 
            type="button"
            onClick={handleSaveNote}
            disabled={isSaving}
            className="bg-[#9bae99] bg-opacity-70 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-opacity-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Saving..." : "Save Note"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistSectionCard;