import type { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AppError, ErrorCodes, isAppError } from './errors.js';
import { query } from './db.js';

export const MAX_EVIDENCE_BYTES = 50 * 1024 * 1024;

export const evidenceUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_EVIDENCE_BYTES },
});

export function multerErrorHandler(
  err: unknown,
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
    next(
      new AppError(
        ErrorCodes.EVIDENCE_TOO_LARGE,
        'Evidence supera limite institucional (50 MB)',
        413,
      ),
    );
    return;
  }
  next(err);
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (isAppError(err)) {
    res.status(err.status).json(err.toJSON());
    return;
  }
  console.error(err);
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Error interno del servidor' },
  });
}

export async function idempotencyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (req.method !== 'POST') {
    next();
    return;
  }
  const key = req.headers['idempotency-key'] as string | undefined;
  if (!key) {
    next();
    return;
  }
  try {
    const cached = await query<{
      status_code: number;
      response_body: unknown;
    }>(
      `SELECT status_code, response_body FROM idempotency_cache
       WHERE idempotency_key = $1::uuid AND expires_at > now()`,
      [key],
    );
    if (cached.rows[0]) {
      res.status(cached.rows[0].status_code).json(cached.rows[0].response_body);
      return;
    }
    const originalJson = res.json.bind(res);
    res.json = (body: unknown) => {
      void query(
        `INSERT INTO idempotency_cache (idempotency_key, method, path, status_code, response_body)
         VALUES ($1::uuid, $2, $3, $4, $5::jsonb)
         ON CONFLICT (idempotency_key) DO NOTHING`,
        [key, req.method, req.path, res.statusCode, JSON.stringify(body)],
      );
      return originalJson(body);
    };
    next();
  } catch (e) {
    next(e);
  }
}

export function correlationIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const id =
    (req.headers['x-correlation-id'] as string) ||
    crypto.randomUUID();
  req.headers['x-correlation-id'] = id;
  res.setHeader('x-correlation-id', id);
  next();
}
