import UsersRepository from '../repositories/UsersRepository.js'
import UsersCreateService from '../services/Users/UsersCreateService.js'
import UsersDeleteService from '../services/Users/UsersDeleteService.js'
import UsersShowService from '../services/Users/UsersShowService.js'
import UsersUpdateService from '../services/Users/UsersUpdateService.js'

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()
    const usersCreateService = new UsersCreateService(usersRepository)

    await usersCreateService.execute({ name, email, password })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.user

    const usersRepository = new UsersRepository()
    const usersUpdateService = new UsersUpdateService(usersRepository)

    await usersUpdateService.execute({
      id,
      name,
      email,
      password,
      old_password
    })

    return response.status(200).json()
  }

  async show(request, response) {
    const { id } = request.user

    const usersRepository = new UsersRepository()
    const usersShowService = new UsersShowService(usersRepository)

    const userData = await usersShowService.execute(id)

    return response.json(userData)
  }

  async delete(request, response) {
    const { id } = request.user

    const usersRepository = new UsersRepository()
    const usersDeleteService = new UsersDeleteService(usersRepository)

    await usersDeleteService.execute(id)

    return response.json()
  }
}

export default UsersController
