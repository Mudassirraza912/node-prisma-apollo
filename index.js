// index.js

const { ApolloServer } = require('apollo-server')
const { readFileSync } = require('fs')
const path = require('path')
const { prisma } = require("./src/database");


const resolvers = {
    Query: {
      getAllAnimals: async (parent, args, context) => {
        return context.prisma.animal.findMany()
      }
    }
  }

  const server = new ApolloServer({
    typeDefs: readFileSync(
      path.join(__dirname, './src/schema/schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: {
      prisma,
    }
  })

server
  .listen()
  .then(({ url }) => 
    console.log(`Server is running on ${url}`)
  )


//   node-prisma-apollo-backend:
//   working_dir: /Users/mudassirraza/Desktop/Projects/node-prisma-apollo-backend
//   restart: always
//   build:
//     context: .
//   volumes:
//     - .:/app:delegated
//   command: yarn dev
//   ports:
//     - 4000:4000
