import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new Error('Token not found');
    }

    const user = verifyToken(token);
    if (!user) {
      throw new Error('Invalid token');
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
