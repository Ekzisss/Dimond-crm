import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';

import { config } from '@shared/config';
import { resetTokenDb, userDb } from '@shared/database';
import { emailService } from '@shared/services/email.service';

import { type AuthPayload, type LoginArgs, type RegisterArgs } from './auth.types';

/**
 * Сервис авторизации
 */
export class AuthService {
  /**
   * Логин пользователя
   */
  async login({ email, password }: LoginArgs): Promise<AuthPayload> {
    const user = await userDb.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as SignOptions);

    return {
      token,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  /**
   * Регистрация пользователя
   */
  async register({ email, password, name }: RegisterArgs): Promise<AuthPayload> {
    const existingUser = await userDb.findByEmail(email);

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);

    const user = await userDb.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as SignOptions);

    return { token, user };
  }

  /**
   * Восстановление пароля
   */
  async forgotPassword(email: string): Promise<boolean> {
    const user = await userDb.findByEmail(email);

    console.error('USER:', user);

    if (!user) {
      return true;
    }

    const resetToken = jwt.sign({ userId: user.id, type: 'reset' }, config.jwtSecret, { expiresIn: '1h' } as SignOptions);

    await resetTokenDb.create(user.id, resetToken);

    if (config.smtpPassword) {
      await emailService.sendPasswordReset({ to: email, token: resetToken });
    } else {
      console.log(`\n=== RESET PASSWORD EMAIL ===`);
      console.log(`To: ${email}`);
      console.log(`Link: ${config.frontendUrl}/reset-password?token=${resetToken}`);
      console.log(`Token expires in 1 hour`);
      console.log(`===========================\n`);
    }

    return true;
  }

  /**
   * Сброс пароля
   */
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const resetToken = await resetTokenDb.findByToken(token);

    if (!resetToken) {
      throw new Error('Invalid or expired token');
    }

    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string; type: string };

      if (decoded.type !== 'reset') {
        throw new Error('Invalid token type');
      }

      const hashedPassword = await bcrypt.hash(newPassword, config.bcryptRounds);

      await userDb.updatePassword(decoded.userId, hashedPassword);
      await resetTokenDb.delete(token);

      return true;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Проверка JWT токена
   */
  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
      const user = await userDb.findById(decoded.userId);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch {
      throw new Error('Invalid token');
    }
  }
}

export const authService = new AuthService();
