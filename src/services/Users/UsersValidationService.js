import AppError from '../../utils/errors/AppError.js'

class UsersValidationService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(user) {
    const userExists = await this.userRepository.findById(user.id)

    if (!userExists) {
      throw new AppError('Não autorizado', 401)
    }

    return userExists
  }
}

export default UsersValidationService
