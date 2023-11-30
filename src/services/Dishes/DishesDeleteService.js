import AppError from '../../utils/errors/AppError.js'
import DiskStorage from '../../providers/DiskStorage.js'

class DishesDeleteService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute(id) {
    const dish = await this.dishesRepository.findById(id)

    if (!dish) {
      throw new AppError('O prato não foi encontrado')
    }

    const diskStorage = new DiskStorage()

    if (dish.dish_image) {
      await diskStorage.deleteFile(dish.dish_image)
    }

    await this.dishesRepository.delete(id)
  }
}

export default DishesDeleteService
