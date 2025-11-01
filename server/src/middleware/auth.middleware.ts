import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.js';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role?: string };
    }
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
if (!authHeader) return res.status(401).json({ error: 'No token provided' });

const token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ error: 'Invalid token format' });

const payload = verifyToken(token); 
if (!payload) return res.status(401).json({ error: 'Invalid token' });

req.user = payload as any;
next();
}
