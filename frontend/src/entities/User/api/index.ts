/**
 * Параметры входа
 */
export interface LoginParams {
  /**
   * Email пользователя
   */
  email: string;
  /**
   * Пароль
   */
  password: string;
}

/**
 * Параметры регистрации
 */
export interface RegisterParams {
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
 * Параметры сброса пароля
 */
export interface ResetPasswordParams {
  /**
   * Токен сброса
   */
  token: string;
  /**
   * Новый пароль
   */
  newPassword: string;
}

export const authApi = {
  /**
   * Выполняет вход пользователя
   * @param params - Параметры входа
   */
  login: async (params: LoginParams) => {
    const { email, password } = params;
    return { token: 'mock-token', user: { email, password } };
  },

  /**
   * Регистрирует нового пользователя
   * @param params - Параметры регистрации
   */
  register: async (params: RegisterParams) => {
    const { email, name } = params;
    return { token: 'mock-token', user: { email, name } };
  },

  /**
   * Отправляет запрос на сброс пароля
   * @param email - Email пользователя
   */
  forgotPassword: async (email: string) => {
    return { success: true, email };
  },

  /**
   * Сбрасывает пароль
   * @param params - Параметры сброса
   */
  resetPassword: async (params: ResetPasswordParams) => {
    const { token, newPassword } = params;
    return { success: true, token, newPassword };
  },
};
