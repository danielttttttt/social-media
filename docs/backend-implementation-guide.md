# Campus Connect Backend Implementation Guide

This guide provides step-by-step instructions for implementing the backend for Campus Connect. The frontend is already complete and backend-ready.

## 🎯 Quick Start (5-Day Implementation)

### Day 1: Setup & Authentication
- [ ] Set up database (MySQL/PostgreSQL)
- [ ] Implement user authentication
- [ ] Create JWT token system
- [ ] Set up basic API structure

### Day 2: Core Posts API
- [ ] Implement posts CRUD operations
- [ ] Add category filtering
- [ ] Implement like/unlike functionality
- [ ] Add comment system

### Day 3: Groups & Social Features
- [ ] Implement groups CRUD
- [ ] Add join/leave group functionality
- [ ] Implement user following system
- [ ] Add bookmark functionality

### Day 4: Messaging System
- [ ] Implement conversations API
- [ ] Add messaging functionality
- [ ] Set up real-time WebSocket (optional)

### Day 5: File Upload & Polish
- [ ] Implement file upload
- [ ] Add input validation
- [ ] Set up error handling
- [ ] Test all endpoints

## 📋 Prerequisites

### Required Skills
- **Backend Framework**: Node.js (Express/Fastify) OR Python (FastAPI) OR PHP (Laravel)
- **Database**: MySQL/PostgreSQL knowledge
- **Authentication**: JWT implementation experience
- **API Design**: REST API principles

### Required Tools
- Database server (MySQL 8.0+ or PostgreSQL 13+)
- Node.js 18+ (if using Node.js)
- Redis (optional, for caching)
- File storage (local or cloud)

## 🗄️ Database Setup

### 1. Create Database
```sql
CREATE DATABASE campus_connect;
USE campus_connect;
```

### 2. Run Schema Creation
Use the provided `docs/database-schema.md` to create all tables in the correct order:

1. `users`
2. `groups`
3. `conversations`
4. `posts`
5. `comments`
6. `messages`
7. Junction tables (user_groups, post_likes, etc.)

### 3. Create Indexes
```sql
-- Essential performance indexes
CREATE INDEX idx_posts_feed ON posts(created_at DESC, category);
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at DESC);
CREATE INDEX idx_messages_conversation_date ON messages(conversation_id, created_at DESC);
```

## 🔐 Authentication Implementation

