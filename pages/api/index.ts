import { ApolloServer } from 'apollo-server-micro'
import { GraphQLDate } from 'graphql-iso-date'
import {
  asNexusMethod,
  makeSchema,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from 'nexus'
import path from 'path'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

const Problem = objectType({
  name: 'Problem',
  definition(t) {
    t.string('id')
    t.boolean('completed')
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('problem', {
      type: Problem,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.problem.findUnique({
          where: { id: args.id },
        })
      },
    }),
    t.field('hello', {
      type: 'String',
      resolve: () => 'helloss'
    }
    )
  },

})

export const schema = makeSchema({
  types: [Query, GQLDate],
  outputs: {
    typegen: path.join(process.cwd(), 'pages/api/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'pages/api/schema.graphql'),
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default new ApolloServer({ schema }).createHandler({
  path: '/api',
})