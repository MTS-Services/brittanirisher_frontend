import { MoreVertical } from "lucide-react";
import VendorStatusBadge from "./VendorStatusBadge";

export default function RequestedVendorsTable({
  paged,
  openId,
  toggleMenu,
  isLoading,
  emptyMessage,
}) {
  return (
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
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                Loading vendors...
              </td>
            </tr>
          ) : paged.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paged.map((vendor) => (
              <tr key={vendor.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-3.5 text-gray-800 font-medium text-sm">
                  {vendor.name}
                </td>
                <td className="px-6 py-3.5 text-gray-500 text-sm">
                  {vendor.category}
                </td>
                <td className="px-6 py-3.5 text-gray-500 text-sm">{vendor.date}</td>
                <td className="px-6 py-3.5">
                  <VendorStatusBadge status={vendor.status} />
                </td>
                <td className="px-6 py-3.5 align-middle text-center">
                  <div className="relative inline-block">
                    <button
                      aria-expanded={openId === vendor.id}
                      onClick={(e) => toggleMenu(vendor.id, e)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
