import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUsers, FiCalendar, FiMapPin, FiSettings, FiUserPlus, FiUserMinus } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import GroupHeader from '../../components/groups/detail/GroupHeader';
import MembersList from '../../components/groups/detail/MembersList';
import ActivityFeed from '../../components/groups/detail/ActivityFeed';
import GroupSettings from '../../components/groups/detail/GroupSettings';
import { useAuth } from '../../context/AuthContext';

export default function GroupDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated, user, joinGroup, leaveGroup, isGroupJoined } = useAuth();
  
  const [group, setGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('activity');
  const [isJoining, setIsJoining] = useState(false);

  // Fetch group data
  useEffect(() => {
    if (!id) return;

    const fetchGroup = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/groups/${id}`);
        if (!response.ok) {
          throw new Error('Group not found');
        }
        
        const groupData = await response.json();
        setGroup(groupData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleJoinLeave = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to join groups');
      return;
    }

    if (isJoining) return;

    setIsJoining(true);
    try {
      const isCurrentlyJoined = isGroupJoined(parseInt(id));
      
      if (isCurrentlyJoined) {
        leaveGroup(parseInt(id));
        setGroup(prev => ({
          ...prev,
          members: Math.max(1, prev.members - 1)
        }));
      } else {
        joinGroup(parseInt(id));
        setGroup(prev => ({
          ...prev,
          members: prev.members + 1
        }));
      }
    } catch (error) {
      console.error('Failed to join/leave group:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const handleBackClick = () => {
    router.push('/groups');
  };

  const isUserAdmin = () => {
    return user && group && (user.name === group.admin || user.username === group.adminId);
  };

  const isUserJoined = () => {
    return isGroupJoined(parseInt(id));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading group details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Group Not Found</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleBackClick}
              className="btn-primary"
            >
              Back to Groups
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{group?.name} | Campus Connect</title>
        <meta name="description" content={group?.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <motion.button
          onClick={handleBackClick}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
          whileHover={{ x: -2 }}
        >
          <FiArrowLeft className="mr-2" />
          Back to Groups
        </motion.button>

        {/* Group Header */}
        <GroupHeader 
          group={group}
          isUserJoined={isUserJoined()}
          isUserAdmin={isUserAdmin()}
          onJoinLeave={handleJoinLeave}
          isJoining={isJoining}
          isAuthenticated={isAuthenticated}
        />

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'activity', label: 'Activity', icon: FiCalendar },
                { id: 'members', label: `Members (${group?.members || 0})`, icon: FiUsers },
                ...(isUserAdmin() ? [{ id: 'settings', label: 'Settings', icon: FiSettings }] : [])
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'activity' && (
              <ActivityFeed 
                activities={group?.recentActivity || []} 
                groupId={parseInt(id)}
                isUserJoined={isUserJoined()}
              />
            )}
            {activeTab === 'members' && (
              <MembersList 
                members={group?.membersList || []} 
                isUserAdmin={isUserAdmin()}
                groupId={parseInt(id)}
              />
            )}
            {activeTab === 'settings' && isUserAdmin() && (
              <GroupSettings 
                group={group}
                onGroupUpdate={setGroup}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
