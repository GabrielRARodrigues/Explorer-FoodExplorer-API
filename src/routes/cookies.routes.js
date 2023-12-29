import { Router } from 'express'

import CookiesController from '../controllers/CookiesController.js'
import validateAuthentication from '../middlewares/validateAuthentication.js'

const cookiesRoutes = Router()
const cookiesController = new CookiesController()

cookiesRoutes.delete(
  '/:cookie_name',
  validateAuthentication,
  cookiesController.delete
)

export default cookiesRoutes
