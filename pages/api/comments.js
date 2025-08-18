// Mock API for comments
let nextCommentId = 10; // Start from 10 since we have 9 existing comments

export default function handler(req, res) {
  const { method } = req;
  const { postId } = req.query;

  switch (method) {
    case 'GET':
      // Get comments for a specific post
      if (postId) {
        // This would normally fetch from database
        // For now, return empty array as comments are embedded in posts
        res.status(200).json([]);
      } else {
        res.status(400).json({ error: 'Post ID is required' });
      }
      break;

    case 'POST':
      // Add a new comment
      const { content, author, profilePic } = req.body;
      
      if (!content || !author || !postId) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      const newComment = {
        id: nextCommentId++,
        author,
        profilePic: profilePic || `https://i.pravatar.cc/150?u=${author.replace(/\s+/g, '_').toLowerCase()}`,
        content,
        timestamp: new Date().toISOString(),
        likes: 0
      };

      // In a real app, this would save to database
      // For now, just return the new comment
      res.status(201).json(newComment);
      break;

    case 'PUT':
      // Update a comment (like/unlike)
      const { commentId, action } = req.body;
      
      if (!commentId || !action) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // In a real app, this would update the database
      // For now, just return success
      res.status(200).json({ success: true, action });
      break;

    case 'DELETE':
      // Delete a comment
      const { commentId: deleteCommentId } = req.body;
      
      if (!deleteCommentId) {
        res.status(400).json({ error: 'Comment ID is required' });
        return;
      }

      // In a real app, this would delete from database
      res.status(200).json({ success: true });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
