// backend/src/routes/commentRoutes.ts
import { Router } from 'express';
import { createComment,getCommentsForPost } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

// The { mergeParams: true } option is important for nested routes
const router = Router({ mergeParams: true });

// This route corresponds to POST /api/posts/:postId/comments
router.post('/', protect, createComment);
router.get('/', getCommentsForPost);

export default router;