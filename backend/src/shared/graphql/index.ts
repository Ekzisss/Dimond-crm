import { authResolvers, authTypeDefs } from '@features/auth';
import { dealsResolvers, dealsTypeDefs } from '@features/deals';

/**
 * Объединенные GraphQL схемы
 */
export const typeDefs = [
  authTypeDefs,
  dealsTypeDefs,
];

/**
 * Объединенные GraphQL резолверы
 */
export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...dealsResolvers.Query,
    health: () => 'OK',
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...dealsResolvers.Mutation,
  },
};
