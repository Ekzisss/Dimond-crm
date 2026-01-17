/**
 * Пользователь
 */
export interface User {
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
 * Ответ авторизации
 */
export interface AuthPayload {
  /**
   * JWT токен
   */
  token: string;
  /**
   * Данные пользователя
   */
  user: User;
}

/**
 * Аргументы для логина
 */
export interface LoginArgs {
  /**
   * Email
   */
  email: string;
  /**
   * Пароль
   */
  password: string;
}

/**
 * Аргументы для регистрации
 */
export interface RegisterArgs {
  /**
   * Email
   */
  email: string;
  /**
   * Пароль
   */
  password: string;
  /**
   * Имя
   */
  name: string;
}

/**
 * Аргументы для восстановления пароля
 */
export interface ForgotPasswordArgs {
  /**
   * Email
   */
  email: string;
}

/**
 * Аргументы для сброса пароля
 */
export interface ResetPasswordArgs {
  /**
   * Токен
   */
  token: string;
  /**
   * Новый пароль
   */
  newPassword: string;
}
