/**
 * API Response Types and Interfaces
 * This file defines the expected API response structures for backend implementation
 */

// ============================================================================
// AUTHENTICATION API RESPONSES
// ============================================================================

/**
 * POST /api/auth/login
 * @body { email: string, password: string }
 */
export const LoginResponse = {
  success: true,
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    profilePic: "https://example.com/avatar.jpg"
  },
  token: "jwt_token_here",
  refreshToken: "refresh_token_here"
};

export const LoginErrorResponse = {
  success: false,
  error: "Invalid credentials",
  code: "AUTH_INVALID_CREDENTIALS"
};

/**
 * POST /api/auth/signup
 * @body { username: string, email: string, password: string, confirmPassword: string }
 */
export const SignupResponse = {
  success: true,
  user: {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    username: "janedoe",
    profilePic: "https://example.com/avatar.jpg"
  },
  token: "jwt_token_here",
  refreshToken: "refresh_token_here"
};

/**
 * POST /api/auth/logout
 * @headers { Authorization: "Bearer jwt_token" }
 */
export const LogoutResponse = {
  success: true,
  message: "Logged out successfully"
};

/**
 * GET /api/auth/me
 * @headers { Authorization: "Bearer jwt_token" }
 */
export const GetUserResponse = {
  success: true,
  user: {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    profilePic: "https://example.com/avatar.jpg",
    followedUsers: [2, 3, 4],
    joinedGroups: [1, 2, 3],
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z"
  }
};

// ============================================================================
// POSTS API RESPONSES
// ============================================================================

/**
 * GET /api/posts
 * @query { page?: number, limit?: number, category?: string, author?: string }
 */
export const GetPostsResponse = {
  success: true,
  data: [
    {
      id: 1,
      title: "Welcome Back to Campus",
      content: "Welcome back everyone! We're excited...",
      author: "Campus Administration",
      authorId: 1,
      authorPic: "https://example.com/avatar.jpg",
      imageUrl: "https://example.com/image.jpg",
      likes: 125,
      comments: 12,
      timestamp: "2023-09-01T10:30:00Z",
      category: "Announcements",
      tags: ["welcome", "semester", "guidelines"],
      isLiked: false,
      isBookmarked: false
    }
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 100,
    totalPages: 10,
    hasNext: true,
    hasPrev: false
  }
};

/**
 * POST /api/posts
 * @headers { Authorization: "Bearer jwt_token" }
 * @body { title: string, content: string, category: string, imageUrl?: string, tags?: string[] }
 */
export const CreatePostResponse = {
  success: true,
  data: {
    id: 2,
    title: "New Post Title",
    content: "Post content here...",
    author: "John Doe",
    authorId: 1,
    authorPic: "https://example.com/avatar.jpg",
    imageUrl: null,
    likes: 0,
    comments: 0,
    timestamp: "2023-09-01T11:00:00Z",
    category: "Social",
    tags: ["new", "post"],
    isLiked: false,
    isBookmarked: false
  }
};

/**
 * POST /api/posts/:id/like
 * @headers { Authorization: "Bearer jwt_token" }
 */
export const LikePostResponse = {
  success: true,
  data: {
    isLiked: true,
    likesCount: 126
  }
};

/**
 * DELETE /api/posts/:id/like
 * @headers { Authorization: "Bearer jwt_token" }
 */
export const UnlikePostResponse = {
  success: true,
  data: {
    isLiked: false,
    likesCount: 125
  }
};

// ============================================================================
// COMMENTS API RESPONSES
// ============================================================================

/**
 * GET /api/posts/:id/comments
 * @query { page?: number, limit?: number }
 */
export const GetCommentsResponse = {
  success: true,
  data: [
    {
      id: 1,
      content: "Great post!",
      author: "Sarah Johnson",
      authorId: 2,
      authorPic: "https://example.com/avatar2.jpg",
      timestamp: "2023-09-01T11:00:00Z",
      likes: 5,
      isLiked: false,
      replies: []
    }
  ],
  pagination: {
    page: 1,
    limit: 20,
    total: 12,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  }
};

/**
 * POST /api/posts/:id/comments
 * @headers { Authorization: "Bearer jwt_token" }
 * @body { content: string, parentId?: number }
 */
export const CreateCommentResponse = {
  success: true,
  data: {
    id: 2,
    content: "Thanks for sharing!",
    author: "John Doe",
    authorId: 1,
    authorPic: "https://example.com/avatar.jpg",
    timestamp: "2023-09-01T11:30:00Z",
    likes: 0,
    isLiked: false,
    replies: []
  }
};

// ============================================================================
// GROUPS API RESPONSES
// ============================================================================

/**
 * GET /api/groups
 * @query { page?: number, limit?: number, category?: string, search?: string }
 */
