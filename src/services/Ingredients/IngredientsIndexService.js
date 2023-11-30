class IngredientsIndexService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository
  }

  async execute(dish_id) {
    let ingredients = await this.ingredientsRepository.index()

    if (dish_id) {
      ingredients = await this.ingredientsRepository.findByDishId(dish_id)
    }

    return ingredients
  }
}
export default IngredientsIndexService
