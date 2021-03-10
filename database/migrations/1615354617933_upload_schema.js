'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UploadSchema extends Schema {
  up () {
    this.create('uploads', (table) => {
      table.increments()
      table.integer('userId').notNullable()
      table.string('fileName').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('uploads')
  }
}

module.exports = UploadSchema
