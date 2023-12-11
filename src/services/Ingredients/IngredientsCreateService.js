class IngredientsCreateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository
  }

  async execute({ ingredients, dish_id }) {
    if (ingredients?.length > 0) {
      const ingredientsToInsert = ingredients.map(name => ({
        name,
        dish_id
      }))

      ingredientsToInsert.forEach(async ingredient => {
        await this.ingredientsRepository.create(ingredient)
      })
    }
  }
}
export default IngredientsCreateService
