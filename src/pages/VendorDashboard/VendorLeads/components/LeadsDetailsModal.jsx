import React from "react";
import { useGetEnquiryByIdQuery } from '../../../../store/features/vendor/vendorDashboardApi'; 

function UserIcon() {
  return (
    <svg className="h-4 w-4 text-[#6b7280]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const LeadsDetailsModal = ({ leadId, onClose }) => {
  const { data: response, isLoading } = useGetEnquiryByIdQuery(leadId);
  const lead = response?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="w-full rounded-[14px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
        style={{ maxWidth: "390px" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
          <h2 className="text-[20px] font-normal text-[#111]">Leads Details</h2>
          <button onClick={onClose} className="text-[#666]">
            <CloseIcon />
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12 text-sm text-gray-500">
            Loading details...
          </div>
        ) : lead ? (
          <div className="px-5 py-4">
            <div className="flex items-center gap-2">
              <UserIcon />
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]">
                Customer Information
              </span>
            </div>

            <div className="mt-3">
              <p className="text-[20px] font-semibold leading-tight text-[#111]">
                {lead.senderName}
              </p>
              <p className="mt-1 text-[14px] text-[#5f5f5f]">{lead.senderPhone}</p>
              <p className="mt-1 text-[14px] text-[#5f5f5f]">{lead.senderEmail}</p>
            </div>

            <div className="mt-3 text-[12px] font-medium uppercase tracking-[0.14em] text-[#8a8a8a]">
              Client's Details
            </div>
            <p className="mt-2 text-[15px] leading-[1.6] text-[#222]">
              {lead.message}
            </p>
          </div>
        ) : (
          <div className="flex justify-center items-center py-12 text-sm text-red-500">
            No data found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsDetailsModal;