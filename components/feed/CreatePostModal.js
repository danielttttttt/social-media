import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaImage, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import { FiMessageSquare, FiCalendar, FiBookOpen, FiUsers, FiMapPin, FiShoppingBag } from 'react-icons/fi';
import Image from 'next/image';

// --- (Step 1) IMPORT your API service and Auth Hook ---
import api from '../../utils/api.js';
import { useAuth } from '../../context/AuthContext.js';

export default function CreatePostModal({ isOpen, onClose, onPostCreate }) {
  // --- (Step 2) GET the real user from the Auth Context ---
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Social', // Default category
    tags: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [apiError, setApiError] = useState(null);

  // --- (Step 3) UPDATE categories array to include the 'value' for the API ---
  const categories = [
    { name: 'Announcements', value: 'ANNOUNCEMENTS', icon: <FiMessageSquare className="w-4 h-4" />, color: 'text-blue-600' },
    { name: 'Events',        value: 'EVENTS',        icon: <FiCalendar className="w-4 h-4" />, color: 'text-green-600' },
    { name: 'Academic',      value: 'ACADEMIC',      icon: <FiBookOpen className="w-4 h-4" />, color: 'text-purple-600' },
    { name: 'Social',        value: 'SOCIAL',        icon: <FiUsers className="w-4 h-4" />, color: 'text-pink-600' },
    { name: 'Campus Life',   value: 'CAMPUS_LIFE',   icon: <FiMapPin className="w-4 h-4" />, color: 'text-orange-600' },
    { name: 'Marketplace',   value: 'MARKETPLACE',   icon: <FiShoppingBag className="w-4 h-4" />, color: 'text-indigo-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setImagePreview(url);
  };

  // --- (Step 4) UPDATE handleSubmit to use the new category value ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("1. handleSubmit function started!"); 
    if (!formData.title.trim() || !formData.content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setApiError(null);

    try {
      // Find the full category object to get the correct 'value' for the API
      const selectedCategory = categories.find(c => c.name === formData.category);
      
      const postData = {
        title: formData.title,
        content: formData.content,
        postType: selectedCategory.value, // Use the correct ENUM value
        imageUrl: formData.imageUrl || null,
      };
      
      console.log("2. Sending data to backend:", postData);

      const newPostFromBackend = await api.posts.createPost(postData);
      
      console.log("3. Received response from backend:", newPostFromBackend);

      onPostCreate(newPostFromBackend);
      handleClose();

    } catch (error) {
      console.error('5. CAUGHT AN ERROR: Failed to create post:', error);
      setApiError(error.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      category: 'Social',
      tags: '',
      imageUrl: ''
    });
    setImagePreview('');
    setApiError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image
                      src={user?.profilePictureUrl || 'https://i.pravatar.cc/150?u=default'}
                      alt="Your avatar"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{user?.name || 'Current User'}</h3>
                    <p className="text-sm text-gray-500">Share something with your community</p>
                  </div>
                </div>

                {/* API Error Display */}
                {apiError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{apiError}</span>
                  </div>
                )}

                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Choose a category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map(category => (
                      <button
                        key={category.name}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, category: category.name }))}
                        className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                          formData.category === category.name
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-800'
                        }`}
                      >
                        <span className={formData.category === category.name ? 'text-blue-600' : category.color}>
                          {category.icon}
                        </span>
                        <span className="text-sm font-medium">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder={
                      formData.category === 'Announcements' ? "Important campus announcement..." :
                      formData.category === 'Events' ? "What's your event called?" :
                      formData.category === 'Academic' ? "Share your academic topic..." :
                      formData.category === 'Social' ? "What's happening socially?" :
                      formData.category === 'Campus Life' ? "Share your campus experience..." :
                      formData.category === 'Marketplace' ? "What are you selling/looking for?" :
                      "What's the title of your post?"
                    }
                    className="w-full text-xl font-semibold placeholder-gray-400 border-none focus:outline-none resize-none"
                    required
                  />
                </div>

                {/* Content */}
                <div>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder={
                      formData.category === 'Announcements' ? "Share important information with the campus community..." :
                      formData.category === 'Events' ? "Tell us about your event - when, where, and what to expect..." :
                      formData.category === 'Academic' ? "Share study tips, ask questions, or discuss coursework..." :
                      formData.category === 'Social' ? "What's happening? Share your social plans or experiences..." :
                      formData.category === 'Campus Life' ? "Share your campus experiences, tips, or discoveries..." :
                      formData.category === 'Marketplace' ? "Describe what you're selling, buying, or looking for..." :
                      "What's on your mind?"
                    }
                    rows={4}
                    className="w-full text-gray-700 placeholder-gray-400 border-none focus:outline-none resize-none"
                    required
                  />
                </div>

                {/* Image URL */}
                <div>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleImageUrlChange}
                    placeholder={
                      formData.category === 'Announcements' ? "Add an official image or flyer (optional)..." :
                      formData.category === 'Events' ? "Add event poster or photo (optional)..." :
                      formData.category === 'Academic' ? "Add study materials or diagrams (optional)..." :
                      formData.category === 'Social' ? "Add photos from your social activity (optional)..." :
                      formData.category === 'Campus Life' ? "Add campus photos or screenshots (optional)..." :
                      formData.category === 'Marketplace' ? "Add product photos (recommended)..." :
                      "Add an image URL (optional)..."
                    }
                    className="w-full text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      onError={() => setImagePreview('')}
                    />
                  </div>
                )}

                {/* Tags */}
                <div>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder={
                      formData.category === 'Announcements' ? "Add tags: #important, #deadline, #campus..." :
                      formData.category === 'Events' ? "Add tags: #party, #meeting, #workshop, #sports..." :
                      formData.category === 'Academic' ? "Add tags: #study, #exam, #homework, #research..." :
                      formData.category === 'Social' ? "Add tags: #hangout, #friends, #party, #meetup..." :
                      formData.category === 'Campus Life' ? "Add tags: #dorm, #dining, #facilities, #tips..." :
                      formData.category === 'Marketplace' ? "Add tags: #forsale, #textbooks, #furniture, #electronics..." :
                      "Add tags (comma separated)..."
                    }
                    className="w-full text-sm text-gray-600 placeholder-gray-400 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4 text-gray-500">
                    <button
                      type="button"
                      className="flex items-center space-x-1 hover:text-pink-500 transition-colors"
                      title="Add Photo"
                    >
                      <FaImage className="w-5 h-5" />
                      <span className="text-sm hidden sm:inline">Photo</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-1 hover:text-green-500 transition-colors"
                      title="Add Location"
                    >
                      <FaMapMarkerAlt className="w-5 h-5" />
                      <span className="text-sm hidden sm:inline">Location</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center space-x-1 hover:text-yellow-500 transition-colors"
                      title="Add Emoji"
                    >
                      <FaSmile className="w-5 h-5" />
                      <span className="text-sm hidden sm:inline">Emoji</span>
                    </button>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.title.trim() || !formData.content.trim() || isSubmitting}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Posting...</span>
                        </span>
                      ) : (
                        'Share Post'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}