import { motion } from 'framer-motion';
import { FaUsers, FaCalendar, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function GroupCard({ group, onJoin, isJoined: propIsJoined, isAuthenticated }) {
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(propIsJoined || group.isJoined || false);
  const [localMembers, setLocalMembers] = useState(group.members);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async (e) => {
    e.stopPropagation(); // Prevent card click when joining
    if (isJoining) return;

    if (!isAuthenticated) {
      alert('Please sign in to join groups');
      return;
    }

    setIsJoining(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newJoinedState = !isJoined;
      setIsJoined(newJoinedState);
      setLocalMembers(prev => newJoinedState ? prev + 1 : Math.max(1, prev - 1));

      onJoin?.(group.id, newJoinedState);
    } catch (error) {
      console.error('Failed to join group:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCardClick = () => {
    router.push(`/groups/${group.id}`);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-blue-100 text-blue-800',
      'Sports': 'bg-green-100 text-green-800',
      'Arts': 'bg-purple-100 text-purple-800',
      'Technology': 'bg-indigo-100 text-indigo-800',
      'Social': 'bg-pink-100 text-pink-800',
      'Volunteer': 'bg-yellow-100 text-yellow-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      {/* Group Image */}
      {group.imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={group.imageUrl}
            alt={group.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
              {isJoined && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Joined
                </span>
              )}
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(group.category)}`}>
              {group.category}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{group.description}</p>

        {/* Stats */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <FaUsers className="w-4 h-4" />
            <span>{localMembers} members</span>
          </div>
          {group.meetingSchedule && (
            <div className="flex items-center space-x-1">
              <FaCalendar className="w-4 h-4" />
              <span>{group.meetingSchedule}</span>
            </div>
          )}
        </div>

        {/* Location */}
        {group.location && (
          <div className="flex items-center space-x-1 mb-4 text-sm text-gray-500">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{group.location}</span>
          </div>
        )}

        {/* Admin */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image 
              src={group.adminProfilePic} 
              alt={group.admin} 
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{group.admin}</p>
            <p className="text-xs text-gray-500">Group Admin</p>
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={handleJoin}
          disabled={isJoining || !isAuthenticated}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            !isAuthenticated
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : isJoined
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isJoining ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              <span>Processing...</span>
            </div>
          ) : !isAuthenticated ? (
            'Sign in to Join'
          ) : isJoined ? (
            <div className="flex items-center justify-center space-x-2">
              <FaCheck className="w-4 h-4" />
              <span>Leave Group</span>
            </div>
          ) : (
            'Join Group'
          )}
        </button>
      </div>
    </motion.div>
  );
}
