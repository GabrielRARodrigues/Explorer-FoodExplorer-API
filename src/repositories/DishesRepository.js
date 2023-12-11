import knex from '../database/knex/index.js'

class DishesRepository {
  async findByName(name) {
    const dish = await knex('dishes').whereLike('name', `%${name}%`).first()

    return dish
  }

  async findById(id) {
    const dish = await knex('dishes').where({ id }).first()

    return dish
  }

  async create({ name, description, price, category }) {
    const [dish_id] = await knex('dishes').insert(
      {
        name,
        description,
        price,
        category,
        created_at: new Date(),
        updated_at: new Date()
      },
      ['id']
    )

    return dish_id
  }

  async update({ id, dish_image, name, description, price, category }) {
    const [dish_id] = await knex('dishes').where({ id }).update(
      {
        dish_image,
        name,
        description,
        price,
        category,
        updated_at: new Date()
      },
      ['id']
    )

    return dish_id
  }

  async index() {
    const dishes = await knex('dishes').orderBy('name')

    return dishes
  }

  async indexByName(name) {
    const dishes = await knex('dishes')
      .whereLike('name', `%${name}%`)
      .groupBy('name')
      .orderBy('name')

    return dishes
  }

  async indexByIngredients(ingredients) {
    const dishes = await knex('dishes_ingredients')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.price',
        'dishes.category',
        'dishes.dish_image'
      ])
      .whereIn('dishes_ingredients.name', ingredients)
      .innerJoin('dishes', 'dishes.id', 'dishes_ingredients.dish_id')
      .groupBy('dishes.id')
      .orderBy('dishes.name')

    return dishes
  }

  async indexByNameAndIngredients({ name, ingredients }) {
    const dishes = await knex('dishes_ingredients')
      .select([
        'dishes.id',
        'dishes.name',
        'dishes.description',
        'dishes.price',
        'dishes.category',
        'dishes.dish_image'
      ])
      .whereLike('dishes.name', `%${name}%`)
      .whereIn('dishes_ingredients.name', ingredients)
      .innerJoin('dishes', 'dishes.id', 'dishes_ingredients.dish_id')
      .groupBy('dishes.id')
      .orderBy('dishes.name')

    return dishes
  }

  async indexByCategory(category) {
    const dishes = await knex('dishes')
      .where({ category })
      .groupBy('name')
      .orderBy('name')

    return dishes
  }

  async delete(id) {
    await knex('dishes').where({ id }).delete()
  }
}

export default DishesRepository
