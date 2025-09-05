import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext.js';
import api from '../../utils/api.js';

export default function Comments({ post, onCommentAdd, initialShowComments = false, onToggleComments }) {
  const { isAuthenticated, user } = useAuth();
  const [showComments, setShowComments] = useState(initialShowComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // --- CORRECTED STATE INITIALIZATION ---
  const [comments, setComments] = useState([]); // Always start with an empty array
  const [isLoading, setIsLoading] = useState(false); 
  const [hasFetched, setHasFetched] = useState(false); // Track if we've already fetched
  
  const [likedComments, setLikedComments] = useState(new Set());
  const [apiError, setApiError] = useState(null);

  // --- NEW useEffect FOR LAZY LOADING ---
  // This effect runs when the user clicks to expand the comments section.
  useEffect(() => {
    const fetchComments = async () => {
      // Only fetch if the component is visible AND we haven't fetched before.
      if (showComments && !hasFetched) {
        setIsLoading(true);
        setApiError(null);
        try {
          const fetchedComments = await api.comments.getComments(post.id);
          setComments(fetchedComments);
          setHasFetched(true); // Mark as fetched so we don't fetch again
        } catch (error) {
          console.error("Failed to fetch comments:", error);
          setApiError("Could not load comments.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchComments();
  }, [showComments, hasFetched, post.id]); // Dependencies for the effect

  // Sync with the initial state from the parent component
  useEffect(() => {
    setShowComments(initialShowComments);
  }, [initialShowComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const commentData = { text: newComment };
      const newCommentFromBackend = await api.comments.createComment(post.id, commentData);
      
      setComments(prev => [...prev, newCommentFromBackend]);
      setNewComment('');
      onCommentAdd?.(post.id);

    } catch (error) {
      console.error('Failed to add comment:', error);
      setApiError(error.message || "Could not post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCommentLike = (commentId) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          const isLiked = likedComments.has(commentId);
          const newLikes = isLiked ? comment.likes - 1 : comment.likes + 1;
          
          setLikedComments(prevLiked => {
            const newSet = new Set(prevLiked);
            isLiked ? newSet.delete(commentId) : newSet.add(commentId);
            return newSet;
          });

          return { ...comment, likes: newLikes };
        }
        return comment;
      })
    );
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
            {/* Loading Indicator */}
            {isLoading && (
              <p className="text-sm text-gray-500 p-3">Loading comments...</p>
            )}

            {/* Comments List */}
            {!isLoading && comments.length > 0 && (
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
                          src={comment.author?.profilePictureUrl || '/default-avatar.png'}
                          alt={comment.author?.name || 'User avatar'}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{comment.author?.name}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">{comment.text}</p>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                      >
                        {likedComments.has(comment.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart />
                        )}
                        <span>{comment.likes || 0}</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* API Error Display */}
            {!isLoading && apiError && (
                 <div className="text-xs text-red-600 bg-red-50 p-2 rounded-md">{apiError}</div>
            )}
            
            {/* Empty State */}
            {!isLoading && !apiError && comments.length === 0 && (
                 <div className="text-sm text-gray-500 p-3">Be the first to comment.</div>
            )}

            {/* Comment Form */}
            {isAuthenticated && user && (
              <form onSubmit={handleCommentSubmit} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden bg-blue-500">
                    <Image
                      src={user.profilePictureUrl || '/default-avatar.png'}
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
