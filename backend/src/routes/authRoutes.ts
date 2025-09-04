import { Router } from 'express';
import { register, login, getCurrentUser } from '../controllers/authController.js';
import { validate } from '../middleware/validateMiddleware.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
 router.get('/me', protect, getCurrentUser);

export default router; 
