import AppError from '../../utils/errors/AppError.js'

import { categoryRegex } from '../../utils/validations/regex/category.js'
import { priceRegex } from '../../utils/validations/regex/price.js'

class DishesCreateService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute({ name, description, price, category }) {
    if (!name || !category || !price) {
      throw new AppError(
        'Os campos de nome, categoria e preço devem ser informados'
      )
    }

    if (!category.match(categoryRegex)) {
      throw new AppError(
        'O campo de categoria precisa corresponder a uma das seguintes opções: Refeição, Sobremesa ou Bebida'
      )
    }

    if (!price.match(priceRegex)) {
      throw new AppError(
        'O preço informado é inválido. Informe um preço válido seguindo a seguinte estrutura: 25.00'
      )
    }

    if (Number(price) === 0) {
      throw new AppError('O preço de um prato não pode ser zero')
    }

    const dishId = await this.dishesRepository.create({
      name,
      description,
      price,
      category
    })

    return dishId
  }
}

export default DishesCreateService
