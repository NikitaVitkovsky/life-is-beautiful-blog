/* Helper file for seeding user data during testing or local development */

import models from '../../models/index.js'
import seedUsers from './users.js'
import seedArticles from './articles.js'
import db from '../../db.js'
import env from 'dotenv'
env.config()

const DB_HOST = process.env.DB_HOST

const seed = async () => {
  console.log('Seeding data...')
  db.connect(DB_HOST)
  const users = await models.User.create(await seedUsers())
  const articles = await models.Article.create(await seedArticles(users))
  console.log('Data successfully seeded')
  console.log(articles)
  process.exit(0)
}

seed()

// module.exports = seed
