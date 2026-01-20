/**
 * Интерфейс сделки
 */
export interface Deal {
  /**
   * Уникальный идентификатор сделки
   */
  id: string;

  /**
   * Название сделки
   */
  title: string;

  /**
   * Имя клиента
   */
  clientName: string;

  /**
   * Сумма сделки в рублях
   */
  amount: number;

  /**
   * Описание сделки (опционально)
   */
  description?: string;

  /**
   * Статус сделки
   */
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';

  /**
   * Дата создания сделки
   */
  createdAt: string;

  /**
   * Дата последнего обновления сделки
   */
  updatedAt: string;
}

/**
 * Пропсы компонента DealCard
 */
export interface DealCardProps {
  /**
   * Объект сделки для отображения
   */
  deal: Deal;

  /**
   * Callback для редактирования сделки
   */
  onEdit?: (deal: Deal) => void;

  /**
   * Callback для удаления сделки
   */
  onDelete?: (id: string) => void;

  /**
   * Callback для изменения статуса сделки
   */
  onStatusChange?: (id: string, status: Deal['status']) => void;
}
