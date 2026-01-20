import { type FC, useState } from 'react';

import { withSidebar } from '@widgets/Sidebar';
import { Button } from '@shared/ui/Button';
import { Text } from '@shared/ui/Text';
import { dealsApi, type Deal } from '@shared/api/deals';
import { EditDealModal, type EditDealFormData } from '@features/EditDeal';

import { DealsBoard } from './components/DealsBoard';
import {
  CreateDealModal,
  type DealFormData,
} from './components/CreateDealModal';
import { type DealsProps } from './Deals.types';

import s from './Deals.module.css';

export const Deals: FC<DealsProps> = withSidebar(() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Deal | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateDeal = () => {
    setIsCreateModalOpen(true);
  };

  const handleDealSubmit = async (data: DealFormData) => {
    await dealsApi.create({
      ...data,
      amount:
        typeof data.amount === 'string' ? parseFloat(data.amount) : data.amount,
    });

    setRefreshKey((prev) => prev + 1);
  };

  const handleEditDeal = (deal: Deal) => {
    setEditingDeal(deal);
  };

  const handleEditSubmit = async (data: EditDealFormData) => {
    if (editingDeal) {
      await dealsApi.update({
        id: editingDeal.id,
        ...data,
        amount:
          typeof data.amount === 'string'
            ? parseFloat(data.amount)
            : data.amount,
      });

      setRefreshKey((prev) => prev + 1);
      setEditingDeal(null);
    }
  };

  const handleDeleteDeal = async (dealId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту сделку?')) {
      await dealsApi.delete(dealId);

      setRefreshKey((prev) => prev + 1);
    }
  };

  const handleStatusChange = async (dealId: string, status: Deal['status']) => {
    await dealsApi.update({
      id: dealId,
      status,
    });

    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className={s.layout}>
      <main className={s.content}>
        <div className={s.pageHeader}>
          <div className={s.pageTitle}>
            <Text as="h1">Сделки</Text>

            <Text as="p" className={s.pageSubtitle}>
              Управляйте своими сделками и отслеживайте их прогресс
            </Text>
          </div>

          <Button onClick={handleCreateDeal} className={s.createButton}>
            + Добавить сделку
          </Button>
        </div>

        <DealsBoard
          key={refreshKey}
          onEdit={handleEditDeal}
          onDelete={handleDeleteDeal}
          onStatusChange={handleStatusChange}
        />

        <CreateDealModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleDealSubmit}
        />

        <EditDealModal
          isOpen={!!editingDeal}
          deal={editingDeal}
          onClose={() => setEditingDeal(null)}
          onSubmit={handleEditSubmit}
        />
      </main>
    </div>
  );
});
