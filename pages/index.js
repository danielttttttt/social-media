import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading, initialized } = useAuth();

  useEffect(() => {
    if (initialized && !loading) {
      if (isAuthenticated) {
        // Redirect authenticated users to feed
        router.replace('/feed');
      } else {
        // Redirect unauthenticated users to login
        router.replace('/login');
      }
    }
  }, [router, isAuthenticated, loading, initialized]);

  // Show loading spinner while checking auth or redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Campus Connect...</p>
      </div>
    </div>
  );
}
