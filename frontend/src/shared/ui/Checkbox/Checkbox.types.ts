import { type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Пропсы для компонента Checkbox.
 */
export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Текст лейбла.
   */
  label?: ReactNode;
}

