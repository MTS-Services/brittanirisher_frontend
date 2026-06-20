// import React from "react";
import { User, X } from "lucide-react";
import { useGetEnquiryByIdQuery } from '../../../../store/features/vendor/vendorDashboardApi'; 

const LeadsDetailsModal = ({ leadId, onClose }) => {
  const { data: response, isLoading } = useGetEnquiryByIdQuery(leadId);
  const lead = response?.data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="flex w-full flex-col rounded-[14px] bg-white shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
        style={{ maxWidth: "550px", height: "600px", maxHeight: "85vh" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-shrink-0 items-center justify-between border-b border-[#f0f0f0] px-5 py-4">
          <h2 className="text-[20px] font-normal text-[#111]">Leads Details</h2>
          <button onClick={onClose} className="text-[#666]">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-gray-500">
              Loading details...
            </div>
          ) : lead ? (
            <div className="px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-2xl text-[#6b7280]">
                  <User className="h-4 w-4 text-[#6b7280]" />
                </div>
                <span className="text-base text-[#8a8a8a]">
                  Customer Information
                </span>
              </div>

              <div className="mt-3">
                <p className="text-[20px] font-semibold leading-tight text-[#111]">
                  {lead.senderName}
                </p>
                <p className="mt-1 text-[14px] md:text-base text-[#5f5f5f]">{lead.senderPhone}</p>
                <p className="mt-1 text-[14px] md:text-base text-[#5f5f5f]">{lead.senderEmail}</p>
              </div>

              <div className="mt-3 text-[12px] font-semibold text-[#111] md:text-base">
                Client's Details
              </div>
              <p className="mt-2 text-[15px] leading-[1.6] text-[#222] text-justify">
                {lead.message}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12 text-sm text-red-500">
              No data found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadsDetailsModal;