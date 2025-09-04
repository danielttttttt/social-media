import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.js';
import CategoryFilter from './CategoryFilter.js'; // Added .js
import PostCard from './PostCard.js';             // Added .js
import PostSkeleton from './PostSkeleton.js';     // Added .js
import CreatePostModal from './CreatePostModal.js'; // Added .js
import Button from '../ui/Button.js';             // Added .js
import api from '../../utils/api.js';

// Helper to format ENUMs for display
const formatCategory = (categoryEnum) => {
  if (!categoryEnum) return 'General';
  return categoryEnum
    .replace('_', ' ')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const Feed = forwardRef((props, ref) => {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const getFeedPosts = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        setPosts([]);
        setFilteredPosts([]);
        return;
      }
      try {
        setIsLoading(true);
        const fetchedPosts = await api.posts.getFeed();
        setPosts(fetchedPosts);
        setFilteredPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getFeedPosts();
  }, [isAuthenticated]);

  const handleFilter = (category) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => formatCategory(post.postType) === category);
      setFilteredPosts(filtered);
    }
  };

  const handleLike = async (postId, newLikedState) => {
    console.log(`Post ${postId} like status changed to: ${newLikedState}`);
    // In a real app, you would add the API call here
  };

  const handlePostCreate = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    if (activeCategory === 'All' || formatCategory(newPost.postType) === activeCategory) {
      setFilteredPosts(currentFiltered => [newPost, ...currentFiltered]);
    }
  };

  const handleCreatePostClick = (e) => {
    e.preventDefault();
    setShowCreateModal(true);
  };

  useImperativeHandle(ref, () => ({
    openCreateModal: () => {
      setShowCreateModal(true);
    }
  }));

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Category Filter */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-10">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={handleFilter}
            isMobile={true}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
        {/* Mobile Create Post Button */}
        {isAuthenticated && (
          <div className="lg:hidden mb-6">
            <Button
              onClick={handleCreatePostClick}
              leftIcon={<FiPlus />}
              fullWidth
              className="justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md"
            >
              Create Post
            </Button>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6 sticky top-20 self-start">
            {isAuthenticated && (
              <div>
                <Button
                  onClick={handleCreatePostClick}
                  leftIcon={<FiPlus />}
                  fullWidth
                  className="justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md"
                >
                  Create Post
                </Button>
              </div>
            )}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore</h3>
              <CategoryFilter
                activeCategory={activeCategory}
                onSelectCategory={handleFilter}
                isMobile={false}
              />
            </div>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-9">
            <div className="space-y-4 lg:space-y-6">
              {isLoading ? (
                Array(3).fill().map((_, i) => <PostSkeleton key={i} />)
              ) : (
                <AnimatePresence mode="wait">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onLike={handleLike}
                      />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <p className="text-gray-500">No posts found in this category.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreate={handlePostCreate}
      />
    </div>
  );
});

Feed.displayName = 'Feed';

export default Feed;