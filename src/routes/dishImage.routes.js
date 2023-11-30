import { Router } from 'express'

import multer from 'multer'

import DishImageController from '../controllers/DishImageController.js'
import validateAuthentication from '../middlewares/validateAuthentication.js'
import verifyUserAuthorization from '../middlewares/verifyUserAuthorization.js'
import uploadConfig from '../configs/upload.config.js'

const upload = multer(uploadConfig.MULTER)

const dishImageController = new DishImageController()
const dishImageRoutes = Router()

dishImageRoutes.patch(
  '/image/:id',
  validateAuthentication,
  verifyUserAuthorization(['admin']),
  upload.single('dish_image'),
  dishImageController.update
)

export default dishImageRoutes
