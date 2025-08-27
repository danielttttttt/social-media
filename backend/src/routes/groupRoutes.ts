import { Router } from 'express';
import { createGroup, getAllGroups, joinGroup,getGroupDetails } from '../controllers/groupController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getAllGroups);
router.post('/', protect, createGroup);
router.post('/:groupId/join', protect, joinGroup);
router.get('/:groupId', getGroupDetails);

export default router;