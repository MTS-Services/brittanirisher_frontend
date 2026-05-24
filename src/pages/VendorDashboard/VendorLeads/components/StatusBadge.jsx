const statusStyle = {
  New: { bg: '#2f3d8a', text: '#fff' },
  Pending: { bg: '#e17b00', text: '#fff' },
  Contracted: { bg: '#18b300', text: '#fff' },
};

const StatusBadge = ({ status }) => {
  const palette = statusStyle[status] || { bg: '#999', text: '#fff' };

  return (
    <span
      className='inline-flex min-w-[88px] items-center justify-center rounded-full px-4 py-1.5 text-[14px] font-normal'
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
