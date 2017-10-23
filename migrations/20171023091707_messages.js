
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments()
    table.varchar('name').notNullable()
    table.varchar('message').notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages')
};
