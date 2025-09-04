import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Feed from '../components/feed/Feed.js';

export default function FeedPage() {
  const [isMounted, setIsMounted] = useState(false);
  const feedRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCreatePostClick = () => {
    if (feedRef.current && feedRef.current.openCreateModal) {
      feedRef.current.openCreateModal();
    }
  };

  if (!isMounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Feed | Campus Connect</title>
        <meta name="description" content="Stay updated with the latest campus news and events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar onCreatePostClick={handleCreatePostClick} />
      <main>
        <Feed ref={feedRef} />
      </main>
    </div>
  );
}
