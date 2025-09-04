import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';

export default function Comments({ post, onCommentAdd, initialShowComments = false, onToggleComments }) {
  const { isAuthenticated } = useAuth();
  const [showComments, setShowComments] = useState(initialShowComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState(post.commentsList || []);
  const [likedComments, setLikedComments] = useState(new Set());

  // Sync with parent component's showComments state
  useEffect(() => {
    setShowComments(initialShowComments);
  }, [initialShowComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Mock user data - in real app this would come from auth context
      const mockUser = {
        name: 'Current User',
        profilePic: 'https://i.pravatar.cc/150?u=current_user'
      };

      const response = await fetch(`/api/comments?postId=${post.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          author: mockUser.name,
          profilePic: mockUser.profilePic,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments(prev => [...prev, comment]);
        setNewComment('');
        onCommentAdd?.(post.id);
      }
    } catch (error) {
      console.error('Failed to add comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentLike = async (commentId) => {
    const isLiked = likedComments.has(commentId);
    
    try {
      const response = await fetch(`/api/comments?postId=${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          commentId,
          action: isLiked ? 'unlike' : 'like',
        }),
      });

      if (response.ok) {
        setLikedComments(prev => {
          const newSet = new Set(prev);
          if (isLiked) {
            newSet.delete(commentId);
          } else {
            newSet.add(commentId);
          }
          return newSet;
        });

        setComments(prev => prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, likes: isLiked ? comment.likes - 1 : comment.likes + 1 }
            : comment
        ));
      }
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - commentTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="border-t border-gray-100 pt-3">
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Comments List */}
            {comments.length > 0 && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={comment.profilePic}
                          alt={comment.author}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{comment.author}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">{comment.content}</p>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                      >
                        {likedComments.has(comment.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart />
                        )}
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Comment Form */}
            {isAuthenticated && (
              <form onSubmit={handleCommentSubmit} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden bg-blue-500">
                    <Image
                      src="https://i.pravatar.cc/150?u=current_user"
                      alt="Your avatar"
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                      disabled={isSubmitting}
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim() || isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      <FaPaperPlane className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
