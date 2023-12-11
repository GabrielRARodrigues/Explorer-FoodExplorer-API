export const up = knex =>
  knex.schema.createTable('dishes', table => {
    table.increments('id')
    table.text('dish_image')
    table.text('name').notNullable()
    table
      .enum('category', ['Refeição', 'Sobremesa', 'Bebida'], {
        useNative: true,
        enumName: 'categories'
      })
      .notNullable()
      .default('Refeição')
    table.text('description')
    table.text('price').notNullable()
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  })

export const down = knex => knex.schema.dropTable('dishes')
