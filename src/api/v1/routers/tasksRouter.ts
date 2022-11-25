import express, { Router } from 'express'

import { createTask } from '@controllers/tasksController'
import { createTaskValidator } from '@validators/tasksValidator'
import { validateRequest } from '@middlewares/requestValidator'

const tasksRouter: Router = express.Router()

tasksRouter.post('/', createTaskValidator, validateRequest, createTask)

export { tasksRouter }
