import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // If user is already authenticated, redirect to feed
        router.replace('/feed');
      } else {
        // If user is not authenticated, redirect to login
        router.replace('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading spinner while determining auth state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Campus Connect...</p>
      </div>
    </div>
  );
}
