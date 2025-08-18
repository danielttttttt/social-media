import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaRegComment, FaShare, FaEllipsisH, FaCheck, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Comments from './Comments';

export default function PostCard({ post, onLike }) {
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shareToast, setShareToast] = useState({ show: false, message: '', type: 'success' });
  const [localCommentCount, setLocalCommentCount] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLocalLikes(prev => newLikedState ? prev + 1 : prev - 1);
    
    // Call the parent's onLike function
    onLike?.(post.id, newLikedState);
    
    // Reset animation state
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
      // Try native Web Share API first (mobile devices)
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        showToast('Post shared successfully!');
        return;
      }

      // Fallback to clipboard
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(postUrl);
        showToast('Link copied to clipboard!');
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = postUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand('copy');
          showToast('Link copied to clipboard!');
        } catch (err) {
          showToast('Unable to copy link. Please copy manually: ' + postUrl, 'error');
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error('Failed to share:', err);
      showToast('Failed to share post. Please try again.', 'error');
    }
  };

  const handleCommentAdd = (postId) => {
    setLocalCommentCount(prev => prev + 1);
  };

  const handleCommentClick = () => {
    setShowComments(true);
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
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={post.profilePic}
                alt={post.author}
                fill
                className="object-cover"
                sizes="40px"
                priority={false}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-gray-900 truncate">{post.author}</h4>
              <time className="text-xs text-gray-500 block">
                {new Date(post.timestamp).toLocaleDateString('en-US', {
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
              post.category === 'Announcements' ? 'bg-blue-100 text-blue-800' :
              post.category === 'Events' ? 'bg-green-100 text-green-800' :
              post.category === 'Academic' ? 'bg-purple-100 text-purple-800' :
              post.category === 'Social' ? 'bg-pink-100 text-pink-800' :
              post.category === 'Campus Life' ? 'bg-orange-100 text-orange-800' :
              post.category === 'Marketplace' ? 'bg-indigo-100 text-indigo-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {post.category}
            </span>
            <button className="text-gray-400 hover:text-gray-600 p-1">
              <FaEllipsisH size={14} />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-tight">{post.title}</h3>
          <p className="text-gray-600 line-clamp-3 text-sm lg:text-base">{post.content}</p>
        </div>

        {post.imageUrl && (
          <div className="mt-4 rounded-lg overflow-hidden">
            <div className="relative w-full h-48 sm:h-64 lg:h-80">
              <Image
                src={post.imageUrl}
                alt={post.title}
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
              className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors p-1 -m-1"
              disabled={isAnimating}
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
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors p-1 -m-1"
            >
              <FaRegComment size={18} />
              <span className="text-sm lg:text-base">{localCommentCount}</span>
            </button>
          </div>

          <button
            onClick={handleShare}
            className="text-gray-600 hover:text-green-500 transition-colors p-2 -m-2"
          >
            <FaShare size={18} />
          </button>
        </div>

        {/* Comments Section */}
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
              {shareToast.type === 'success' ? (
                <FaCheck className="w-5 h-5" />
              ) : (
                <FaTimes className="w-5 h-5" />
              )}
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
