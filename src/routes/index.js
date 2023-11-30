import { Router } from 'express'

import usersRoutes from './users.routes.js'
import usersValidationRoutes from './usersValidation.routes.js'
import cookiesRoutes from './cookies.routes.js'
import sessionsRoutes from './sessions.routes.js'
import dishesRoutes from './dishes.routes.js'
import dishImageRoutes from './dishImage.routes.js'
import ingredientsRoutes from './ingredients.routes.js'

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/users', usersValidationRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/cookies', cookiesRoutes)
routes.use('/dishes', dishesRoutes)
routes.use('/dishes', dishImageRoutes)
routes.use('/ingredients', ingredientsRoutes)

export default routes
