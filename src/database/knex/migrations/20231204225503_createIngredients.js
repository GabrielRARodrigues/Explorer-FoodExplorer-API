export const up = knex =>
  knex.schema.createTable('dishes_ingredients', table => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid())
    table.text('name').notNullable()
    table
      .integer('dish_id')
      .references('id')
      .inTable('dishes')
      .onDelete('CASCADE')
  })

export const down = knex => knex.schema.dropTable('dishes_ingredients')
