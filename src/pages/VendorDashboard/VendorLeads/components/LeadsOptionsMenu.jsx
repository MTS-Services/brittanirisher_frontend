import { Check, Eye, Trash2, X } from 'lucide-react';

const STATUS_OPTIONS = ['New', 'Pending', 'Contracted'];

const LeadsOptionsMenu = ({ lead, openUp = false, onSeeDetails, onDelete, onStatusChange }) => (
  <div
    className={`absolute right-0 z-50 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg ${
      openUp ? 'bottom-full mb-2' : 'top-full mt-2'
    }`}
    onClick={(event) => event.stopPropagation()}
  >
    <ul className='py-2'>
      <li>
        <button
          onClick={() => onSeeDetails(lead)}
          className='flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50'
        >
          <Eye size={16} className='text-gray-500' /> <span>View</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => onStatusChange(lead.id, 'Pending')}
          className='flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-[#F97316] hover:bg-gray-50'
        >
          <X size={16} className='text-[#F97316]' /> <span>Mark Pending</span>
        </button>
      </li>
      <li>
        <button
          onClick={() => onDelete(lead.id)}
          className='flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-gray-50'
        >
          <Trash2 size={16} className='text-red-600' /> <span>Delete</span>
        </button>
      </li>
    </ul>
    <div className='border-t border-gray-100 px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>
      Status
    </div>
    <ul className='pb-2'>
      {STATUS_OPTIONS.map((status) => (
        <li key={status}>
          <button
            onClick={() => onStatusChange(lead.id, status)}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-50 ${lead.status === status ? 'text-green-600' : 'text-gray-700'}`}
          >
            <Check size={16} className={lead.status === status ? 'text-green-600' : 'text-gray-400'} />
            <span>{status}</span>
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default LeadsOptionsMenu;
