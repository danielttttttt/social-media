import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisH, FaCheck, FaTimes, FaUserPlus, FaUserMinus, FaRetweet, FaRegBookmark, FaBookmark, FaLink } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext.js';
import { useRouter } from 'next/router';
import Comments from './Comments.js';
import api from '../../utils/api.js'; // Added .js extension


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

export default function PostCard({ post, onLikeUpdate, onFollowUpdate, hideHeader = false }) {
  // --- (FIX #1) Also destructure the 'user' object from the auth context ---
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(post.likedByMe || false);
  const [localLikes, setLocalLikes] = useState(post._count?.likes || 0);
  const [localCommentCount, setLocalCommentCount] = useState(post._count?.comments || 0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareToast, setShareToast] = useState({ show: false, message: '', type: 'success' });
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isReposted, setIsReposted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const menuRef = useRef(null);

  // Now that 'user' is defined, this line will work correctly.
  const isCurrentUserPost = user?.id === post.author?.id;

  // --- (FIX #2) Add optional chaining for safety ---
  // This prevents a crash if post.author is ever undefined.
  const [isFollowed, setIsFollowed] = useState(post.author?.isFollowedByMe || false);



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

  const handleFollowToggle = async () => {
    const newFollowState = !isFollowed;
    setIsFollowed(newFollowState);
    showToast(newFollowState ? `Following ${post.author?.name}` : `Unfollowed ${post.author?.name}`, 'success');

    try {
      if (newFollowState) {
        await api.users.followUser(post.author.id);
      } else {
        await api.users.unfollowUser(post.author.id);
      }
      // --- THIS IS THE FIX ---
      // On success, tell the parent component to refetch the feed
      onFollowUpdate?.();

    } catch (error) {
      console.error("Failed to update follow status:", error);
      setIsFollowed(!newFollowState); // Revert UI on failure
      showToast('Action failed. Please try again.', 'error');
    }
  };

  const handleLike = async () => {
    if (isAnimating) return;

    const newLikedState = !isLiked;
    const newLikeCount = newLikedState ? localLikes + 1 : localLikes - 1;

    setIsAnimating(true);
    setIsLiked(newLikedState);
    setLocalLikes(newLikeCount);
    setTimeout(() => setIsAnimating(false), 600);

    try {
      if (newLikedState) {
        await api.posts.likePost(post.id);
      } else {
        await api.posts.unlikePost(post.id);
      }
      onLikeUpdate?.(post.id, newLikedState, newLikeCount);
    } catch (error) {
      console.error("Failed to update like status:", error);
      setIsLiked(!newLikedState);
      setLocalLikes(localLikes);
      showToast('Action failed. Please try again.', 'error');
    }
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

 useEffect(() => {
    setIsSaved(false);
  }, [post.id]);

  const handleSavePost = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    showToast(newSavedState ? 'Post saved to your bookmarks' : 'Post removed from your bookmarks');
  };

  const handleCommentClick = () => {
    setShowComments(prev => !prev);
  };
  // The JSX for the component remains the same.
  // The logic above is what needed to be fixed.
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

                {isAuthenticated && !isCurrentUserPost && (
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
                          <button
                            onClick={() => {
                              handleRepost();
                              setShowMenu(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaRetweet className="mr-2" />
                            <span>{isReposted ? 'Undo repost' : 'Repost'}</span>
                          </button>
                          <button
                            onClick={() => {
                              handleSavePost();
                              setShowMenu(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {isSaved ? (
                              <FaBookmark className="mr-2 text-yellow-500" />
                            ) : (
                              <FaRegBookmark className="mr-2" />
                            )}
                            <span>{isSaved ? 'Saved' : 'Save post'}</span>
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
                              showToast('Link copied to clipboard');
                              setShowMenu(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaLink className="mr-2" />
                            <span>Copy Link</span>
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => {
                              handleShare();
                              setShowMenu(false);
                            }}
                            className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaShare className="mr-2" />
                            <span>Share via...</span>
                          </button>
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