import { authResolvers, authTypeDefs } from '@features/auth';

/**
 * Объединенные GraphQL схемы
 */
export const typeDefs = [
  authTypeDefs,
  // Добавляй другие схемы здесь
];

/**
 * Объединенные GraphQL резолверы
 */
export const resolvers = {
  Query: {
    ...authResolvers.Query,
    health: () => 'OK',
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
};
