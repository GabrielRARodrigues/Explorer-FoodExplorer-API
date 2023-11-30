import bcryptjs from 'bcryptjs'

import AppError from '../../utils/errors/AppError.js'
import { emailRegex } from '../../utils/validations/regex/email.js'
import { passwordRegex } from '../../utils/validations/regex/password.js'

const { hash } = bcryptjs

class UsersCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError(
        'Os campos de nome, email e senha precisam ser obrigatoriamente informados'
      )
    }

    if (!email.match(emailRegex)) {
      throw new AppError(
        'O e-mail não apresenta o formato esperado. Exemplo da estrutura de e-mail válido: exemplo@exemplo.com.br'
      )
    }

    const checkUserEmailAlreadyExists = await this.userRepository.findByEmail(
      email
    )

    if (checkUserEmailAlreadyExists) {
      throw new AppError('Este email já está em uso.')
    }

    if (!password.match(passwordRegex)) {
      throw new AppError(
        'A senha não apresenta o formato esperado. Uma senha deve conter pelo menos oito caracteres, um caractere maiúsculo, um caractere minusculo, um número e um caractere especial'
      )
    }

    const hashedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return userCreated
  }
}

export default UsersCreateService
