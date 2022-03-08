import { createServer, EnvelopError, useLogger } from '@graphql-yoga/node'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './api/graphql/typeDefs'
import { useGenericAuth, ValidateUserFn } from '@envelop/generic-auth'

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    hi: () => 'Hi',
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
    return null
  }
  return 'user'
}

const validateUser: ValidateUserFn<string> = ({ user, fieldAuthDirectiveNode, fieldAuthExtension }) => {
  if (!user && !fieldAuthDirectiveNode && !fieldAuthExtension) {
    // skipAuthがついていない && ユーザー取得不能
    throw new EnvelopError('requires authentication.', { code: 'NOT_AUTHENTICATED' })
  }
}

const server = createServer({
  schema,
  plugins: [useGenericAuth({ resolveUserFn, validateUser, mode: 'protect-all' }), useLogger()],
})

// noinspection JSIgnoredPromiseFromCall
server.start()
