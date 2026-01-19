/**
 * Статус сделки
 */
export type DealStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';

/**
 * Приоритет сделки (вычисляемый)
 */
export type DealPriority = 'low' | 'medium' | 'high';

/**
 * Сделка из API
 */
export interface Deal {
  /**
   * ID сделки
   */
  id: string;

  /**
   * Название сделки
   */
  title: string;

  /**
   * Сумма сделки
   */
  amount: number;

  /**
   * Статус сделки
   */
  status: DealStatus;

  /**
   * Имя клиента
   */
  clientName: string;

  /**
   * Дата создания
   */
  createdAt: string;

  /**
   * Описание
   */
  description?: string;

  /**
   * Дата обновления
   */
  updatedAt: string;
}

import { type Deal as ApiDeal } from '@shared/api/deals';

/**
 * Колонка канбан-доски
 */
export interface Column {
  /**
   * ID колонки
   */
  id: DealStatus;

  /**
   * Название колонки
   */
  title: string;

  /**
   * Цвет колонки
   */
  color: string;

  /**
   * Сделки в колонке
   */
  deals: ApiDeal[];
}

/**
 * Пропсы компонента DealsBoard
 */
export type DealsBoardProps = {
  /**
   * Callback для обновления доски
   */
  onRefresh?: () => void;
  /**
   * Callback для редактирования сделки
   */
  onEdit?: (deal: ApiDeal) => void;
  /**
   * Callback для удаления сделки
   */
  onDelete?: (dealId: string) => void;
};
