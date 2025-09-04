import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        const displayName = user?.name?.toLowerCase();
        const username = user?.username?.toLowerCase();
        const mine = Array.isArray(data)
          ? data.filter(p => {
              const author = (p.author || '').toLowerCase();
              return author === displayName || author === username;
            })
          : [];
        setPosts(mine);
      } catch (_) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) load();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-2">Profile</h1>
        <p className="text-gray-600 dark:text-gray-300">Please sign in to view your profile.</p>
        <div className="mt-4">
          <Link href="/" className="btn-secondary px-3 py-2">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card-bg rounded-lg border border-gray-200 dark:border-gray-800 p-6 flex flex-col items-center text-center">
        <img src={user?.profilePic || '/default-avatar.png'} alt={user?.name || 'User'} className="w-28 h-28 rounded-full object-cover" />
        <div className="mt-4">
          <div className="text-2xl font-semibold">{user?.name || 'Unnamed'}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">@{user?.username}</div>
        </div>
        {user?.bio && <p className="mt-3 text-gray-700 dark:text-gray-300 max-w-2xl">{user.bio}</p>}
        <div className="mt-4 flex gap-3">
          <Link href="/settings/profile" className="btn-primary px-3 py-2">Edit Profile</Link>
          <Link href="/" className="btn-secondary px-3 py-2">Back to Home</Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-3">Posts</h2>
        {loading ? (
          <div className="text-gray-600 dark:text-gray-300">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-300">No posts yet.</div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {posts.map((post) => (
              <div key={post.id} className="relative overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 aspect-square">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-2 text-center text-sm text-gray-700 dark:text-gray-300">
                    {post.title}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

