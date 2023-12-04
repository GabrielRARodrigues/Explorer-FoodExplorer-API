import { Router } from 'express'

import UsersController from '../controllers/UsersController.js'
import validateAuthentication from '../middlewares/validateAuthentication.js'

const usersRoutes = Router()
const usersController = new UsersController()

usersRoutes.post('/', usersController.create)
usersRoutes.put('/', validateAuthentication, usersController.update)
usersRoutes.get('/', validateAuthentication, usersController.show)
usersRoutes.delete('/', validateAuthentication, usersController.delete)

export default usersRoutes
