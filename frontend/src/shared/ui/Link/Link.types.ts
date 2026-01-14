import { type AnchorHTMLAttributes, type ReactNode } from 'react';

/**
 * Размеры ссылки.
 */
export type LinkSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Варианты ссылки.
 */
export type LinkVariant = 'default' | 'primary' | 'muted';

/**
 * Пропсы для компонента Link.
 */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Размер ссылки.
   */
  size?: LinkSize;

  /**
   * Вариант ссылки.
   */
  variant?: LinkVariant;

  /**
   * Содержимое ссылки.
   */
  children: ReactNode;

  /**
   * URL для перехода.
   */
  href: string;
}

