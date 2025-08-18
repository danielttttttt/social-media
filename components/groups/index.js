import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiUsers } from 'react-icons/fi';
import GroupCard from './GroupCard';
import GroupSkeleton from './GroupSkeleton';
import CreateGroupModal from './CreateGroupModal';
import Button from '../ui/Button';

// Mock data fetching
const fetchGroups = async () => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  const res = await fetch('/api/groups');
  const data = await res.json();
  return data;
};

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const getGroups = async () => {
      try {
        setIsLoading(true);
        const fetchedGroups = await fetchGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error('Error fetching groups:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getGroups();
  }, []);

  const handleGroupCreate = (newGroup) => {
    setGroups(currentGroups => [newGroup, ...currentGroups]);
  };

  const handleJoinGroup = (groupId) => {
    setGroups(currentGroups =>
      currentGroups.map(group =>
        group.id === groupId
          ? { ...group, members: group.members + 1, isJoined: true }
          : group
      )
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Groups Grid */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              All Groups
              <span className="ml-2 text-gray-500">({groups.length})</span>
            </h2>
            <Button
              onClick={() => setShowCreateModal(true)}
              leftIcon={<FiPlus />}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Create Group
            </Button>
          </div>

          {isLoading ? (
            // Show skeleton loaders
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill().map((_, i) => <GroupSkeleton key={i} />)}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {groups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {groups.map(group => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      onJoin={handleJoinGroup}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <FiUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No groups found</h3>
                  <p className="text-gray-500 mb-4">
                    Be the first to create a group!
                  </p>
                  <Button
                    onClick={() => setShowCreateModal(true)}
                    leftIcon={<FiPlus />}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create Group
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onGroupCreate={handleGroupCreate}
      />
    </div>
  );
}
