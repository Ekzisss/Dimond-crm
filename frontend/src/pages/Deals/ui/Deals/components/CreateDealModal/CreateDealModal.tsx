import { type FC } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import { Button } from '@shared/ui/Button';
import { Input } from '@shared/ui/Input';
import { Text } from '@shared/ui/Text';

import {
  type CreateDealModalProps,
  type DealFormData,
} from './CreateDealModal.types';

import s from './CreateDealModal.module.css';

/**
 * Модальное окно создания сделки
 */
export const CreateDealModal: FC<CreateDealModalProps> = (props) => {
  const { isOpen, onClose, onSubmit } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DealFormData>();

  const handleFormSubmit: SubmitHandler<DealFormData> = async (data) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Error creating deal:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={s.overlay} onClick={handleClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.header}>
          <Text as="h2">Создать новую сделку</Text>
          <button type="button" className={s.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className={s.form}>
          <div className={s.field}>
            <label htmlFor="title" className={s.label}>
              Название сделки *
            </label>
            <Input
              id="title"
              {...register('title', { required: 'Название обязательно' })}
              placeholder="Например: Поставка оборудования"
              error={errors.title?.message}
            />
          </div>

          <div className={s.field}>
            <label htmlFor="clientName" className={s.label}>
              Клиент *
            </label>
            <Input
              id="clientName"
              {...register('clientName', { required: 'Клиент обязателен' })}
              placeholder="Например: ООО 'Техносервис'"
              error={errors.clientName?.message}
            />
          </div>

          <div className={s.field}>
            <label htmlFor="amount" className={s.label}>
              Сумма (₽) *
            </label>
            <Input
              id="amount"
              type="number"
              {...register('amount', {
                required: 'Сумма обязательна',
                min: { value: 1, message: 'Сумма должна быть больше 0' },
              })}
              placeholder="150000"
              error={errors.amount?.message}
            />
          </div>

          <div className={s.field}>
            <label htmlFor="description" className={s.label}>
              Описание
            </label>
            <textarea
              id="description"
              {...register('description')}
              className={s.textarea}
              placeholder="Дополнительная информация о сделке..."
              rows={3}
            />
          </div>

          <div className={s.actions}>
            <Button type="button" variant="ghost" onClick={handleClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Создание...' : 'Создать сделку'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
