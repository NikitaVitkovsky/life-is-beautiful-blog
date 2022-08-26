import Query from './query.js'
import Mutation from './mutation.js'
import Article from "./article.js"
import User from "./user.js"
import pkg from 'graphql-iso-date'

const {GraphQLDateTime} = pkg

export default {
    Query,
    Mutation,
    Article,
    User,
    DateTime: GraphQLDateTime
}