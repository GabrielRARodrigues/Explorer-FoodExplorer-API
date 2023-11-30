import AppError from '../../utils/errors/AppError.js'

class UsersShowService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(id) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('O usuário não foi encontrado')
    }

    delete user.id
    delete user.password

    return user
  }
}

export default UsersShowService
