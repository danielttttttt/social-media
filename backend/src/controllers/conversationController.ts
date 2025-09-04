import type { Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

export const createConversation = async (req: AuthRequest, res: Response) => {
  const creatorId = req.user!.id;
  const { memberIds } = req.body; // Expect an array of user IDs

  if (!memberIds || !Array.isArray(memberIds) || memberIds.length === 0) {
    return res.status(400).json({ message: 'Member IDs must be a non-empty array' });
  }
 const allMemberIds = [...new Set([creatorId, ...memberIds])]; // Combine and remove duplicates

  try {
    const conversation = await prisma.conversation.create({
      data: {
        members: {
          create: allMemberIds.map(id => ({ userId: id })),
        },
      },
      include: { members: true },
    });
    res.status(201).json(conversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ message: "Could not create conversation" });
  }
};
export const getConversations = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  try {
    const conversations = await prisma.conversation.findMany({
      where: { members: { some: { userId } } }, // Find convos where the user is a member
      include: { members: { include: { user: { select: { id: true, name: true } } } } },
    });
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ message: "Could not fetch conversations" });
  }
};

export const getMessagesForConversation = async (req: AuthRequest, res: Response) => {
  const { conversationId } = req.params;
  if (!conversationId) {
    return res.status(400).json({ message: "Conversation ID is required" });
  }
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: { sender: { select: { id: true, name: true } } }, // Include sender's name
      orderBy: { createdAt: 'asc' }, // Show oldest messages first
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Could not fetch messages" });
  }
};