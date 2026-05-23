import { useState } from 'react';

const initialLeads = [
  {
    id: 1,
    name: 'Eleanor Pena',
    email: 'aliza@gmail.com',
    phone: '+880 1712-345678',
    status: 'New',
    message: 'I want to book a reservation for my upcoming marriage. Can you tell me about the details of the packages.',
  },
  {
    id: 2,
    name: 'Esther Howard',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Pending',
    message: 'Looking for a flexible wedding package with vendor support.',
  },
  {
    id: 3,
    name: 'Annette Black',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Need confirmation for venue, catering, and decoration services.',
  },
  {
    id: 4,
    name: 'Jenny Wilson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Please share your available dates for the next season.',
  },
  {
    id: 5,
    name: 'Darlene Robertson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Pending',
    message: 'Interested in premium wedding planning with photography add-ons.',
  },
  {
    id: 6,
    name: 'Guy Hawkins',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Confirming the contracted package details and timeline.',
  },
  {
    id: 7,
    name: 'Jerome Bell',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'New',
    message: 'Need a starter package for a small wedding ceremony.',
  },
  {
    id: 8,
    name: 'Kristin Watson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Pending',
    message: 'Would love to know package pricing and inclusion list.',
  },
  {
    id: 9,
    name: 'Kristin Watson',
    email: 'liyana@gmail.com',
    phone: '+880 1934-567890',
    status: 'Contracted',
    message: 'Following up on the final contracted service details.',
  },
];

const statusStyle = {
  New: { bg: '#2f3d8a', text: '#fff' },
  Pending: { bg: '#e17b00', text: '#fff' },
  Contracted: { bg: '#18b300', text: '#fff' },
};

function StatusBadge({ status }) {
  const palette = statusStyle[status] || { bg: '#999', text: '#fff' };

  return (
    <span
      style={{ backgroundColor: palette.bg, color: palette.text }}
      className='inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[14px] font-normal'
      style={{ minWidth: '88px' }}
    >
      {status}
    </span>
  );
}

function DotsIcon() {
  return (
    <svg width='18' height='18' viewBox='0 0 20 20' fill='currentColor'>
      <circle cx='10' cy='4.5' r='1.5' />
      <circle cx='10' cy='10' r='1.5' />
      <circle cx='10' cy='15.5' r='1.5' />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className='h-4 w-4 text-[#6b7280]' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
      <circle cx='12' cy='8' r='4' />
      <path d='M4 20c0-4 3.6-7 8-7s8 3 8 7' />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width='18' height='18' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
      <line x1='18' y1='6' x2='6' y2='18' />
      <line x1='6' y1='6' x2='18' y2='18' />
    </svg>
  );
}

function OptionsMenu({ lead, onSeeDetails, onDelete, onStatusChange, onClose }) {
  return (
    <div
      className='absolute right-8 top-2 z-50 w-44 overflow-hidden rounded-[14px] border border-[#e1e1e1] bg-white py-1 shadow-[0_12px_32px_rgba(0,0,0,0.16)]'
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className='w-full px-4 py-2.5 text-left text-[15px] text-[#1f1f1f] hover:bg-[#f7f7f7]'
        onClick={() => onSeeDetails(lead)}
      >
        See Details
      </button>
      <button
        className='w-full px-4 py-2.5 text-left text-[15px] text-[#1f1f1f] hover:bg-[#f7f7f7]'
        onClick={() => onDelete(lead.id)}
      >
        Delete
      </button>
      <div className='px-4 pb-1 pt-2 text-[18px] font-normal text-[#111]'>Status</div>
      {['New', 'Pending', 'Contracted'].map((status) => (
        <button
          key={status}
          className={`w-full px-4 py-2 text-left text-[15px] hover:bg-[#f7f7f7] ${lead.status === status ? 'font-medium text-[#111]' : 'text-[#666]'}`}
          onClick={() => onStatusChange(lead.id, status)}
        >
          {status}
        </button>
      ))}
      <button className='sr-only' onClick={onClose} />
    </div>
  );
}

function DetailsModal({ lead, onClose }) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4'
      onClick={onClose}
    >
      <div
        className='w-full rounded-2xl bg-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]'
        style={{ maxWidth: '390px', borderRadius: '14px' }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className='flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4'>
          <h2 className='text-[20px] font-normal text-[#111]'>Leads Details</h2>
          <button onClick={onClose} className='text-[#666]'>
            <CloseIcon />
          </button>
        </div>

        <div className='px-5 py-4'>
          <div className='flex items-center gap-2'>
            <UserIcon />
            <span className='text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]'>Customer Information</span>
          </div>

          <div className='mt-3'>
            <p className='text-[20px] font-semibold leading-tight text-[#111]'>{lead.name}</p>
            <p className='mt-1 text-[14px] text-[#5f5f5f]'>{lead.phone}</p>
            <p className='mt-1 text-[14px] text-[#5f5f5f]'>{lead.email}</p>
          </div>

          <div className='mt-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]'>Client's Details</div>
          <p className='mt-2 text-[15px] leading-[1.6] text-[#222]'>
            {lead.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VendorLeads() {
  const [leads, setLeads] = useState(initialLeads);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  const closeMenu = () => setOpenMenuId(null);

  const handleMenuToggle = (event, id) => {
    event.stopPropagation();
    setOpenMenuId((current) => (current === id ? null : id));
  };

  const handleSeeDetails = (lead) => {
    setSelectedLead(lead);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    setLeads((current) => current.filter((lead) => lead.id !== id));
    setOpenMenuId(null);
  };

  const handleStatusChange = (id, status) => {
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    setOpenMenuId(null);
  };

  return (
    <div className='min-h-screen w-full  font-[Georgia,serif] sm:px-8' onClick={closeMenu}>
      <div className='mb-8'>
        <h1 className='mb-1 text-[42px] font-normal leading-none text-[#111]'>Recent Leads</h1>
        <p className='text-[17px] text-[#8f8f8f]'>Create clear packages to attract the right brides</p>
      </div>

      <div className='overflow-hidden rounded-sm bg-white shadow-sm' style={{ borderRadius: '2px' }}>
        <div className='overflow-x-auto'>
          <table className='min-w-full border-collapse text-sm'>
            <thead>
              <tr className='bg-[#edf4fd]'>
                {['Name', 'Email', 'Phone Number', 'Staus', 'Actions'].map((header) => (
                  <th key={header} className='px-6 py-4 text-left text-[16px] font-normal text-[#1f1f1f]'>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className='border-t border-[#ececec] transition hover:bg-[#fbfbfb]'>
                  <td className='px-6 py-5 text-[15px] font-normal text-[#2b2b2b]'>{lead.name}</td>
                  <td className='px-6 py-5 text-[15px] text-[#666]'>{lead.email}</td>
                  <td className='px-6 py-5 text-[15px] text-[#666]'>{lead.phone}</td>
                  <td className='px-6 py-5'><StatusBadge status={lead.status} /></td>
                  <td className='relative px-6 py-5'>
                    <button className='rounded p-1 text-[#666] transition hover:text-[#111]' onClick={(event) => handleMenuToggle(event, lead.id)}>
                      <DotsIcon />
                    </button>

                    {openMenuId === lead.id ? (
                      <OptionsMenu
                        lead={lead}
                        onSeeDetails={handleSeeDetails}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                        onClose={closeMenu}
                      />
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead ? <DetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} /> : null}
    </div>
  );
}