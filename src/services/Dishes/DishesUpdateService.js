import AppError from '../../utils/errors/AppError.js'

import { categoryRegex } from '../../utils/validations/regex/category.js'
import { priceRegex } from '../../utils/validations/regex/price.js'

class DishesUpdateService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute({ id, name, description, price, category }) {
    const dish = await this.dishesRepository.findById(id)

    if (!dish) {
      throw new AppError('O prato não foi encontrado')
    }

    dish.name = name ? name : dish.name
    dish.description = description ? description : dish.description

    if (price) {
      if (!price.match(priceRegex)) {
        throw new AppError(
          'O preço informado é inválido. Informe um preço válido seguindo a seguinte estrutura: 25.00'
        )
      }

      if (Number(price) === 0) {
        throw new AppError('O preço de um prato não pode ser zero')
      }

      dish.price = price
    }

    if (category) {
      if (!category.match(categoryRegex)) {
        throw new AppError(
          'O campo de categoria precisa corresponder a uma das seguintes opções: Refeição, Sobremesa ou Bebida'
        )
      }

      dish.category = category
    }

    const dishId = await this.dishesRepository.update(dish)

    return dishId
  }
}

export default DishesUpdateService
