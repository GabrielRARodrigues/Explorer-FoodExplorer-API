import DishesRepository from '../repositories/DishesRepository.js'
import DishImageUpdateService from '../services/DishImage/DishImageUpdateService.js'

class DishImageController {
  async update(request, response) {
    const { id } = request.params
    const dishImageFile = request.file

    const dishesRepository = new DishesRepository()
    const dishImageUpdateService = new DishImageUpdateService(dishesRepository)

    const dish = await dishImageUpdateService.execute({
      id,
      dishImageFile
    })

    return response.json(dish)
  }
}

export default DishImageController
