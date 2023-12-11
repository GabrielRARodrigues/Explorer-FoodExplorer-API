import { Router } from 'express'

import UsersValidationController from '../controllers/UsersValidationController.js'
import validateAuthentication from '../middlewares/validateAuthentication.js'

const usersValidationRoutes = Router()
const usersValidationController = new UsersValidationController()

usersValidationRoutes.get(
  '/validation',
  validateAuthentication,
  usersValidationController.index
)

export default usersValidationRoutes
