'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessagesSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.integer('senderId'),
      table.integer('receiverId'),
      table.text('message'),
      table.string('status'),
      table.increments()
      table.timestamps()
      table.foreign('senderId').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('receiverId').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessagesSchema
