import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBookmarkedIds } from '../utils/bookmarks';
import PostCard from '../components/feed/PostCard';

export default function BookmarksPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/posts');
        const data = await res.json();
        const ids = getBookmarkedIds();
        const filtered = (Array.isArray(data) ? data : []).filter(p => ids.has(p.id));
        setPosts(filtered);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Saved posts</h1>
        <Link href="/feed" className="btn-secondary px-3 py-2">Back to Feed</Link>
      </div>

      {loading ? (
        <div className="text-gray-600 dark:text-gray-300">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-gray-600 dark:text-gray-300">No saved posts yet.</div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