### 1. User Registration Endpoint
```javascript
// POST /api/auth/signup
async function signup(req, res) {
  try {
    const { username, email, password } = req.body;
    
    // Validate input (use utils/validation.js patterns)
    const errors = validateSignupForm(req.body);
    if (hasErrors(errors)) {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors
      });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    });
    
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User already exists"
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = await User.create({
      username,
      email,
      password_hash: hashedPassword,
      name: username, // Default name to username
      profile_pic: `https://i.pravatar.cc/150?u=${email}`
    });
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Return user data (match frontend expectations)
    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePic: user.profile_pic
      },
      token
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
```

### 2. Login Endpoint
```javascript
// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    
    // Find user by email or username
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username: email }]
      }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials"
      });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        error: "Invalid credentials"
      });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    
    // Return user data
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePic: user.profile_pic
      },
      token
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
```

### 3. Authentication Middleware
```javascript
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Authentication required",
      code: "AUTH_REQUIRED"
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid token",
        code: "AUTH_INVALID"
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid token",
      code: "AUTH_INVALID"
    });
  }
}
```

## 📝 Posts API Implementation

### 1. Get Posts Endpoint
```javascript
// GET /api/posts
async function getPosts(req, res) {
  try {
    const { page = 1, limit = 10, category, author } = req.query;
    const offset = (page - 1) * limit;
    
    // Build where clause
    const where = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (author) {
      const authorUser = await User.findOne({ where: { username: author } });
      if (authorUser) {
        where.author_id = authorUser.id;
      }
    }
    
    // Get posts with author info
    const { count, rows: posts } = await Post.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'username', 'profile_pic']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Format response to match frontend expectations
    const formattedPosts = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      author: post.author.name,
      authorPic: post.author.profile_pic,
      imageUrl: post.image_url,
      likes: post.likes_count,
      comments: post.comments_count,
      timestamp: post.created_at,
      category: post.category,
      tags: post.tags || []
    }));
    
    res.json({
      success: true,
      data: formattedPosts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
        hasNext: (page * limit) < count,
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
```

### 2. Create Post Endpoint
```javascript
// POST /api/posts
async function createPost(req, res) {
  try {
    const { title, content, category, imageUrl, tags } = req.body;
    const userId = req.user.id;
    
    // Validate required fields
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        error: "Title, content, and category are required"
      });
    }
    
    // Create post
    const post = await Post.create({
      title,
      content,
      author_id: userId,
      category,
      image_url: imageUrl || null,
      tags: tags || []
    });
    
    // Get post with author info
    const postWithAuthor = await Post.findByPk(post.id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'name', 'username', 'profile_pic']
        }
      ]
    });
    
    // Format response
    const formattedPost = {
      id: postWithAuthor.id,
      title: postWithAuthor.title,
      content: postWithAuthor.content,
      author: postWithAuthor.author.name,
      authorPic: postWithAuthor.author.profile_pic,
      imageUrl: postWithAuthor.image_url,
      likes: 0,
      comments: 0,
      timestamp: postWithAuthor.created_at,
      category: postWithAuthor.category,
      tags: postWithAuthor.tags || []
    };
    
    res.status(201).json({
      success: true,
      data: formattedPost
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
```

### 3. Like/Unlike Post Endpoints
```javascript
// POST /api/posts/:id/like
async function likePost(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    
    // Check if already liked
    const existingLike = await PostLike.findOne({
      where: { post_id: postId, user_id: userId }
    });
    
    if (existingLike) {
      return res.status(400).json({
        success: false,
        error: "Post already liked"
      });
    }
    
    // Create like
    await PostLike.create({
      post_id: postId,
      user_id: userId
    });
    
    // Get updated likes count
    const likesCount = await PostLike.count({
      where: { post_id: postId }
    });
    
    // Update post likes count
    await Post.update(
      { likes_count: likesCount },
      { where: { id: postId } }
    );
    
    res.json({
      success: true,
      data: {
        isLiked: true,
        likesCount
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}

// DELETE /api/posts/:id/like
async function unlikePost(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    
    // Remove like
    const deleted = await PostLike.destroy({
      where: { post_id: postId, user_id: userId }
    });
    
    if (deleted === 0) {
      return res.status(400).json({
        success: false,
        error: "Post not liked"
      });
    }
    
    // Get updated likes count
    const likesCount = await PostLike.count({
      where: { post_id: postId }
    });
    
    // Update post likes count
    await Post.update(
      { likes_count: likesCount },
      { where: { id: postId } }
    );
    
    res.json({
      success: true,
      data: {
        isLiked: false,
        likesCount
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
```

## 👥 Groups API Implementation

### 1. Get Groups Endpoint
```javascript
// GET /api/groups
async function getGroups(req, res) {
  try {
    const { page = 1, limit = 12, category, search } = req.query;
    const offset = (page - 1) * limit;
    
    // Build where clause
    const where = {};
    if (category && category !== 'All') {
      where.category = category;
    }
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } }
      ];
    }
    
    const { count, rows: groups } = await Group.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'profile_pic']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    // Format response
    const formattedGroups = groups.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description,
      category: group.category,
      coverImage: group.cover_image,
      members: group.member_count,
      isJoined: false, // Will be updated based on user
      isPrivate: group.is_private,
      createdAt: group.created_at,
      createdBy: {
        id: group.creator.id,
        name: group.creator.name,
        profilePic: group.creator.profile_pic
      }
    }));
    
    res.json({
      success: true,
      data: formattedGroups,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit),
        hasNext: (page * limit) < count,
        hasPrev: page > 1
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
```

## 💬 Messaging API Implementation

### 1. Get Conversations Endpoint
```javascript
// GET /api/conversations
async function getConversations(req, res) {
  try {
    const userId = req.user.id;
    
    const conversations = await Conversation.findAll({
      include: [
        {
          model: ConversationParticipant,
          as: 'participants',
          where: { user_id: userId },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'profile_pic']
            }
          ]
        },
        {
          model: Message,
          as: 'lastMessage',
          order: [['created_at', 'DESC']],
          limit: 1,
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['id', 'name']
            }
          ]
        }
      ],
      order: [['updated_at', 'DESC']]
    });
    
    // Format response
    const formattedConversations = conversations.map(conv => ({
      id: conv.id,
      participants: conv.participants.map(p => ({
        id: p.user.id,
        name: p.user.name,
        profilePic: p.user.profile_pic
      })),
      lastMessage: conv.lastMessage ? {
        id: conv.lastMessage.id,
        content: conv.lastMessage.content,
        senderId: conv.lastMessage.sender_id,
        timestamp: conv.lastMessage.created_at
      } : null,
      unreadCount: 0, // Calculate based on last_read_at
      updatedAt: conv.updated_at
    }));
    
    res.json({
      success: true,
      data: formattedConversations
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}
```

## 📁 File Upload Implementation

### 1. Upload Endpoint
```javascript
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_DIR || './public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 10485760 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// POST /api/upload
const uploadFile = upload.single('file');

async function handleFileUpload(req, res) {
  uploadFile(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded"
      });
    }
    
    try {
      // Save file info to database
      const fileUpload = await FileUpload.create({
        user_id: req.user.id,
        filename: req.file.filename,
        original_filename: req.file.originalname,
        file_path: req.file.path,
        file_size: req.file.size,
        mime_type: req.file.mimetype
      });
      
      const fileUrl = `${process.env.NEXT_PUBLIC_APP_URL}/uploads/${req.file.filename}`;
      
      res.json({
        success: true,
        data: {
          url: fileUrl,
          filename: req.file.filename,
          size: req.file.size,
          mimeType: req.file.mimetype
        }
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to save file info"
      });
    }
  });
}
```

## 🔧 Validation Implementation

Use the existing validation patterns from `utils/validation.js`:

```javascript
const { validateSignupForm, validateLoginForm, hasErrors } = require('./utils/validation');

