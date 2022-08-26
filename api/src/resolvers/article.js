export default {
    author: async (article, args, {models}) => {
        return await models.User.findById(article.author);
    },
    // Resolved the favoritedBy info for a note when requested
    favoritedBy: async (article, args, {models}) => {
        return await models.User.find({_id: {$in: article.favoritedBy}});
    }
}