import { useEffect, useState } from 'react';

import { dealsApi, type Deal } from '@shared/api/deals';

import {
  type DealsBoardProps,
  type Column,
  type DealStatus,
} from '../DealsBoard.types';
import { COLUMN_CONFIG } from '../lib/columnConfig';

/**
 * Хук для управления состоянием канбан-доски сделок
 * @param props - Пропсы компонента DealsBoard
 * @returns Объект с состоянием и функциями
 */
export const useDealsBoard = (props: DealsBoardProps) => {
  const { onEdit, onDelete, onStatusChange } = props;

  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedDeal, setDraggedDeal] = useState<Deal | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<DealStatus | null>(null);

  /**
   * Загружает сделки с сервера
   */
  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        const apiDeals = await dealsApi.getAll();
        setDeals(apiDeals);
      } catch (err) {
        setError('Ошибка загрузки сделок');
        console.error('Error loading deals:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, []);

  /**
   * Группирует сделки по статусам в колонки
   * @returns Массив колонок с сделками
   */
  const getColumns = (): Column[] => {
    const grouped = deals.reduce(
      (acc, deal) => {
        if (!acc[deal.status]) {
          acc[deal.status] = [];
        }
        acc[deal.status].push(deal);
        return acc;
      },
      {} as Record<DealStatus, Deal[]>
    );

    return Object.entries(COLUMN_CONFIG).map(([status, config]) => ({
      id: status as DealStatus,
      title: config.title,
      color: config.color,
      deals: grouped[status as DealStatus] || [],
    }));
  };

  /**
   * Обработчик редактирования сделки
   * @param deal - Сделка для редактирования
   */
  const handleEdit = (deal: Deal) => {
    onEdit?.(deal);
  };

  /**
   * Обработчик удаления сделки
   * @param dealId - ID сделки для удаления
   */
  const handleDelete = (dealId: string) => {
    onDelete?.(dealId);
  };

  /**
   * Обработчик начала перетаскивания сделки
   * @param deal - Перетаскиваемая сделка
   */
  const handleDragStart = (deal: Deal) => {
    setDraggedDeal(deal);
  };

  /**
   * Обработчик завершения перетаскивания
   */
  const handleDragEnd = () => {
    setDraggedDeal(null);
    setDragOverColumn(null);
  };

  /**
   * Обработчик наведения на колонку
   * @param status - Статус колонки
   */
  const handleDragOver = (status: DealStatus) => {
    if (draggedDeal && draggedDeal.status !== status) {
      setDragOverColumn(status);
    }
  };

  /**
   * Обработчик ухода с колонки
   */
  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  /**
   * Обработчик сброса сделки в колонку
   * @param status - Новый статус для сделки
   */
  const handleDrop = (status: DealStatus) => {
    if (draggedDeal && draggedDeal.status !== status) {
      onStatusChange?.(draggedDeal.id, status);
    }

    setDraggedDeal(null);
    setDragOverColumn(null);
  };

  return {
    deals,
    loading,
    error,
    columns: getColumns(),
    draggedDeal,
    dragOverColumn,
    handleEdit,
    handleDelete,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
