# Database Schema Documentation

This document defines the database schema required for the Campus Connect backend implementation.

## Table Relationships

```
Users (1) ----< Posts (Many)
Users (1) ----< Comments (Many)
Users (Many) >----< Groups (Many) [user_groups junction table]
Users (Many) >----< Conversations (Many) [conversation_participants junction table]
Posts (1) ----< Comments (Many)
Groups (1) ----< Posts (Many)
Conversations (1) ----< Messages (Many)
Users (1) ----< Messages (Many)
Posts (Many) >----< Users (Many) [post_likes junction table]
Comments (Many) >----< Users (Many) [comment_likes junction table]
Posts (Many) >----< Users (Many) [post_bookmarks junction table]
Users (Many) >----< Users (Many) [user_follows junction table]
```

## Core Tables

### 1. users
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  profile_pic TEXT,
  bio TEXT,
  email_verified_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  INDEX idx_username (username),
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
);
```

### 2. posts
```sql
CREATE TABLE posts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id BIGINT NOT NULL,
  group_id BIGINT NULL,
  image_url TEXT,
  category ENUM('Announcements', 'Events', 'Academic', 'Social', 'Campus Life', 'Marketplace') NOT NULL,
  tags JSON,
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  shares_count INT DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE SET NULL,
  INDEX idx_author_id (author_id),
  INDEX idx_group_id (group_id),
  INDEX idx_category (category),
  INDEX idx_created_at (created_at),
  INDEX idx_likes_count (likes_count),
  FULLTEXT idx_title_content (title, content)
);
```

### 3. comments
```sql
CREATE TABLE comments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  post_id BIGINT NOT NULL,
  author_id BIGINT NOT NULL,
  parent_id BIGINT NULL,
  content TEXT NOT NULL,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE,
  INDEX idx_post_id (post_id),
  INDEX idx_author_id (author_id),
  INDEX idx_parent_id (parent_id),
  INDEX idx_created_at (created_at)
);
```

### 4. groups
```sql
CREATE TABLE groups (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category ENUM('Academic', 'Social', 'Sports', 'Arts', 'Technology', 'Other') NOT NULL,
  cover_image TEXT,
  creator_id BIGINT NOT NULL,
  member_count INT DEFAULT 1,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_creator_id (creator_id),
  INDEX idx_category (category),
  INDEX idx_member_count (member_count),
  INDEX idx_created_at (created_at),
  FULLTEXT idx_name_description (name, description)
);
```

### 5. conversations
```sql
CREATE TABLE conversations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('direct', 'group') DEFAULT 'direct',
  title VARCHAR(100) NULL,
  created_by BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_created_by (created_by),
  INDEX idx_type (type),
  INDEX idx_updated_at (updated_at)
);
```

### 6. messages
```sql
CREATE TABLE messages (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  conversation_id BIGINT NOT NULL,
  sender_id BIGINT NOT NULL,
  content TEXT NOT NULL,
  message_type ENUM('text', 'image', 'file') DEFAULT 'text',
  file_url TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL,
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_conversation_id (conversation_id),
  INDEX idx_sender_id (sender_id),
  INDEX idx_created_at (created_at)
);
```

## Junction Tables

### 7. user_groups (Many-to-Many: Users <-> Groups)
```sql
CREATE TABLE user_groups (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  group_id BIGINT NOT NULL,
  role ENUM('member', 'admin', 'moderator') DEFAULT 'member',
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_group (user_id, group_id),
  INDEX idx_user_id (user_id),
  INDEX idx_group_id (group_id)
);
```

### 8. conversation_participants (Many-to-Many: Users <-> Conversations)
```sql
CREATE TABLE conversation_participants (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  conversation_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_read_at TIMESTAMP NULL,
  
  FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_conversation_user (conversation_id, user_id),
  INDEX idx_conversation_id (conversation_id),
  INDEX idx_user_id (user_id)
);
```

### 9. post_likes (Many-to-Many: Users <-> Posts Likes)
```sql
CREATE TABLE post_likes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  post_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_like (post_id, user_id),
  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id)
);
```

### 10. comment_likes (Many-to-Many: Users <-> Comments Likes)
```sql
CREATE TABLE comment_likes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  comment_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_comment_like (comment_id, user_id),
  INDEX idx_comment_id (comment_id),
  INDEX idx_user_id (user_id)
);
```

### 11. post_bookmarks (Many-to-Many: Users <-> Posts Bookmarks)
```sql
CREATE TABLE post_bookmarks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  post_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_bookmark (post_id, user_id),
  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id)
);
```

### 12. user_follows (Many-to-Many: Users <-> Users Following)
```sql
CREATE TABLE user_follows (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  follower_id BIGINT NOT NULL,
  following_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_follow (follower_id, following_id),
  INDEX idx_follower_id (follower_id),
  INDEX idx_following_id (following_id),
  CHECK (follower_id != following_id)
);
```

## Additional Tables

### 13. password_resets
```sql
CREATE TABLE password_resets (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP NULL,
  
  INDEX idx_email (email),
  INDEX idx_token (token),
  INDEX idx_expires_at (expires_at)
);
```

### 14. notifications
```sql
CREATE TABLE notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  type ENUM('like', 'comment', 'follow', 'group_invite', 'message') NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  related_id BIGINT NULL,
  related_type ENUM('post', 'comment', 'user', 'group', 'message') NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_is_read (is_read),
  INDEX idx_created_at (created_at)
);
```

### 15. file_uploads
```sql
CREATE TABLE file_uploads (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
```

## Database Indexes and Performance

### Essential Composite Indexes
```sql
-- For feed queries
CREATE INDEX idx_posts_feed ON posts(created_at DESC, category);
CREATE INDEX idx_posts_author_date ON posts(author_id, created_at DESC);

-- For group feeds
CREATE INDEX idx_posts_group_date ON posts(group_id, created_at DESC);

-- For user activity
CREATE INDEX idx_user_groups_user ON user_groups(user_id, joined_at DESC);
CREATE INDEX idx_user_follows_follower ON user_follows(follower_id, created_at DESC);

-- For messaging
CREATE INDEX idx_messages_conversation_date ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_conversations_updated ON conversations(updated_at DESC);

-- For notifications
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read, created_at DESC);
```

## Database Constraints and Business Rules

### Triggers for Maintaining Counts
```sql
-- Update posts.likes_count when post_likes changes
DELIMITER //
CREATE TRIGGER update_post_likes_count 
AFTER INSERT ON post_likes
FOR EACH ROW
BEGIN
  UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
