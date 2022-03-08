import { buildSchema } from 'graphql'

export const typeDefs = buildSchema(/* GraphQL */ `
  directive @skipAuth on FIELD_DEFINITION

  type Query {
    hello: String!
    hi: String! @skipAuth
  }
`)
