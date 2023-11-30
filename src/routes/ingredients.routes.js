import { Router } from 'express'

import IngredientsController from '../controllers/IngredientsController.js'
import validateAuthentication from '../middlewares/validateAuthentication.js'

const ingredientsController = new IngredientsController()
const ingredientsRoutes = Router()

ingredientsRoutes.get('/', validateAuthentication, ingredientsController.index)

export default ingredientsRoutes
