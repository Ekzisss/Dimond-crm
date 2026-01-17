import { type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Пропсы для компонента PasswordInput.
 */
export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * Иконка слева от input.
   */
  icon?: ReactNode;

  /**
   * Сообщение об ошибке.
   */
  error?: string;

  /**
   * Лейбл для input.
   */
  label?: string;

  /**
   * Иконка для показа пароля.
   */
  showPasswordIcon?: ReactNode;

  /**
   * Иконка для скрытия пароля.
   */
  hidePasswordIcon?: ReactNode;
}

