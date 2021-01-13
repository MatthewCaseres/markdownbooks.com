import { ApolloServer } from 'apollo-server-micro'
import { GraphQLDate } from 'graphql-iso-date'
import {
  asNexusMethod,
  intArg,
  list,
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
    t.nonNull.string('id')
    t.nonNull.boolean('completed')
    t.nonNull.int('flagged')
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
    t.field('problems', {
      type: nonNull(list(nonNull(Problem))),
      resolve: () => prisma.problem.findMany()
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field("completeProblem", {
      type: Problem,
      args: {
        id: nonNull(stringArg()),
      },
      resolve: (_, { id }) => {
        return prisma.problem.upsert({
          where: {
            id: id
          },
          update: {
            completed: true,
          },
          create: {
            completed: true,
            flagged: 0,
            id: id,
          },
        });
      },
    }),
    t.field("flagProblem", {
      type: Problem,
      args: {
        id: nonNull(stringArg()),
        flag: nonNull(intArg())
      },
      resolve: (_, {id, flag}) => {
        return prisma.problem.upsert({
          where: {
            id: id
          },
          update: {
            flagged: flag,
          },
          create: {
            completed: false,
            flagged: flag,
            id: id,
          },
        });
      }
    })
  }
})

export const schema = makeSchema({
  types: [Query, Mutation, GQLDate],
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