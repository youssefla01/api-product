import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils';

interface User {
  email: string; 
}

interface AuthenticatedRequest extends Request {
  user?: User; 
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  try {
    const decoded = verifyToken(token) as User;
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
