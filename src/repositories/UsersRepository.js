import knex from '../database/knex/index.js'

class UsersRepository {
  async findByEmail(email) {
    const user = await knex('users').where({ email }).first()

    return user
  }

  async findById(id) {
    const user = await knex('users').where({ id }).first()

    return user
  }

  async create({ name, email, password }) {
    const [userId] = await knex('users').insert(
      {
        name,
        email,
        password,
        created_at: new Date(),
        updated_at: new Date()
      },
      ['id']
    )

    return userId
  }

  async update({ id, name, email, password }) {
    const [userId] = await knex('users').where({ id }).update(
      {
        name,
        email,
        password,
        updated_at: new Date()
      },
      ['id']
    )

    return userId
  }

  async delete(id) {
    await knex('users').where({ id }).delete()
  }
}

export default UsersRepository
