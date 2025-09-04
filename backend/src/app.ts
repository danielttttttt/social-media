import './config/env.js'; 
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js'; 
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import feedRoutes from './routes/feedRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import groupRoutes from './routes/groupRoutes.js';
import conversationRoutes from './routes/conversationRoutes.js';

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes);
app.use('/api/feed', feedRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/conversations', conversationRoutes);


app.get('/api/test-protected', protect, (req, res) => {
  res.status(200).json({ message: 'You have accessed a protected route!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

export default app; 
