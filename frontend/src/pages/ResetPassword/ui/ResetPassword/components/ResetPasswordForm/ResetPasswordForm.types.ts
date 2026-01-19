/**
 * Значения формы сброса пароля
 */
export interface ResetPasswordFormValues {
  /**
   * Новый пароль
   */
  password: string;
  /**
   * Подтверждение пароля
   */
  passwordConfirm: string;
}

/**
 * Пропсы формы сброса пароля
 */
export interface ResetPasswordFormProps {
  /**
   * Токен для сброса пароля
   */
  token: string;
  /**
   * Колбэк при успешном сбросе
   */
  onSuccess?: () => void;
}
