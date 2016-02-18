
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments().primary();
    table.string('pi_id').unique();
    table.string('email').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
