import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiUsers } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import GroupCard from './GroupCard';
import GroupSkeleton from './GroupSkeleton';
import CreateGroupModal from './CreateGroupModal';
import SearchAndFilter from './SearchAndFilter';
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
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinedGroups, setJoinedGroups] = useState(new Set()); // Local state for joined groups

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

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

  // Local group membership checker
  const isGroupJoined = (groupId) => {
    return joinedGroups.has(groupId);
  };

  // Local group join/leave handler
  const handleJoinGroup = (groupId, isJoining) => {
    // Update local state
    const newJoinedGroups = new Set(joinedGroups);
    if (isJoining) {
      newJoinedGroups.add(groupId);
    } else {
      newJoinedGroups.delete(groupId);
    }
    setJoinedGroups(newJoinedGroups);

    // In a real app, make API call here
    // Example: await groupsApi.joinGroup(groupId) or groupsApi.leaveGroup(groupId)

    setGroups(currentGroups =>
      currentGroups.map(group =>
        group.id === groupId
          ? {
              ...group,
              members: isJoining ? group.members + 1 : Math.max(1, group.members - 1),
              isJoined: isJoining
            }
          : group
      )
    );
  };

  const handleCreateGroupClick = () => {
    setShowCreateModal(true);
  };

  // Filter and sort groups
  const filteredAndSortedGroups = useMemo(() => {
    let filtered = [...groups];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(group =>
        group.name.toLowerCase().includes(searchLower) ||
        group.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(group => group.category === selectedCategory);
    }

    // Apply membership filter
    if (membershipFilter === 'joined') {
      filtered = filtered.filter(group => isGroupJoined(group.id));
    } else if (membershipFilter === 'available') {
      filtered = filtered.filter(group => !isGroupJoined(group.id));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'members-desc':
          return b.members - a.members;
        case 'members-asc':
          return a.members - b.members;
        case 'date-desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    return filtered;
  }, [groups, searchTerm, selectedCategory, membershipFilter, sortBy, isGroupJoined]);

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedCategory !== 'All' || membershipFilter !== 'all';

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setMembershipFilter('all');
    setSortBy('name-asc');
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 lg:py-4">
{/* Search and Filter Component */}
        {!isLoading && (
          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            membershipFilter={membershipFilter}
            onMembershipFilterChange={setMembershipFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalGroups={groups.length}
            filteredCount={filteredAndSortedGroups.length}
            onClearFilters={handleClearFilters}
            hasActiveFilters={hasActiveFilters}
            onCreateGroup={handleCreateGroupClick}
          />
        )}

        {/* Main Groups Grid */}
        <div>

          {isLoading ? (
            // Show skeleton loaders
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {Array(8).fill().map((_, i) => <GroupSkeleton key={i} />)}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {filteredAndSortedGroups.length > 0 ? (
                <motion.div
                  key="groups-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
                >
                  <AnimatePresence>
                    {filteredAndSortedGroups.map((group, index) => (
                      <motion.div
                        key={group.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                        className="h-full"
                      >
                        <GroupCard
                          group={group}
                          onJoin={handleJoinGroup}
                          isJoined={isGroupJoined(group.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="no-groups"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16 bg-white rounded-xl border border-gray-200"
                >
                  <div className="max-w-sm mx-auto">
                    <FiUsers className="mx-auto h-16 w-16 text-gray-300 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {hasActiveFilters ? 'No groups match your filters' : 'No groups found'}
                    </h3>
                    <p className="text-gray-500 mb-6 leading-relaxed">
                      {hasActiveFilters
                        ? 'Try adjusting your search criteria or clear the filters to see all groups.'
                        : 'Be the first to create a group and start building your community!'}
                    </p>
                    {hasActiveFilters ? (
                      <Button
                        onClick={handleClearFilters}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2.5"
                      >
                        Clear All Filters
                      </Button>
                    ) : isAuthenticated ? (
                      <Button
                        onClick={handleCreateGroupClick}
                        leftIcon={<FiPlus />}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5"
                      >
                        Create Your First Group
                      </Button>
                    ) : (
                      <p className="text-sm text-gray-400 mt-2">
                        Sign in to create your first group!
                      </p>
                    )}
                  </div>
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
