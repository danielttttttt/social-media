import type { Request,Response } from 'express';
import type { AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../config/db.js';

//create group
export const createGroup = async (req: AuthRequest, res: Response) => {
  const { name, description, categoryId } = req.body;
  const userId = req.user!.id;

  if (!name || !description || !categoryId) {
    return res.status(400).json({ message: 'Name, description, and categoryId are required' });
  }

  try {
    // Create the group AND add the creator as the first member in one transaction
    const group = await prisma.group.create({
      data: {
        name,
        description,
        categoryId,
        members: {
          create: [
            { userId } // Add the creator to the UsersOnGroups join table
          ]
        }
      }
    });
    res.status(201).json(group);
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: 'Could not create group' });
  }
};


//get all groups
export const getAllGroups = async (req: AuthRequest, res: Response) => {
  try {
    const groups = await prisma.group.findMany({
      include: {
        Category: true, // Also include the category info
        _count: { select: { members: true } } // Include the number of members
      }
    });
    res.status(200).json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: 'Could not fetch groups' });
  }
};

// join the group
export const joinGroup = async (req: AuthRequest, res: Response) => {
  const { groupId } = req.params;
  const userId = req.user!.id;

  if (!groupId) {
    return res.status(400).json({ message: 'Group ID is required' });
  }

  try {
    // Create a new record in the join table
    await prisma.usersOnGroups.create({
      data: {
        userId,
        groupId,
      }
    });
    res.status(200).json({ message: 'Successfully joined group' });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: 'Could not join group' });
  }
};

export const getGroupDetails = async (req: Request, res: Response) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({ message: 'Group ID is required' });
  }

  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        Category: true, // Include the category name
        // Include the list of members
        members: {
          select: {
            // For each member, only select their public user info
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json(group);
  } catch (error) {
    console.error("Error fetching group details:", error);
    res.status(500).json({ message: 'Could not fetch group details' });
  }
};