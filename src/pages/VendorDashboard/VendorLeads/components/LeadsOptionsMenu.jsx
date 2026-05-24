const STATUS_OPTIONS = [ 'Pending', 'Contracted'];

const LeadsOptionsMenu = ({ lead, openUp = false, onSeeDetails, onDelete, onStatusChange }) => (
  <div
    className={`absolute right-0 z-50 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg ${
      openUp ? 'bottom-full mb-2' : 'top-full mt-2'
    }`}
    onClick={(event) => event.stopPropagation()}
  >
    <button
      type='button'
      onClick={() => onSeeDetails(lead)}
      className='w-full px-4 py-2.5 text-left text-[14px] text-[#555] hover:bg-[#f7f7f7]'
    >
      See Details
    </button>
    <button
      type='button'
      onClick={() => onDelete(lead.id)}
      className='w-full px-4 py-2.5 text-left text-[14px] text-[#555] hover:bg-[#f7f7f7]'
    >
      Delete
    </button>

    {STATUS_OPTIONS.map((status) => (
      <button
        key={status}
        type='button'
        onClick={() => onStatusChange(lead.id, status)}
        className={`w-full px-4 py-1.5 text-left text-[14px] hover:bg-[#f7f7f7] ${lead.status === status ? 'text-[#111]' : 'text-[#666]'}`}
      >
        {status}
      </button>
    ))}
  </div>
);

export default LeadsOptionsMenu;
