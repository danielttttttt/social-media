import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiUsers, FiCalendar, FiMapPin, FiUserPlus, FiUserMinus, FiCheck } from 'react-icons/fi';

export default function GroupHeader({ 
  group, 
  isUserJoined, 
  isUserAdmin, 
  onJoinLeave, 
  isJoining
}) {
  const getCategoryColor = (category) => {
    const colors = {
      'Academic': 'bg-blue-100 text-blue-800',
      'Sports': 'bg-green-100 text-green-800',
      'Social': 'bg-purple-100 text-purple-800',
      'Professional': 'bg-orange-100 text-orange-800',
      'Hobby': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['Other'];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6"
    >
      {/* Cover Image */}
      {group.imageUrl && (
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={group.imageUrl}
            alt={group.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
      )}

      <div className="p-6">
        {/* Group Info */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div className="flex-1 mb-4 md:mb-0">
            {/* Title and Category */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <h1 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                {group.name}
              </h1>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(group.category)} self-start`}>
                {group.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-4 leading-relaxed">
              {group.description}
            </p>

            {/* Group Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FiUsers className="mr-2 text-blue-500" />
                <span>{group.members} member{group.members !== 1 ? 's' : ''}</span>
              </div>
              
              {group.meetingSchedule && (
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-green-500" />
                  <span>{group.meetingSchedule}</span>
                </div>
              )}
              
              {group.location && (
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-red-500" />
                  <span>{group.location}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <span className="text-gray-500">Created {formatDate(group.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:ml-6">
            {/* Join/Leave Button */}
            {!isUserAdmin && (
              <motion.button
                onClick={onJoinLeave}
                disabled={isJoining}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center min-w-[140px] ${
                  isUserJoined
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={!isJoining ? { scale: 1.02 } : {}}
                whileTap={!isJoining ? { scale: 0.98 } : {}}
              >
                {isJoining ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                    Processing...
                  </div>
                ) : isUserJoined ? (
                  <div className="flex items-center">
                    <FiUserMinus className="mr-2 h-4 w-4" />
                    Leave Group
                  </div>
                ) : (
                  <div className="flex items-center">
                    <FiUserPlus className="mr-2 h-4 w-4" />
                    Join Group
                  </div>
                )}
              </motion.button>
            )}

            {/* Admin Badge */}
            {isUserAdmin && (
              <div className="flex items-center px-4 py-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                <FiCheck className="mr-2 h-4 w-4" />
                <span className="font-medium">Group Admin</span>
              </div>
            )}
          </div>
        </div>

        {/* Admin Info */}
        <div className="flex items-center pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="relative w-10 h-10 mr-3">
              <Image
                src={group.adminProfilePic}
                alt={group.admin}
                fill
                className="rounded-full object-cover"
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Group Admin: <span className="font-medium text-gray-900">{group.admin}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
