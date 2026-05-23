export default function VendorStatusBadge({ status }) {
  const isApproved = status === "Approved";

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
        isApproved
          ? "bg-[#D5F5E2] text-[#00C950]"
          : "bg-[#FFF2DD] text-[#F59E0B]"
      }`}
    >
      {status}
    </span>
  );
}
