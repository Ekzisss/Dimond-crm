import { db } from './db';

/**
 * Токен сброса пароля
 */
interface ResetToken {
  /**
   * Токен
   */
  token: string;
  /**
   * ID пользователя
   */
  userId: string;
  /**
   * Время истечения
   */
  expiresAt: Date;
}

/**
 * SQLite база данных токенов сброса пароля
 */
class ResetTokenDatabase {
  /**
   * Создать токен
   */
  async create(userId: string, token: string, expiresIn: number = 3600000): Promise<void> {
    const expiresAt = new Date(Date.now() + expiresIn);
    const stmt = db.prepare('INSERT INTO reset_tokens (token, user_id, expires_at) VALUES (?, ?, ?)');

    console.log('Creating reset token:');
    console.log('User ID:', userId);
    console.log('Token:', token);
    console.log('Expires at:', expiresAt.toISOString());

    stmt.run(token, userId, expiresAt.toISOString());

    // Проверка что токен сохранился
    const checkStmt = db.prepare('SELECT * FROM reset_tokens WHERE token = ?');
    const saved = checkStmt.get(token);
    console.log('Token saved in DB:', saved);
  }

  /**
   * Найти токен
   */
  async findByToken(token: string): Promise<ResetToken | null> {
    const stmt = db.prepare('SELECT * FROM reset_tokens WHERE token = ?');
    const result = stmt.get(token) as
      | { token: string; user_id: number; expires_at: string }
      | undefined;

    console.log('Finding token:', token);
    console.log('Result from DB:', result);

    if (!result) return null;

    const expiresAt = new Date(result.expires_at);
    const now = new Date();

    console.log('Expires at:', expiresAt);
    console.log('Now:', now);
    console.log('Is expired:', expiresAt < now);

    if (expiresAt < now) {
      return null;
    }

    return {
      token: result.token,
      userId: String(result.user_id),
      expiresAt,
    };
  }

  /**
   * Удалить токен
   */
  async delete(token: string): Promise<void> {
    const stmt = db.prepare('DELETE FROM reset_tokens WHERE token = ?');

    stmt.run(token);
  }
}

export const resetTokenDb = new ResetTokenDatabase();
