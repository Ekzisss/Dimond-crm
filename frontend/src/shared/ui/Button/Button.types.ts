import { type ButtonHTMLAttributes } from 'react';

/**
 * Пропсы для компонента Button.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Вариант кнопки.
   */
  variant?: 'primary' | 'secondary' | 'ghost';
}

