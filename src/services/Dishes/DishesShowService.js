import AppError from '../../utils/errors/AppError.js'

class DishesShowService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute(id) {
    const dish = await this.dishesRepository.findById(id)

    if (!dish) {
      throw new AppError('O prato não foi encontrado')
    }

    return dish
  }
}

export default DishesShowService
