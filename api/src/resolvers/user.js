export default {
    // Resolve the list of notes for a user when requested
    articles: async (user, args, {models}) => {
        return await models.Article.find({author: user._id}).sort({_id: -1})
    },
    // Resolve the list of favorites for a user when requested
    favorites: async (user, args, {models}) => {
        return await models.Article.find({favoritedBy: user._id}).sort({_id: -1})
    }
}