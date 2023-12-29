class CookiesController {
  async delete(request, response) {
    const { cookie_name } = request.params

    response.clearCookie(cookie_name)

    return response.status(200).json()
  }
}

export default CookiesController
