// backend/src/controllers/commentController.ts
import type { Request, Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

export const createComment = async (req: AuthRequest, res: Response) => {
  const { postId } = req.params; // Get the post ID from the URL
  const { text } = req.body; // Get the comment text from the body
  const authorId = req.user!.id; // Get the author from the token

  if (!text) {
    return res.status(400).json({ message: 'Comment text is required' });
  }
  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        text,
        authorId,
        postId,
      },
      include: { // Include the author's info in the response
        author: {
          select: { id: true, name: true, profilePictureUrl: true }
        }
      }
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Could not create comment" });
  }
};


export const getCommentsForPost = async (req: Request, res: Response) => {
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' }, // Show oldest comments first
      include: {
        author: { // Use 'author' to match your schema
          select: { id: true, name: true, profilePictureUrl: true }
        }
      }
    });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Could not fetch comments" });
  }
};