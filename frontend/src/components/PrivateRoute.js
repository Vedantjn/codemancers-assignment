// frontend/src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  if (!user || user.role !== 'super_admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;