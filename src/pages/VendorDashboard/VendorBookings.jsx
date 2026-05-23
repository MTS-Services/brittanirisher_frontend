import React, { useMemo, useState } from 'react';
import {
  CalendarRange,
  Check,
  ChevronDown,
  Mail,
  MessageSquareText,
  Phone,
  Plus,
  ShieldCheck,
  SquareX,
} from 'lucide-react';

const tabs = [
  { key: 'all', label: 'All', count: 34 },
  { key: 'booked', label: 'Booked', count: 18 },
  { key: 'completed', label: 'Completed', count: 8 },
];

const initialBookings = [
  {
    id: 1,
    name: 'Priya Sharma',
    initials: 'PS',
    event: 'Grand Ballroom',
    status: 'completed',
    date: 'Oct 24, 2024',
    value: '৳1,80,000',
    email: 'jackson.graham@example.com',
    phone: '(307) 555-0133',
    venue: 'Luxury Cottage Prime Resort',
    location: 'N.A NewYork',
    packageName: 'Basic Package',
    price: '$1500',
  },
  {
    id: 2,
    name: 'Meher Afroz',
    initials: 'MA',
    event: 'Grand Ballroom',
    status: 'booked',
    date: 'Oct 24, 2024',
    value: '৳1,80,000',
    email: 'meher.afroz@example.com',
    phone: '(307) 555-0188',
    venue: 'Grand Ballroom',
    location: 'Dhaka, Bangladesh',
    packageName: 'Premium Package',
    price: '$1800',
  },
  {
    id: 3,
    name: 'Tanvir & Nadia Islam',
    initials: 'TN',
    event: 'Luxury Reception',
    status: 'booked',
    date: 'Nov 12, 2024',
    value: '৳3,20,000',
    email: 'tanvir.nadia@example.com',
    phone: '(307) 555-0199',
    venue: 'Luxury Reception Hall',
    location: 'Chattogram, Bangladesh',
    packageName: 'Luxury Package',
    price: '$3200',
  },
  {
    id: 4,
    name: 'Sadia Islam',
    initials: 'SI',
    event: 'Floral Design',
    status: 'completed',
    date: 'Aug 15, 2024',
    value: '৳45,000',
    email: 'sadia.islam@example.com',
    phone: '(307) 555-0141',
    venue: 'Floral Design Studio',
    location: 'Sylhet, Bangladesh',
    packageName: 'Starter Package',
    price: '$450',
  },
  {
    id: 5,
    name: 'Meher Afroz',
    initials: 'MA',
    event: 'Grand Ballroom',
    status: 'booked',
    date: 'Oct 24, 2024',
    value: '৳1,80,000',
    email: 'meher.afroz@example.com',
    phone: '(307) 555-0188',
    venue: 'Grand Ballroom',
    location: 'Dhaka, Bangladesh',
    packageName: 'Premium Package',
    price: '$1800',
  },
  {
    id: 6,
    name: 'Farzana Hossain',
    initials: 'FH',
    event: 'Engagement',
    status: 'completed',
    date: 'Dec 05, 2024',
    value: '৳65,000',
    email: 'farzana.hossain@example.com',
    phone: '(307) 555-0162',
    venue: 'Engagement Lawn',
    location: 'Dhaka, Bangladesh',
    packageName: 'Standard Package',
    price: '$650',
  },
  {
    id: 7,
    name: 'Nusrat Jahan',
    initials: 'NJ',
    event: 'Outdoor Ceremony',
    status: 'pending',
    date: 'Dec 15, 2024',
    value: '৳95,000',
    email: 'nusrat.jahan@example.com',
    phone: '(307) 555-0114',
    venue: 'Outdoor Ceremony Space',
    location: 'Narayanganj, Bangladesh',
    packageName: 'Standard Package',
    price: '$950',
  },
  {
    id: 8,
    name: 'Rafiq & Alina',
    initials: 'RA',
    event: 'Banquet Hall',
    status: 'booked',
    date: 'Jan 11, 2025',
    value: '৳2,40,000',
    email: 'rafiq.alina@example.com',
    phone: '(307) 555-0109',
    venue: 'Banquet Hall',
    location: 'Dhaka, Bangladesh',
    packageName: 'Premium Package',
    price: '$2400',
  },
  {
    id: 9,
    name: 'Kazi Anika',
    initials: 'KA',
    event: 'Bridal Shower',
    status: 'completed',
    date: 'Feb 02, 2025',
    value: '৳35,000',
    email: 'kazi.anika@example.com',
    phone: '(307) 555-0190',
    venue: 'Private Dining',
    location: 'Comilla, Bangladesh',
    packageName: 'Starter Package',
    price: '$350',
  },
  {
    id: 10,
    name: 'Mim & Shuvo',
    initials: 'MS',
    event: 'Garden Venue',
    status: 'pending',
    date: 'Feb 20, 2025',
    value: '৳1,10,000',
    email: 'mim.shuvo@example.com',
    phone: '(307) 555-0145',
    venue: 'Garden Venue',
    location: 'Gazipur, Bangladesh',
    packageName: 'Standard Package',
    price: '$1100',
  },
  {
    id: 11,
    name: 'Ayesha Kabir',
    initials: 'AK',
    event: 'Candlelight Dinner',
    status: 'booked',
    date: 'Mar 06, 2025',
    value: '৳78,000',
    email: 'ayesha.kabir@example.com',
    phone: '(307) 555-0177',
    venue: 'Candlelight Dinner Hall',
    location: 'Dhaka, Bangladesh',
    packageName: 'Premium Package',
    price: '$780',
  },
  {
    id: 12,
    name: 'Rumana Chowdhury',
    initials: 'RC',
    event: 'Pre-wedding Shoot',
    status: 'completed',
    date: 'Mar 28, 2025',
    value: '৳52,000',
    email: 'rumana.chowdhury@example.com',
    phone: '(307) 555-0151',
    venue: 'Pre-wedding Shoot Location',
    location: 'Chattogram, Bangladesh',
    packageName: 'Starter Package',
    price: '$520',
  },
];

