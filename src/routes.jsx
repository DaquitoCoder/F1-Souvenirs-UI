import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log('isauh', isAuthenticated, 'islo', loading);

  if (loading) return <h1>Loading...</h1>;
  if (!isAuthenticated && !loading) return <Navigate to='/login' replace />;
  return <Outlet />;
};
