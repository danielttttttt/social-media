import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  FiCalendar, 
  FiUsers, 
  FiMegaphone,
  FiEdit3,
  FiSend
} from 'react-icons/fi';


export default function ActivityFeed({ activities, groupId, isUserJoined }) {
  const [newPost, setNewPost] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [localActivities, setLocalActivities] = useState(activities || []);

  // Update local activities when activities prop changes
  // Filter out post-type activities
  useEffect(() => {
    const filteredActivities = (activities || []).filter(activity => activity.type !== 'post');
    setLocalActivities(filteredActivities);
  }, [activities]);



  const getActivityIcon = (type) => {
    const icons = {
      'post': FiEdit3,
      'announcement': FiMegaphone,
      'member_joined': FiUsers,
      'event': FiCalendar
    };
    const Icon = icons[type] || FiEdit3;
    return <Icon className="w-4 h-4" />;
  };

  const getActivityColor = (type) => {
    const colors = {
      'post': 'bg-blue-100 text-blue-600',
      'announcement': 'bg-orange-100 text-orange-600',
      'member_joined': 'bg-green-100 text-green-600',
      'event': 'bg-purple-100 text-purple-600'
    };
    return colors[type] || colors['post'];
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || isPosting) return;

    setIsPosting(true);
    
    try {
      // In a real app, you would make an API call here to create the post
      const newActivity = {
        id: Date.now().toString(),
        type: 'post',
        author: 'You',
        authorPic: '/default-avatar.png', // Replace with actual user avatar
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        isLiked: false
      };

      setLocalActivities(prev => [newActivity, ...prev]);
      setNewPost('');
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* New Post Form (for joined members) */}
      {isUserJoined && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share something with the group..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={!newPost.trim() || isPosting}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isPosting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <FiSend className="w-4 h-4 mr-2" />
                )}
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Activity Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              {/* Activity Header */}
              <div className="flex items-start space-x-3 mb-3">
                {activity.authorPic && (
                  <div className="relative w-10 h-10">
                    <Image
                      src={activity.authorPic}
                      alt={activity.author}
                      fill
                      className="rounded-full object-cover"
                      sizes="40px"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-gray-900">{activity.author}</h4>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                      <span className="ml-1 capitalize">{activity.type.replace('_', ' ')}</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{formatTimeAgo(activity.timestamp)}</p>
                </div>
              </div>

              {/* Activity Content */}
              <div className="mb-4">
                <p className="text-gray-800 leading-relaxed">{activity.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <FiEdit3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
          <p className="text-gray-500 mb-4">Be the first to share something with the group!</p>
          {isUserJoined && (
            <p className="text-sm text-gray-400">Use the form above to create your first post.</p>
          )}
        </div>
      )}
    </div>
  );
}
