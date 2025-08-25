import { Router } from 'express';
import { followUser, unfollowUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Any request to these routes must first pass through the 'protect' middleware.
router.post('/:id/follow', protect, followUser);
router.delete('/:id/follow', protect, unfollowUser);

export default router;