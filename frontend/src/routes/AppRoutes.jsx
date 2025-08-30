import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IndexPage from '../components/landing/IndexPage';
import LoginSignupPage from '../components/auth/LoginSignup';
import DocumentationPage from '../components/landing/DocumentationPage';
import AdminDashboard from '../layouts/AdminDashboard';

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
      <Route path="/" element={<IndexPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/app" /> : <LoginSignupPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/app" /> : <LoginSignupPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/app" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="doctors" element={<Doctors/>}/>
          <Route path="patients" element={<Patients/>}/>
          <Route path="appointments" element={<Appointments/>}/>
          <Route path="pharmacy" element={<Pharmacy/>}/>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
export default AppRoutes;