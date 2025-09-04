
import type { Request, Response } from 'express';
import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { AuthRequest } from '../middleware/authMiddleware.js';

//registration
export const register = async (req: Request, res: Response) => {
  // 1. Destructure the fields sent from the frontend form.
  // Note: We don't need 'username' for the database model right now, but we receive it.
  const { firstName, lastName, email, password } = req.body;

  try {
    // 2. Check if a user with this email already exists.
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // 3. Combine firstName and lastName to create the 'name' required by the database.
    const name = `${firstName} ${lastName}`;

    // 4. Hash the password for security.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create the new user in the database using the combined 'name'.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 6. Generate a JWT for the new user's session.
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

    // 7. Prepare a user object to send back to the client (without the password).
    const userForClient = { id: user.id, name: user.name, email: user.email };

    // 8. Send a success response.
    res.status(201).json({ token, user: userForClient });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};
//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    
    const userForClient = { id: user.id, name: user.name, email: user.email };
    res.status(200).json({ token, user: userForClient });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

   export const getCurrentUser = async (req: AuthRequest, res: Response) => {
      const userId = req.user!.id; // Get user ID from the 'protect' middleware

      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { // Only select the public, safe fields
            id: true,
            name: true,
            email: true,
            profilePictureUrl: true,
          },
        });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching current user:", error);
        res.status(500).json({ message: 'Could not fetch user' });
      }
    };