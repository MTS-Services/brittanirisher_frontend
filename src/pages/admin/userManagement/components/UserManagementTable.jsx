import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';

export default function UserManagementTable({ activeTab, pagedRows }) {
  const [openId, setOpenId] = useState(null);
  const [menuPos, setMenuPos] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenId(null);
        setMenuPos(null);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const toggleMenu = (rowId, event) => {
    if (openId === rowId) {
      setOpenId(null);
      setMenuPos(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const menuWidth = 176;
    const left = Math.min(
      Math.max(rect.right - menuWidth, 8),
      window.innerWidth - menuWidth - 8,
    );
    const top = rect.bottom + 8;

    setOpenId(rowId);
    setMenuPos({ top, left });
  };

  const handleAction = (action, row) => {
    setOpenId(null);
    setMenuPos(null);
    // placeholder for actual action handlers
    // eslint-disable-next-line no-console
    console.log(action, row);
  };

  return (
    <div className='hidden lg:block overflow-x-auto'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='bg-[#F6FBFF] border-y border-gray-100'>
            <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Name</th>
            <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Email</th>
            <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Phone Number</th>
            <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Location</th>

            {activeTab === 'couple' ? (
              <>
                <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Wedding Style</th>
                <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Wedding Date</th>
                <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Budget</th>
                <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Spent</th>
                <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Remaining</th>
              </>
            ) : (
              <>
                <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Subscription Name</th>
                <th className='text-left px-4 py-3 text-base font-medium text-[#000000] tracking-wide'>Price</th>
                <th className='text-center px-6 py-3 text-base font-medium text-[#000000] tracking-wide'>Action</th>
              </>
            )}
          </tr>
        </thead>

        <tbody className='divide-y divide-gray-100'>
          {pagedRows.map((row) => (
            <tr key={row.email} className='hover:bg-gray-50/60 transition-colors'>
              <td className='px-4 py-4 text-gray-800'>{row.name}</td>
              <td className='px-4 py-4 text-gray-600'>{row.email}</td>
              <td className='px-4 py-4 text-gray-600'>{row.phone}</td>
              <td className='px-4 py-4 text-gray-600'>{row.location}</td>

              {activeTab === 'couple' ? (
                <>
                  <td className='px-4 py-4 text-gray-600'>{row.weddingStyle}</td>
                  <td className='px-4 py-4 text-gray-600'>{row.weddingDate}</td>
                  <td className='px-4 py-4 text-gray-600'>{row.budget}</td>
                  <td className='px-4 py-4 text-gray-600'>{row.spent}</td>
                  <td className='px-4 py-4 text-gray-600'>{row.remaining}</td>
                </>
              ) : (
                <>
                  <td className='px-4 py-4 text-gray-600'>{row.subscriptionName}</td>
                  <td className='px-4 py-4 text-gray-600'>{row.price}</td>
                  <td className='px-4 py-4 text-center'>
                    <button
                      type='button'
                      data-action-button={row.email}
                      onClick={(e) => toggleMenu(row.email, e)}
                      className='inline-flex items-center justify-center text-gray-400 hover:text-gray-600 transition'
                      aria-expanded={openId === row.email}
                      aria-label='Open action menu'
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

          {openId && menuPos && createPortal(
            <div
              ref={menuRef}
              style={{
                position: 'fixed',
                top: menuPos.top,
                left: menuPos.left,
                width: 176,
              }}
              className='z-50 rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden'
            >
              <button
                type='button'
                onClick={() => handleAction('details', pagedRows.find((row) => row.email === openId))}
                className='block w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50'
              >
                See Details
              </button>
              <button
                type='button'
                onClick={() => handleAction('suspend', pagedRows.find((row) => row.email === openId))}
                className='block w-full px-4 py-3 text-left text-sm text-orange-500 hover:bg-gray-50'
              >
                Suspend
              </button>
              <button
                type='button'
                onClick={() => handleAction('active', pagedRows.find((row) => row.email === openId))}
                className='block w-full px-4 py-3 text-left text-sm text-green-600 hover:bg-gray-50'
              >
                Active
              </button>
            </div>,
            document.body,
          )}
    </div>
  );
}
