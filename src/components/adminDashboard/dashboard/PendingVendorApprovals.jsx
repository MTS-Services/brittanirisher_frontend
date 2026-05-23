import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { MoreVertical } from 'lucide-react';
import { ROUTES } from '../../../config';

const vendors = [
  {
    id: 1,
    name: 'Elegant Frames',
    category: 'Photography',
    date: '2024-05-10',
    status: 'Reject',
  },
  {
    id: 2,
    name: 'Grand Feast Catering',
    category: 'Catering',
    date: '2024-05-10',
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Midnight Melodies DJ',
    category: 'Entertainment',
    date: '2024-05-10',
    status: 'Reject',
  },
  {
    id: 4,
    name: 'Elegant Frames',
    category: 'Photography',
    date: '2024-05-10',
    status: 'Approved',
  },
  {
    id: 5,
    name: 'Elegant Frames',
    category: 'Photography',
    date: '2024-05-10',
    status: 'Approved',
  },
  {
    id: 6,
    name: 'Elegant Frames',
    category: 'Photography',
    date: '2024-05-10',
    status: 'Approved',
  },
  {
    id: 7,
    name: 'Elegant Frames',
    category: 'Photography',
    date: '2024-05-10',
    status: 'Approved',
  },
  {
    id: 8,
    name: 'Elegant Frames',
    category: 'Photography',
    date: '2024-05-10',
    status: 'Approved',
  },
];

const StatusBadge = ({ status }) => {
  const isApproved = status === 'Approved';
  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
        isApproved
          ? 'bg-[#D5F5E2] text-[#00C950]'
          : 'bg-[#FFF2DD] text-[#F59E0B]'
      }`}
    >
      {status}
    </span>
  );
};

export default function PendingVendorApprovals({ filter = 'all', title = 'Pending Vendor Approvals' }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState(null);
  const activeMenuRef = useRef(null);
  const [menuPos, setMenuPos] = useState(null);
  const perPage = 7;
  const filtered = vendors.filter((v) => {
    if (!filter || filter === 'all') return true;
    if (filter === 'approved') return v.status.toLowerCase() === 'approved';
    if (filter === 'reject') return v.status.toLowerCase() === 'reject';
    return true;
  });
  const totalResults = filtered.length;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => {
    function handleDocClick(e) {
      if (activeMenuRef.current && !activeMenuRef.current.contains(e.target)) {
        setOpenId(null);
        setMenuPos(null);
      }
    }

    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, []);

  const handleAction = (action, vendor) => {
    setOpenId(null);
    setMenuPos(null);

    if (action === 'details' && vendor?.id) {
      navigate(
        ROUTES.ADMIN_VENDOR_DETAILS.replace(':vendorId', String(vendor.id)),
        { state: { vendor } },
      );
      return;
    }

    // TODO: replace with real handlers (API calls / navigation)
    // eslint-disable-next-line no-console
    console.log('action', action, vendor);
  };

  const toggleMenu = (id, evt) => {
    if (openId === id) {
      setOpenId(null);
      setMenuPos(null);
      return;
    }

    const btn = evt.currentTarget;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 176; // matches w-44
    const menuHeight = 140; // approximate
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < menuHeight;
    const left = Math.min(Math.max(rect.right - menuWidth, 8), window.innerWidth - menuWidth - 8);
    // when opening upward, add a little extra gap so the menu sits slightly higher
    const EXTRA_UP_OFFSET = 16;
    const top = openUp ? rect.top - menuHeight - 8 - EXTRA_UP_OFFSET : rect.bottom + 8;

    setOpenId(id);
    setMenuPos({ top, left, openUp });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 sm:px-6 pt-5 pb-4">
        <h2 className="text-xl font-playfair md:text-2xl font-semibold text-gray-900">
          {title}
        </h2>
      </div>

      {/* Desktop / Tablet Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-base font-raleway">
          <thead>
            <tr className="bg-[#F6FBFF] border-y border-gray-100">
              <th className="text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide">
                Vendor
              </th>
              <th className="text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide">
                Category
              </th>
              <th className="text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide">
                Date Joined
              </th>
              <th className="text-left px-6 py-3 text-base font-medium text-[#000000] tracking-wide">
                Status
              </th>
              <th className="text-center px-6 py-3 text-base font-medium text-[#000000] tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {paged.map((v, idx) => (
              <tr
                key={v.id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td className="px-6 py-3.5 text-gray-800 font-medium text-sm">
                  {v.name}
                </td>
                <td className="px-6 py-3.5 text-gray-500 text-sm">
                  {v.category}
                </td>
                <td className="px-6 py-3.5 text-gray-500 text-sm">
                  {v.date}
                </td>
                <td className="px-6 py-3.5">
                  <StatusBadge status={v.status} />
                </td>
                <td className="px-6 py-3.5 align-middle text-center">
                  <div className="relative inline-block">
                    <button
                      aria-expanded={openId === v.id}
                      onClick={(e) => toggleMenu(v.id, e)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden divide-y divide-gray-50">
        {paged.map((v, idx) => (
          <div
            key={v.id}
            className="px-5 py-4 flex items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {v.name}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{v.category} · {v.date}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0 relative">
              <StatusBadge status={v.status} />
              <button
                aria-expanded={openId === v.id}
                onClick={(e) => toggleMenu(v.id, e)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Portal menu rendered to body so it isn't clipped by overflow-hidden */}
      {openId && menuPos && createPortal(
        <div
          ref={activeMenuRef}
          style={{ position: 'fixed', top: menuPos.top, left: menuPos.left, width: 176 }}
          className="bg-white border border-gray-100 rounded-lg shadow-lg z-50"
        >
          <ul className="py-2">
            <li>
              <button
                onClick={() => handleAction('details', vendors.find((x) => x.id === openId))}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                See Details
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAction('approve', vendors.find((x) => x.id === openId))}
                className="w-full text-left px-4 py-2 text-sm text-[#1FB356] hover:bg-gray-50"
              >
                Approved
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAction('reject', vendors.find((x) => x.id === openId))}
                className="w-full text-left px-4 py-2 text-sm text-[#F97316] hover:bg-gray-50"
              >
                Reject
              </button>
            </li>
            <li>
              <button
                onClick={() => handleAction('delete', vendors.find((x) => x.id === openId))}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>,
        document.body,
      )}

      {/* Pagination */}
      <div className="px-5 sm:px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-base font-medium text-[#1FB356]">
          Showing 1 to {Math.min(perPage, totalResults)} of {totalResults}{' '}
          results
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * perPage >= totalResults}
            className="px-4 py-1.5 text-sm border border-[#1FB356] rounded-lg text-[#1FB356] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
