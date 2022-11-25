import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config()

import { app } from './app'
import { ENV } from '@config/globals'

const bootstrap = async () => {
  console.log('Starting the server...')

  const { NODE_PORT, REDIS_HOST, REDIS_PORT } = ENV

  if (!NODE_PORT) {
    throw new Error('PORT must be defined')
  }

  if (!REDIS_HOST) {
    throw new Error('REDIS_HOST must be defined')
  }

  if (!REDIS_PORT) {
    throw new Error('REDIST_PORT must be defined')
  }

  const server = app.listen(NODE_PORT, () => {
    console.log(`Server is listening on PORT: ${NODE_PORT}`)
  })

  process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION! Shutting down...')
    console.log(err.name, err.message)
    server.close(() => {
      process.exit(1)
    })
  })
}

bootstrap()
