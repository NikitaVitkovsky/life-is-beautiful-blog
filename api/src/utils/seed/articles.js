/* Helper file for testing or local dev
/* Generates 25 fake articles */

import paragraph from '@fakerjs/paragraph'
import mongoose from 'mongoose'

const seedArticles = async users => {
  console.log('Seeding articles...')
  let articles = []

  // generate articles
  for (let i = 0; i < 45; i++) {
    // pick a random user from the array
    const random = [Math.floor(Math.random() * users.length)]

    const title = paragraph({sentences: 1, wordsMin: 4, wordsMax: 12})
    const description = paragraph({sentences: 5, wordsMin: 4, wordsMax: 20})
    const content = paragraph({sentences: 30, wordsMin: 8, wordsMax: 25})

    const article = {
      title,
      description,
      content,
      favoriteCount: 0,
      favoritedBy: [],
      author: mongoose.Types.ObjectId(users[random]._id)
    }
    articles.push(article)
  }
  return articles
}

export default seedArticles
