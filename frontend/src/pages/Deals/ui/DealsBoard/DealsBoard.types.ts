/**
 * Статус сделки
 */
export type DealStatus = 'new' | 'in-progress' | 'negotiation' | 'closed';

/**
 * Сделка
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
}

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
   * Сделки в колонке
   */
  deals: Deal[];
}

/**
 * Пропсы компонента DealsBoard
 */
export type DealsBoardProps = Record<string, never>;
