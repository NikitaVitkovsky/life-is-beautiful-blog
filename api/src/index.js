import express from 'express'
import {ApolloServer} from 'apollo-server-express'

import jwt from 'jsonwebtoken'

// secure deps
import helmet from 'helmet'
import cors from 'cors'

// limit deps
import depthLimit from 'graphql-depth-limit'
import {createComplexityLimitRule} from 'graphql-validation-complexity'

//environment variables
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.APP_PORT || 4000
const DB_HOST = process.env.DB_HOST
const JWT_SECRET = process.env.JWT_SECRET
const NODE_ENV = process.env.NODE_ENV

import db from './db.js'

import models from './models/index.js'
import resolvers from './resolvers/index.js'
import {default as typeDefs} from './schemas/mainSchema.js'

async function startExpressApolloServer() {
    // get the user info from a JWT
    const getUser = token => {
        if (token) {
            try {
                // return the user information from the token
                return jwt.verify(token, JWT_SECRET)
            } catch (err) {
                // if there's a problem with the token, throw an error
                throw new Error('Session invalid')
            }
        }
    }

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
        introspection: NODE_ENV !== 'production',
        context: async ({req}) => {
            // get the user token from the headers
            const token = req.headers.authorization || null
            // try to retrieve a user with the token
            const user = await getUser(token)
            // for now, let's log the user to the console:
            if (NODE_ENV !== 'production') {
                console.log(user)
            }
            // add the db models and the user to the context
            return {models, user}
        }
    })
    await server.start()

    const app = express()

    app.use(helmet())
    app.use(cors())

    // Connect to the database
    db.connect(DB_HOST)

    server.applyMiddleware({app, path: '/api/graphql'})

    await new Promise(resolve => app.listen({port: PORT}, resolve))
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
    return {server, app}
}

startExpressApolloServer()