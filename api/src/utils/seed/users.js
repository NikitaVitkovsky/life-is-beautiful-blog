/* Helper file for testing or local dev
/* Generates 10 fake users */

import email from '@fakerjs/email'
import firstName from "@fakerjs/firstname"
import lastName from "@fakerjs/lastname"
import bcrypt from 'bcryptjs'

import gravatar from '../gravatar.js'

const seedUsers = async () => {
  console.log('Seeding users...')
  let users = []

  // generate 10 user profiles
  for (let i = 0; i < 10; i++) {
    let user = {
      username: (firstName() + ' ' + lastName()),
      password: await bcrypt.hash('password', 10),
      email: email()
    }
    user.avatar = gravatar(user.email)
    users.push(user)
  }
  return users
}

export default seedUsers
