import AppError from '../../utils/errors/AppError.js'

class UsersDeleteService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(id) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('O usuário não foi encontrado')
    }

    await this.userRepository.delete(id)
  }
}

export default UsersDeleteService
