import { Router } from 'express';
import { getFeed } from '../controllers/feedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();
router.get('/', protect, getFeed);

export default router;