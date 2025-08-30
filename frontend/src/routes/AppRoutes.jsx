import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from '../layouts/AdminDashboard';
import LoginSignupPage from '../components/auth/LoginSignup';
import IndexPage from '../components/landing/IndexPage';

const Dashboard = () => <div className="p-6">Dashboard Page</div>;
const Doctors = () => <div className="p-6">Doctors Page</div>;
const Patients = () => <div className="p-6">Patients Page</div>;
const Appointments = () => <div className="p-6">Appointments Page</div>;
const Pharmacy = () => <div className="p-6">Pharmacy Page</div>;


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginSignupPage />} />
      <Route path="/register" element={<LoginSignupPage />} />

      <Route path="/" element={<IndexPage />} />

      <Route path='/app' element={<AdminDashboard/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="doctors" element={<Doctors/>}/>
        <Route path="patients" element={<Patients/>}/>
        <Route path="appointments" element={<Appointments/>}/>
        <Route path="pharmacy" element={<Pharmacy/>}/>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="07" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes