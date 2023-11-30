import bcryptjs from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

import AppError from '../../utils/errors/AppError.js'
import authConfig from '../../configs/auth.config.js'
import { emailRegex } from '../../utils/validations/regex/email.js'
import { passwordRegex } from '../../utils/validations/regex/password.js'

const { compare } = bcryptjs
const { sign } = jsonwebtoken

class SessionsCreateService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError('O e-mail e a senha dever ser informados', 401)
    }

    if (!email.match(emailRegex)) {
      throw new AppError(
        'O e-mail não apresenta o formato esperado. Exemplo da estrutura de e-mail válido: exemplo@exemplo.com.br'
      )
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    if (!password.match(passwordRegex)) {
      throw new AppError(
        'A senha não apresenta o formato esperado. Uma senha deve conter pelo menos oito caracteres, um caractere maiúsculo, um caractere minusculo, um número e um caractere especial'
      )
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign(
      {
        role: user.role
      },
      secret,
      {
        subject: String(user.id),
        expiresIn
      }
    )

    delete user.id
    delete user.password

    return { user, token }
  }
}

export default SessionsCreateService
