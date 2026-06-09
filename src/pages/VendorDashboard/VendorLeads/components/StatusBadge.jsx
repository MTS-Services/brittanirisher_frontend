const statusStyle = {
  NEW: { bg: '#2f3d8a', text: '#fff' },
  PENDING: { bg: '#e17b00', text: '#fff' },
  REPLIED: { bg: '#0f8b8d', text: '#fff' },
  IGNORED: { bg: '#6b7280', text: '#fff' },
  CONTRACTED: { bg: '#18b300', text: '#fff' },
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = String(status || '').trim().toUpperCase();
  const palette = statusStyle[normalizedStatus] || { bg: '#999', text: '#fff' };

  return (
    <span
      className='inline-flex min-w-[88px] items-center justify-center rounded-full px-4 py-1.5 text-[14px] font-normal'
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {normalizedStatus || '-'}
    </span>
  );
};

export default StatusBadge;
