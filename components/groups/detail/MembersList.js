import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiSearch, FiMoreVertical, FiUserMinus, FiShield, FiUser } from 'react-icons/fi';

export default function MembersList({ members, isUserAdmin, groupId }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'bg-red-100 text-red-800',
      'Moderator': 'bg-blue-100 text-blue-800',
      'Member': 'bg-gray-100 text-gray-800'
    };
    return colors[role] || colors['Member'];
  };

  const getRoleIcon = (role) => {
    const icons = {
      'Admin': FiShield,
      'Moderator': FiShield,
      'Member': FiUser
    };
    const Icon = icons[role] || icons['Member'];
    return <Icon className="w-3 h-3" />;
  };

  const formatJoinDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const handleMemberAction = (action, memberId) => {
    // In a real app, this would make API calls
    console.log(`${action} member:`, memberId);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors relative"
            >
              {/* Member Actions (Admin Only) */}
              {isUserAdmin && member.role !== 'Admin' && (
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                    className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <FiMoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                  
                  {selectedMember === member.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 min-w-[150px]"
                    >
                      <button
                        onClick={() => handleMemberAction('promote', member.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FiShield className="w-4 h-4 mr-2" />
                        Make Moderator
                      </button>
                      <button
                        onClick={() => handleMemberAction('remove', member.id)}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <FiUserMinus className="w-4 h-4 mr-2" />
                        Remove Member
                      </button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Member Info */}
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="relative w-12 h-12">
                    <Image
                      src={member.profilePic}
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="48px"
                    />
                  </div>
                  {/* Online Status */}
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {member.name}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                      {getRoleIcon(member.role)}
                      <span className="ml-1">{member.role}</span>
                    </span>
                  </div>
                  
                  {member.bio && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {member.bio}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Joined {formatJoinDate(member.joinedAt)}</span>
                    {member.isOnline ? (
                      <span className="text-green-600 font-medium">Online</span>
                    ) : (
                      <span>Offline</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results */}
      {filteredMembers.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-500">No members found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Empty State */}
      {members.length === 0 && (
        <div className="text-center py-8">
          <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No members in this group yet.</p>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
