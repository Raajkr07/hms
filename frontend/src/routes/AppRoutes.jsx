import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PrivateRoute, RoleBasedRoute, PublicRoute, AdminRoute, DoctorRoute } from '../components/PrivateRoute';

const AdminDashboard = lazy(() => import('../account/admin/AdminDashboard'));
const DoctorDashboard = lazy(() => import('../account/doctor/DoctorDashboard'));
const UserDashboard = lazy(() => import('../account/users/UserDashboard'));
const DocumentationPage = lazy(() => import('../pages/documentation/DocumentationPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const HowItWorksPage = lazy(() => import('../pages/HowItWorksPage'));
const ImpactPage = lazy(() => import('../pages/ImpactPage'));
const MoneyDonationPage = lazy(() => import('../pages/donation/MoneyDonationPage'));
const MedicineDonationPage = lazy(() => import('../pages/donation/MedicineDonationPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const FAQPage = lazy(() => import('../pages/FAQPage'));
const SafetyPage = lazy(() => import('../pages/SafetyPage'));
const PartnersPage = lazy(() => import('../pages/PartnersPage'));
const VolunteersPage = lazy(() => import('../pages/VolunteersPage'));
const TermsPage = lazy(() => import('../components/legals/TermsPage'));
const PrivacyPage = lazy(() => import('../components/legals/PrivacyPage'));
const AccessibilityPage = lazy(() => import('../components/legals/AccessibilityPage'));
const SitemapPage = lazy(() => import('../components/legals/SitemapPage'));

import IndexPage from '../components/landing/IndexPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import ForgotPassword from '../components/auth/verification-Page/ForgotPasswordPage';
import NewPasswordPage from '../components/auth/verification-Page/NewPasswordPage';
import UserMoneyDonationPage from '../account/users/pages/MoneyDonationPage';
import UserProfile from '../account/users/pages/ProfilePage';
import AppointmentPage from '../account/users/pages/AppointmentPage';
import LocationPage from '../account/users/pages/LocationPage';
import SettingPage from '../account/users/pages/SettingPage';
import UserMedicineDonationPageWrapper from '../account/users/wrapper/UserMedicineDonationPageWrapper';
import OAuth2Success from '../components/auth/OAuth2Success';

// Doctor Imports
import DoctorProfile from '../account/doctor/pages/ProfilePage';
import Appointments from '../account/doctor/pages/AppointmentPage';
import Meeting from '../account/doctor/pages/MeetingPages';
import Donations from '../account/doctor/pages/DonationReviewPage';
import Analytics from '../account/doctor/pages/AnalyticsPage';
import Setting from '../account/doctor/pages/SettingPage';

const PageLoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-primary-500">Loading page...</p>
    </div>
  </div>
);
const LazyWrapper = ({ children }) => (
  <Suspense fallback={<PageLoadingSpinner />}>
    {children}
  </Suspense>
);
const LogoutHandler = () => {
  const { logout } = useAuth();
  React.useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/" replace />;
};
const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">403</h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">
        Access Denied
      </h2>
      <p className="text-primary-500">
        You don't have permission to access this page.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 mt-4"
      >
        Go Back
      </button>
    </div>
  </div>
);
const RoleBasedRedirect = () => {
  const { getUserRole, getRoleBasedPath } = useAuth();
  const userRole = getUserRole();
  const redirectPath = getRoleBasedPath(userRole);
  return <Navigate to={redirectPath} replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<IndexPage />} />
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPasswordPage />} />

      {/* Legal and Info Pages */}
      <Route path="/about" element={<LazyWrapper><AboutPage /></LazyWrapper>} />
      <Route path="/how-it-works" element={<LazyWrapper><HowItWorksPage /></LazyWrapper>} />
      <Route path="/impact" element={<LazyWrapper><ImpactPage /></LazyWrapper>} />
      <Route path="/money" element={<LazyWrapper><MoneyDonationPage /></LazyWrapper>} />
      <Route path="/medicine" element={<LazyWrapper><MedicineDonationPage /></LazyWrapper>} />
      <Route path="/documentation" element={<LazyWrapper><DocumentationPage /></LazyWrapper>} />
      <Route path="/contact" element={<LazyWrapper><ContactPage /></LazyWrapper>} />
      <Route path="/faq" element={<LazyWrapper><FAQPage /></LazyWrapper>} />
      <Route path="/safety" element={<LazyWrapper><SafetyPage /></LazyWrapper>} />
      <Route path="/partners" element={<LazyWrapper><PartnersPage /></LazyWrapper>} />
      <Route path="/volunteers" element={<LazyWrapper><VolunteersPage /></LazyWrapper>} />
      <Route path="/terms" element={<LazyWrapper><TermsPage /></LazyWrapper>} />
      <Route path="/privacy" element={<LazyWrapper><PrivacyPage /></LazyWrapper>} />
      <Route path="/accessibility" element={<LazyWrapper><AccessibilityPage /></LazyWrapper>} />
      <Route path="/sitemap" element={<LazyWrapper><SitemapPage /></LazyWrapper>} />
      <Route path="/oauth2/success" element={<OAuth2Success />} />

      {/* Logout and Unauthorized */}
      <Route path="/logout" element={<LogoutHandler />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<RoleBasedRedirect />} />

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/admin/*" element={<LazyWrapper><AdminDashboard /></LazyWrapper>} />
        </Route>

        {/* Doctor */}
        <Route element={<DoctorRoute />}>
          <Route path="/doctor/*" element={<LazyWrapper><DoctorDashboard /></LazyWrapper>} />
          <Route path="/doctor/profile" element={<LazyWrapper><DoctorProfile /></LazyWrapper>} />
          <Route path="/doctor/appointments" element={<LazyWrapper><Appointments /></LazyWrapper>} />
          <Route path="/doctor/meeting" element={<LazyWrapper><Meeting /></LazyWrapper>} />
          <Route path="/doctor/donations" element={<LazyWrapper><Donations /></LazyWrapper>} />
          <Route path="/doctor/analytics" element={<LazyWrapper><Analytics /></LazyWrapper>} />
          <Route path="/doctor/setting" element={<LazyWrapper><Setting /></LazyWrapper>} />
        </Route>

        {/* Patient/User */}
        <Route element={<RoleBasedRoute allowedRoles={['patient', 'doctor', 'admin']} />}>
          <Route path="/patient/*" element={<LazyWrapper><UserDashboard /></LazyWrapper>} />
          <Route path="/patient/profile" element={<LazyWrapper><UserProfile /></LazyWrapper>} />
          <Route path="/patient/money" element={<UserMoneyDonationPage/>}/>
          <Route path="/patient/appointment" element={<AppointmentPage/>}/>
          <Route path="/patient/donate" element={ <UserMedicineDonationPageWrapper selectedMode="donate" />} />
          <Route path="/patient/request" element={ <UserMedicineDonationPageWrapper selectedMode="request" />}/>
          <Route path="/patient/location" element={<LocationPage/>}/>
          <Route path="/patient/setting" element={<SettingPage/>}/>
        </Route>
      </Route>

      {/* Catch-all 404 redirect: always LAST */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;