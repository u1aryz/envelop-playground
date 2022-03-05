import { createServer } from '@graphql-yoga/node'

const server = createServer({
  schema: {
    typeDefs: `
      type Query {
        ping: String
      }
    `,
    resolvers: {
      Query: {
        ping: () => 'pong',
      },
    },
  },
})

// noinspection JSIgnoredPromiseFromCall
server.start()
