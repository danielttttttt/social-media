import './config/env.js'; 
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { protect } from './middleware/authMiddleware.js'; 
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing of JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/posts', postRoutes);

app.get('/api/test-protected', protect, (req, res) => {
  res.status(200).json({ message: 'You have accessed a protected route!' });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

export default app; 
