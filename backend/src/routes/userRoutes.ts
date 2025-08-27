import { Router } from 'express';
import { followUser, unfollowUser,getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = Router();


router.post('/:id/follow', protect, followUser);
router.delete('/:id/follow', protect, unfollowUser);
router.get('/:id', getUserProfile);

export default router;