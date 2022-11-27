import { PrismaClient, User } from '@prisma/client'

import { PrismaError } from '@errors/.'

const prisma = new PrismaClient()

export async function create(payload: User) {
  const { name, email } = payload

  try {
    console.log('Creating new user...')

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    })

    console.log(`New user with id ${newUser.id} created.`)

    return newUser
  } catch (err) {
    console.error(err)

    throw new PrismaError(err)
  }
}
