import React from 'react';

const ChecklistSectionCard = ({ section, onToggleTask, onNotesChange, getPriorityStyle }) => {
  const sectionCompleted = section.tasks.filter((t) => t.done).length;

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-2xl p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold tracking-wider text-[#9a9a9a] uppercase">{section.phase}</span>
          <h2 className="text-2xl font-serif text-[#2f2f2f] mt-0.5">{section.title}</h2>
        </div>
        <div className="text-right flex items-center gap-3">
          <div>
            <span className="block text-[10px] font-bold text-[#b2b2b2] tracking-wider uppercase">COMPLETION</span>
            <span className="text-sm font-semibold text-[#5a5a5a]">
              {sectionCompleted}/{section.tasks.length} Tasks
            </span>
          </div>
          <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {section.tasks.map((task) => (
          <label
            key={task.id}
            className="flex min-h-12 cursor-pointer items-center justify-between rounded-xl border border-[#EBEBEB] bg-[#FDFCFC] px-4 transition hover:bg-gray-50"
          >
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => onToggleTask(section.id, task.id)}
                className="h-5 w-5 rounded border border-[#aaaaaa] bg-white accent-[#9bae99] cursor-pointer transition-all"
              />
              <span
                className={`ml-3 text-base transition-all ${
                  task.done ? 'text-[#a8a8a8] line-through' : 'text-[#5a5a5a]'
                }`}
              >
                {task.name}
              </span>
            </div>
            {task.priority && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getPriorityStyle(task.priority)}`}>
                {task.priority}
              </span>
            )}
          </label>
        ))}
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-100">
        <label className="text-xs font-bold text-[#707070] uppercase tracking-wider">PHASE NOTES</label>
        <textarea
          value={section.notes}
          onChange={(e) => onNotesChange(section.id, e.target.value)}
          placeholder="Write vendor names, reminders, or confirmation numbers..."
          className="w-full min-h-[100px] p-3 text-sm border border-[#EBEBEB] rounded-xl focus:outline-none focus:border-[#9bae99] resize-none placeholder-gray-300"
        ></textarea>
        <div className="flex justify-end">
          <button className="bg-[#9bae99] bg-opacity-70 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-opacity-100 transition">
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistSectionCard;
