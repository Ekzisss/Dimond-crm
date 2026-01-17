import { type FC } from 'react';

/**
 * Конфигурация роута
 */
export interface RouteConfig {
  /**
   * Путь роута
   */
  path: string;
  /**
   * Компонент страницы
   */
  component: FC;
  /**
   * Требует авторизации
   */
  protected?: boolean;
  /**
   * Только для неавторизованных
   */
  authOnly?: boolean;
}
