import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  useLocation,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import AdminLayout from '../components/layout/Layout';
import DummyRoutePage from '../components/DummyRoutePage';
import { RouteSkeleton } from '../components/skeletons/LoadingSkeletons';
import { ROUTES } from '../config';
import { selectIsAuthenticated, selectUser } from '../store/slices/authSlice';
import NotFound from '../pages/NotFound';
import ForgotPassword from '../pages/ForgotPassword';
import OtpVerify from '../pages/OtpVerify';
import ResetPassword from '../pages/ResetPassword';
import PaymentSuccess from '../pages/VendorDashboard/profile/PaymentSuccess';

const Home = lazy(() => import('../components/home/HomeContent'));
const BrowseVendors = lazy(() => import('../pages/BrowseVendors'));
const VendorDetails = lazy(() => import('../pages/VendorDetails'));
const HowItWorks = lazy(() => import('../pages/HowItWorks'));
const PricingPage = lazy(() => import('../pages/PricingPage'));
const AboutUsPage = lazy(() => import('../pages/AboutUsPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const VendorSignupFlow = lazy(() => import('../pages/VendorSignupFlow'));

const Dashboard = lazy(() => import('../pages/admin/dashboard/Dashboard'));
const VendorDetailsAdmin = lazy(
  () => import('../pages/admin/dashboard/VendorDetails'),
);
const VendorDashboard = lazy(
  () => import('../pages/VendorDashboard/dashboard/VendorDashboard'),
);
const VendorLeads = lazy(
  () => import('../pages/VendorDashboard/VendorLeads/VendorLeads'),
);
const VendorBookings = lazy(
  () => import('../pages/VendorDashboard/myBookings/VendorBookings'),
);
const VendorAvailability = lazy(
  () =>
    import('../pages/VendorDashboard/VendorAvailability/VendorAvailability'),
);
const VendorPricing = lazy(
  () => import('../pages/VendorDashboard/pricing/VendorPricing'),
);
const VendorPaymentSuccess = lazy(
  () => import('../pages/VendorDashboard/pricing/VendorPaymentSuccess'),
);
const VendorBillingRedirect = lazy(
  () => import('../pages/VendorDashboard/pricing/VendorBillingRedirect'),
);
const RegistrationSuccess = lazy(
  () => import('../pages/VendorDashboard/pricing/RegistrationSuccess'),
);
const RegistrationCancel = lazy(
  () => import('../pages/VendorDashboard/pricing/RegistrationCancel'),
);
const VendorProfile = lazy(
  () => import('../pages/VendorDashboard/profile/VendorProfile'),
);
const UserDashboard = lazy(
  () => import('../pages/userDashboard/dashboard/UserDashboard'),
);
const UserBudgetTracker = lazy(
  () => import('../pages/userDashboard/budgetTracker/BudgetTracker'),
);
const UserChecklist = lazy(
  () => import('../pages/userDashboard/checklist/Checklist'),
);
const UserTimeline = lazy(
  () => import('../pages/userDashboard/timeline/Timeline'),
);
const UserMatchVendor = lazy(
  () => import('../pages/userDashboard/matchVendor/MatchVendor'),
);
const UserSavedVendor = lazy(
  () => import('../pages/userDashboard/savedVendor/SavedVendor'),
);
const UserProfile = lazy(
  () => import('../pages/userDashboard/profile/Profile'),
);
const Emails = lazy(() => import('../pages/admin/Emails'));
const Leads = lazy(() => import('../pages/admin/Leads'));
const Orders = lazy(() => import('../pages/admin/Orders'));
const MarketplaceOrders = lazy(
  () => import('../pages/admin/MarketplaceOrders'),
);
const CaseStudies = lazy(() => import('../pages/admin/CaseStudies'));
const Blog = lazy(() => import('../pages/admin/Blog'));
const Jobs = lazy(() => import('../pages/admin/Jobs'));
const Pricing = lazy(() => import('../pages/admin/Pricing'));
const RequestedVendors = lazy(
  () => import('../pages/admin/requestedVendors/RequestedVendors'),
);
const UserManagement = lazy(
  () => import('../pages/admin/userManagement/UserManagement'),
);
const Payments = lazy(() => import('../pages/admin/payments/Payments'));
const Settings = lazy(() => import('../pages/admin/settings/Settings'));
const StateAndCity = lazy(
  () => import('../pages/admin/stateAndCity/StateAndCity'),
);
const Profile = lazy(() => import('../pages/admin/profile/components/Profile'));
const Messages = lazy(() => import('../pages/admin/Messages'));

const segFor = (baseRoute) => (route) => route.replace(`${baseRoute}/`, '');
const adminSeg = segFor(ROUTES.ADMIN);
const vendorSeg = segFor(ROUTES.VENDOR);
const userSeg = segFor(ROUTES.USER);

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};

const VendorOnlyRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const role = (user?.role || '').toLowerCase();

  if (role !== 'vendor') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

const DashboardSection = ({ title, description, bullets }) => (
  <DummyRoutePage
    eyebrow='Dashboard Section'
    title={title}
    description={description}
    bullets={bullets}
    backHref={ROUTES.HOME}
  />
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <Layout />
          </Suspense>
        }
      >
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.BROWSE_VENDORS} element={<BrowseVendors />} />
        <Route path={ROUTES.VENDOR_DETAILS} element={<VendorDetails />} />
        <Route path={ROUTES.HOW_IT_WORKS} element={<HowItWorks />} />
        <Route path={ROUTES.PRICING} element={<PricingPage />} />
        <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      </Route>

      <Route
        path={ROUTES.LOGIN}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <Login />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.SIGNUP}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <Signup />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.FORGOT_PASSWORD}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ForgotPassword />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.OTP_VERIFY}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <OtpVerify />
          </Suspense>
        }
      />
      <Route
        path={ROUTES.RESET_PASSWORD}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ResetPassword />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.VENDOR_PRICING}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ProtectedRoute>
              <VendorOnlyRoute>
                <VendorPricing />
              </VendorOnlyRoute>
            </ProtectedRoute>
          </Suspense>
        }
      />

      <Route
        path={ROUTES.VENDOR_BILLING_CALLBACK}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ProtectedRoute>
              <VendorOnlyRoute>
                <VendorBillingRedirect />
              </VendorOnlyRoute>
            </ProtectedRoute>
          </Suspense>
        }
      />

      <Route
        path={ROUTES.VENDOR_PAYMENT_SUCCESS}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ProtectedRoute>
              <VendorOnlyRoute>
                <VendorPaymentSuccess />
              </VendorOnlyRoute>
            </ProtectedRoute>
          </Suspense>
        }
      />

      <Route
        path={ROUTES.REGISTRATION_SUCCESS}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <RegistrationSuccess />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.REGISTRATION_CANCEL}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <RegistrationCancel />
          </Suspense>
        }
      />

      <Route
        path='/vendor-signup-flow'
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <VendorSignupFlow />
          </Suspense>
        }
      />

      <Route
        path={ROUTES.ADMIN}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route
          path={adminSeg(ROUTES.ADMIN_DASHBOARD)}
          element={<Dashboard />}
        />
        <Route
          path={adminSeg(ROUTES.ADMIN_VENDOR_DETAILS)}
          element={<VendorDetailsAdmin />}
        />
        <Route
          path={adminSeg(ROUTES.ADMIN_REQUESTED_VENDORS)}
          element={<RequestedVendors />}
        />
        <Route
          path={adminSeg(ROUTES.ADMIN_USER_MANAGEMENT)}
          element={<UserManagement />}
        />
        <Route
          path={adminSeg(ROUTES.ADMIN_STATE_AND_CITY)}
          element={<StateAndCity />}
        />
        <Route path={adminSeg(ROUTES.ADMIN_PAYMENTS)} element={<Payments />} />
        <Route path={adminSeg(ROUTES.ADMIN_SETTINGS)} element={<Settings />} />
        <Route path={adminSeg(ROUTES.ADMIN_PROFILE)} element={<Profile />} />
        <Route path={adminSeg(ROUTES.ADMIN_MESSAGES)} element={<Messages />} />
        <Route path={adminSeg(ROUTES.ADMIN_EMAILS)} element={<Emails />} />
        <Route path={adminSeg(ROUTES.ADMIN_LEADS)} element={<Leads />} />
        <Route path={adminSeg(ROUTES.ADMIN_ORDERS)} element={<Orders />} />
        <Route
          path={adminSeg(ROUTES.ADMIN_MARKETPLACE_ORDERS)}
          element={<MarketplaceOrders />}
        />
        <Route
          path={adminSeg(ROUTES.ADMIN_CASE_STUDIES)}
          element={<CaseStudies />}
        />
        <Route path={adminSeg(ROUTES.ADMIN_BLOG)} element={<Blog />} />
        <Route path={adminSeg(ROUTES.ADMIN_JOBS)} element={<Jobs />} />
        <Route path={adminSeg(ROUTES.ADMIN_PRICING)} element={<Pricing />} />
      </Route>

      <Route
        path={ROUTES.VENDOR}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route
          path={vendorSeg(ROUTES.VENDOR_DASHBOARD)}
          element={<VendorDashboard />}
        />
        <Route
          path={vendorSeg(ROUTES.VENDOR_LEADS)}
          element={<VendorLeads />}
        />
        <Route
          path={vendorSeg(ROUTES.VENDOR_BOOKINGS)}
          element={<VendorBookings />}
        />
        <Route
          path={vendorSeg(ROUTES.VENDOR_AVAILABILITY)}
          element={<VendorAvailability />}
        />
        <Route
          path={vendorSeg(ROUTES.VENDOR_PROFILE)}
          element={<VendorProfile />}
        />
        <Route
          path={'/vendor/dashboard/payment-success'}
          element={<PaymentSuccess />}
        />
      </Route>

      <Route
        path={ROUTES.USER}
        element={
          <Suspense fallback={<RouteSkeleton />}>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </Suspense>
        }
      >
        <Route
          path={userSeg(ROUTES.USER_DASHBOARD)}
          element={<UserDashboard />}
        />
        <Route
          path={userSeg(ROUTES.USER_BUDGET_TRACKER)}
          element={<UserBudgetTracker />}
        />
        <Route
          path={userSeg(ROUTES.USER_CHECKLIST)}
          element={<UserChecklist />}
        />
        <Route
          path={userSeg(ROUTES.USER_TIMELINE)}
          element={<UserTimeline />}
        />
        <Route
          path={userSeg(ROUTES.USER_MATCH_VENDOR)}
          element={<UserMatchVendor />}
        />
        <Route
          path={userSeg(ROUTES.USER_SAVED_VENDORS)}
          element={<UserSavedVendor />}
        />
        <Route path={userSeg(ROUTES.USER_PROFILE)} element={<UserProfile />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>,
  ),
);

export default router;
