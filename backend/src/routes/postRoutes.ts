import { Router } from 'express';
import { createPost, likePost, unlikePost } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', protect, createPost);
router.post('/:postId/like', protect, likePost);
router.delete('/:postId/like', protect, unlikePost);

export default router;