import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import IndexPage from '../components/landing/IndexPage';
import LoginPage from '../components/auth/LoginPage';
import SignupPage from '../components/auth/SignupPage';
import DocumentationPage from '../pages/documentation/DocumentationPage';
import AdminDashboard from '../layouts/admin/AdminDashboard';
import AboutPage from '../pages/AboutPage';
import HowItWorksPage from '../pages/HowItWorksPage';
import ImpactPage from '../pages/ImpactPage';
import MoneyDonationPage from '../pages/donation/MoneyDonationPage';
import MedicineDonationPage from '../pages/donation/MedicineDonationPage';
import ContactPage from '../pages/ContactPage';
import FAQPage from '../pages/FAQPage';
import SafetyPage from '../pages/SafetyPage';
import PartnersPage from '../pages/PartnersPage';
import VolunteersPage from '../pages/VolunteersPage';
import ForgotPassword from '../components/auth/verification-Page/ForgotPasswordPage';
import NewPasswordPage from '../components/auth/verification-Page/NewPasswordPage';

import TermsPage from '../components/legals/TermsPage';
import PrivacyPage from '../components/legals/PrivacyPage';
import AccessibilityPage from '../components/legals/AccessibilityPage';
import SitemapPage from '../components/legals/SitemapPage';

const Dashboard = () => <div className="p-6">Dashboard Page</div>;
const Doctors = () => <div className="p-6">Doctors Page</div>;
const Patients = () => <div className="p-6">Patients Page</div>;
const Appointments = () => <div className="p-6">Appointments Page</div>;
const Pharmacy = () => <div className="p-6">Pharmacy Page</div>;

const isAuthenticated = false;

const PrivateRoute = () => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Landing Page */}
      <Route path="/" element={<IndexPage />} />

      {/* Project Section Routes */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/impact" element={<ImpactPage />} />
      <Route path="/money" element={<MoneyDonationPage />} />
      <Route path="/medicine" element={<MedicineDonationPage />} />

      {/* Resources Section Routes */}
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/safety" element={<SafetyPage />} />

      {/* Community Section Routes */}
      <Route path="/partners" element={<PartnersPage />} />
      <Route path="/volunteers" element={<VolunteersPage />} />

      {/* Legal Pages */}
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/accessibility" element={<AccessibilityPage />} />
      <Route path="/sitemap" element={<SitemapPage />} />

      {/* Authentication Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <LoginPage />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/admin" /> : <SignupPage />} />

      {/* implement this with logic later */}
      <Route path="/logout" element={<IndexPage />}/>
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/NewPasswordPage" element={<NewPasswordPage />}/>

      {/* Protected Routes for authenticated person */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="doctors" element={<Doctors/>}/>
          <Route path="patients" element={<Patients/>}/>
          <Route path="appointments" element={<Appointments/>}/>
          <Route path="pharmacy" element={<Pharmacy/>}/>
        </Route>
      </Route>

      {/* all charachet input redirected to / */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;