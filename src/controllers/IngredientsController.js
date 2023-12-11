import IngredientsRepository from '../repositories/IngredientsRepository.js'
import IngredientsIndexService from '../services/Ingredients/IngredientsIndexService.js'

class IngredientsController {
  async index(request, response) {
    const { dish_id } = request.query

    const ingredientsRepository = new IngredientsRepository()
    const ingredientsIndexService = new IngredientsIndexService(
      ingredientsRepository
    )

    const ingredients = await ingredientsIndexService.execute(dish_id)

    return response.json(ingredients)
  }
}

export default IngredientsController
