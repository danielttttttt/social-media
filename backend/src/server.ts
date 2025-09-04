// The FINAL, CORRECTED version of src/server.ts

import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import prisma from './config/db.js';

const PORT = process.env.PORT || 4000;

// Create the HTTP server which will be used by both Express and Socket.IO
const httpServer = createServer(app);

// Create the Socket.IO server and attach it to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // Your frontend URL
    methods: ["GET", "POST"]
  }
});

// --- All your Socket.IO logic remains the same ---

// WebSocket Authentication Middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error: No token provided'));
  }
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, decoded: any) => {
    if (err) {
      return next(new Error('Authentication error: Token is invalid'));
    }
    (socket as any).userId = decoded.userId;
    next();
  });
});

// Real-time event listeners
io.on('connection', (socket) => {
  const userId = (socket as any).userId;
  console.log(`✅ User connected: ${socket.id}, UserID: ${userId}`);

  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${userId} joined room: ${conversationId}`);
  });

  socket.on('send_message', async (data) => {
    const { conversationId, text } = data;
    try {
      const message = await prisma.message.create({
        data: { text, senderId: userId, conversationId },
        include: { sender: { select: { id: true, name: true } } }
      });
      socket.to(conversationId).emit('receive_message', message);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});


// --- The CRITICAL CHANGE ---
// We only call .listen() ONCE, on the httpServer.
// This single call starts the server for BOTH Express and Socket.IO.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server (with WebSockets) is running on http://localhost:${PORT}`);
});