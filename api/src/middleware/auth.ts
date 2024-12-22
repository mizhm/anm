import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/utils/jwt';

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
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  req.user = user;
  return next();
};

