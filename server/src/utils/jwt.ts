// src/utils/jwt.ts
import jwt, { type SignOptions, type JwtPayload } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET ?? 'dev-secret'; // 永远是 string

export function signToken(
  payload: JwtPayload,
  options: SignOptions = { expiresIn: '7d' } // 直接用 SignOptions，避免重载歧义
): string {
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken<T extends object = JwtPayload>(token: string): T | null {
  try {
    return jwt.verify(token, SECRET) as T;
  } catch {
    return null;
  }
}
