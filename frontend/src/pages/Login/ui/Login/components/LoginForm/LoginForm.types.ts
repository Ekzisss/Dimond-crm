/**
 * Значения формы входа
 */
export interface LoginFormValues {
  /**
   * Email пользователя
   */
  email: string;
  /**
   * Пароль
   */
  password: string;
  /**
   * Запомнить пользователя
   */
  rememberMe?: boolean;
}

/**
 * Пропсы формы входа
 */
export interface LoginFormProps {
  /**
   * Колбэк при успешном входе
   */
  onSuccess?: () => void;
}
