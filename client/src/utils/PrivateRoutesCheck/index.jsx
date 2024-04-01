import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutesCheck({ isAuthenticated = false }) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutesCheck;
