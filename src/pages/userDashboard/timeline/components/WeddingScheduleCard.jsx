import React from 'react';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';

const WeddingScheduleCard = ({ schedules, onOpenModal }) => {
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
          Add Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {schedules.map((schedule, index) => (
          <div key={index} className="flex items-center gap-4 p-3 border border-[#F5F5F5] bg-[#FDFCFC] rounded-xl">
            <div className="flex flex-col items-center justify-center bg-[#FFFBF7] border border-[#F7EAD9] rounded-lg p-2 min-w-[75px]">
              <Clock3 className="h-3.5 w-3.5 text-[#FFB03A]" />
              <span className="text-[11px] font-bold text-[#707070] mt-0.5 whitespace-nowrap">{schedule.time}</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#2f2f2f]">{schedule.name}</h4>
              <p className="text-xs text-[#9a9a9a] mt-0.5 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {schedule.location || 'Not Specified'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeddingScheduleCard;
