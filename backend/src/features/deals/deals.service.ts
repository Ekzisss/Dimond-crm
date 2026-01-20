import { dealDb, type CreateDealData, type UpdateDealData } from '@shared/database/deal.db';
import { type CreateDealArgs, type UpdateDealArgs } from './deals.types';

export const dealsService = {
  getAllDeals: () => {
    return dealDb.findAll().map((deal) => ({
      id: deal.id.toString(),
      title: deal.title,
      clientName: deal.client_name,
      amount: deal.amount,
      description: deal.description,
      status: deal.status,
      createdAt: deal.created_at,
      updatedAt: deal.updated_at,
    }));
  },

  getDealById: (id: number) => {
    const deal = dealDb.findById(id);

    if (!deal) {
      throw new Error('Deal not found');
    }

    return {
      id: deal.id.toString(),
      title: deal.title,
      clientName: deal.client_name,
      amount: deal.amount,
      description: deal.description,
      status: deal.status,
      createdAt: deal.created_at,
      updatedAt: deal.updated_at,
    };
  },

  createDeal: (args: CreateDealArgs) => {
    const dealData: CreateDealData = {
      title: args.title,
      client_name: args.clientName,
      amount: args.amount,
      description: args.description,
    };

    const deal = dealDb.create(dealData);

    return {
      id: deal.id.toString(),
      title: deal.title,
      clientName: deal.client_name,
      amount: deal.amount,
      description: deal.description,
      status: deal.status,
      createdAt: deal.created_at,
      updatedAt: deal.updated_at,
    };
  },

  updateDeal: (args: UpdateDealArgs) => {
    const updateData: UpdateDealData = {};

    if (args.title !== undefined) updateData.title = args.title;
    if (args.clientName !== undefined) updateData.client_name = args.clientName;
    if (args.amount !== undefined) updateData.amount = args.amount;
    if (args.description !== undefined) updateData.description = args.description;
    if (args.status !== undefined) updateData.status = args.status;

    const deal = dealDb.update(args.id, updateData);

    if (!deal) {
      throw new Error('Deal not found');
    }

    return {
      id: deal.id.toString(),
      title: deal.title,
      clientName: deal.client_name,
      amount: deal.amount,
      description: deal.description,
      status: deal.status,
      createdAt: deal.created_at,
      updatedAt: deal.updated_at,
    };
  },

  deleteDeal: (id: number) => {
    const success = dealDb.delete(id);

    if (!success) {
      throw new Error('Deal not found');
    }

    return true;
  },
};
