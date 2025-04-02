// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContexts';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <h2>Loading... ⏳</h2>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
