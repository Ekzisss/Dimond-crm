/**
 * Значения формы восстановления пароля
 */
export interface ForgotPasswordFormValues {
  /**
   * Email пользователя
   */
  email: string;
}

/**
 * Пропсы формы восстановления пароля
 */
export interface ForgotPasswordFormProps {
  /**
   * Колбэк при успешной отправке
   */
  onSuccess?: () => void;
}
