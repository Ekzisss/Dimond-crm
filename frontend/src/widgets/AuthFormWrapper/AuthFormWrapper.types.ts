import { type ReactNode } from 'react';

/**
 * Пропсы для AuthFormWrapper
 */
export interface AuthFormWrapperProps {
  /**
   * Заголовок формы.
   */
  title: string;
  /**
   * Описание формы
   */
  description?: string;
  /**
   * Содержимое формы
   */
  children: ReactNode;
  /**
   * Текст ошибки
   */
  error?: string;
  /**
   * Состояние загрузки
   */
  isLoading?: boolean;
}
