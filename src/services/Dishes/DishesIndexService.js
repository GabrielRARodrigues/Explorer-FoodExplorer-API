import AppError from '../../utils/errors/AppError.js'
import { categoryRegex } from '../../utils/validations/regex/category.js'

class DishesIndexService {
  constructor(dishesRepository) {
    this.dishesRepository = dishesRepository
  }

  async execute({ name, ingredients, category }) {
    let dishes = await this.dishesRepository.index()

    if (category) {
      if (!category.match(categoryRegex)) {
        throw new AppError(
          'O campo de categoria precisa corresponder a uma das seguintes opções: Refeição, Sobremesa ou Bebida'
        )
      }

      return (dishes = await this.dishesRepository.indexByCategory(category))
    }

    if (ingredients) {
      const filterIngredients = ingredients
        .split(',')
        .map(ingredients => ingredients.trim())

      if (filterIngredients.length < 1) {
        throw new AppError('Pelo manos um ingredient precisa ser informado')
      }

      dishes = await this.dishesRepository.indexByIngredients(filterIngredients)

      if (name) {
        dishes = await this.dishesRepository.indexByNameAndIngredients({
          name,
          ingredients: filterIngredients
        })
      }
    } else if (name) {
      dishes = await this.dishesRepository.indexByName(name)
    }

    return dishes
  }
}

export default DishesIndexService
