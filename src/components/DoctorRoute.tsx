import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface DoctorRouteProps {
  children: React.ReactNode;
}

export const DoctorRoute = ({ children }: DoctorRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'doctor') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
