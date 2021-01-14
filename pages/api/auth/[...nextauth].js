import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { PrismaClient, Prisma } from '@prisma/client'
import Adapters from 'next-auth/adapters'

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

const providers = [
  Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
  })
]

const callbacks = {
  session: async (session, user) => {
    return Promise.resolve({...session, id: user.id})
  }
}


const options = {
providers,
callbacks,
adapter: Adapters.Prisma.Adapter({prisma})
}

export default (req, res) => NextAuth(req, res, options)