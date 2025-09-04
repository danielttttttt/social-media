import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

export const createPost = async (req: AuthRequest, res: Response) => {
  const { content, postType, title, imageUrl /* ...etc */ } = req.body;
  const authorId = req.user!.id;

  if (!content) {
    return res.status(400).json({ message: 'Post content is required' });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        postType,
        authorId,
        title,
        imageUrl,
      },
      // --- THIS IS THE FIX ---
      // Include the author's public info in the response object
      include: {
        author: {
          select: {
            id: true,
            name: true,
            profilePictureUrl: true,
          },
        },
      },
      // --- END OF FIX ---
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: 'Could not create post' });
  }
};

export const likePost = async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;
  const userId = req.user!.id;

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    await prisma.like.create({ data: { postId, userId } });
    res.status(200).json({ message: 'Post liked successfully' });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: 'Could not like post' });
  }
};

export const unlikePost = async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;
  const userId = req.user!.id;

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    await prisma.like.delete({
      where: { userId_postId: { userId, postId } },
    });
    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ message: 'Could not unlike post' });
  }
};