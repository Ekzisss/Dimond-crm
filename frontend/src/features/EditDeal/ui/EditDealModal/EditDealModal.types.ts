import { type Deal } from '@entities/Deal';

/**
 * Данные формы редактирования сделки
 */
export interface EditDealFormData {
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
  status: Deal['status'];
}

/**
 * Пропсы модального окна редактирования сделки
 */
export interface EditDealModalProps {
  /**
   * Флаг открытия модального окна
   */
  isOpen: boolean;

  /**
   * Сделка для редактирования (null если создание новой)
   */
  deal: Deal | null;

  /**
   * Callback для закрытия модального окна
   */
  onClose: () => void;

  /**
   * Callback для отправки формы
   */
  onSubmit: (data: EditDealFormData) => Promise<void>;
}
