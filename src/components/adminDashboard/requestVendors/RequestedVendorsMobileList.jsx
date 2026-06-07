import { MoreVertical } from "lucide-react";
import VendorStatusBadge from "./VendorStatusBadge";

export default function RequestedVendorsMobileList({
  paged,
  openId,
  toggleMenu,
  isLoading,
  emptyMessage,
}) {
  if (isLoading) {
    return (
      <div className="sm:hidden px-5 py-8 text-center text-sm text-gray-500">
        Loading vendors...
      </div>
    );
  }

  if (paged.length === 0) {
    return (
      <div className="sm:hidden px-5 py-8 text-center text-sm text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="sm:hidden divide-y divide-gray-50">
      {paged.map((vendor) => (
        <div key={vendor.id} className="px-5 py-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{vendor.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">
              {vendor.category} · {vendor.date}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 relative">
            <VendorStatusBadge status={vendor.status} />
            <button
              aria-expanded={openId === vendor.id}
              onClick={(e) => toggleMenu(vendor.id, e)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
