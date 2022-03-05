import { createServer, useLogger } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './api/graphql/typeDefs'

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
}

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
})

const server = createServer({ schema, plugins: [useLogger()] })

// noinspection JSIgnoredPromiseFromCall
server.start()
