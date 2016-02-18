
exports.up = function(knex, Promise) {
  return knex.schema.createTable('batches', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable();
    table.integer('beer_id').notNullable();
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('batches');
};