// In your route handlers
const errors = validateSignupForm(req.body);
if (hasErrors(errors)) {
  return res.status(400).json({
    success: false,
    error: "Validation failed",
    code: "VALIDATION_ERROR",
    details: errors
  });
}
```

## 🚀 Deployment Checklist

### Production Setup
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Set up SSL certificates
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up file storage (AWS S3/Cloudinary)
- [ ] Configure email service
- [ ] Set up monitoring (Sentry, New Relic)
- [ ] Configure backups
- [ ] Set up CI/CD pipeline

### Security Checklist
- [ ] Enable CORS properly
- [ ] Set up rate limiting
- [ ] Configure security headers
- [ ] Validate all inputs
- [ ] Use parameterized queries
- [ ] Hash passwords with bcrypt
- [ ] Validate JWT tokens
- [ ] Sanitize file uploads
- [ ] Enable HTTPS only

## 📚 Recommended Tech Stacks

### Option 1: Node.js (Fastest to implement)
```bash
# Dependencies
npm install express sequelize mysql2 bcryptjs jsonwebtoken multer cors helmet express-rate-limit
```

### Option 2: Python FastAPI (Most scalable)
```bash
# Dependencies
pip install fastapi uvicorn sqlalchemy pymysql passlib python-jose python-multipart
```

### Option 3: PHP Laravel (Most familiar)
```bash
# Dependencies
composer install laravel/framework laravel/sanctum
```

## ⚡ Performance Tips

1. **Database Indexing**: Use provided indexes in schema
2. **Caching**: Implement Redis for session and data caching
3. **File Storage**: Use CDN for image serving
4. **API Pagination**: Limit result sets to 10-50 items
5. **Database Pooling**: Configure connection pooling
6. **Image Optimization**: Resize and compress uploaded images

## 🐛 Common Pitfalls to Avoid

1. **Don't change API response formats** - Frontend expects exact structure
2. **Don't skip validation** - Use provided validation patterns
3. **Don't forget authentication** - Protect all user-specific routes
4. **Don't ignore CORS** - Configure properly for frontend domain
5. **Don't skip pagination** - Always paginate list endpoints
6. **Don't forget error handling** - Return consistent error formats

## ✅ Testing Your Implementation

### 1. Test Authentication
```bash
# Register
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 2. Test Posts API
```bash
# Get posts
curl http://localhost:3000/api/posts

# Create post (with auth token)
curl -X POST http://localhost:3000/api/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Test content","category":"Social"}'
```

This guide provides everything needed to implement a production-ready backend that works seamlessly with the existing frontend!