import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const admin = localStorage.getItem('admin');

  return (admin === 'true') ? children : <Navigate to="/login" replace />;
};

export default AdminRoute