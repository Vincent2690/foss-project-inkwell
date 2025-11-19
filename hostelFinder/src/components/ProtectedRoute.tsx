import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'student' | 'landlord' | 'admin';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, userRole, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login');
      } else if (requiredRole && userRole !== requiredRole) {
        // Redirect to appropriate dashboard based on user's actual role
        if (userRole === 'student') {
          navigate('/student-dashboard');
        } else if (userRole === 'landlord') {
          navigate('/landlord-dashboard');
        } else if (userRole === 'admin') {
          navigate('/admin-dashboard');
        }
      }
    }
  }, [user, userRole, loading, navigate, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user || (requiredRole && userRole !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};
