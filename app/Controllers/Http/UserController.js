'use strict'
const User = use('App/Models/User')

class UserController {

  async createAccount({ auth, request, response }) {
    const body = request.only(['name', 'email', 'password', 'phone'])

    const user = await User.create(body)
    const token = await auth.generate(user)

    return response.ok({
      message: 'Registration Successful',
      user,
      token
    })
  }


  async login({ auth, request, response }) {
    const token = await auth.attempt(request.input('email'), request.input('password'))
    
    return response.ok(token)
  }

  async delete({ request, response }) {
    const user = await User.findOrFail(request.input('userId'))

    await user.delete()

    return response.ok({ message: 'user deleted.' })
  }
}

module.exports = UserController
