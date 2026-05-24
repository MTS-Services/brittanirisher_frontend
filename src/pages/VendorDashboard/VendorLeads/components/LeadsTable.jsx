import { MoreVertical } from 'lucide-react';
import LeadsOptionsMenu from './LeadsOptionsMenu';
import StatusBadge from './StatusBadge';

const TABLE_HEADERS = ['Name', 'Email', 'Phone Number', 'Status', 'Actions'];

const LeadsTable = ({ leads, openMenuId, onMenuToggle, onSeeDetails, onDelete, onStatusChange }) => (
  <section className='hidden overflow-visible sm:block'>
    <table className='w-full text-base font-raleway'>
        <thead>
          <tr className='border-y border-gray-100 bg-[#F6FBFF]'>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header}
                className={`px-6 py-3 text-base font-medium tracking-wide text-[#000000] ${header === 'Actions' ? 'text-center' : 'text-left'}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-50'>
          {leads.map((lead, index) => (
            <tr key={lead.id} className='transition-colors hover:bg-gray-50/50'>
              <td className='px-6 py-3.5 text-sm font-medium text-gray-800'>{lead.name}</td>
              <td className='px-6 py-3.5 text-sm text-gray-500'>{lead.email}</td>
              <td className='px-6 py-3.5 text-sm text-gray-500'>{lead.phone}</td>
              <td className='px-6 py-3.5'>
                <StatusBadge status={lead.status} />
              </td>
              <td className='relative px-6 py-3.5 text-center align-middle'>
                <div className='relative inline-block'>
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
                      openUp={index === leads.length - 1}
                      onSeeDetails={onSeeDetails}
                      onDelete={onDelete}
                      onStatusChange={onStatusChange}
                    />
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  </section>
);

export default LeadsTable;
