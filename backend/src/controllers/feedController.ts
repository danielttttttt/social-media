import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

export const getFeed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // --- Step 1: Get the list of users the current user follows ---
    const following = await prisma.follows.findMany({
      where: { followerId: userId },
      select: { followingId: true }, // We only need the ID of the person being followed
    });
     // Create an array of just the IDs, e.g., ['id1', 'id2', 'id3']
    const followingIds = following.map((f) => f.followingId);

      // --- Step 2: Get the most recent posts from the followed users ---
    const followedPosts = await prisma.post.findMany({
      where: {
        authorId: {
          in: followingIds, // Find all posts where the author is in our 'following' list
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20, // Let's limit this to the 20 most recent posts for performance
      include: {
        author: {
          select: { id: true, name: true }, // Include the author's name
        },
        _count: {
          select: { likes: true }, // Include the count of likes
        },
      },
    });

    // --- Step 3 (NEW): Get "Discovery" posts from users they DON'T follow ---
    const discoveryPosts = await prisma.post.findMany({
      where: {
        authorId: {
          // The 'notIn' operator is the key here.
          // It finds posts where the author is NOT in the list of people we follow.
          // We also exclude the user's own posts from their discovery feed.
          notIn: [...followingIds, userId],
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 10, // Let's grab 10 discovery posts
      include: {
        author: {
          select: { id: true, name: true },
        },
        _count: {
          select: { likes: true },
        },
      },
    });

    // --- Step 4 (NEW): Combine and sort the final feed ---
    const feed = [...followedPosts, ...discoveryPosts];
    
    // Sort the final combined array by date to mix them together chronologically
    feed.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    res.status(200).json(feed);

  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: 'Could not fetch feed' });
  }
};
