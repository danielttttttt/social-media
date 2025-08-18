import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

/**
 * Higher-order component that protects routes from unauthenticated access
 * Redirects unauthenticated users to the login page
 */
const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Only redirect if we're not loading and user is not authenticated
    if (!isLoading && !isAuthenticated) {
      // Store the attempted URL to redirect back after login
      const returnUrl = router.asPath;
      if (returnUrl !== '/login' && returnUrl !== '/signup') {
        router.replace(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading spinner while redirecting unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Render the protected content if user is authenticated
  return children;
};

export default ProtectedRoute;
