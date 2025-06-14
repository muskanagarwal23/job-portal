import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user ) {
    return <Navigate to="/login" replace />;
  }
  console.log('ProtectedRoute user:', user);
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  console.log('Allowed roles:', allowedRoles);
  return <Outlet />;
};

export default ProtectedRoute;
