import { createServer, EnvelopError, useLogger } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './api/graphql/typeDefs'
import { useGenericAuth } from '@envelop/generic-auth'

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
}

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefs],
})

const resolveUserFn = async (context: { request: { headers: Headers } }) => {
  const auth = context.request.headers.get('authorization')
  // TODO
  if (!auth) {
    throw new EnvelopError('requires authentication.', { code: 'NOT_AUTHENTICATED' })
  }
  return 'user'
}

const server = createServer({ schema, plugins: [useGenericAuth({ resolveUserFn, mode: 'protect-all' }), useLogger()] })

// noinspection JSIgnoredPromiseFromCall
server.start()
