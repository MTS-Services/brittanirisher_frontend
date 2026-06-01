export const APP_CONFIG = {
  NAME: process.env.REACT_APP_NAME || 'Vow & Vendor',
  VERSION: process.env.REACT_APP_VERSION || '1.0.0',
};

export const ROUTES = {
  HOME: '/',
  BROWSE_VENDORS: '/browse-vendors',
  VENDOR_DETAILS: '/vendors/:id',
  HOW_IT_WORKS: '/how-it-works',
  PRICING: '/pricing',
  ABOUT_US: '/about-us',
  CONTACT: '/contact',
  LOGIN: '/login',
  SIGNUP: '/signup',
  ADMIN: '/admin',
  VENDOR: '/vendor',
  USER: '/user',
  REDUX_DEMO: '/redux-demo',
  COMING_SOON: '/coming-soon',
  // Admin sub-routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_VENDOR_DETAILS: '/admin/dashboard/vendor/:vendorId',
  ADMIN_REQUESTED_VENDORS: '/admin/requested-vendors',
  ADMIN_USER_MANAGEMENT: '/admin/user-management',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_EMAILS: '/admin/emails',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_MARKETPLACE_ORDERS: '/admin/marketplace-orders',
  ADMIN_CASE_STUDIES: '/admin/case-studies',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_JOBS: '/admin/jobs',
  ADMIN_PRICING: '/admin/pricing',
  VENDOR_DASHBOARD: '/vendor/dashboard',
  VENDOR_LEADS: '/vendor/leads',
  VENDOR_BOOKINGS: '/vendor/bookings',
  VENDOR_AVAILABILITY: '/vendor/availability',
  VENDOR_PROFILE: '/vendor/profile',
  USER_DASHBOARD: '/user/dashboard',
  USER_BUDGET_TRACKER: '/user/budget-tracker',
  USER_CHECKLIST: '/user/checklist',
  USER_TIMELINE: '/user/timeline',
  USER_MATCH_VENDOR: '/user/match-vendor',
  USER_SAVED_VENDORS: '/user/saved-vendors',
  USER_PROFILE: '/user/profile',
};

export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || '',
  VITALS_ENDPOINT: process.env.REACT_APP_VITALS_ENDPOINT || '',
  TIMEOUT: parseInt(process.env.REACT_APP_API_TIMEOUT || '10000', 10),
  RETRY_ATTEMPTS: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS || '3', 10),
  RETRY_DELAY: parseInt(process.env.REACT_APP_API_RETRY_DELAY || '1000', 10),
};

export const SEO_CONFIG = {
  DEFAULT_TITLE: process.env.REACT_APP_SEO_TITLE || 'Vow & Vendor',
  DEFAULT_DESCRIPTION:
    process.env.REACT_APP_SEO_DESCRIPTION ||
    'A curated wedding vendor marketplace',
  DEFAULT_KEYWORDS: (
    process.env.REACT_APP_SEO_KEYWORDS || 'react,webpack,tailwind'
  ).split(','),
  SITE_URL: typeof window !== 'undefined' ? window.location.origin : '',
};

export const PERFORMANCE_BUDGETS = {
  LCP: 2500,
  FCP: 1800,
  CLS: 0.1,
  INP: 200,
  TTFB: 800,
};

export const TOAST_CONFIG = {
  POSITION: 'top-center',
  DURATION: 3000,
};
