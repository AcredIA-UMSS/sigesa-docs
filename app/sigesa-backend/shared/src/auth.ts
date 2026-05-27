import jwt, { type SignOptions } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { AppError, ErrorCodes } from './errors.js';
import type { JwtRole } from './roles.js';

export interface JwtPayload {
  sub: string;
  email: string;
  role: JwtRole;
  programScope: string | null;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function signToken(payload: JwtPayload): { accessToken: string; expiresIn: number } {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is required');
  const expiresInStr = process.env.JWT_EXPIRES_IN ?? '8h';
  const accessToken = jwt.sign(payload, secret, {
    expiresIn: expiresInStr as SignOptions['expiresIn'],
  });
  const decoded = jwt.decode(accessToken) as { exp?: number; iat?: number };
  const expiresIn = decoded.exp && decoded.iat ? decoded.exp - decoded.iat : 28800;
  return { accessToken, expiresIn };
}

export function verifyToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is required');
  return jwt.verify(token, secret) as JwtPayload;
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(new AppError(ErrorCodes.UNAUTHORIZED, 'Token requerido', 401));
    return;
  }
  try {
    req.user = verifyToken(header.slice(7));
    next();
  } catch {
    next(new AppError(ErrorCodes.UNAUTHORIZED, 'Token inválido', 401));
  }
}

export function requireRoles(...roles: JwtRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError(ErrorCodes.UNAUTHORIZED, 'No autenticado', 401));
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new AppError(ErrorCodes.FORBIDDEN, 'Rol no autorizado', 403));
      return;
    }
    next();
  };
}
