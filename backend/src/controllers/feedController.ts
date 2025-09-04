// backend/src/controllers/feedController.ts
import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

export const getFeed = async (req: AuthRequest, res: Response) => {
  try {
    // We still need the userId to check which posts they have liked.
    const userId = req.user!.id;

    // --- (Step 1) SIMPLIFIED QUERY: Get all posts from the database ---
    // The 'where' clause is removed, so this fetches posts from ALL users.
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }, // Order by newest first
      take: 50, // Limit the number of posts for performance
      include: {
        // We still include all the rich data for the frontend
        author: {
          select: {
            id: true,
            name: true,
            profilePictureUrl: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    // --- (Step 2) Get the IDs of posts the current user has liked (this logic remains the same) ---
    const userLikes = await prisma.like.findMany({
      where: {
        userId: userId,
        // Check against the posts we just fetched
        postId: { in: posts.map(p => p.id) }
      },
      select: { postId: true },
    });
    // Use a Set for efficient lookups
    const likedPostIds = new Set(userLikes.map(like => like.postId));

    // --- (Step 3) Add the 'likedByMe' flag to each post object (this logic also remains the same) ---
    const feedWithLikes = posts.map(post => ({
      ...post,
      likedByMe: likedPostIds.has(post.id),
    }));

    res.status(200).json(feedWithLikes);

  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: 'Could not fetch feed' });
  }
};