END//

CREATE TRIGGER update_post_likes_count_delete
AFTER DELETE ON post_likes
FOR EACH ROW
BEGIN
  UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
END//

-- Update groups.member_count when user_groups changes
CREATE TRIGGER update_group_member_count
AFTER INSERT ON user_groups
FOR EACH ROW
BEGIN
  UPDATE groups SET member_count = member_count + 1 WHERE id = NEW.group_id;
END//

CREATE TRIGGER update_group_member_count_delete
AFTER DELETE ON user_groups
FOR EACH ROW
BEGIN
  UPDATE groups SET member_count = member_count - 1 WHERE id = OLD.group_id;
END//
DELIMITER ;
```

## Sample Data Seeds

### Required Categories
```sql
-- These categories must match the frontend enums exactly
INSERT INTO posts (id, title, content, author_id, category) VALUES 
  (1, 'Sample', 'Sample', 1, 'Announcements'),
  (2, 'Sample', 'Sample', 1, 'Events'),
  (3, 'Sample', 'Sample', 1, 'Academic'),
  (4, 'Sample', 'Sample', 1, 'Social'),
  (5, 'Sample', 'Sample', 1, 'Campus Life'),
  (6, 'Sample', 'Sample', 1, 'Marketplace');

INSERT INTO groups (id, name, description, creator_id, category) VALUES
  (1, 'Sample', 'Sample', 1, 'Academic'),
  (2, 'Sample', 'Sample', 1, 'Social'),
  (3, 'Sample', 'Sample', 1, 'Sports'),
  (4, 'Sample', 'Sample', 1, 'Arts'),
  (5, 'Sample', 'Sample', 1, 'Technology'),
  (6, 'Sample', 'Sample', 1, 'Other');
```

## Migration Order

1. `users`
2. `groups`
3. `conversations`
4. `posts`
5. `comments`
6. `messages`
7. `user_groups`
8. `conversation_participants`
9. `post_likes`
10. `comment_likes`
11. `post_bookmarks`
12. `user_follows`
13. `password_resets`
14. `notifications`
15. `file_uploads`

## Environment Variables Required

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=campus_connect
DB_USER=root
DB_PASSWORD=password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# File Upload
UPLOAD_PATH=/uploads
MAX_FILE_SIZE=10485760
ALLOWED_EXTENSIONS=jpg,jpeg,png,gif,pdf,doc,docx

# Email (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Redis (for caching and sessions)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```