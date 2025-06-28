import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Ruta protegida que solo permite el acceso a usuarios con el rol "admin".
 * Si el usuario no está autenticado, se redirige al login.
 * Si el usuario está autenticado pero no es admin, se redirige al inicio.
 */
const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;


