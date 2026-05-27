import { query } from '@sigesa/shared';
import { AppError, ErrorCodes, signToken, DB_TO_ROLE } from '@sigesa/shared';
import type { JwtRole } from '@sigesa/shared';

const DEV_PASSWORD = 'Password123!';

export class AuthLoginUseCase {
  async execute(email: string, password: string) {
    if (!email.endsWith('@umss.edu.bo')) {
      throw new AppError(
        ErrorCodes.AUTH_INVALID_CREDENTIALS,
        'Credenciales inválidas',
        401,
      );
    }

    const res = await query<{
      id: string;
      email: string;
      role_code: string;
      program_id: string | null;
    }>(
      `SELECT u.id, u.email, upa.role_code, upa.program_id
       FROM app_user u
       LEFT JOIN user_program_assignment upa ON upa.user_id = u.id
       WHERE u.email = $1 AND u.estado = 'ACTIVO'
       LIMIT 1`,
      [email],
    );
    const row = res.rows[0];
    if (!row || password !== DEV_PASSWORD) {
      throw new AppError(
        ErrorCodes.AUTH_INVALID_CREDENTIALS,
        'Credenciales inválidas',
        401,
      );
    }

    const role = DB_TO_ROLE[row.role_code as keyof typeof DB_TO_ROLE];
    if (!role) {
      throw new AppError(
        ErrorCodes.AUTH_INVALID_CREDENTIALS,
        'Credenciales inválidas',
        401,
      );
    }

    const { accessToken, expiresIn } = signToken({
      sub: row.id,
      email: row.email,
      role: role as JwtRole,
      programScope: row.program_id,
    });

    return {
      userId: row.id,
      email: row.email,
      role,
      programScope: row.program_id,
      accessToken,
      expiresIn,
    };
  }
}
