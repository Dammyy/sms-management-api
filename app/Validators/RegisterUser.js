'use strict'

class RegisterUser {
  get validateAll() {
    return true
  }

  get rules () {
    return {
      'name': 'required:users',
      'email': 'required|email|unique:users',
      'password':'required|min:6|max:20',
      'phone': 'required|min:7|max:20'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password',
      'phone.required': 'Please enter a phone number'
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = RegisterUser
