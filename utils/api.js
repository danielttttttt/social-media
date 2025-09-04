/**
 * SIMPLIFIED API SERVICE LAYER
 * Designed for easy backend integration with clear contracts
 * 
 * Backend API Endpoints Expected:
 * - POST /api/auth/login
 * - POST /api/auth/register  
 * - POST /api/auth/logout
 * - GET /api/auth/me
 * - GET /api/posts
 * - POST /api/posts
 * - GET /api/groups
 * - POST /api/groups
 * - GET /api/conversations
 * - POST /api/conversations
 */

// ============================================================================
// BASE API CONFIGURATION
// ============================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Standardized error class
class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
  }
}

// ============================================================================
// SIMPLIFIED API CLIENT
// ============================================================================

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Get auth token from new storage format
  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('campus_connect_token');
    }
    return null;
  }

  // Build headers with authentication (simplified)
  buildHeaders(customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const token = this.getAuthToken();
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Generic API request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: this.buildHeaders(options.headers),
    };

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new ApiError(
          data.error || data.message || 'API request failed',
          response.status,
          data.code
        );
      }

      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Network or other errors
      throw new ApiError(
        'Network error or server unavailable',
        0,
        'NETWORK_ERROR'
      );
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(url, {
      method: 'GET',
    });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH request
  async patch(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // File upload
  async upload(endpoint, formData) {
    const headers = this.buildHeaders();
    delete headers['Content-Type']; // Let browser set content-type for FormData
    
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });
  }
}

// Create singleton instance
const apiClient = new ApiClient();

// Export simplified error handler
export const handleApiError = (error) => {
  if (error instanceof ApiError) {
    return {
      general: error.message,
      status: error.status,
      code: error.code,
    };
  }
  
  return {
    general: error.message || 'An unexpected error occurred',
    status: 0,
    code: 'UNKNOWN_ERROR',
  };
};

// Export API client for use in components
export { apiClient, ApiError };

// ============================================================================
// SIMPLIFIED AUTHENTICATION API SERVICES
// ============================================================================

/**
 * Authentication API with clear backend contracts
 * All endpoints return: { success: boolean, data?: any, error?: string }
 */
