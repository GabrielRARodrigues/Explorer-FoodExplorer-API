import UsersRepository from '../repositories/UsersRepository.js'
import UsersValidationService from '../services/Users/UsersValidationService.js'

class UsersValidationController {
  async index(request, response) {
    const { user } = request

    const usersRepository = new UsersRepository()
    const usersValidationService = new UsersValidationService(usersRepository)

    await usersValidationService.execute(user)

    response.status(200).json()
  }
}

export default UsersValidationController
