import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiTrash2, FiAlertTriangle, FiSettings, FiUsers, FiLock } from 'react-icons/fi';

export default function GroupSettings({ group, onGroupUpdate }) {
  const [formData, setFormData] = useState({
    name: group?.name || '',
    description: group?.description || '',
    category: group?.category || 'Academic',
    location: group?.location || '',
    meetingSchedule: group?.meetingSchedule || '',
    imageUrl: group?.imageUrl || '',
    isPrivate: false // New setting for group privacy
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

  const categories = [
    'Academic',
    'Sports',
    'Social',
    'Professional',
    'Hobby',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the group data
      const updatedGroup = {
        ...group,
        ...formData
      };
      
      onGroupUpdate(updatedGroup);
      
      // In a real app, this would make an API call to update the group
      console.log('Group updated:', updatedGroup);
      
    } catch (error) {
      console.error('Failed to update group:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGroup = async () => {
    // In a real app, this would make an API call to delete the group
    console.log('Deleting group:', group.id);
    setShowDeleteConfirm(false);
    // Redirect to groups page after deletion
    window.location.href = '/groups';
  };

  const sections = [
    { id: 'general', label: 'General Settings', icon: FiSettings },
    { id: 'privacy', label: 'Privacy & Access', icon: FiLock },
    { id: 'danger', label: 'Danger Zone', icon: FiAlertTriangle }
  ];

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* General Settings */}
      {activeSection === 'general' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Group Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Schedule
                </label>
                <input
                  type="text"
                  name="meetingSchedule"
                  value={formData.meetingSchedule}
                  onChange={handleInputChange}
                  placeholder="e.g., Weekly, Bi-weekly"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Library Room 204"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <FiSave className="w-4 h-4 mr-2" />
                )}
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Privacy Settings */}
      {activeSection === 'privacy' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy & Access</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Private Group</h4>
                <p className="text-sm text-gray-600">Only invited members can join this group</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {/* Danger Zone */}
      {activeSection === 'danger' && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white border border-red-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-medium text-red-900 mb-2">Delete Group</h4>
              <p className="text-sm text-red-700 mb-4">
                Once you delete this group, there is no going back. This action cannot be undone.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiTrash2 className="w-4 h-4 mr-2" />
                Delete Group
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center mb-4">
              <FiAlertTriangle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Delete Group</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{group?.name}"? This action cannot be undone and all group data will be permanently lost.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteGroup}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Group
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