export const authApi = {
  /**
   * Login user
   * Backend: POST /api/auth/login
   * Body: { email: string, password: string }
   * Response: { success: true, user: User, token: string } | { success: false, error: string }
   */
  async login(credentials) {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * Register new user
   * Backend: POST /api/auth/register
   * Body: { email: string, password: string, username: string, firstName?: string, lastName?: string }
   * Response: { success: true, user: User, token: string } | { success: false, error: string }
   */
  async register(userData) {
    return apiClient.post('/auth/register', userData);
  },

  /**
   * Logout user
   * Backend: POST /api/auth/logout
   * Headers: Authorization: Bearer <token>
   * Response: { success: true } | { success: false, error: string }
   */
  async logout() {
    return apiClient.post('/auth/logout');
  },

  /**
   * Get current user
   * Backend: GET /api/auth/me
   * Headers: Authorization: Bearer <token>
   * Response: { success: true, user: User } | { success: false, error: string }
   */
  async getCurrentUser() {
    return apiClient.get('/auth/me');
  },
};

// ============================================================================
// SIMPLIFIED DATA API SERVICES
// ============================================================================

/**
 * Posts API with clear backend contracts
 */
export const postsApi = {
  async getPosts(params = {}) {
    return apiClient.get('/posts', params);
  },

  async getPost(postId) {
    return apiClient.get(`/posts/${postId}`);
  },

  async createPost(postData) {
    return apiClient.post('/posts', postData);
  },

  async updatePost(postId, postData) {
    return apiClient.put(`/posts/${postId}`, postData);
  },

  async deletePost(postId) {
    return apiClient.delete(`/posts/${postId}`);
  },

  async likePost(postId) {
    return apiClient.post(`/posts/${postId}/like`);
  },

  async unlikePost(postId) {
    return apiClient.delete(`/posts/${postId}/like`);
  },

  async bookmarkPost(postId) {
    return apiClient.post(`/posts/${postId}/bookmark`);
  },

  async unbookmarkPost(postId) {
    return apiClient.delete(`/posts/${postId}/bookmark`);
  },

  async sharePost(postId, shareData = {}) {
    return apiClient.post(`/posts/${postId}/share`, shareData);
  },
};

// ============================================================================
// COMMENTS API SERVICES
// ============================================================================

export const commentsApi = {
  async getComments(postId, params = {}) {
    return apiClient.get(`/posts/${postId}/comments`, params);
  },

  async createComment(postId, commentData) {
    return apiClient.post(`/posts/${postId}/comments`, commentData);
  },

  async updateComment(commentId, commentData) {
    return apiClient.put(`/comments/${commentId}`, commentData);
  },

  async deleteComment(commentId) {
    return apiClient.delete(`/comments/${commentId}`);
  },

  async likeComment(commentId) {
    return apiClient.post(`/comments/${commentId}/like`);
  },

  async unlikeComment(commentId) {
    return apiClient.delete(`/comments/${commentId}/like`);
  },
};

// ============================================================================
// GROUPS API SERVICES
// ============================================================================

export const groupsApi = {
  async getGroups(params = {}) {
    return apiClient.get('/groups', params);
  },

  async getGroup(groupId) {
    return apiClient.get(`/groups/${groupId}`);
  },

  async createGroup(groupData) {
    return apiClient.post('/groups', groupData);
  },

  async updateGroup(groupId, groupData) {
    return apiClient.put(`/groups/${groupId}`, groupData);
  },

  async deleteGroup(groupId) {
    return apiClient.delete(`/groups/${groupId}`);
  },

  async joinGroup(groupId) {
    return apiClient.post(`/groups/${groupId}/join`);
  },

  async leaveGroup(groupId) {
    return apiClient.delete(`/groups/${groupId}/leave`);
  },

  async getGroupMembers(groupId, params = {}) {
    return apiClient.get(`/groups/${groupId}/members`, params);
  },

  async getGroupPosts(groupId, params = {}) {
    return apiClient.get(`/groups/${groupId}/posts`, params);
  },
};

// ============================================================================
// MESSAGES API SERVICES
// ============================================================================

export const messagesApi = {
  async getConversations(params = {}) {
    return apiClient.get('/conversations', params);
  },

  async getConversation(conversationId) {
    return apiClient.get(`/conversations/${conversationId}`);
  },

  async createConversation(participantIds) {
    return apiClient.post('/conversations', { participants: participantIds });
  },

  async getMessages(conversationId, params = {}) {
    return apiClient.get(`/conversations/${conversationId}/messages`, params);
  },

  async sendMessage(messageData) {
    return apiClient.post('/messages', messageData);
  },

  async markMessagesAsRead(conversationId) {
    return apiClient.patch(`/conversations/${conversationId}/read`);
  },

  async deleteMessage(messageId) {
    return apiClient.delete(`/messages/${messageId}`);
  },
};

// ============================================================================
// USERS API SERVICES
// ============================================================================

export const usersApi = {
  async getUsers(params = {}) {
    return apiClient.get('/users', params);
  },

  async getUser(userId) {
    return apiClient.get(`/users/${userId}`);
  },

  async updateProfile(profileData) {
    return apiClient.put('/users/profile', profileData);
  },

  async changePassword(currentPassword, newPassword) {
    return apiClient.post('/users/password', { currentPassword, newPassword });
  },

  async followUser(userId) {
    return apiClient.post(`/users/${userId}/follow`);
  },

  async unfollowUser(userId) {
    return apiClient.delete(`/users/${userId}/follow`);
  },

  async getFollowers(userId, params = {}) {
    return apiClient.get(`/users/${userId}/followers`, params);
  },

  async getFollowing(userId, params = {}) {
    return apiClient.get(`/users/${userId}/following`, params);
  },

  async getUserPosts(userId, params = {}) {
    return apiClient.get(`/users/${userId}/posts`, params);
  },

  async getUserGroups(userId, params = {}) {
    return apiClient.get(`/users/${userId}/groups`, params);
  },
};

// ============================================================================
// NOTIFICATIONS API SERVICES
// ============================================================================

export const notificationsApi = {
  async getNotifications(params = {}) {
    return apiClient.get('/notifications', params);
  },

  async markNotificationAsRead(notificationId) {
    return apiClient.patch(`/notifications/${notificationId}/read`);
  },

  async markAllNotificationsAsRead() {
    return apiClient.patch('/notifications/read-all');
  },

  async deleteNotification(notificationId) {
    return apiClient.delete(`/notifications/${notificationId}`);
  },
};

// ============================================================================
// FILE UPLOAD API SERVICES
// ============================================================================

export const uploadApi = {
  async uploadFile(file, options = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional options
    Object.keys(options).forEach(key => {
      formData.append(key, options[key]);
    });

    return apiClient.upload('/upload', formData);
  },

  async uploadProfilePicture(file) {
    return this.uploadFile(file, { type: 'profile' });
  },

  async uploadPostImage(file) {
    return this.uploadFile(file, { type: 'post' });
  },

  async uploadGroupCover(file) {
    return this.uploadFile(file, { type: 'group_cover' });
  },
};

// ============================================================================
// ERROR HANDLING UTILITIES (UPDATED)
// ============================================================================

export const handleApiErrorAdvanced = (error) => {
  if (error instanceof ApiError) {
    switch (error.code) {
      case 'AUTH_REQUIRED':
        // No redirect - just return error
        return { general: 'Authentication required' };
      case 'VALIDATION_ERROR':
        return error.details || { general: error.message };
      case 'NETWORK_ERROR':
        return { general: 'Network error. Please check your connection.' };
      default:
        return { general: error.message };
    }
  }
  
  return { general: 'An unexpected error occurred' };
};

// ============================================================================
// PAGINATION UTILITIES
// ============================================================================

export const buildPaginationParams = (page = 1, limit = 10, additionalParams = {}) => {
  return {
    page,
    limit,
    ...additionalParams,
  };
};

export const extractPaginationData = (response) => {
  return {
    data: response.data || [],
    pagination: response.pagination || {},
  };
};

// ============================================================================
// EXPORT API CLIENT FOR CUSTOM REQUESTS
// ============================================================================

export default apiClient;