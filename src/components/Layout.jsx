import React, { memo, useState, useCallback, useRef, Suspense } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { LogIn, Menu, X, ChevronDown } from 'lucide-react';
import Footer from './home/footer/Footer';
import { APP_CONFIG, ROUTES } from '../config';
import ScrollToTop from './ScrollToTop';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '../store/slices/authSlice';
import useGlobalGsapAnimations from '../hooks/useGlobalGsapAnimations';

const NAV_LINKS = [
  { to: ROUTES.HOME, label: 'Home', end: true },
  { to: ROUTES.BROWSE_VENDORS, label: 'Browse Vendors' },
  { to: ROUTES.HOW_IT_WORKS, label: 'How It Works' },
  { to: ROUTES.PRICING, label: 'Pricing' },
  { to: ROUTES.ABOUT_US, label: 'About Us' },
  { to: ROUTES.CONTACT, label: 'Contact' },
];

const ACTIVE_DESKTOP = 'nav-link rounded-sm bg-[#A7B9A6] px-3 py-1.5 text-[#464E46] font-medium shadow-sm';
const INACTIVE_DESKTOP = 'nav-link rounded-sm px-3 py-1.5 text-[#414141] transition-colors duration-150 hover:bg-black/5';
const ACTIVE_MOBILE = 'nav-link block rounded-sm bg-[#A7B9A6] px-4 py-3 text-[#474f47] font-medium';
const INACTIVE_MOBILE = 'nav-link block rounded-sm px-4 py-3 text-[#4a453d] transition-colors duration-150 hover:bg-black/5';

const Layout = memo(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const contentRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useGlobalGsapAnimations(contentRef);

  const userRole = (user?.role || '').toUpperCase();
  const dashboardRoute =
    userRole === 'ADMIN'
      ? ROUTES.ADMIN_DASHBOARD
      : userRole === 'VENDOR'
        ? ROUTES.VENDOR_DASHBOARD
        : ROUTES.USER_DASHBOARD;

  const navLinkClass = (to) => ({ isActive }) => {
    if (to === ROUTES.BROWSE_VENDORS && location.pathname.startsWith('/vendors')) {
      return ACTIVE_DESKTOP;
    }
    return isActive ? ACTIVE_DESKTOP : INACTIVE_DESKTOP;
  };

  const mobileNavLinkClass = (to) => ({ isActive }) => {
    if (to === ROUTES.BROWSE_VENDORS && location.pathname.startsWith('/vendors')) {
      return ACTIVE_MOBILE;
    }
    return isActive ? ACTIVE_MOBILE : INACTIVE_MOBILE;
  };

  const handleNavClick = useCallback(
    (event) => {
      if (event.currentTarget.getAttribute('href')?.startsWith('#')) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href')?.slice(1);
        const targetElement = document.getElementById(targetId || '');
        targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeMenu();
      }
    },
    [closeMenu],
  );

  return (
    <div className='min-h-screen flex flex-col bg-(--page-bg) text-[#26221d]'>
      <ScrollToTop />
      <nav className='sticky top-0 z-9999 bg-[#f5f1eb] backdrop-blur-md'>
        <div className='mx-auto container flex h-12 md:h-18  items-center justify-between px-4 sm:px-6 lg:px-8'>
          <Link to={ROUTES.HOME} className='flex items-center gap-3'>
            <img src="/logo.png" alt="logo" className='h-10 md:h-14 w-auto object-contain' />
          </Link>

          <div className='hidden items-center gap-2 lg:flex'>
            {NAV_LINKS.map(({ to, label, end }) => {
              if (to.startsWith('#')) {
                return (
                  <a key={to} href={to} className={navLinkClass({ isActive: false })} onClick={handleNavClick}>
                    {label}
                  </a>
                );
              }

              return (
                <NavLink key={to} to={to} end={end} className={navLinkClass(to)}>
                  {label}
                </NavLink>
              );
            })}
          </div>

          <div className='hidden items-center gap-3 lg:flex'>
            <Link
              to={isAuthenticated ? dashboardRoute : ROUTES.SIGNUP}
              className='inline-flex items-center gap-2 rounded-sm bg-[#a8baa8] px-4 py-2 text-sm font-medium text-[#4a453d] shadow-md shadow-[#4f5b4d]/20 transition-transform duration-200 hover:-translate-y-0.5'
            >
              {isAuthenticated ? 'Dashboard' : 'Sign Up'}
            </Link>
          </div>

          <button
            type='button'
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls='mobile-menu'
            className='inline-flex items-center justify-center  p-1 text-[#4f5b4d] transition-colors duration-200 hover:bg-white/90 lg:hidden'
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div id='mobile-menu' className='border-t border-black/5 px-4 py-4 lg:hidden'>
            <div className='space-y-2'>
              {NAV_LINKS.map(({ to, label, end }) => {
                if (to.startsWith('#')) {
                  return (
                    <a
                      key={to}
                      href={to}
                      onClick={handleNavClick}
                      className={mobileNavLinkClass({ isActive: false })}
                    >
                      {label}
                    </a>
                  );
                }

                return (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={closeMenu}
                    className={mobileNavLinkClass(to)}
                  >
                    {label}
                  </NavLink>
                );
              })}
            </div>



  {/* <Link
              to={isAuthenticated ? dashboardRoute : ROUTES.SIGNUP}
              className='inline-flex items-center gap-2 rounded-sm bg-[#a8baa8] px-4 py-2 text-sm font-medium text-[#4a453d] shadow-md shadow-[#4f5b4d]/20 transition-transform duration-200 hover:-translate-y-0.5'
            >
              {isAuthenticated ? 'Dashboard' : 'Sign Up'}
            </Link> */}

            <div className='mt-4 flex gap-3'>
           
              <Link
              to={isAuthenticated ? dashboardRoute : ROUTES.SIGNUP}
                onClick={closeMenu}
                className='inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-[#4f5b4d] px-4 py-3 text-sm font-medium text-white'
              >
                {isAuthenticated ? 'Dashboard' : 'Sign Up'}
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main ref={contentRef} className='flex-1 min-h-0'>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