export const GetGroupsResponse = {
  success: true,
  data: [
    {
      id: 1,
      name: "Study Group - Computer Science",
      description: "A group for CS students to collaborate...",
      category: "Academic",
      coverImage: "https://example.com/group-cover.jpg",
      members: 156,
      isJoined: false,
      isPrivate: false,
      createdAt: "2023-08-01T00:00:00Z",
      createdBy: {
        id: 1,
        name: "John Doe",
        profilePic: "https://example.com/avatar.jpg"
      }
    }
  ],
  pagination: {
    page: 1,
    limit: 12,
    total: 50,
    totalPages: 5,
    hasNext: true,
    hasPrev: false
  }
};

/**
 * POST /api/groups
 * @headers { Authorization: "Bearer jwt_token" }
 * @body { name: string, description: string, category: string, coverImage?: string, isPrivate?: boolean }
 */
export const CreateGroupResponse = {
  success: true,
  data: {
    id: 2,
    name: "New Study Group",
    description: "Description here...",
    category: "Academic",
    coverImage: null,
    members: 1,
    isJoined: true,
    isPrivate: false,
    createdAt: "2023-09-01T12:00:00Z",
    createdBy: {
      id: 1,
      name: "John Doe",
      profilePic: "https://example.com/avatar.jpg"
    }
  }
};

/**
 * POST /api/groups/:id/join
 * @headers { Authorization: "Bearer jwt_token" }
 */
export const JoinGroupResponse = {
  success: true,
  data: {
    isJoined: true,
    memberCount: 157
  }
};

/**
 * DELETE /api/groups/:id/leave
 * @headers { Authorization: "Bearer jwt_token" }
 */
export const LeaveGroupResponse = {
  success: true,
  data: {
    isJoined: false,
    memberCount: 156
  }
};

// ============================================================================
// MESSAGES API RESPONSES
// ============================================================================

/**
 * GET /api/conversations
 * @headers { Authorization: "Bearer jwt_token" }
 */
export const GetConversationsResponse = {
  success: true,
  data: [
    {
      id: 1,
      participants: [
        {
          id: 1,
          name: "John Doe",
          profilePic: "https://example.com/avatar.jpg"
        },
        {
          id: 2,
          name: "Sarah Johnson",
          profilePic: "https://example.com/avatar2.jpg"
        }
      ],
      lastMessage: {
        id: 10,
        content: "Hey, how are you?",
        senderId: 2,
        timestamp: "2023-09-01T11:00:00Z"
      },
      unreadCount: 2,
      updatedAt: "2023-09-01T11:00:00Z"
    }
  ]
};

/**
 * GET /api/conversations/:id/messages
 * @headers { Authorization: "Bearer jwt_token" }
 * @query { page?: number, limit?: number }
 */
export const GetMessagesResponse = {
  success: true,
  data: [
    {
      id: 1,
      content: "Hello there!",
      senderId: 1,
      sender: {
        id: 1,
        name: "John Doe",
        profilePic: "https://example.com/avatar.jpg"
      },
      timestamp: "2023-09-01T10:00:00Z",
      isRead: true
    }
  ],
  pagination: {
    page: 1,
    limit: 50,
    total: 25,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  }
};

/**
 * POST /api/messages
 * @headers { Authorization: "Bearer jwt_token" }
 * @body { conversationId: number, content: string }
 */
export const SendMessageResponse = {
  success: true,
  data: {
    id: 2,
    content: "New message content",
    senderId: 1,
    sender: {
      id: 1,
      name: "John Doe",
      profilePic: "https://example.com/avatar.jpg"
    },
    timestamp: "2023-09-01T11:30:00Z",
    isRead: false
  }
};

// ============================================================================
// FILE UPLOAD API RESPONSES
// ============================================================================

/**
 * POST /api/upload
 * @headers { Authorization: "Bearer jwt_token" }
 * @body FormData with file field
 */
export const UploadFileResponse = {
  success: true,
  data: {
    url: "https://example.com/uploads/file123.jpg",
    filename: "original-filename.jpg",
    size: 1024000,
    mimeType: "image/jpeg"
  }
};

// ============================================================================
// ERROR RESPONSE FORMATS
// ============================================================================

export const ValidationErrorResponse = {
  success: false,
  error: "Validation failed",
  code: "VALIDATION_ERROR",
  details: {
    email: "Invalid email format",
    password: "Password must be at least 8 characters"
  }
};

export const AuthErrorResponse = {
  success: false,
  error: "Authentication required",
  code: "AUTH_REQUIRED"
};

export const ForbiddenErrorResponse = {
  success: false,
  error: "Access forbidden",
  code: "FORBIDDEN"
};

export const NotFoundErrorResponse = {
  success: false,
  error: "Resource not found",
  code: "NOT_FOUND"
};

export const ServerErrorResponse = {
  success: false,
  error: "Internal server error",
  code: "SERVER_ERROR"
};