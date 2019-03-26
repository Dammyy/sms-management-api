'use strict'

class LoginUser {
  get validateAll() {
    return true
  }

  get rules () {
    return {
      'email': 'required|exists:users,email',
      'password':'required'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'password.required': 'You must provide a password'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = LoginUser
