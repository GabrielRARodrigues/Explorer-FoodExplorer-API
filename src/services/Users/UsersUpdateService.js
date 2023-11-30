import bcryptjs from 'bcryptjs'

import AppError from '../../utils/errors/AppError.js'
import { emailRegex } from '../../utils/validations/regex/email.js'
import { passwordRegex } from '../../utils/validations/regex/password.js'

const { hash, compare } = bcryptjs

class UsersUpdateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ id, name, email, password, old_password }) {
    const user = await this.userRepository.findById(id)

    if (!user) {
      throw new AppError('O usuário não foi encontrado')
    }

    if (email) {
      if (!email.match(emailRegex)) {
        throw new AppError(
          'O e-mail não apresenta o formato esperado. Exemplo da estrutura de e-mail válido: exemplo@exemplo.com.br'
        )
      }

      const checkUserEmailAlreadyExists = await this.userRepository.findByEmail(
        email
      )
      if (
        checkUserEmailAlreadyExists &&
        checkUserEmailAlreadyExists.id !== user.id
      ) {
        throw new AppError('Este e-mail já está em uso.')
      }
    }

    user.name = name ? name : user.name
    user.email = email ? email : user.email

    if (password) {
      if (!password.match(passwordRegex)) {
        throw new AppError(
          'A senha não apresenta o formato esperado. Uma senha deve conter pelo menos oito caracteres, um caractere maiúsculo, um caractere minusculo, um número e um caractere especial'
        )
      }
    }

    if (password && !old_password) {
      throw new AppError(
        'Você precisa informar a senha atual para definir uma nova senha'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('A senha atual não confere')
      }

      user.password = await hash(password, 8)
    }

    const userUpdated = await this.userRepository.update({
      ...user,
      id
    })

    return userUpdated
  }
}

export default UsersUpdateService
