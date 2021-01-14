import { ApolloServer, AuthenticationError } from 'apollo-server-micro'
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
import {PrismaClient, Prisma} from '@prisma/client'
import { getSession } from 'next-auth/client'

let prisma: PrismaClient<Prisma.PrismaClientOptions, never>

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

export const GQLDate = asNexusMethod(GraphQLDate, 'date')

const Problem = objectType({
  name: 'Problem',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.int('userId')
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
      resolve: (_, {id}, {session}) => {
        return prisma.problem.findUnique({
          where: { userId_id: {id: id, userId: session.id} },
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
      resolve: (_, { id }, {session}) => {
        return prisma.problem.upsert({
          where: {
            userId_id: {id: id, userId: session.id}
          },
          update: {
            completed: true,
          },

          create: {
            user: {
              connect: {
                id: session.id
              }
            },
            completed: true,
            flagged: 0,
            id: id,
          }
        });
      },
    }),
    t.field("flagProblem", {
      type: Problem,
      args: {
        id: nonNull(stringArg()),
        flag: nonNull(intArg())
      },
      resolve: (_, {id, flag}, {session}) => {
        console.log({id: id, userId: session.id})
        console.log(session)
        return prisma.problem.upsert({
          where: {
            userId_id: {id: id, userId: session.id}
          },
          update: {
            flagged: flag,
          },
          create: {
            completed: false,
            flagged: flag,
            id: id,
            user: {
              connect: {
                id: session.id
              }
            },
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

const context = async ({ req }: {req: any}) => {
  const session = await getSession({ req });
  if (!session) {
    throw new AuthenticationError("you must be logged in");
  }
  return {session}
};

export default new ApolloServer({ schema, context }).createHandler({
  path: '/api',
})