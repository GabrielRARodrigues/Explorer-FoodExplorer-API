import UsersRepository from '../repositories/UsersRepository.js'
import SessionsCreateService from '../services/Sessions/SessionsCreateService.js'

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body

    const userRepository = new UsersRepository()
    const sessionsCreateService = new SessionsCreateService(userRepository)

    const { user, token } = await sessionsCreateService.execute({
      email,
      password
    })

    response.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 15 * 60 * 1000
    })

    return response.status(201).json(user)
  }
}

export default SessionsController
