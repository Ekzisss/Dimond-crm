import { type HTMLAttributes, type ReactNode } from 'react';

/**
 * Размеры текста.
 */
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Варианты текста.
 */
export type TextVariant = 'body' | 'heading' | 'caption';

/**
 * Пропсы для компонента Text.
 */
export interface TextProps extends HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLHeadingElement | HTMLDivElement> {
  /**
   * Размер текста.
   */
  size?: TextSize;

  /**
   * Вариант текста.
   */
  variant?: TextVariant;

  /**
   * Содержимое текста.
   */
  children: ReactNode;

  /**
   * HTML тег для рендеринга.
   */
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';

  /**
   * Цвет текста.
   */
  color?: 'default' | 'muted' | 'primary' | 'error' | 'success' | 'warning';

  /**
   * Выравнивание текста.
   */
  align?: 'left' | 'center' | 'right';
}
