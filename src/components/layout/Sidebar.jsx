import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ROUTES } from '../../config';
import { logout, selectUser } from '../../store/slices/authSlice';
import {
  LayoutDashboard,
  Mail,
  UsersRound,
  UserCog,
  CreditCard,
  Settings,
  ClipboardList,
  DollarSign,
  CalendarDays,
  Sparkles,
  Bookmark,
  UserCircle2,
  LogOut,
  X,
  CheckSquare,
  ChevronsRight,
  ChevronsLeft,
  MapPin,
  LineChart,
} from 'lucide-react';

const MENU_BY_ROLE = {
  admin: [
    {
      name: 'Dashboard Overview',
      path: ROUTES.ADMIN_DASHBOARD,
      icon: LayoutDashboard,
    },
    { name: 'Requested Vendors', path: ROUTES.ADMIN_REQUESTED_VENDORS, icon: UsersRound },
    { name: 'User Management', path: ROUTES.ADMIN_USER_MANAGEMENT, icon: UserCog },
    { name: 'Payments', path: ROUTES.ADMIN_PAYMENTS, icon: CreditCard },
    { name: 'Settings', path: ROUTES.ADMIN_SETTINGS, icon: Settings },
    { name: ' States & Cities', path: ROUTES.ADMIN_STATE_AND_CITY, icon: MapPin },
    { name: 'Profile', path: ROUTES.ADMIN_PROFILE, icon: UserCircle2 },
    { name: 'Messages', path: ROUTES.ADMIN_MESSAGES, icon: Mail },
  ],
  vendor: [
    { name: 'Overview', path: ROUTES.VENDOR_DASHBOARD, icon: LayoutDashboard },
    { name: 'Leads', path: ROUTES.VENDOR_LEADS, icon: Mail },
    { name: 'My Bookings', path: ROUTES.VENDOR_BOOKINGS, icon: ClipboardList },
    {
      name: 'Availability',
      path: ROUTES.VENDOR_AVAILABILITY,
      icon: CalendarDays,
    },
    { name: 'My Profile', path: ROUTES.VENDOR_PROFILE, icon: UserCircle2 },
  ],
  user: [
    {
      name: 'Dashboard Overview',
      path: ROUTES.USER_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      name: 'Budget Tracker',
      path: ROUTES.USER_BUDGET_TRACKER,
      icon: DollarSign,
    },
    { name: 'Checklist', path: ROUTES.USER_CHECKLIST, icon: CheckSquare },
    { name: 'Timeline', path: ROUTES.USER_TIMELINE, icon: CalendarDays },
    { name: 'Match Vendor', path: ROUTES.USER_MATCH_VENDOR, icon: Sparkles },
    { name: 'Saved Vendor', path: ROUTES.USER_SAVED_VENDORS, icon: Bookmark },
    { name: 'Profile', path: ROUTES.USER_PROFILE, icon: UserCircle2 },
  ],
};

const NAV_BASE =
  'group flex items-center gap-3 rounded-lg border border-transparent text-base font-medium transition-colors duration-200 px-3 py-2.5';
const NAV_ACTIVE = 'bg-[#A7B9A6] text-white';
const NAV_INACTIVE = 'text-gray-600 hover:bg-[#edf2ed] hover:text-gray-800';

const getNavClass = ({ isActive }) =>
  `${NAV_BASE} ${isActive ? NAV_ACTIVE : NAV_INACTIVE}`;

const shouldUseExactMatch = (path) =>
  !(path === ROUTES.ADMIN_DASHBOARD || path === ROUTES.VENDOR_DASHBOARD || path === ROUTES.USER_DASHBOARD);

