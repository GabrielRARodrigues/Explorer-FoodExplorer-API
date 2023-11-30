import IngredientsCreateService from './IngredientsCreateService.js'

class IngredientsUpdateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository
  }

  async execute({ ingredients, dish_id }) {
    if (ingredients?.length > 0) {
      await this.ingredientsRepository.deleteDishById(dish_id)

      const ingredientsCreateService = new IngredientsCreateService(
        this.ingredientsRepository
      )

      await ingredientsCreateService.execute({ ingredients, dish_id })
    }
  }
}
export default IngredientsUpdateService
