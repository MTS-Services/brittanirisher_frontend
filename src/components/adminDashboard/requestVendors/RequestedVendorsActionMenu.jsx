import { createPortal } from "react-dom";
import { Eye, CheckCircle2, Clock3, X, Trash2 } from "lucide-react";

export default function RequestedVendorsActionMenu({
  openId,
  menuPos,
  activeMenuRef,
  vendors,
  onAction,
}) {
  if (!openId || !menuPos) return null;

  const currentVendor = vendors.find((vendor) => vendor.id === openId);

  return createPortal(
    <div
      ref={activeMenuRef}
      style={{
        position: "fixed",
        top: menuPos.top,
        left: menuPos.left,
        width: 176,
      }}
      className="bg-white border border-gray-100 rounded-lg shadow-lg z-50"
    >
      <ul className="py-2">
        <li>
          <button
            onClick={() => onAction("view", currentVendor)}
            className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
          >
            <Eye size={16} className="text-gray-500" /> <span>View</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onAction("status-approved", currentVendor)}
            className="w-full text-left px-4 py-3 text-sm text-[#16A34A] hover:bg-gray-50 flex items-center gap-3"
          >
            <CheckCircle2 size={16} className="text-[#16A34A]" />
            <span>Set Approved</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onAction("status-pending", currentVendor)}
            className="w-full text-left px-4 py-3 text-sm text-[#D97706] hover:bg-gray-50 flex items-center gap-3"
          >
            <Clock3 size={16} className="text-[#D97706]" />
            <span>Set Pending</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onAction("status-rejected", currentVendor)}
            className="w-full text-left px-4 py-3 text-sm text-[#F97316] hover:bg-gray-50 flex items-center gap-3"
          >
            <X size={16} className="text-[#F97316]" /> <span>Set Rejected</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onAction("delete", currentVendor)}
            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-3"
          >
            <Trash2 size={16} className="text-red-600" /> <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>,
    document.body,
  );
}
