import React from "react";

const TimelineHeader = ({ onAddTaskClick }) => {
  return (
    <div className="mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
      <div>
        <h1 className="m-0 font-playfair text-2xl leading-tight text-[#1b1b1b] md:text-4xl">
          Ultimate Bridal Timeline Checklist
        </h1>
        <p className="mt-2 font-raleway text-base font-raleway text-[#7a7a7a]">
          Track your wedding planning progress step by step
        </p>
      </div>
      <button
        type="button"
        onClick={onAddTaskClick}
        className="font-raleway rounded-md bg-[#A7B9A6] px-4 py-2 text-sm text-white transition hover:bg-[#a4b5a2]"
      >
        Add New Task
      </button>
    </div>
  );
};

export default TimelineHeader;
