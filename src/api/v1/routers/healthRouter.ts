import express, { Router } from 'express'

import { check } from '@api/v1/controllers/healthController'

const healthRouter: Router = express.Router()

healthRouter.get('/check', check)

export { healthRouter }
