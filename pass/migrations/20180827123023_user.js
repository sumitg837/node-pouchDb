'use strict'
exports.up = async function(knex, Promise) {
  await knex.schema.createTable('users', function(table){
  	table.charset('utf8');
  	table.collate('utf8_unicode_ci');

  	table.increment('id').unsigned().primary();
  	table.string('name', 64).notNullable();
    table.string('email').nullable().index();
    table.string('password', 128).nullable();

    // Timestamps.
    table.dateTime('created_at').notNullable().defaultTo(knex.fn.now()).index();
    table.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
	await knex.schema.dropTable('users');
};
