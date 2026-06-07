export default function VendorStatusBadge({ status }) {
  const normalized = String(status || '').toUpperCase();
  const isApproved = normalized === 'APPROVED';
  const isRejected = normalized === 'REJECT' || normalized === 'REJECTED';
  const label = normalized.charAt(0) + normalized.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold ${
        isApproved
          ? 'bg-[#D5F5E2] text-[#00C950]'
          : isRejected
            ? 'bg-[#FEE2E2] text-[#DC2626]'
            : 'bg-[#FFF2DD] text-[#F59E0B]'
      }`}
    >
      {label || 'Pending'}
    </span>
  );
}
