import { type DealStatus } from '../DealsBoard.types';

/**
 * Конфигурация колонок канбан-доски
 */
export const COLUMN_CONFIG: Record<
  DealStatus,
  {
    /**
     * Название колонки
     */
    title: string;
    /**
     * Цвет колонки
     */
    color: string;
  }
> = {
  new: { title: 'Новые', color: '#6b7280' },
  in_progress: { title: 'В работе', color: '#f59e0b' },
  completed: { title: 'Завершенные', color: '#10b981' },
  cancelled: { title: 'Отмененные', color: '#ef4444' },
};
