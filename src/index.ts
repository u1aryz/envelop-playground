import { createServer, useLogger } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'

const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
}

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
})

const server = createServer({ schema, plugins: [useLogger()] })

// noinspection JSIgnoredPromiseFromCall
server.start()
