import React from 'react';

const OverallProgressCard = ({ overallProgressPercentage }) => {
  return (
    <div className="bg-white font-raleway  border border-[#EBEBEB] rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-[#2f2f2f]">Overall Progress</span>
        <span className="text-sm text-[#707070] font-semibold">{overallProgressPercentage}% Complete</span>
      </div>
      <div className="w-full bg-[#EBEBEB] h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-[#9bae99] h-full transition-all duration-500 ease-out"
          style={{ width: `${overallProgressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OverallProgressCard;
