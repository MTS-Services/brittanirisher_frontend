import { MoreVertical } from 'lucide-react';
import LeadsOptionsMenu from './LeadsOptionsMenu';
import StatusBadge from './StatusBadge';

const LeadsMobileList = ({ leads, openMenuId, onMenuToggle, onSeeDetails, onDelete, onStatusChange }) => (
  <section className='space-y-4 sm:hidden'>
    {leads.map((lead, index) => (
      <article
        key={lead.id}
        data-lead-row
        data-lead-card
        className='rounded-2xl border border-[#e8ecef] bg-white p-4 shadow-[0_14px_30px_rgba(15,23,42,0.06)]'
      >
        <div className='flex items-start justify-between gap-3'>
          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center gap-2'>
              <h3 className='truncate text-base font-semibold text-[#1f2937]'>
                {lead.senderName || lead.name}
              </h3>
              <StatusBadge status={lead.status} />
            </div>

            <div className='mt-4 space-y-2'>
              <div className='rounded-xl bg-[#f8fafc] px-3 py-2'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]'>
                  Email
                </p>
                <p className='mt-1 truncate text-sm text-[#475569]'>
                  {lead.senderEmail || lead.email || 'N/A'}
                </p>
              </div>

              <div className='rounded-xl bg-[#f8fafc] px-3 py-2'>
                <p className='text-[11px] font-semibold uppercase tracking-[0.16em] text-[#94a3b8]'>
                  Phone
                </p>
                <p className='mt-1 text-sm text-[#475569]'>
                  {lead.senderPhone || lead.phone || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className='relative flex shrink-0 items-start'>
            <button
              type='button'
              aria-expanded={openMenuId === lead.id}
              onClick={(event) => onMenuToggle(event, lead.id)}
              className='rounded-full border border-[#e5e7eb] bg-[#f8fafc] p-2 text-[#64748b] transition hover:border-[#cbd5e1] hover:text-[#334155]'
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
