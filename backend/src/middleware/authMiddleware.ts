import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string };
}

interface DecodedToken extends JwtPayload {
  userId: string;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
      req.user = { id: (decoded as DecodedToken).userId };
      return next();
    } else {
      return res.status(401).json({ message: 'Token payload invalid' });
    }

  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, token failed verification' });
  }
};



