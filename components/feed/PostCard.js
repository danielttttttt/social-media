import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisH, FaCheck, FaTimes, FaUserPlus, FaUserMinus, FaRetweet, FaRegBookmark, FaBookmark, FaLink } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { toggleBookmark, isBookmarked } from '../../utils/bookmarks';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext.js';
import { useRouter } from 'next/router';
import Comments from './Comments';

// Helper function to format the ENUM from the backend for display
const formatCategory = (categoryEnum) => {
  if (!categoryEnum) return 'General';
  return categoryEnum
    .replace('_', ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default function PostCard({ post, onLike, hideHeader = false }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Initialize state from the new, detailed post object structure
  const [isLiked, setIsLiked] = useState(post.likedByMe || false);
  const [localLikes, setLocalLikes] = useState(post._count?.likes || 0);
  const [localCommentCount, setLocalCommentCount] = useState(post._count?.comments || 0);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareToast, setShareToast] = useState({ show: false, message: '', type: 'success' });
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const menuRef = useRef(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  // Local follow functionality - requires authentication
  const handleFollowToggle = () => {
    const newFollowState = !isFollowed;
    setIsFollowed(newFollowState);
    
    // In a real app, make API call here: await api.users.followUser(post.author.id)
    showToast(newFollowState ? `Following ${post.author?.name}` : `Unfollowed ${post.author?.name}`, 'success');
  };

  const handleLike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLocalLikes(prev => newLikedState ? prev + 1 : prev - 1);
    
    onLike?.(post.id, newLikedState);
    
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const showToast = (message, type = 'success') => {
    setShareToast({ show: true, message, type });
    setTimeout(() => {
      setShareToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post.id}`;
    const shareData = {
      title: post.title,
      text: post.content.substring(0, 100) + (post.content.length > 100 ? '...' : ''),
      url: postUrl,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        showToast('Post shared successfully!');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(postUrl);
        showToast('Link copied to clipboard!');
      } else {
        throw new Error('Share features not supported');
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Failed to share:', err);
        showToast('Failed to share post. Please try again.', 'error');
      }
    }
  };

  const handleCommentAdd = (postId) => {
    setLocalCommentCount(prev => prev + 1);
  };

  const handleRepost = () => {
    const newRepostState = !isReposted;
    setIsReposted(newRepostState);
    showToast(newRepostState ? 'Post reposted to your profile' : 'Removed repost from your profile');
  };

<<<<<<< HEAD
  useEffect(() => {
    setIsSaved(isBookmarked(post.id));
  }, [post.id]);

  const handleSavePost = () => {
    const newSaved = toggleBookmark(post.id);
    setIsSaved(newSaved);
    showToast(newSaved ? 'Post saved to your bookmarks' : 'Post removed from bookmarks');
=======
  const handleSavePost = async () => {
    try {
      const newSavedState = !isSaved;
      setIsSaved(newSavedState);
      showToast(newSavedState ? 'Post saved to your bookmarks' : 'Post removed from bookmarks');
    } catch (error) {
      console.error('Error saving post:', error);
      showToast('Failed to save post', 'error');
    }
>>>>>>> ce1e1ef (feat: Fully integrate backend API with frontend feed and posting)
  };

  const handleCommentClick = () => {
    setShowComments(prev => !prev);
  };

  return (
    <>
      <motion.article
        className="bg-white rounded-lg lg:rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        whileHover={{ y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-4 lg:p-5">
          {isReposted && (
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <FaRetweet className="mr-1" />
              <span>You reposted</span>
            </div>
          )}
          {!hideHeader && (
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={post.author?.profilePictureUrl || '/default-avatar.png'}
                    alt={post.author?.name || 'User Avatar'}
                    fill
                    className="object-cover"
                    sizes="40px"
                    priority={false}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900 truncate">{post.author?.name}</h4>
                    {isFollowed && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Following
                      </span>
                    )}
                  </div>
                  <time className="text-xs text-gray-500 block">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </time>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${
                  post.postType === 'ANNOUNCEMENTS' ? 'bg-blue-100 text-blue-800' :
                  post.postType === 'EVENTS' ? 'bg-green-100 text-green-800' :
                  post.postType === 'ACADEMIC' ? 'bg-purple-100 text-purple-800' :
                  post.postType === 'SOCIAL' ? 'bg-pink-100 text-pink-800' :
                  post.postType === 'CAMPUS_LIFE' ? 'bg-orange-100 text-orange-800' :
                  post.postType === 'MARKETPLACE' ? 'bg-indigo-100 text-indigo-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {formatCategory(post.postType)}
                </span>

                {isAuthenticated && (
                  <button
                    onClick={handleFollowToggle}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      isFollowed
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isFollowed ? (
                      <><FaUserMinus size={10} /><span>Unfollow</span></>
                    ) : (
                      <><FaUserPlus size={10} /><span>Follow</span></>
                    )}
                  </button>
                )}

                {isAuthenticated && (
                  <div className="relative" ref={menuRef}>
                    <button 
                      onClick={() => setShowMenu(!showMenu)}
                      className="text-gray-400 hover:text-gray-600 p-1 relative z-10"
                      aria-label="More options"
                    >
                      <FaEllipsisH size={14} />
                    </button>
                    <AnimatePresence>
                      {showMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                        >
                          {/* Menu items here */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="mt-4">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
            <p className="text-gray-600 line-clamp-3 text-sm lg:text-base">{post.content}</p>
          </div>

          {post.imageUrl && (
            <div className="mt-4 rounded-lg overflow-hidden">
              <div className="relative w-full h-48 sm:h-64 lg:h-80">
                <Image
                  src={post.imageUrl}
                  alt={post.title || 'Post image'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
            <div className="flex space-x-3 lg:space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-1 transition-colors p-1 -m-1 ${
                  isAuthenticated 
                    ? 'text-gray-600 hover:text-red-500'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={isAnimating || !isAuthenticated}
              >
                <motion.span
                  animate={{ scale: isAnimating ? [1, 1.4, 1] : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {isLiked ?
                    <FaHeart className="text-red-500" size={18} /> :
                    <FaRegHeart size={18} />
                  }
                </motion.span>
                <span className="text-sm lg:text-base">{localLikes}</span>
              </button>

              <button
                onClick={handleCommentClick}
                className={`flex items-center space-x-1 transition-colors p-1 -m-1 ${
                  isAuthenticated 
                    ? 'text-gray-600 hover:text-blue-500'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isAuthenticated}
              >
                <FaRegComment size={18} />
                <span className="text-sm lg:text-base">{localCommentCount}</span>
              </button>
            </div>
            <button
              onClick={handleShare}
              className="text-gray-600 hover:text-green-500 transition-colors p-2 -m-2"
              title="Share"
            >
              <FaShare size={18} />
            </button>
          </div>

          <Comments
            post={post}
            onCommentAdd={handleCommentAdd}
            initialShowComments={showComments}
            onToggleComments={setShowComments}
          />
        </div>
      </motion.article>

      {/* Toast Notification */}
      <AnimatePresence>
        {shareToast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 z-50 max-w-sm"
          >
            <div className={`flex items-center p-4 rounded-lg shadow-lg ${
              shareToast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}>
              <div className="flex-shrink-0 mr-3">
                {shareToast.type === 'success' ? <FaCheck className="w-5 h-5" /> : <FaTimes className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{shareToast.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
