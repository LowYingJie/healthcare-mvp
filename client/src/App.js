// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import DoctorList from './pages/patient/DoctorList';
import BookAppointment from './pages/patient/BookAppointment';
import PatientAppointments from './pages/patient/Appointments';
import PatientMedications from './pages/patient/Medications';
import PatientSpecialOffers from './pages/patient/SpecialOffers';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorAppointments from './pages/doctor/Appointments';
import DoctorPatients from './pages/doctor/Patients';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Patient Routes */}
          <Route 
            path="/patient/dashboard" 
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/doctors" 
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <DoctorList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/book-appointment/:doctorId" 
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <BookAppointment />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/appointments" 
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientAppointments />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/medications" 
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientMedications />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/patient/special-offers" 
            element={
              <PrivateRoute allowedRoles={['patient']}>
                <PatientSpecialOffers />
              </PrivateRoute>
            } 
          />
          
          {/* Doctor Routes */}
          <Route 
            path="/doctor/dashboard" 
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/doctor/appointments" 
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorAppointments />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/doctor/patients" 
            element={
              <PrivateRoute allowedRoles={['doctor']}>
                <DoctorPatients />
              </PrivateRoute>
            } 
          />
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
