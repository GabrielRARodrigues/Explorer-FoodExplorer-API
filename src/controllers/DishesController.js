import DishesRepository from '../repositories/DishesRepository.js'
import DishesCreateService from '../services/Dishes/DishesCreateService.js'
import DishesUpdateService from '../services/Dishes/DishesUpdateService.js'
import DishesShowService from '../services/Dishes/DishesShowService.js'
import DishesIndexService from '../services/Dishes/DishesIndexService.js'
import DishesDeleteService from '../services/Dishes/DishesDeleteService.js'

import IngredientsRepository from '../repositories/IngredientsRepository.js'
import IngredientsCreateService from '../services/Ingredients/IngredientsCreateService.js'
import IngredientsUpdateService from '../services/Ingredients/IngredientsUpdateService.js'
import IngredientsIndexService from '../services/Ingredients/IngredientsIndexService.js'

class DishesController {
  async create(request, response) {
    const { name, price, category, description, ingredients } = request.body

    const dishesRepository = new DishesRepository()
    const dishesCreateService = new DishesCreateService(dishesRepository)

    const dishId = await dishesCreateService.execute({
      name,
      description,
      price,
      category
    })

    const { id } = dishId

    const ingredientsRepository = new IngredientsRepository()
    const ingredientsCreateService = new IngredientsCreateService(
      ingredientsRepository
    )

    ingredientsCreateService.execute({ ingredients, dish_id: id })

    response.status(201).json(dishId)
  }

  async update(request, response) {
    const { name, price, category, description, ingredients } = request.body
    const { id } = request.params

    const dishesRepository = new DishesRepository()
    const dishesUpdateService = new DishesUpdateService(dishesRepository)

    await dishesUpdateService.execute({
      id,
      name,
      description,
      price,
      category
    })

    const ingredientsRepository = new IngredientsRepository()
    const ingredientsUpdateService = new IngredientsUpdateService(
      ingredientsRepository
    )

    await ingredientsUpdateService.execute({ dish_id: id, ingredients })

    return response.status(200).json()
  }

  async show(request, response) {
    const { id } = request.params

    const dishesRepository = new DishesRepository()
    const dishesShowService = new DishesShowService(dishesRepository)

    const dish = await dishesShowService.execute(id)

    const ingredientsRepository = new IngredientsRepository()
    const ingredientsIndexService = new IngredientsIndexService(
      ingredientsRepository
    )

    const ingredients = await ingredientsIndexService.execute(id)

    return response.json({
      ...dish,
      ingredients
    })
  }

  async index(request, response) {
    const { name, ingredients, category } = request.query

    const dishesRepository = new DishesRepository()
    const dishesIndexService = new DishesIndexService(dishesRepository)

    const dishes = await dishesIndexService.execute({
      name,
      ingredients,
      category
    })

    const ingredientsRepository = new IngredientsRepository()
    const ingredientsIndexService = new IngredientsIndexService(
      ingredientsRepository
    )

    const dishesWithIngredients = await Promise.all(
      dishes.map(async dish => ({
        ...dish,
        ingredients: await ingredientsIndexService.execute(dish.id)
      }))
    )

    return response.json(dishesWithIngredients)
  }

  async delete(request, response) {
    const { id } = request.params

    const dishesRepository = new DishesRepository()
    const dishesDeleteService = new DishesDeleteService(dishesRepository)

    await dishesDeleteService.execute(id)

    return response.json()
  }
}

export default DishesController
