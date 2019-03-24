'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')

class MessageController {

  async index({ auth, response }) {
    const user = await auth.getUser()
    const messages = await Message.query().where('receiverId', user.id).fetch()

    return response.ok(messages)
  }

  async store({ auth, request, response }) {
    const user = await auth.getUser()

    try {
      await User.findOrFail(request.input('receiverId'))
    } catch (e) {
      return response.notFound({
        message: 'User not found.'
      })
    }

    const message = await Message.create({
      senderId: user.id,
      receiverId: request.input('receiverId'),
      message: request.input('message'),
      status: 'unread'
    })

    return response.created(message)
  }

  async sentMessages({ auth, response }) {
    const user = await auth.getUser()
    const messages = await Message.query().where('senderId', user.id).fetch()

    return response.ok(messages)
  }

  async markAsRead({ request, }) {
    const message = await Message.findOrFail(request.input('messageId'))

    message.status = 'read'
    await message.save()
  }
}

module.exports = MessageController
