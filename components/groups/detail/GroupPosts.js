import { useState, useEffect } from 'react';
import PostCard from '../../feed/PostCard';
import { useAuth } from '../../../context/AuthContext';

export default function GroupPosts({ groupId, isUserJoined }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Fetch group posts
  useEffect(() => {
    const fetchGroupPosts = async () => {
      if (!groupId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch posts for this group
        const response = await fetch(`/api/groups/${groupId}/posts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch group posts');
        }
        
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching group posts:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroupPosts();
  }, [groupId]);

  const handleLike = async (postId, liked) => {
    try {
      // Optimistic UI update
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                likes: liked ? post.likes + 1 : Math.max(0, post.likes - 1),
                isLiked: liked
              } 
            : post
        )
      );

      // Make API call to like/unlike
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: liked ? 'POST' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user?.id })
      });

      if (!response.ok) {
        throw new Error('Failed to update like status');
      }
    } catch (err) {
      console.error('Error updating like:', err);
      // Revert optimistic update on error
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                likes: liked ? Math.max(0, post.likes - 1) : post.likes + 1,
                isLiked: !liked
              } 
            : post
        )
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>Error loading posts: {error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No posts yet. {isUserJoined ? 'Be the first to post something!' : 'Join the group to see posts.'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={handleLike} 
          hideHeader={false}
        />
      ))}
    </div>
  );
}
