import { dealsService } from './deals.service';
import { type CreateDealArgs, type UpdateDealArgs, type DeleteDealArgs } from './deals.types';

export const dealsResolvers = {
  Query: {
    deals: () => {
      return dealsService.getAllDeals();
    },

    deal: (_parent: unknown, args: { id: string }) => {
      return dealsService.getDealById(parseInt(args.id));
    },
  },

  Mutation: {
    createDeal: (_parent: unknown, args: { input: CreateDealArgs }) => {
      return dealsService.createDeal(args.input);
    },

    updateDeal: (_parent: unknown, args: { input: UpdateDealArgs }) => {
      return dealsService.updateDeal(args.input);
    },

    deleteDeal: (_parent: unknown, args: DeleteDealArgs) => {
      return dealsService.deleteDeal(parseInt(args.id.toString()));
    },
  },
};
