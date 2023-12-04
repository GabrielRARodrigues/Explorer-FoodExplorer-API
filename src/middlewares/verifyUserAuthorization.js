import AppError from '../utils/errors/AppError.js'

function verifyUserAuthorization(roleToVerify) {
  return (request, response, next) => {
    const { role } = request.user

    if (!roleToVerify.includes(role)) {
      throw new AppError('Acesso não autorizado', 401)
    }

    return next()
  }
}

export default verifyUserAuthorization
