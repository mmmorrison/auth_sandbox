exports.up = function(knex, Promise) {
  return knex.schema.createTable('employees', function (t) {
    t.increments();
    t.string('name');
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('employees');
};