const summaryCards = [
  { label: 'TOTAL BOOKINGS', value: '2', icon: MessageSquareText },
  { label: 'UPCOMING', value: '8', meta: '(Next event in 4 days)', icon: CalendarRange },
  { label: 'AWAITING REQUESTS', value: '3', icon: ShieldCheck },
];

const emptyForm = {
  coupleName: '',
  email: '',
  phone: '',
  venueName: '',
  location: '',
  weddingDate: '',
  packageName: 'Basic',
  price: '',
};

const packageOptions = ['Basic', 'Standard', 'Premium', 'Luxury'];

const getInitials = (value) =>
  value
    .split(' ')
    .map((part) => part.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

const formatModalDate = (dateString) => {
  if (!dateString) {
    return 'Wedding Date Oct 12, 2023';
  }

  return `Wedding Date ${dateString}`;
};

const BookingCard = ({ booking, onViewDetails }) => {
  const badgeText = booking.status === 'completed' ? 'COMPLETED' : booking.status === 'booked' ? 'BOOKED' : 'PENDING';
  const badgeClass =
    booking.status === 'completed'
      ? 'bg-lime-100 text-lime-600'
      : booking.status === 'booked'
        ? 'bg-orange-100 text-orange-600'
        : 'bg-amber-100 text-amber-700';

  return (
    <article className='rounded-[18px] bg-white p-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)]'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-4'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-lg font-medium text-neutral-700'>
            {booking.initials}
          </div>
          <div>
            <h3 className='text-[18px] leading-tight text-neutral-800'>{booking.name}</h3>
            <p className='text-[16px] text-neutral-600'>{booking.event}</p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-semibold ${badgeClass}`}>
          <span className='h-2 w-2 rounded-full bg-current' />
          {badgeText}
        </div>
      </div>

      <div className='my-5 border-t border-[#e8d6d2]' />

      <div className='grid grid-cols-2 gap-6'>
        <div>
          <p className='text-[18px] uppercase tracking-[0.02em] text-neutral-500'>Date</p>
          <p className='mt-2 text-[20px] text-neutral-800'>{booking.date}</p>
        </div>
        <div className='text-right'>
          <p className='text-[18px] uppercase tracking-[0.02em] text-neutral-500'>Value</p>
          <p className='mt-2 text-[20px] text-neutral-800'>{booking.value}</p>
        </div>
      </div>

      <div className='my-5 border-t border-[#e8d6d2]' />

      <button
        type='button'
        className='inline-flex items-center justify-center rounded-md bg-[#6f7969] px-6 py-3 text-[15px] text-white transition hover:bg-[#5f6959]'
        onClick={() => onViewDetails?.(booking)}
      >
        View Details
      </button>
    </article>
  );
};

const ModalShell = ({ children, onClose, widthClass = 'max-w-[520px]' }) => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6' onClick={onClose}>
    <div
      className={`relative w-full ${widthClass} rounded-xl bg-white shadow-[0_20px_70px_rgba(0,0,0,0.35)]`}
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

const NewBookingModal = ({ formData, onChange, onClose, onSubmit }) => (
  <ModalShell onClose={onClose} widthClass='max-w-[447px]'>
    <div className='flex items-center justify-between border-b border-[#d7dce6] px-5 py-4'>
      <h2 className='font-playfair text-[26px] text-[#212121]'>New Booking</h2>
      <button aria-label='Close new booking modal' onClick={onClose} className='text-[#24324b]'>
        <SquareX size={26} />
      </button>
    </div>

    <form className='space-y-4 px-5 py-5' onSubmit={onSubmit}>
      {[
        { key: 'coupleName', label: 'Couple Name', placeholder: 'Enter Couple Name here' },
        { key: 'email', label: 'E-mail', placeholder: 'Enter E-mail here', type: 'email' },
        { key: 'phone', label: 'Phone Number', placeholder: 'Enter Phone Number Here' },
        { key: 'venueName', label: 'Venue Name', placeholder: 'Enter Venue name' },
        { key: 'location', label: 'Location', placeholder: 'Enter Location' },
        { key: 'weddingDate', label: 'Wedding Date', placeholder: 'mm/dd/yyyy', type: 'date' },
      ].map((field) => (
        <label key={field.key} className='block'>
          <span className='mb-2 block text-[15px] text-[#1f1f1f]'>{field.label}</span>
          <input
            type={field.type || 'text'}
            value={formData[field.key]}
            onChange={(event) => onChange(field.key, event.target.value)}
            placeholder={field.placeholder}
            className='w-full rounded-sm border border-[#dfe5ef] bg-[#fafcff] px-3 text-[13px] text-[#3c3f44] outline-none placeholder:text-[#9ea6b3]'
            style={{ height: '35px' }}
          />
        </label>
      ))}

      <div className='grid grid-cols-2 gap-4'>
        <label className='block'>
          <span className='mb-2 block text-[15px] text-[#1f1f1f]'>Package</span>
          <div className='relative'>
            <select
              value={formData.packageName}
              onChange={(event) => onChange('packageName', event.target.value)}
              className='w-full appearance-none rounded-sm border border-[#dfe5ef] bg-[#fafcff] px-3 text-[13px] text-[#3c3f44] outline-none'
              style={{ height: '35px' }}
            >
              {packageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#68707d]' />
          </div>
        </label>

        <label className='block'>
          <span className='mb-2 block text-[15px] text-[#1f1f1f]'>Price</span>
          <input
            type='text'
            value={formData.price}
            onChange={(event) => onChange('price', event.target.value)}
            placeholder='$1500'
            className='w-full rounded-sm border border-[#dfe5ef] bg-[#fafcff] px-3 text-[13px] text-[#3c3f44] outline-none placeholder:text-[#9ea6b3]'
            style={{ height: '35px' }}
          />
        </label>
      </div>

      <div className='flex items-center justify-end gap-3 pt-2'>
        <button type='button' onClick={onClose} className='h-10 rounded-sm border border-[#e0e6ef] bg-white px-5 text-[14px] text-[#7a7f87]'>
          Cancel
        </button>
        <button type='submit' className='h-10 rounded-sm bg-[#6f7969] px-6 text-[14px] text-white'>
          Add Booking
        </button>
      </div>
    </form>
  </ModalShell>
);

const DetailRow = ({ label, value }) => (
  <div>
    <p className='text-[13px] text-[#7d7d7d]'>{label}</p>
    <p className='mt-1 text-[15px] text-[#2f3d63]'>{value}</p>
  </div>
);

const ViewDetailsModal = ({ booking, onClose }) => {
  if (!booking) {
    return null;
  }

  return (
    <ModalShell onClose={onClose} widthClass='max-w-[585px]'>
      <div className='flex items-start justify-between px-6 pb-4 pt-5'>
        <div className='flex items-start gap-4'>
          <div className='relative'>
            <div className='flex h-20.5 w-20.5 items-center justify-center rounded-full border-[3px] border-[#cfd6ea] bg-[#b8b3b3] text-[22px] text-[#4a2e35]' style={{ height: '82px', width: '82px' }}>
              {booking.initials}
            </div>
            <span className='absolute bottom-0 right-1 h-4 w-4 rounded-full bg-[#80e0a8] ring-4 ring-white' />
          </div>

          <div>
            <h2 className='font-playfair text-[43px] leading-none text-[#17305d]'>{booking.name}</h2>
            <div className='mt-2 space-y-1 text-[14px] text-[#7d7d7d]'>
              <div className='flex items-center gap-2'>
                <Mail size={14} />
                <span>{booking.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone size={14} />
                <span>{booking.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <button aria-label='Close details modal' onClick={onClose} className='text-[#111]'>
          <SquareX size={28} />
        </button>
      </div>

      <div className='mx-6 mb-6 rounded-xl border border-[#cfd6ea] p-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2 text-[22px] text-[#17305d]'>
            <Check size={18} className='text-[#6f7969]' />
            <span className='font-playfair'>Couple Details</span>
          </div>
          <div className='text-[15px] text-[#2b2b2b]'>{formatModalDate(booking.weddingDate)}</div>
        </div>

        <div className='mt-4 rounded-[10px] bg-[#f7f3ea] px-4 py-4'>
          <p className='text-[11px] uppercase tracking-[0.08em] text-[#8f8575]'>Venue</p>
          <p className='mt-1 text-[20px] text-[#2f2f2f]'>{booking.venue}</p>
        </div>

        <div className='mt-3 rounded-xl border border-[#e8edf4] px-4 py-4'>
          <div className='flex items-center gap-2 text-[14px] text-[#7d7d7d]'>
            <span className='inline-flex h-6 w-6 items-center justify-center rounded-sm border border-[#91a0b6] text-[12px] text-[#637085]'>
              ⓘ
            </span>
            <span>Detailed information</span>
          </div>

          <div className='mt-4 grid grid-cols-3 gap-4'>
            <DetailRow label='Location' value={booking.location} />
            <DetailRow label='Package' value={booking.packageName} />
            <DetailRow label='Price' value={booking.price} />
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

const VendorBookings = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);
  const [bookingsData, setBookingsData] = useState(initialBookings);
  const [newBookingForm, setNewBookingForm] = useState(emptyForm);
  const [isNewBookingOpen, setIsNewBookingOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const pageSize = 6;

  const filteredBookings = useMemo(() => {
    if (activeTab === 'all') {
      return bookingsData;
    }

    return bookingsData.filter((booking) => booking.status === activeTab);
  }, [activeTab, bookingsData]);

  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleBookings = filteredBookings.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const openNewBooking = () => {
    setIsNewBookingOpen(true);
    setNewBookingForm(emptyForm);
  };

  const closeNewBooking = () => {
    setIsNewBookingOpen(false);
  };

  const handleFormChange = (field, value) => {
    setNewBookingForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleCreateBooking = (event) => {
    event.preventDefault();

    const nextBooking = {
      id: Date.now(),
      name: newBookingForm.coupleName || 'New Couple',
      initials: getInitials(newBookingForm.coupleName || 'NC'),
      event: newBookingForm.venueName || 'New Venue',
      status: 'pending',
      date: newBookingForm.weddingDate || 'TBD',
      value: newBookingForm.price || '$0',
      email: newBookingForm.email || 'couple@example.com',
      phone: newBookingForm.phone || '(000) 000-0000',
      venue: newBookingForm.venueName || 'New Venue',
      location: newBookingForm.location || 'Unknown',
      packageName: newBookingForm.packageName,
      price: newBookingForm.price || '$0',
    };

    setBookingsData((current) => [nextBooking, ...current]);
    setIsNewBookingOpen(false);
    setActiveTab('all');
    setPage(1);
  };

  return (
    <div className='min-h-screen  text-neutral-800'>
      <main className='mx-auto '>
        <header>
          <h1 className='font-playfair text-[43px] leading-[1.15] text-[#222] sm:text-[52px]'>Welcome back, Studio Bella</h1>
          <p className='mt-2 text-[17px] text-[#8b7f7a]'>Your dream wedding is coming together beautifully</p>
        </header>

        <section className='mt-8 grid grid-cols-1 gap-4 xl:grid-cols-3'>
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className='relative overflow-hidden rounded-2xl border border-[#d9d4d0] bg-white px-5 py-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]'
              style={{ minHeight: '135px' }}
            >
              <div className='absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#f2edea]' />
              <div className='relative flex h-full flex-col justify-between'>
                <div className='inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e3e8df] text-[#617062]'>
                  <card.icon size={21} />
                </div>
                <div className='mt-3'>
                  <div className='text-[11px] uppercase tracking-[0.08em] text-[#615a57]'>{card.label}</div>
                  <div className='mt-2 flex items-end gap-2'>
                    <span className='text-[30px] leading-none text-[#222]'>{card.value}</span>
                    {card.meta ? <span className='pb-1 text-[16px] text-[#6c645f]'>{card.meta}</span> : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className='mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div className='flex items-end gap-10 border-b border-[#8a9084] pb-4'>
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => {
                    setActiveTab(tab.key);
                    setPage(1);
                  }}
                  className='relative pb-3 text-left'
                >
                  <span className={`text-[23px] ${isActive ? 'font-semibold text-[#6f7969]' : 'text-[#565656]'}`}>
                    {tab.label}
                  </span>
                  <span className={`ml-2 rounded-full px-2.5 py-0.5 text-[12px] ${isActive ? 'bg-[#aab9a2] text-white' : 'bg-[#d7e0d1] text-[#6d7a67]'}`}>
                    {tab.count}
                  </span>
                  <span
                    className={`absolute left-0 w-full rounded-full ${isActive ? 'bg-[#6f7969]' : 'bg-transparent'}`}
                    style={{ bottom: '-17px', height: '4px' }}
                  />
                </button>
              );
            })}
          </div>

          <button
            type='button'
            className='inline-flex items-center justify-center gap-3 rounded-xl bg-[#6f7969] px-8 py-4 text-[18px] text-white shadow-[0_12px_26px_rgba(95,105,89,0.22)] transition hover:bg-[#5f6959]'
            style={{ minWidth: '214px' }}
            onClick={openNewBooking}
          >
            <Plus size={22} />
            New Booking
          </button>
        </section>

        <section className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
          {visibleBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} onViewDetails={setSelectedBooking} />
          ))}
        </section>

        <div className='mt-9 flex items-center justify-center gap-2'>
          <button className='rounded-md border border-[#e2d7cf] bg-[#f1ebe6] px-4 py-2 text-[14px] text-[#8b7f76]'>Previous</button>
          <button className='rounded-md bg-[#2d2c2d] px-3.5 py-2 text-[14px] text-white' onClick={() => setPage(1)}>
            1
          </button>
          <button className='rounded-md border border-[#e2d7cf] bg-[#f1ebe6] px-3.5 py-2 text-[14px] text-[#8b7f76]' onClick={() => setPage(2)}>
            2
          </button>
          <button className='rounded-md border border-[#e2d7cf] bg-[#f1ebe6] px-3.5 py-2 text-[14px] text-[#8b7f76]' onClick={() => setPage(3)}>
            3
          </button>
          <button className='rounded-md border border-[#e2d7cf] bg-[#f1ebe6] px-4 py-2 text-[14px] text-[#8b7f76]'>Next</button>
        </div>
      </main>

      {isNewBookingOpen ? (
        <NewBookingModal
          formData={newBookingForm}
          onChange={handleFormChange}
          onClose={closeNewBooking}
          onSubmit={handleCreateBooking}
        />
      ) : null}

      {selectedBooking ? <ViewDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} /> : null}
    </div>
  );
};

export default VendorBookings;
