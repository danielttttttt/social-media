import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

export const followUser = async (req: AuthRequest, res: Response) => {
  const { id: followingId } = req.params;
  const followerId = req.user!.id;

  if (!followingId) {
    return res.status(400).json({ message: 'User ID to follow is required' });
  }

  if (followerId === followingId) {
    return res.status(400).json({ message: 'You cannot follow yourself' });
  }

  try {
    await prisma.follows.create({
      data: {
        followerId,
        followingId,
      },
    });
    res.status(200).json({ message: 'Successfully followed user' });
  } catch (error: any) {
    if (error.code === 'P2002') { 
      return res.status(409).json({ message: 'You are already following this user' });
    }
    console.error("Error following user:", error);
    res.status(500).json({ message: 'Could not follow user' });
  }
};

export const unfollowUser = async (req: AuthRequest, res: Response) => {
  const { id: followingId } = req.params;
  const followerId = req.user!.id;

  if (!followingId) {
    return res.status(400).json({ message: 'User ID to unfollow is required' });
  }

  try {
    await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId,
          followingId,
        },
      },
    });
    res.status(200).json({ message: 'Successfully unfollowed user' });
  } catch (error: any) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ message: 'Could not unfollow user' });
  }
};