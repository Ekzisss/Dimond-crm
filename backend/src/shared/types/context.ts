import { type Request } from 'express';

import { authService } from '@features/auth';

/**
 * Пользователь в контексте
 */
export interface ContextUser {
  /**
   * ID пользователя
   */
  id: string;
  /**
   * Email пользователя
   */
  email: string;
  /**
   * Имя пользователя
   */
  name: string;
}

/**
 * GraphQL контекст
 */
export interface Context {
  /**
   * Пользователь (если авторизован)
   */
  user?: ContextUser;
}

/**
 * Создание контекста для GraphQL
 */
export const createContext = async (req: Request): Promise<Context> => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return {};
  }

  try {
    const user = await authService.verifyToken(token);

    return { user };
  } catch {
    return {};
  }
};
