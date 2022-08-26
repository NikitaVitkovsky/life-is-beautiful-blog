import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    AuthenticationError,
    ForbiddenError
} from 'apollo-server-express'
import mongoose from 'mongoose'

import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

import gravatar from '../utils/gravatar.js'

export default {
    newArticle: async (parent, args, {models, user}) => {
        // if there is no user on the context, throw an authentication error
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a article')
        }
        return await models.Article.create({
            content: args.content,
            // reference the author's mongo id
            author: mongoose.Types.ObjectId(user.id)
        })
    },
    deleteArticle: async (parent, {id}, {models, user}) => {
        // if not a user, throw an Authentication Error
        if (!user) {
            throw new AuthenticationError('You must be signed in to delete a article')
        }
        // find the article
        const article = await models.Article.findById(id)
        // if the article owner and current user don't match, throw a forbidden error
        if (article && String(article.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to delete the article")
        }
        try {
            // if everything checks out, remove the article
            await article.remove()
            return true
        } catch (err) {
            // if there's an error along the way, return false
            return false
        }
    },
    updateArticle: async (parent, {content, id}, {models, user}) => {
        // if not a user, throw an Authentication Error
        if (!user) {
            throw new AuthenticationError('You must be signed in to update a article')
        }
        // find the article
        const article = await models.Article.findById(id)
        // if the article owner and current user don't match, throw a forbidden error
        if (article && String(article.author) !== user.id) {
            throw new ForbiddenError("You don't have permissions to update the article")
        }
        // Update the article in the db and return the updated article
        return await models.Article.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        )
    },
    signUp: async (parent, {username, email, password}, {models}) => {
        // normalize email address
        email = email.trim().toLowerCase()
        // gen salt
        const salt = await bcrypt.genSalt(10)
        // hash the password
        const hashed = await bcrypt.hash(password, salt)
        // create the gravatar url
        const avatar = gravatar(email)
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
            // create and return the json web token
            return jwt.sign({id: user._id}, JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN,
            })
        } catch (err) {
            console.log(err)
            // if there's a problem creating the account, throw an error
            throw new Error('Error creating account')
        }
    },
    signIn: async (parent, {username, email, password}, {models}) => {
        if (email) {
            // normalize email address
            email = email.trim().toLowerCase()
        }
        const user = await models.User.findOne({
            $or: [{email}, {username}]
        })
        // if no user is found, throw an authentication error
        if (!user) {
            throw new AuthenticationError('Error signing in')
        }
        // if the passwords don't match, throw an authentication error
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) {
            throw new AuthenticationError('Error signing in')
        }
        // create and return the json web token
        return jwt.sign({id: user._id}, JWT_SECRET)
    },
    toggleFavorite: async (parent, {id}, {models, user}) => {
        // if no user context is passed, throw auth error
        if (!user) {
            throw new AuthenticationError()
        }
        // check to see if the user has already favorited the article
        let articleCheck = await models.Article.findById(id)
        const hasUser = articleCheck.favoritedBy.indexOf(user.id)
        // if the user exists in the list
        // pull them from the list and reduce the favoriteCount by 1
        if (hasUser >= 0) {
            return await models.Article.findByIdAndUpdate(id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    new: true
                }
            )
        } else {
            // if the user doesn't exist in the list
            // add them to the list and increment the favoriteCount by 1
            return await models.Article.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            )
        }
    },
}