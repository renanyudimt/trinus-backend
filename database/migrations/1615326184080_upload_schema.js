'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UploadSchema extends Schema {
  up () {
    this.create('uploads', (table) => {
      table.increments()
      table
        .integer('user_id') //nome
        .unsigned() //nao pode ser abaixo de 0 
        .notNullable() //nao pode ser nulo
        .reference('id') //qual column
        .inTable('users') //qual table
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down () {
    this.drop('uploads')
  }
}

module.exports = UploadSchema
