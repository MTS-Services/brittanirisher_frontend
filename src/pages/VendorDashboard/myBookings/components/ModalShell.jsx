const ModalShell = ({ children, onClose, widthClass = 'max-w-[520px]' }) => (
  <div
    className='fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 max-sm:items-start max-sm:py-4'
    onClick={onClose}
  >
    <div
      className={`relative w-full ${widthClass} max-h-[calc(100dvh-3rem)] overflow-hidden rounded-xl bg-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] max-sm:max-h-[calc(100dvh-2rem)]`}
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default ModalShell;
