import { type User } from '@features/auth';

import { db } from './db';

/**
 * SQLite база данных пользователей
 */
class UserDatabase {
  /**
   * Создать пользователя
   */
  async create(data: { email: string; name: string; password: string }): Promise<User> {
    const stmt = db.prepare('INSERT INTO users (email, name, password) VALUES (?, ?, ?)');

    try {
      const result = stmt.run(data.email, data.name, data.password);

      return {
        id: String(result.lastInsertRowid),
        email: data.email,
        name: data.name,
      };
    } catch (error) {
      if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
        throw new Error('Email already exists');
      }

      throw error;
    }
  }

  /**
   * Найти пользователя по email
   */
  async findByEmail(email: string): Promise<(User & { password: string }) | null> {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const user = stmt.get(email) as { id: number; email: string; name: string; password: string } | undefined;

    if (!user) return null;

    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
      password: user.password,
    };
  }

  /**
   * Найти пользователя по ID
   */
  async findById(id: string): Promise<User | null> {
    const stmt = db.prepare('SELECT id, email, name FROM users WHERE id = ?');
    const user = stmt.get(id) as { id: number; email: string; name: string } | undefined;

    if (!user) return null;

    return {
      id: String(user.id),
      email: user.email,
      name: user.name,
    };
  }

  /**
   * Обновить пароль
   */
  async updatePassword(id: string, password: string): Promise<boolean> {
    const stmt = db.prepare('UPDATE users SET password = ? WHERE id = ?');
    const result = stmt.run(password, id);

    return result.changes > 0;
  }
}

export const userDb = new UserDatabase();
