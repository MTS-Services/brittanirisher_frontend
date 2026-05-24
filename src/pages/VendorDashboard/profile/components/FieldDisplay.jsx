const FieldDisplay = ({ label, value, multiline = false }) => (
  <div>
    <p className='mb-1.5 text-[13px] font-semibold text-[#3f4441]'>{label}</p>
    {multiline ? (
      <p className='min-h-22 rounded-md bg-[#e9eeea] px-3 py-2.5 text-[13px] leading-5 text-[#5d635f]'>{value}</p>
    ) : (
      <p className='rounded-md bg-[#e9eeea] px-3 py-2.5 text-[13px] text-[#5d635f]'>{value}</p>
    )}
  </div>
);

export default FieldDisplay;
