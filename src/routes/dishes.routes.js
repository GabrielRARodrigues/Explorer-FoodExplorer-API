import { Router } from 'express'

import DishesController from '../controllers/DishesController.js'
import validateAuthentication from '../middlewares/validateAuthentication.js'
import verifyUserAuthorization from '../middlewares/verifyUserAuthorization.js'

const dishesRoutes = Router()
const dishesController = new DishesController()

dishesRoutes.post(
  '/',
  validateAuthentication,
  verifyUserAuthorization(['admin']),
  dishesController.create
)
dishesRoutes.put(
  '/:id',
  validateAuthentication,
  verifyUserAuthorization(['admin']),
  dishesController.update
)
dishesRoutes.get(
  '/:id',
  validateAuthentication,
  dishesController.show.bind(dishesController)
)
dishesRoutes.get('/', validateAuthentication, dishesController.index)
dishesRoutes.delete(
  '/:id',
  validateAuthentication,
  verifyUserAuthorization(['admin']),
  dishesController.delete
)

export default dishesRoutes
