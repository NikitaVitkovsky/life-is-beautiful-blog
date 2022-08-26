export default {
    article: async (parent, args, {models}) => {
        return await models.Article.findById(args.id)
    },
    articles: async (parent, args, {models}) => {
        return await models.Article.find().limit(100)
    },
    articleFeed: async (parent, {cursor}, {models}) => {
        // hardcode the limit to 10 items
        const limit = 10
        // set the default hasNextPage value to false
        let hasNextPage = false
        // if no cursor is passed the default query will be empty
        // this will pull the newest articles from the db
        let cursorQuery = {}
        // if there is a cursor
        // our query will look for articles with an ObjectId less than that of the cursor
        if (cursor) {
            cursorQuery = {_id: {$lt: cursor}}
        }
        // find the limit + 1 of articles in our db, sorted newest to oldest
        let articles = await models.Article.find(cursorQuery)
            .sort({_id: -1})
            .limit(limit + 1)
        // if the number of articles we find exceeds our limit
        // set hasNextPage to true and trim the articles to the limit
        if (articles.length > limit) {
            hasNextPage = true
            articles = articles.slice(0, -1)
        }
        // the new cursor will be the Mongo object ID of the last item in the feed array
        const newCursor = articles[articles.length - 1]._id

        return {
            articles,
            cursor: newCursor,
            hasNextPage
        }
    },
    user: async (parent, {username}, {models}) => {
        // find a user given their username
        return await models.User.findOne({username})
    },
    users: async (parent, args, {models}) => {
        // find all users
        return await models.User.find({})
    },
    me: async (parent, args, {models, user}) => {
        // find a user given the current user context
        return await models.User.findById(user.id)
    }
}