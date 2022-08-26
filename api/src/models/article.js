import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
        content: {
            type: String, required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        // add the favoriteCount property
        favoriteCount: {
            type: Number,
            default: 0
        },
        // add the favoritedBy property
        favoritedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]

    },
    {
        // Assigns createdAt and updatedAt fields with a Date type
        timestamps: true
    })

const Article = mongoose.model('Article', articleSchema)

export default Article