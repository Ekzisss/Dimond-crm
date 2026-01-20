/**
 * Интерфейс сделки из API
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
 * Входные данные для создания сделки
 */
export interface CreateDealInput {
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
}

/**
 * Входные данные для обновления сделки
 */
export interface UpdateDealInput {
  /**
   * Уникальный идентификатор сделки
   */
  id: string;

  /**
   * Название сделки (опционально)
   */
  title?: string;

  /**
   * Имя клиента (опционально)
   */
  clientName?: string;

  /**
   * Сумма сделки в рублях (опционально)
   */
  amount?: number;

  /**
   * Описание сделки (опционально)
   */
  description?: string;

  /**
   * Статус сделки (опционально)
   */
  status?: Deal['status'];
}

export interface GetAllResponse {
  /**
   * Сделки.
   */
  deals: Deal[];
}

export interface GetByIdResponse {
  /**
   * Сделка.
   */
  deal: Deal;
}

export interface CreateResponse {
  /**
   * Создание сделки.
   */
  createDeal: Deal;
}

export interface UpdateResponse {
  /**
   * Обновление сделки.
   */
  updateDeal: Deal;
}

export interface DeleteResponse {
  /**
   * Удаление сделки.
   */
  deleteDeal: boolean;
}
