export const dealsTypeDefs = `
  type Deal {
    id: ID!
    title: String!
    clientName: String!
    amount: Float!
    description: String
    status: DealStatus!
    createdAt: String!
    updatedAt: String!
  }

  enum DealStatus {
    new
    in_progress
    completed
    cancelled
  }

  input CreateDealInput {
    title: String!
    clientName: String!
    amount: Float!
    description: String
  }

  input UpdateDealInput {
    id: ID!
    title: String
    clientName: String
    amount: Float
    description: String
    status: DealStatus
  }

  extend type Query {
    deals: [Deal!]!
    deal(id: ID!): Deal
  }

  extend type Mutation {
    createDeal(input: CreateDealInput!): Deal!
    updateDeal(input: UpdateDealInput!): Deal!
    deleteDeal(id: ID!): Boolean!
  }
`;