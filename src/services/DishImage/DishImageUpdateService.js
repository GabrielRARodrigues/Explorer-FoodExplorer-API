import DiskStorage from '../../providers/DiskStorage.js'
import AppError from '../../utils/errors/AppError.js'

class DishImageUpdateService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute({ id, dishImageFile }) {
    if (!dishImageFile) {
      throw new AppError(
        'Para adicionar uma imagem ao prato é necessário fornecer um arquivo de imagem'
      )
    }

    const dish = await this.dishesRepository.findById(id)

    if (!dish) {
      throw new AppError('O prato não foi encontrado')
    }

    const diskStorage = new DiskStorage()

    if (dish.dish_image) {
      await diskStorage.deleteFile(dish.dish_image)
    }

    const imageFilename = await diskStorage.saveFile(dishImageFile.filename)

    dish.dish_image = imageFilename

    await this.dishesRepository.update(dish)

    return dish
  }
}

export default DishImageUpdateService