const Sidebar = ({
  onClose,
  onDesktopClose,
  onAutoCollapse,
  isCollapsed,
  onExpand,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const role = (user?.role || 'admin').toLowerCase();
  const normalizedRole = role === 'couple' ? 'user' : role;
  const baseMenuItems = MENU_BY_ROLE[normalizedRole] || MENU_BY_ROLE.admin;
  const isVendorAnalyticsUser =
    normalizedRole === 'vendor' && user?.isAnalyticsUser === true;
  const menuItems = isVendorAnalyticsUser
    ? [
        ...baseMenuItems.slice(0, 1),
        { name: 'Analytics', path: ROUTES.VENDOR_ANALYTICS, icon: LineChart },
        ...baseMenuItems.slice(1),
      ]
    : baseMenuItems;
  const dashboardLabel =
    normalizedRole === 'vendor'
      ? 'Vendor Dashboard'
      : normalizedRole === 'user'
        ? 'User Dashboard'
        : 'Admin Dashboard';

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Signed out successfully');
    setTimeout(() => navigate(ROUTES.LOGIN), 900);
  };

  if (isCollapsed) {
    return (
      <div className='h-full w-full bg-[#f8f8f8] flex flex-col items-center border-r border-gray-200 py-3 gap-1'>
        <button
          type='button'
          onClick={onExpand}
          title='Expand sidebar'
          aria-label='Expand sidebar'
          className='w-10 h-10 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-800 hover:bg-[#edf2ed] transition-colors duration-200 mb-2 shrink-0'
        >
          <ChevronsRight size={20} aria-hidden='true' />
        </button>

        <nav
          className='flex-1 flex flex-col items-center gap-1 w-full px-2 overflow-y-auto'
          aria-label='Main navigation'
        >
          {menuItems.map(({ name, path, icon: Icon, autoCollapse }) => (
            <NavLink
              key={path}
              to={path}
              end={shouldUseExactMatch(path)}
              title={name}
              onClick={() => {
                onClose();
                if (autoCollapse && onAutoCollapse) onAutoCollapse();
              }}
              className={({ isActive }) =>
                `w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#A7B9A6] text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-[#edf2ed]'
                }`
              }
            >
              <Icon size={20} aria-hidden='true' />
            </NavLink>
          ))}
        </nav>

        <button
          type='button'
          onClick={handleLogout}
          title='Sign Out'
          aria-label='Sign Out'
          className='mt-1 w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-200 shrink-0'
        >
          <LogOut size={20} aria-hidden='true' />
        </button>
      </div>
    );
  }

  return (
    <div className='h-full w-full bg-white flex flex-col border-r border-gray-200'>
      <div className='flex items-start justify-between px-4 pt-4 pb-3 border-b border-gray-200 shrink-0'>
        <div>
          <Link
            to={ROUTES.HOME}
            aria-label='Go to home page'
            onClick={() => {
              onClose();
            }}
            className='inline-flex'
          >
            <img
              src='/logo.png'
              alt='Vow & Vendor'
              width={140}
              height={36}
              fetchPriority='high'
              className='h-15 w-auto object-contain'
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>
          {/* <p className='text-xs text-gray-500 mt-2'>{dashboardLabel}</p> */}
        </div>
        <button
          type='button'
          onClick={onClose}
          className='lg:hidden mt-0.5 p-1.5 -mr-1 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors'
          aria-label='Close navigation'
        >
          <X size={20} aria-hidden='true' />
        </button>
        <button
          type='button'
          onClick={onDesktopClose}
          className='hidden lg:flex items-center justify-center mt-0.5 p-1.5 -mr-1 rounded-md text-gray-500 hover:text-gray-900 hover:bg-[#edf2ed] transition-colors'
          aria-label='Collapse sidebar'
        >
          <ChevronsLeft size={20} aria-hidden='true' />
        </button>
      </div>

      <nav
        className='flex-1 overflow-y-auto px-3 py-5'
        aria-label='Main navigation'
      >
        <p className='mb-3 px-3 text-base font-semibold uppercase tracking-wider text-gray-800'>
          Main Menu
        </p>
        <ul className='space-y-1.5' role='list'>
          {menuItems.map(({ name, path, icon: Icon, autoCollapse }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={shouldUseExactMatch(path)}
                onClick={() => {
                  onClose();
                  if (autoCollapse && onAutoCollapse) onAutoCollapse();
                }}
                className={getNavClass}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={18}
                      aria-hidden='true'
                      className={`shrink-0 transition-colors ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                    />
                    <span className='truncate flex-1'>{name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className='shrink-0 border-t border-red-200 px-3 py-3'>
        <button
          type='button'
          onClick={handleLogout}
          className='group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600'
        >
          <LogOut
            size={18}
            aria-hidden='true'
            className='shrink-0 transition-colors'
          />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
