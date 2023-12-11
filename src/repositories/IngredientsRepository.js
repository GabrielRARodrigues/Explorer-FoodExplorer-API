import knex from '../database/knex/index.js'

class IngredientsRepository {
  async findByName(name) {
    const ingredient = await knex('dishes_ingredients').whereLike(
      'name',
      `%${name}%`
    )

    return ingredient
  }

  async findById(id) {
    const ingredient = await knex('dishes_ingredients').where({ id })

    return ingredient
  }

  async findByDishId(id) {
    const ingredients = await knex('dishes_ingredients')
      .where({ dish_id: id })
      .orderBy('name')

    return ingredients
  }

  async create({ name, dish_id }) {
    const [ingredientId] = await knex('dishes_ingredients').insert(
      { name, dish_id },
      ['id']
    )

    return ingredientId
  }

  async index() {
    const ingredients = await knex('dishes_ingredients')
      .orderBy('name')
      .groupBy('name')

    return ingredients
  }

  async delete(id) {
    await knex('dishes_ingredients').where({ id }).delete()
  }

  async deleteDishById(id) {
    await knex('dishes_ingredients').where({ dish_id: id }).delete()
  }
}

export default IngredientsRepository
