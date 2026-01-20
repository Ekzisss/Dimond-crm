import { gql } from '@apollo/client';

import { apolloClient } from '../apollo';

import type {
  CreateDealInput,
  CreateResponse,
  Deal,
  DeleteResponse,
  GetAllResponse,
  GetByIdResponse,
  UpdateDealInput,
  UpdateResponse,
} from './deals.types';

/**
 * Внутренний клиент для выполнения GraphQL запросов
 */
const graphqlClient = {
  /**
   * Выполнить GraphQL запрос
   * @param query - GraphQL запрос или мутация
   * @param variables - Переменные запроса
   * @returns Promise с результатом запроса
   */
  request: async <T>(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<T> => {
    const isMutation = query.trim().startsWith('mutation');
    const operation = isMutation
      ? apolloClient.mutate({ mutation: gql(query), variables })
      : apolloClient.query({
          query: gql(query),
          variables,
          fetchPolicy: 'network-only',
        });

    const result = await operation;
    return result.data as T;
  },
};

/**
 * GraphQL запрос для получения всех сделок
 */
const GET_DEALS = `
  query GetDeals {
    deals {
      id
      title
      clientName
      amount
      description
      status
      createdAt
      updatedAt
    }
  }
`;

/**
 * GraphQL запрос для получения сделки по ID
 */
const GET_DEAL = `
  query GetDeal($id: ID!) {
    deal(id: $id) {
      id
      title
      clientName
      amount
      description
      status
      createdAt
      updatedAt
    }
  }
`;

/**
 * GraphQL мутация для создания новой сделки
 */
const CREATE_DEAL = `
  mutation CreateDeal($input: CreateDealInput!) {
    createDeal(input: $input) {
      id
      title
      clientName
      amount
      description
      status
      createdAt
      updatedAt
    }
  }
`;

/**
 * GraphQL мутация для обновления сделки
 */
const UPDATE_DEAL = `
  mutation UpdateDeal($input: UpdateDealInput!) {
    updateDeal(input: $input) {
      id
      title
      clientName
      amount
      description
      status
      createdAt
      updatedAt
    }
  }
`;

/**
 * GraphQL мутация для удаления сделки
 */
const DELETE_DEAL = `
  mutation DeleteDeal($id: ID!) {
    deleteDeal(id: $id)
  }
`;

/**
 * API для работы со сделками
 */
export const dealsApi = {
  /**
   * Получить все сделки
   * @returns Promise с массивом сделок
   */
  getAll: async (): Promise<Deal[]> => {
    const response = await graphqlClient.request<GetAllResponse>(GET_DEALS);
    return response.deals;
  },

  /**
   * Получить сделку по ID
   * @param id - Уникальный идентификатор сделки
   * @returns Promise со сделкой
   */
  getById: async (id: string): Promise<Deal> => {
    const response = await graphqlClient.request<GetByIdResponse>(GET_DEAL, {
      id,
    });

    return response.deal;
  },

  /**
   * Создать новую сделку
   * @param input - Данные для создания сделки
   * @returns Promise с созданной сделкой
   */
  create: async (input: CreateDealInput): Promise<Deal> => {
    const response = await graphqlClient.request<CreateResponse>(CREATE_DEAL, {
      input,
    });

    return response.createDeal;
  },

  /**
   * Обновить существующую сделку
   * @param input - Данные для обновления сделки
   * @returns Promise с обновленной сделкой
   */
  update: async (input: UpdateDealInput): Promise<Deal> => {
    const response = await graphqlClient.request<UpdateResponse>(UPDATE_DEAL, {
      input,
    });

    return response.updateDeal;
  },

  /**
   * Удалить сделку по ID
   * @param id - Уникальный идентификатор сделки
   * @returns Promise с результатом удаления
   */
  delete: async (id: string): Promise<boolean> => {
    const response = await graphqlClient.request<DeleteResponse>(DELETE_DEAL, {
      id,
    });

    return response.deleteDeal;
  },
};
