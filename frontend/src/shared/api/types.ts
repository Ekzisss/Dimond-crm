/**
 * Типы для GraphQL API
 */

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
export interface AuthResponse {
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
 * Ответ мутации логина
 */
export interface LoginData {
  /**
   * Данные авторизации
   */
  login: AuthResponse;
}

/**
 * Ответ мутации регистрации
 */
export interface RegisterData {
  /**
   * Данные авторизации
   */
  register: AuthResponse;
}

/**
 * Ответ мутации восстановления пароля
 */
export interface ForgotPasswordData {
  /**
   * Результат отправки
   */
  forgotPassword: boolean;
}

/**
 * Ответ мутации сброса пароля
 */
export interface ResetPasswordData {
  /**
   * Результат сброса
   */
  resetPassword: boolean;
}
