import { type FC } from 'react';

import { Button } from '@shared/ui/Button';
import { Text } from '@shared/ui/Text';

import { type DealCardProps } from '../../Deal.types';

import s from './DealCard.module.css';

const STATUS_LABELS = {
  new: 'Новая',
  in_progress: 'В работе',
  completed: 'Завершена',
  cancelled: 'Отменена',
} as const;

const STATUS_COLORS = {
  new: '#3b82f6',
  in_progress: '#f59e0b',
  completed: '#10b981',
  cancelled: '#ef4444',
} as const;

export const DealCard: FC<DealCardProps> = (props) => {
  const { deal, onEdit, onDelete, onStatusChange } = props;

  const handleEdit = () => {
    onEdit?.(deal);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту сделку?')) {
      onDelete?.(deal.id);
    }
  };

  const handleStatusChange = (status: typeof deal.status) => {
    onStatusChange?.(deal.id, status);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU');
  };

  return (
    <div className={s.card}>
      <div className={s.header}>
        <Text as="h3" className={s.title}>
          {deal.title}
        </Text>

        <div
          className={s.status}
          style={{ backgroundColor: STATUS_COLORS[deal.status] }}
        >
          {STATUS_LABELS[deal.status]}
        </div>
      </div>

      <div className={s.content}>
        <div className={s.field}>
          <Text className={s.label}>Клиент:</Text>
          <Text>{deal.clientName}</Text>
        </div>

        <div className={s.field}>
          <Text className={s.label}>Сумма:</Text>
          <Text className={s.amount}>{formatAmount(deal.amount)}</Text>
        </div>

        {deal.description && (
          <div className={s.field}>
            <Text className={s.label}>Описание:</Text>
            <Text className={s.description}>{deal.description}</Text>
          </div>
        )}

        <div className={s.field}>
          <Text className={s.label}>Создана:</Text>
          <Text className={s.date}>{formatDate(deal.createdAt)}</Text>
        </div>
      </div>

      <div className={s.actions}>
        <select
          value={deal.status}
          onChange={(e) =>
            handleStatusChange(e.target.value as typeof deal.status)
          }
          className={s.statusSelect}
        >
          <option value="new">Новая</option>
          <option value="in_progress">В работе</option>
          <option value="completed">Завершена</option>
          <option value="cancelled">Отменена</option>
        </select>

        <div className={s.buttons}>
          <Button variant="ghost" onClick={handleEdit}>
            Изменить
          </Button>
          <Button variant="ghost" onClick={handleDelete}>
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};
