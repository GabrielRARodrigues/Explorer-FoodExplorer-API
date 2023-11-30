import jsonwebtoken from 'jsonwebtoken'

import authConfig from '../configs/auth.config.js'
import AppError from '../utils/errors/AppError.js'

const { verify } = jsonwebtoken
const { secret } = authConfig.jwt

function validateAuthentication(request, response, next) {
  const authenticationHeader = request.headers

  if (!authenticationHeader.cookie) {
    throw new AppError('Token de autenticação não informado', 401)
  }

  const [, token] = authenticationHeader.cookie.split('token=')

  try {
    const { role, sub: user_id } = verify(token, secret)

    request.user = {
      id: String(user_id),
      role
    }

    return next()
  } catch {
    throw new AppError('Token de autenticação inválido', 401)
  }
}

export default validateAuthentication
