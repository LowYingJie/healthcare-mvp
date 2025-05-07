// client/src/components/common/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect based on role
    if (currentUser.role === 'patient') {
      return <Navigate to="/patient/dashboard" />;
    } else if (currentUser.role === 'doctor') {
      return <Navigate to="/doctor/dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRoute;
