import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaImage, FaMapMarkerAlt, FaSmile } from 'react-icons/fa';
import { FiHome, FiImage as FiImageIcon, FiVideo, FiMusic, FiBookOpen, FiHeart, FiTrendingUp } from 'react-icons/fi';
import Image from 'next/image';

export default function CreatePostModal({ isOpen, onClose, onPostCreate }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Photos',
    tags: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const categories = [
    { name: 'Photos', icon: <FiImageIcon className="w-4 h-4" />, color: 'text-pink-600' },
    { name: 'Videos', icon: <FiVideo className="w-4 h-4" />, color: 'text-red-600' },
    { name: 'Music', icon: <FiMusic className="w-4 h-4" />, color: 'text-purple-600' },
    { name: 'Stories', icon: <FiBookOpen className="w-4 h-4" />, color: 'text-orange-600' },
    { name: 'Lifestyle', icon: <FiHeart className="w-4 h-4" />, color: 'text-green-600' },
    { name: 'Popular', icon: <FiTrendingUp className="w-4 h-4" />, color: 'text-yellow-600' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, imageUrl: url }));
    setImagePreview(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Mock user data - in real app this would come from auth context
      const mockUser = {
        name: 'Current User',
        profilePic: 'https://i.pravatar.cc/150?u=current_user'
      };

      const newPost = {
        id: Date.now(), // Simple ID generation for demo
        title: formData.title,
        content: formData.content,
        author: mockUser.name,
        profilePic: mockUser.profilePic,
        imageUrl: formData.imageUrl || null,
        likes: 0,
        comments: 0,
        timestamp: new Date().toISOString(),
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        commentsList: []
      };

      // In a real app, this would make an API call
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      onPostCreate(newPost);
      handleClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      content: '',
      category: 'Photos',
      tags: '',
      imageUrl: ''
    });
    setImagePreview('');
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
                      src="https://i.pravatar.cc/150?u=current_user"
                      alt="Your avatar"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Current User</h3>
                    <p className="text-sm text-gray-500">Share something with your community</p>
                  </div>
                </div>

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
                      formData.category === 'Photos' ? "Give your photo a caption..." :
                      formData.category === 'Videos' ? "What's your video about?" :
                      formData.category === 'Music' ? "Share your musical creation..." :
                      formData.category === 'Stories' ? "What's your story title?" :
                      formData.category === 'Lifestyle' ? "Share your lifestyle tip..." :
                      formData.category === 'Popular' ? "What's trending in your mind?" :
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
                      formData.category === 'Photos' ? "Tell us about this moment..." :
                      formData.category === 'Videos' ? "Describe your video content..." :
                      formData.category === 'Music' ? "Share the story behind your music..." :
                      formData.category === 'Stories' ? "Write your story here..." :
                      formData.category === 'Lifestyle' ? "Share your experience or tips..." :
                      formData.category === 'Popular' ? "What's making this popular?" :
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
                      formData.category === 'Photos' ? "Add your photo URL..." :
                      formData.category === 'Videos' ? "Add video thumbnail URL (optional)..." :
                      formData.category === 'Music' ? "Add album art or music visual (optional)..." :
                      formData.category === 'Stories' ? "Add a cover image (optional)..." :
                      formData.category === 'Lifestyle' ? "Add a lifestyle photo (optional)..." :
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
                      formData.category === 'Photos' ? "Add tags: #photography, #nature, #campus..." :
                      formData.category === 'Videos' ? "Add tags: #vlog, #tutorial, #entertainment..." :
                      formData.category === 'Music' ? "Add tags: #acoustic, #cover, #original..." :
                      formData.category === 'Stories' ? "Add tags: #fiction, #poetry, #creative..." :
                      formData.category === 'Lifestyle' ? "Add tags: #wellness, #tips, #daily..." :
                      formData.category === 'Popular' ? "Add tags: #trending, #viral, #popular..." :
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
