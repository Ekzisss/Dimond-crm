import { type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Пропсы для компонента Input.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
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
}
