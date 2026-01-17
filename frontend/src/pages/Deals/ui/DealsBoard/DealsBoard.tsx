import { type FC } from 'react';

import { type DealsBoardProps, type Column } from './DealsBoard.types';

import s from './DealsBoard.module.css';

const MOCK_COLUMNS: Column[] = [
  {
    id: 'new',
    title: 'Новые',
    deals: [
      { id: '1', title: 'Поставка оборудования', amount: 150000, status: 'new', clientName: 'ООО "Техносервис"' },
      { id: '2', title: 'Консультация по CRM', amount: 50000, status: 'new', clientName: 'ИП Иванов' },
    ],
  },
  {
    id: 'in-progress',
    title: 'В работе',
    deals: [
      { id: '3', title: 'Разработка сайта', amount: 300000, status: 'in-progress', clientName: 'ООО "Веб Студия"' },
    ],
  },
  {
    id: 'negotiation',
    title: 'Переговоры',
    deals: [
      { id: '4', title: 'Внедрение ERP', amount: 500000, status: 'negotiation', clientName: 'ЗАО "Производство"' },
      { id: '5', title: 'Обучение персонала', amount: 80000, status: 'negotiation', clientName: 'ООО "Кадры"' },
    ],
  },
  {
    id: 'closed',
    title: 'Закрытые',
    deals: [
      { id: '6', title: 'Поставка ПО', amount: 200000, status: 'closed', clientName: 'ООО "Софт"' },
    ],
  },
];

export const DealsBoard: FC<DealsBoardProps> = () => {
  return (
    <div className={s.board}>
      {MOCK_COLUMNS.map((column) => (
        <div key={column.id} className={s.column}>
          <div className={s.columnHeader}>
            <h2 className={s.columnTitle}>{column.title}</h2>
            <span className={s.columnCount}>{column.deals.length}</span>
          </div>

          <div className={s.dealsList}>
            {column.deals.map((deal) => (
              <div key={deal.id} className={s.dealCard}>
                <div className={s.dealTitle}>{deal.title}</div>
                <div className={s.dealClient}>{deal.clientName}</div>
                <div className={s.dealAmount}>{deal.amount.toLocaleString('ru-RU')} ₽</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
