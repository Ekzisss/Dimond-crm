import { type FC } from 'react';

import { EditIcon, DeleteIcon } from '@shared/ui/icons';

import { type DealsBoardProps } from '../../DealsBoard.types';
import { useDealsBoard } from '../../model/useDealsBoard';
import { getDealPriority } from '../../lib/getDealPriority';

import s from './DealsBoard.module.css';

/**
 * Компонент канбан-доски для отображения сделок
 * @param props - Пропсы компонента
 * @returns JSX элемент
 */
export const DealsBoard: FC<DealsBoardProps> = (props) => {
  const {
    loading,
    error,
    columns,
    draggedDeal,
    dragOverColumn,
    handleEdit,
    handleDelete,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDealsBoard(props);

  if (loading) {
    return <div className={s.loading}>Загрузка сделок...</div>;
  }

  if (error) {
    return <div className={s.error}>{error}</div>;
  }

  return (
    <div
      className={s.board}
      onDragOver={(e) => {
        // Предотвращаем скроллинг страницы при перетаскивании
        e.preventDefault();
      }}
    >
      {columns.map((column) => (
        <div
          key={column.id}
          className={`${s.column} ${dragOverColumn === column.id ? s.dragOver : ''}`}
          onDragOver={(e) => {
            e.preventDefault();

            handleDragOver(column.id);
          }}
          onDragLeave={handleDragLeave}
          onDrop={(e) => {
            e.preventDefault();

            handleDrop(column.id);
          }}
        >
          <div
            className={s.columnHeader}
            style={{ borderBottomColor: column.color }}
          >
            <h2 className={s.columnTitle} style={{ color: column.color }}>
              {column.title}
            </h2>

            <span
              className={s.columnCount}
              style={{ backgroundColor: `${column.color}20` }}
            >
              {column.deals.length}
            </span>
          </div>

          <div className={s.dealsList}>
            {column.deals.map((deal) => {
              const priority = getDealPriority(deal.amount);
              const isDragging = draggedDeal?.id === deal.id;

              return (
                <div
                  key={deal.id}
                  className={`${s.dealCard} ${isDragging ? s.dragging : ''}`}
                  draggable
                  onDragStart={() => handleDragStart(deal)}
                  onDragEnd={handleDragEnd}
                >
                  <div className={s.dealHeader}>
                    <div
                      className={s.priorityIndicator}
                      style={{
                        backgroundColor:
                          priority === 'high'
                            ? '#ef4444'
                            : priority === 'medium'
                              ? '#f59e0b'
                              : '#10b981',
                      }}
                    />

                    <span className={s.dealId}>#{deal.id}</span>

                    <div className={s.dealActions}>
                      <button
                        type="button"
                        className={s.editButton}
                        onClick={() => handleEdit(deal)}
                        title="Редактировать"
                      >
                        <EditIcon size={16} />
                      </button>

                      <button
                        type="button"
                        className={s.deleteButton}
                        onClick={() => handleDelete(deal.id)}
                        title="Удалить"
                      >
                        <DeleteIcon size={16} />
                      </button>
                    </div>
                  </div>

                  <div className={s.dealTitle}>{deal.title}</div>

                  <div className={s.dealClient}>{deal.clientName}</div>

                  <div className={s.dealFooter}>
                    <div className={s.dealAmount}>
                      {deal.amount.toLocaleString('ru-RU')} ₽
                    </div>

                    <div className={s.dealDate}>
                      {new Date(deal.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
