import React from 'react';
import { CheckCircle2, Clock3, Eye, Trash2 } from 'lucide-react';

const STATUS_OPTIONS = ['NEW', 'PENDING', 'REPLIED', 'IGNORED', 'CONTRACTED'];

const statusIconMap = {
  PENDING: Clock3,
  CONTRACTED: CheckCircle2,
};

const LeadsOptionsMenu = ({ lead, openUp = false, onSeeDetails, onDelete, onStatusChange }) => (
  <div
    className={`absolute right-0 z-50 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg ${
      openUp ? 'bottom-full mb-2' : 'top-full mt-2'
    }`}
    onClick={(event) => event.stopPropagation()}
  >
    {/* See Details Button */}
    <button
      type='button'
      onClick={() => onSeeDetails(lead)}
      className='flex w-full items-center gap-2 px-4 py-2.5 text-left text-[14px] text-[#555] hover:bg-[#f7f7f7]'
    >
      <Eye size={14} className='text-[#6b7280]' />
      <span>See Details</span>
    </button>

    {/* Delete Button */}
    <button
      type='button'
      onClick={() => onDelete(lead.id)}
      className='flex w-full items-center gap-2 px-4 py-2.5 text-left text-[14px] text-[#555] hover:bg-[#f7f7f7]'
    >
      <Trash2 size={14} className='text-[#6b7280]' />
      <span>Delete</span>
    </button>

    {STATUS_OPTIONS.map((status) => (
      <button
        key={status}
        type='button'
        onClick={() => onStatusChange(lead.id, status)}
        className={`flex w-full items-center gap-2 px-4 py-1.5 text-left text-[14px] hover:bg-[#f7f7f7] ${
          lead.status === status ? 'text-[#111] font-medium bg-gray-50/50' : 'text-[#666]'
        }`}
      >
        {(() => {
          const Icon = statusIconMap[status];
          return Icon ? (
            <Icon 
              size={14} 
              className={lead.status === status ? 'text-[#111]' : 'text-[#6b7280]'} 
            />
          ) : null;
        })()}
        <span>{status}</span>
      </button>
    ))}
  </div>
);

export default LeadsOptionsMenu;