import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element}) => {
  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  return loggedIn ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
