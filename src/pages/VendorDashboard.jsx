import React, { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BarChart3,
  BookCopy,
  CalendarDays,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Mail,
  MoreVertical,
  UserRound,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { logout } from '../store/slices/authSlice';
import { ROUTES } from '../config';

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid, active: true },
  { id: 'leads', label: 'Leads', icon: Mail },
  { id: 'bookings', label: 'My Bookings', icon: BookCopy },
  { id: 'availability', label: 'Availability', icon: CalendarDays },
  { id: 'profile', label: 'My Profile', icon: UserRound },
];

const statCards = [
  { label: 'New Leads', value: '32', icon: Mail },
  { label: 'Upcoming Wedding Program', value: '12 Days Remaining', icon: CalendarDays },
  { label: 'Total Booking', value: '120', icon: BookCopy },
];

const upcomingWeddings = [
  { couple: 'Eleanor & Julian', date: 'Sept 14, 2024', venue: 'The Glass House, NY', image: '/Bloom_and_Petal.png' },
  { couple: 'Sophia & Marcus', date: 'Oct 02, 2024', venue: 'Ritz-Carlton Ballroom', image: '/Elegant_Photography.jpg' },
];

const inquiries = [
  { name: 'Clara M.', service: 'Wedding Planning', time: '2h ago', note: 'Looking for a full-service planner for..' },
  { name: 'David L.', service: 'Floral Design', time: '3h ago', note: 'Inquiry regarding availability for a..' },
];

const leadsData = [
  { month: 'Jan', leads: 150 },
  { month: 'Feb', leads: 220 },
  { month: 'Mar', leads: 80 },
  { month: 'Apr', leads: 300 },
  { month: 'May', leads: 360 },
  { month: 'Jun', leads: 110 },
  { month: 'Jul', leads: 240 },
  { month: 'Aug', leads: 430 },
  { month: 'Sep', leads: 200 },
  { month: 'Oct', leads: 300 },
  { month: 'Nov', leads: 260 },
  { month: 'Dec', leads: 360 },
];

const leadBars = leadsData.map((item, index) => ({
  ...item,
  fill: index === leadsData.length - 1 ? '#596158' : '#e1e6df',
}));

const SidebarLink = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  const baseClass = 'flex w-full items-center gap-3 rounded-lg px-3 py-2.5';

  return (
    <button
      type='button'
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={
        isActive
          ? `${baseClass} bg-[#a7b9a6] text-[#464e46]`
          : `${baseClass} text-[#475569] hover:bg-[#f3f4f6]`
      }
    >
      <Icon size={18} strokeWidth={1.8} />
      <span className='font-raleway text-[16px] leading-6 text-left'>{item.label}</span>
    </button>
  );
};

const StatCard = ({ card }) => {
  const Icon = card.icon;

  return (
    <div className='relative overflow-hidden rounded-lg border border-[#e2e2e2] bg-white px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.03)]' style={{ minHeight: 100 }}>
      <div className='absolute right-0 top-0 h-14 w-14 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#f0efeb]' />
      <div className='relative flex h-full flex-col justify-between'>
        <div className='inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#e5e7eb] bg-[#f8faf8] text-[#5c665b]'>
          <Icon size={16} strokeWidth={1.8} />
        </div>
        <div>
          <div className='font-raleway text-[12px] leading-4 text-[#4a5154]'>{card.label}</div>
          <div className='mt-1 font-raleway text-[16px] font-medium leading-6 text-[#070707]'>{card.value}</div>
        </div>
      </div>
    </div>
  );
};

const VendorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState(menuItems.find((i) => i.active)?.id || menuItems[0].id);
  const location = useLocation();

  const ROUTE_BY_ID = {
    overview: ROUTES.VENDOR_DASHBOARD,
    leads: ROUTES.VENDOR_LEADS,
    bookings: ROUTES.VENDOR_BOOKINGS,
    availability: ROUTES.VENDOR_AVAILABILITY,
    profile: ROUTES.VENDOR_PROFILE,
  };

  // Sync active menu with URL
  useEffect(() => {
    const path = location.pathname;
    const found = Object.entries(ROUTE_BY_ID).find(([, route]) => route === path);
    if (found) setActiveMenu(found[0]);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN, { replace: true });
  };

  const yTicks = useMemo(() => [0, 100, 200, 300, 400], []);

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview':
        return (
          <>
            <section className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
              {statCards.map((card) => (
                <StatCard key={card.label} card={card} />
              ))}
            </section>

            <section className='mt-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_0.9fr]'>
              <div>
                <div className='mb-3 flex items-end justify-between'>
                  <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>Upcoming Weddings</h2>
                  <button type='button' className='font-raleway text-[12px] leading-4 text-[#807a74]'>
                    View Calendar
                  </button>
                </div>

                <div className='space-y-4'>
                  {upcomingWeddings.map((wedding) => (
                    <article
                      key={wedding.couple}
                      className='flex items-center gap-4 rounded-xl border-l-4 border-[#596158] bg-white p-3 shadow-[0_8px_22px_rgba(0,0,0,0.08)]'
                    >
                      <img src={wedding.image} alt='' className='rounded-md object-cover' style={{ height: 52, width: 52 }} />
                      <div className='min-w-0 flex-1'>
                        <h3 className='font-playfair text-[18px] leading-tight text-[#2d2d2d]'>{wedding.couple}</h3>
                        <p className='mt-1 font-raleway text-[14px] leading-5 text-[#807a74]'>
                          {wedding.date} • {wedding.venue}
                        </p>
                      </div>

                      <div className='flex items-center gap-3'>
                        <span className='rounded-full bg-[#edf2ed] px-3 py-1 font-raleway text-[10px] uppercase tracking-[1px] text-[#6a7363]'>
                          Photography
                        </span>
                        <button type='button' className='text-[#807a74]'>
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className='rounded-xl bg-white p-4 shadow-[0_8px_22px_rgba(0,0,0,0.08)]'>
                <div className='flex items-center justify-between'>
                  <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>New Inquiries</h2>
                  <button type='button' className='font-raleway text-[12px] leading-4 text-[#807a74]'>
                    See all inquiries
                  </button>
                </div>

                <div className='mt-4 space-y-4'>
                  {inquiries.map((item) => (
                    <article key={item.name} className='border-b border-[#edf0ec] pb-4 last:border-b-0 last:pb-0'>
                      <div className='flex items-start justify-between gap-4'>
                        <div className='min-w-0 flex-1'>
                          <div className='flex items-center gap-1 font-raleway text-[14px] leading-5 text-[#4a5154]'>
                            <span className='font-semibold text-[#2d2d2d]'>{item.name}</span>
                            <span>•</span>
                            <span>{item.service}</span>
                          </div>
                          <p className='mt-2 font-raleway text-[14px] italic leading-5 text-[#807a74]'>{item.note}</p>
                          <button
                            type='button'
                            className='mt-3 inline-flex items-center rounded-md bg-[#596158] px-3 py-1.5 font-inter text-[14px] font-medium leading-5 text-white'
                          >
                            See Details
                          </button>
                        </div>

                        <div className='shrink-0 text-right font-raleway text-[12px] font-medium leading-4 text-[#4a5154]'>
                          {item.time}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </aside>
            </section>

            <section className='mt-4 rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-[0_8px_22px_rgba(0,0,0,0.05)]'>
              <div className='flex items-center justify-between gap-3'>
                <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>Total Leads</h2>
                <button
                  type='button'
                  className='inline-flex items-center gap-1 rounded-sm border border-[#e2e2e2] bg-[#fdfdfc] px-2 py-1 font-raleway text-[10px] leading-4 text-[#807a74]'
                >
                  This year
                  <ChevronDown size={12} />
                </button>
              </div>

              <div className='mt-4 h-80 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={leadBars} barSize={56} margin={{ top: 12, right: 0, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke='#ececec' strokeDasharray='4 4' vertical={false} />
                    <XAxis dataKey='month' axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      ticks={yTicks}
                      domain={[0, 450]}
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(167,185,166,0.08)' }}
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid #e2e2e2',
                        background: '#fff',
                        fontSize: 12,
                      }}
                    />
                    <Bar dataKey='leads' radius={[0, 0, 0, 0]} fill='#e1e6df' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </>
        );

      case 'leads':
        return (
          <>
            <section className='mt-4 rounded-xl border border-[#e8e4dc] bg-white p-4 shadow-[0_8px_22px_rgba(0,0,0,0.05)]'>
              <div className='flex items-center justify-between gap-3'>
                <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>Total Leads</h2>
              </div>

              <div className='mt-4 h-80 w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={leadBars} barSize={56} margin={{ top: 12, right: 0, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke='#ececec' strokeDasharray='4 4' vertical={false} />
                    <XAxis dataKey='month' axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      ticks={yTicks}
                      domain={[0, 450]}
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    <Tooltip cursor={{ fill: 'rgba(167,185,166,0.08)' }} />
                    <Bar dataKey='leads' radius={[0, 0, 0, 0]} fill='#e1e6df' />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className='mt-4'>
              <h3 className='font-playfair text-[20px] text-[#2d2d2d]'>Recent Inquiries</h3>
              <div className='mt-3 space-y-3'>
                {inquiries.map((q) => (
                  <div key={q.name} className='rounded-lg border bg-white p-3'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='font-semibold'>{q.name}</div>
                        <div className='text-sm text-[#807a74]'>{q.service}</div>
                      </div>
                      <div className='text-sm text-[#4a5154]'>{q.time}</div>
                    </div>
                    <p className='mt-2 text-sm text-[#6b6b6b]'>{q.note}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        );

      case 'bookings':
        return (
          <section className='mt-4'>
            <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>My Bookings</h2>
            <div className='mt-3 rounded-lg border bg-white p-4'>No bookings yet.</div>
          </section>
        );

      case 'availability':
        return (
          <section className='mt-4'>
            <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>Availability</h2>
            <div className='mt-3 rounded-lg border bg-white p-4'>Set your availability here.</div>
          </section>
        );

      case 'profile':
        return (
          <section className='mt-4'>
            <h2 className='font-playfair text-[28px] leading-none text-[#2d2d2d]'>My Profile</h2>
            <div className='mt-3 rounded-lg border bg-white p-4'>
              <div className='font-semibold'>Sarah Photography Studio</div>
              <div className='mt-2 text-sm text-[#6b6b6b]'>Manage your public profile and contact details.</div>
              <button type='button' className='mt-4 rounded-md bg-[#596158] px-3 py-1.5 text-white'>Edit Profile</button>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-[#fdfcfb] text-[#0c0c0c]'>
      <aside className='fixed left-0 top-0 hidden h-screen w-[256px] border-r border-[#e2e2e2] bg-white lg:flex lg:flex-col'>
        <div className='px-5 pb-4 pt-5'>
          <img src='/logo.png' alt='Brittani Risher' className='object-contain' style={{ height: 59, width: 80 }} />
        </div>

        <div className='flex flex-1 flex-col px-5 pt-9'>
          <div className='mb-2 font-inter text-[10px] font-bold uppercase tracking-[0.5px] text-[#070707]'>Main Menu</div>
          <div className='space-y-2'>
            {menuItems.map((item) => (
              <SidebarLink
                key={item.id}
                item={item}
                isActive={activeMenu === item.id}
                onClick={() => {
                  const route = ROUTE_BY_ID[item.id];
                  setActiveMenu(item.id);
                  if (route) navigate(route);
                }}
              />
            ))}
          </div>

          <div className='mt-auto border-t border-[#fb2c36] pt-3'>
            <button
              type='button'
              onClick={handleLogout}
              className='flex w-full items-center gap-3 px-3 py-2.5 text-[#fb2c36]'
            >
              <LogOut size={18} strokeWidth={1.8} />
              <span className='font-inter text-[14px] font-medium leading-5'>Log Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className='lg:pl-64'>
        <div className='mx-auto w-full px-4 py-5 sm:px-6 lg:px-10' style={{ maxWidth: 1584 }}>
          <section className='relative overflow-hidden rounded-2xl bg-[#f7f5f1] px-5 py-6 sm:px-6 sm:py-7' style={{ minHeight: 401 }}>
            <div className='absolute opacity-100' style={{ right: -90, top: -18, width: 760, height: 430 }}>
              <div className='absolute right-12 top-0 grid grid-cols-8 gap-3' style={{ transform: 'rotate(21deg)' }}>
                {Array.from({ length: 56 }).map((_, index) => (
                  <div
                    key={index}
                    className='h-10 w-10 rounded-2xl bg-[#d7dfd6]'
                    style={{
                      borderRadius: index % 7 === 0 ? '50px' : index % 11 === 0 ? '56px' : '16px',
                    }}
                  />
                ))}
              </div>
            </div>

            <div className='relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
              <div className='w-full' style={{ maxWidth: 720 }}>
                <div className='inline-flex items-center rounded-full bg-[#a7b9a6] px-3 py-1 text-[#464e46]'>
                  <span className='font-raleway text-[12px] leading-4'>Subscription Active</span>
                </div>

                <h1 className='mt-4 font-playfair text-[36px] font-medium leading-none text-[#0c0c0c] sm:text-[44px]' style={{ maxWidth: 620 }}>
                  Welcome back, Sarah Photography Studio
                </h1>
                <p className='mt-3 font-raleway text-[14px] leading-5 text-[#4a5154]' style={{ maxWidth: 620 }}>
                  Manage your subscription, keep your profile active, and continue receiving quality leads from brides.
                </p>

                <div className='mt-4 grid grid-cols-3 gap-4' style={{ maxWidth: 340 }}>
                  <div>
                    <div className='font-raleway text-[12px] leading-4 text-[#807a74]'>Active Package</div>
                    <div className='mt-1 font-raleway text-[16px] font-medium leading-6 text-[#070707]'>Starter</div>
                  </div>
                  <div>
                    <div className='font-raleway text-[12px] leading-4 text-[#807a74]'>Price</div>
                    <div className='mt-1 font-raleway text-[16px] font-medium leading-6 text-[#070707]'>$79/month</div>
                  </div>
                  <div>
                    <div className='font-raleway text-[12px] leading-4 text-[#807a74]'>Expiry Date</div>
                    <div className='mt-1 font-raleway text-[16px] font-medium leading-6 text-[#070707]'>5/12/2026</div>
                  </div>
                </div>

                <button
                  type='button'
                  className='mt-4 inline-flex items-center rounded-lg bg-[#a7b9a6] px-4 py-2 font-raleway text-[16px] leading-6 text-[#464e46]'
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </section>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;
