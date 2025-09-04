import { Router } from 'express';
import { createConversation, getConversations, getMessagesForConversation } from '../controllers/conversationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', protect, getConversations);
router.post('/', protect, createConversation);
router.get('/:conversationId/messages', protect, getMessagesForConversation);

export default router;