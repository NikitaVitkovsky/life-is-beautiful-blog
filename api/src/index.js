const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')

require('dotenv').config()

const PORT = process.env.APP_PORT || 4000

const typeDefs = gql`
    type Query {
        hello: String
    }
`
const resolvers = {
    Query: {
        hello: () => "Hello World"
    }
}

async function startExpressApolloServer() {

    // const { typeDefs } = require('./graphql/schemas/schema');
    // const { resolvers } = require('./graphql/resolvers/resolver');

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    
    server.applyMiddleware({ app, path: '/api/graphql' });

    await new Promise(resolve => app.listen({ port: PORT }, resolve))
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
    return { server, app }
}

startExpressApolloServer()