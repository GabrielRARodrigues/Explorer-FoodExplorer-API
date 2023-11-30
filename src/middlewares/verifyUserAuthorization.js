import AppError from '../utils/errors/AppError.js'

function verifyUserAuthorization(rolesToVerify) {
  return (request, response, next) => {
    const { role } = request.user

    if (!rolesToVerify.includes(role)) {
      throw new AppError('Acesso não autorizado', 401)
    }

    return next()
  }
}

export default verifyUserAuthorization
