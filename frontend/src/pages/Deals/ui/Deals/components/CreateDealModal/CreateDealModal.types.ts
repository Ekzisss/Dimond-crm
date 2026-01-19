/**
 * Данные формы создания сделки
 */
export interface DealFormData {
  /**
   * Название сделки
   */
  title: string;
  /**
   * Имя клиента
   */
  clientName: string;
  /**
   * Сумма сделки
   */
  amount: number;
  /**
   * Описание сделки
   */
  description?: string;
}

/**
 * Пропсы компонента CreateDealModal
 */
export interface CreateDealModalProps {
  /**
   * Открыто ли модальное окно
   */
  isOpen: boolean;
  /**
   * Функция закрытия модального окна
   */
  onClose: () => void;
  /**
   * Функция создания сделки
   */
  onSubmit: (data: DealFormData) => Promise<void>;
}
