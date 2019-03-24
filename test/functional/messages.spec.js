'use strict'

const User = use('App/Models/User')
const Message = use('App/Models/Message')
const { before, test, trait } = use('Test/Suite')('SMS Management API')

trait('Test/ApiClient')
trait('Auth/Client')

const senderInfo = {
  phone: '08052000000',
  name: 'Jack Bauer',
  password: 'password',
  email: 'jack@smsapi.com',
}

const receiverInfo = {
  phone: '0708000000',
  password: 'password',
  name: 'Nicholas Cage',
  email: 'Nicholas@smsapi.com'
}

const message = 'Test message'
let sender
let receiver

before(async () => {
  sender = await User.create(senderInfo)
  receiver = await User.create(receiverInfo)
})

test('user can send message', async ({ client }) => {
  const response = await client.post('messages').send({
    receiverId: receiver.id,
    message,
  }).loginVia(sender, 'jwt').end()

  response.assertStatus(201)
  response.assertJSONSubset({
    message,
    senderId: sender.id,
    receiverId: receiver.id
  })
})

test('user can get all messages sent by them', async ({ client }) => {
  const response = await client.get('sent').loginVia(sender, 'jwt').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    senderId: sender.id,
    receiverId: receiver.id,
    message,
    status: 'unread'
  }])
})

test('user can get all messages they have received', async ({ client }) => {
  const response = await client.get('messages').loginVia(receiver, 'jwt').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    senderId: sender.id,
    receiverId: receiver.id,
    message,
    status: 'unread'
  }])
})

test('user can delete their account', async ({ assert, client }) => {
  const response = await client.delete('user').send({ userId: sender.id }).loginVia(sender, 'jwt').end()

  response.assertStatus(200)
  const messagesCount = ((await Message.all()).toJSON()).length
  assert.equal(0, messagesCount)
})
