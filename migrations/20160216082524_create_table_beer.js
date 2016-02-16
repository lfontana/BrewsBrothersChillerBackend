
exports.up = function(knex, Promise) {
  return knex.schema.createTable('beers', function(table) {
    table.increments().primary();
    table.string('style').notNullable().unique();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('beers');
};
