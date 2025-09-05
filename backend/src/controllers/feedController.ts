import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

export const getFeed = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // --- Step 1: Get the list of users the current user follows ---
    // This part is the same, but we will use this data later.
    const following = await prisma.follows.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    // Use a Set for highly efficient lookups (checking if a user is followed).
    const followingIds = new Set(following.map((f) => f.followingId));

    // --- Step 2: Query for all posts (this is also the same) ---
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        author: {
          select: { id: true, name: true, profilePictureUrl: true },
        },
        _count: { select: { likes: true, comments: true } },
      },
    });

    // --- Step 3: Get the liked posts (this is also the same) ---
    const userLikes = await prisma.like.findMany({
      where: { userId: userId, postId: { in: posts.map(p => p.id) } },
      select: { postId: true },
    });
    const likedPostIds = new Set(userLikes.map(like => like.postId));

    // --- Step 4 (THE FIX): Add 'likedByMe' AND 'isFollowedByMe' flags ---
    const feed = posts.map(post => {
      // Check if the post's author ID is in our set of followed IDs.
      const isFollowed = followingIds.has(post.author.id);
      
      return {
        ...post,
        likedByMe: likedPostIds.has(post.id),
        // Nest the new flag inside the author object for clarity
        author: {
          ...post.author,
          isFollowedByMe: isFollowed,
        },
      };
    });

    res.status(200).json(feed);

  } catch (error) {
    console.error("Error fetching feed:", error);
    res.status(500).json({ message: 'Could not fetch feed' });
  }
};