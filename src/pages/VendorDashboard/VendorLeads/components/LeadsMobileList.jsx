import { MoreVertical } from 'lucide-react';
import LeadsOptionsMenu from './LeadsOptionsMenu';
import StatusBadge from './StatusBadge';

const LeadsMobileList = ({ leads, openMenuId, onMenuToggle, onSeeDetails, onDelete, onStatusChange }) => (
  <section className='divide-y divide-gray-50 sm:hidden'>
    {leads.map((lead, index) => (
      <article key={lead.id} data-lead-row data-lead-card className='px-5 py-4'>
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0'>
            <h3 className='truncate text-sm font-semibold text-gray-800'>{lead.name}</h3>
            <p className='mt-1 truncate text-xs text-gray-500'>Email: {lead.email}</p>
            <p className='mt-0.5 text-xs text-gray-500'>Phone: {lead.phone}</p>
          </div>

          <div className='relative flex shrink-0 items-center gap-2'>
            <StatusBadge status={lead.status} />
            <button
              type='button'
              aria-expanded={openMenuId === lead.id}
              onClick={(event) => onMenuToggle(event, lead.id)}
              className='text-gray-400 transition hover:text-gray-600'
            >
              <MoreVertical size={16} />
            </button>

            {openMenuId === lead.id ? (
              <LeadsOptionsMenu
                lead={lead}
                openUp={index >= leads.length - 2}
                onSeeDetails={onSeeDetails}
                onDelete={onDelete}
                onStatusChange={onStatusChange}
              />
            ) : null}
          </div>
        </div>
      </article>
    ))}
  </section>
);

export default LeadsMobileList;
