import {gql} from 'apollo-server-express'

export default gql`
    scalar DateTime

    type Article {
        id: ID!
        content: String!
        author: String!
        createdAt: DateTime!
        updatedAt: DateTime!
        favoriteCount: Int!
        favoritedBy: [User!]
    }
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        articles: [Article!]!
        favorites: [Article!]!
    }

    type Query {
        articles: [Article!]!
        article(id: ID!): Article!
        user(username: String!): User
        users: [User!]!
        me: User!
    }
    type Mutation {
        newArticle(content: String!): Article!
        updateArticle(id: ID!, content: String!): Article!
        deleteArticle(id: ID!): Boolean!
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        toggleFavorite(id: ID!): Article!
    }
`