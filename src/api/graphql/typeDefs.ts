import { buildSchema } from 'graphql'

export const typeDefs = buildSchema(/* GraphQL */ `
  type Query {
    hello: String!
  }
`)
