import 'express-async-errors'
import express from 'express'
import { json } from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { NotFoundError } from '@errors/NotFoundError'

import { errorHandler } from '@middlewares/errorHandler'

import { healthRouter } from '@api/v1/routers/healthRouter'
import { usersRouter } from '@api/v1/routers/usersRouter'
import { tasksRouter } from '@api/v1/routers/tasksRouter'

const app = express()

app.use(cors())
app.use(json())

app.use(morgan('dev'))

app.use('/api/v1/tasks', tasksRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/health', healthRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
