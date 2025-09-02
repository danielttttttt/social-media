import { motion } from 'framer-motion';
import { FaUsers, FaCalendar, FaMapMarkerAlt, FaCheck, FaCrown } from 'react-icons/fa';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function GroupCard({ group, onJoin, isJoined: propIsJoined }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isJoined, setIsJoined] = useState(propIsJoined || group.isJoined || false);
  const [localMembers, setLocalMembers] = useState(group.members);
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async (e) => {
    e.stopPropagation();
    if (isJoining) return;

    setIsJoining(true);

    try {
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

  const getCategoryConfig = (category) => {
    const configs = {
      'Academic': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      'Sports': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      'Arts': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      'Technology': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      'Social': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200' },
      'Volunteer': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      'Professional': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
    };
    return configs[category] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  };

  const categoryConfig = getCategoryConfig(group.category);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden transition-all duration-300 cursor-pointer group h-full flex flex-col"
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleCardClick}
    >
      {/* Group Image with consistent aspect ratio */}
      <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {group.imageUrl ? (
          <Image
            src={group.imageUrl}
            alt={group.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaUsers className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        {isJoined && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
              <FaCheck className="w-3 h-3 mr-1" />
              Joined
            </span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryConfig.bg} ${categoryConfig.text} ${categoryConfig.border}`}>
            {group.category}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {group.name}
          </h3>
        </div>

        {/* Description with consistent height */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {group.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <FaUsers className="w-4 h-4" />
            <span className="font-medium">{localMembers.toLocaleString()}</span>
            <span>members</span>
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
            <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{group.location}</span>
          </div>
        )}

        {/* Admin Info */}
        <div className="flex items-center space-x-3 mb-4 p-2 bg-gray-50 rounded-lg">
          <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
            {group.adminProfilePic ? (
              <Image 
                src={group.adminProfilePic} 
                alt={group.admin} 
                fill
                className="object-cover"
                sizes="32px"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <FaCrown className="w-3 h-3 text-gray-500" />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">{group.admin}</p>
            <p className="text-xs text-gray-500">Group Admin</p>
          </div>
        </div>

        {/* Action Button */}
        {isAuthenticated ? (
          <button
            onClick={handleJoin}
            disabled={isJoining}
            className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              isJoined
                ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isJoining ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent"></div>
                <span>Processing...</span>
              </div>
            ) : isJoined ? (
              'Leave Group'
            ) : (
              'Join Group'
            )}
          </button>
        ) : (
          <div className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm bg-gray-100 text-gray-500 text-center">
            Sign in to join
          </div>
        )}
      </div>
    </motion.div>
  );
}
