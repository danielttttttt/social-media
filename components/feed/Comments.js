import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaPaperPlane } from 'react-icons/fa';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext.js'; // Use the real Auth Context
import api from '../../utils/api.js'; // Import the real API service

// We are assuming the Comments component is a default export, so we keep this.
export default function Comments({ post, onCommentAdd, initialShowComments = false, onToggleComments }) {
  const { isAuthenticated, user } = useAuth(); // Get the real user
  const [showComments, setShowComments] = useState(initialShowComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // The 'comments' should come from the post object provided by the feed
  const [comments, setComments] = useState(post.comments || []);
  
  const [likedComments, setLikedComments] = useState(new Set());
  const [apiError, setApiError] = useState(null);

  // Sync with parent component's showComments state
  useEffect(() => {
    setShowComments(initialShowComments);
  }, [initialShowComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setApiError(null);
    
    try {
      // --- THIS IS THE REAL API CALL ---
      // NOTE: You will need to build this endpoint on your backend.
      // We are calling 'api.comments.createComment' which you can add to 'utils/api.js'
      
      const commentData = {
          text: newComment,
          postId: post.id
      };
      
      // We will assume an 'api.comments.createComment' function exists.
      // const newCommentFromBackend = await api.comments.createComment(post.id, commentData);
      
      // --- For now, we will MOCK the response until the backend is ready ---
      const mockNewComment = {
          id: Date.now(),
          text: newComment,
          createdAt: new Date().toISOString(),
          sender: {
              id: user.id,
              name: user.name,
              profilePictureUrl: user.profilePictureUrl
          },
          likes: 0
      };
      
      setComments(prev => [...prev, mockNewComment]);
      setNewComment('');
      onCommentAdd?.(post.id);

    } catch (error) {
      console.error('Failed to add comment:', error);
      setApiError(error.message || "Could not post comment.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // NOTE: The logic for liking a comment also requires a backend endpoint.
  // For now, it will only update the local UI.
  const handleCommentLike = (commentId) => {
    setComments(prevComments => 
      prevComments.map(comment => {
        if (comment.id === commentId) {
          const isLiked = likedComments.has(commentId);
          const newLikes = isLiked ? comment.likes - 1 : comment.likes + 1;
          
          setLikedComments(prevLiked => {
            const newSet = new Set(prevLiked);
            if (isLiked) {
              newSet.delete(commentId);
            } else {
              newSet.add(commentId);
            }
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
                          src={comment.sender?.profilePictureUrl || '/default-avatar.png'}
                          alt={comment.sender?.name || 'User avatar'}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{comment.sender?.name}</h4>
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
            {apiError && (
                 <div className="text-xs text-red-600 bg-red-50 p-2 rounded-md">{apiError}</div>
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
