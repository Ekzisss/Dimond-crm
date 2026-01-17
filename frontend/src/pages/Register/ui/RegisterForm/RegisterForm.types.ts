/**
 * Значения формы регистрации
 */
export interface RegisterFormValues {
  /**
   * Имя пользователя
   */
  name: string;
  /**
   * Email пользователя
   */
  email: string;
  /**
   * Пароль
   */
  password: string;
  /**
   * Подтверждение пароля
   */
  passwordConfirm: string;
}

/**
 * Пропсы формы регистрации
 */
export interface RegisterFormProps {
  /**
   * Колбэк при успешной регистрации
   */
  onSuccess?: () => void;
}
