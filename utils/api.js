import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const initSocket = (token) => {
  if (!token) return null;
  const socket = io(SOCKET_URL, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
  });
  socket.on('connect', () => console.log('Socket connected:', socket.id));
  socket.on('disconnect', () => console.log('Socket disconnected'));
  return socket;
};

const API_BASE_URL = '/api';

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
    this.name = 'ApiError';
  }
}

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.defaultHeaders = { 'Content-Type': 'application/json' };
  }

  getAuthToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('campus_connect_token');
    }
    return null;
  }

  buildHeaders(customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders };
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = { ...options, headers: this.buildHeaders(options.headers) };
    try {
      const response = await fetch(url, config);
      const contentType = response.headers.get('content-type');
      let data = contentType?.includes('application/json') ? await response.json() : await response.text();
      if (!response.ok) {
        throw new ApiError(
          (data && (data.error || data.message)) || 'API request failed',
          response.status,
          data ? data.code : 'UNKNOWN_CODE'
        );
      }
      return data;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Network error or server unavailable', 0, 'NETWORK_ERROR');
    }
  }

  get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  post(endpoint, data = {}) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) });
  }

  put(endpoint, data = {}) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) });
  }

  patch(endpoint, data = {}) {
    return this.request(endpoint, { method: 'PATCH', body: JSON.stringify(data) });
  }
  
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  upload(endpoint, formData) {
    const headers = this.buildHeaders();
    delete headers['Content-Type'];
    return this.request(endpoint, { method: 'POST', headers, body: formData });
  }
}

const apiClient = new ApiClient();

// API Service definitions
const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

const postsApi = {
  // --- THIS IS THE FIX ---
  // A new function specifically for the main feed.
  getFeed: () => apiClient.get('/feed'), 
  // The old getPosts can be kept for other uses (e.g., getting posts for a specific user profile)
  getPosts: (params = {}) => apiClient.get('/posts', params), 
  createPost: (postData) => apiClient.post('/posts', postData),
    likePost: (postId) => apiClient.post(`/posts/${postId}/like`),
  unlikePost: (postId) => apiClient.delete(`/posts/${postId}/like`),
};

const groupsApi = {
  getGroups: (params = {}) => apiClient.get('/groups', params),
  createGroup: (groupData) => apiClient.post('/groups', groupData),
  joinGroup: (groupId) => apiClient.post(`/groups/${groupId}/join`),
  // ... other group methods
};

const messagesApi = {
  getConversations: (params = {}) => apiClient.get('/conversations', params),
  createConversation: (participantIds) => apiClient.post('/conversations', { participants: participantIds }),
  getMessages: (conversationId, params = {}) => apiClient.get(`/conversations/${conversationId}/messages`, params),
  // ... other message methods
};

const usersApi = {
  getUser: (userId) => apiClient.get(`/users/${userId}`),
  followUser: (userId) => apiClient.post(`/users/${userId}/follow`),
  unfollowUser: (userId) => apiClient.delete(`/users/${userId}/follow`),
  // ... other user methods
};

const commentsApi = {
  // POST /api/posts/:postId/comments
   getComments: (postId) => apiClient.get(`/posts/${postId}/comments`),
  createComment: (postId, commentData) => apiClient.post(`/posts/${postId}/comments`, commentData),
  // You can add functions for getting, updating, or deleting comments here later
};

// ... other API service definitions like commentsApi, notificationsApi, etc.

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// UNIFIED API EXPORT
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
const api = {
  client: apiClient,
  auth: authApi,
  posts: postsApi,
  groups: groupsApi,
  messages: messagesApi,
  users: usersApi,
  initSocket,
  comments: commentsApi,
  // ... include other api services here as needed
};

export default api;
