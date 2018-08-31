'use strict';
const connection = require('./knexfile');
const knex = require('knex')(connection);
const Bookshelf = require('bookshelf')(knex);

// Bookshelf supported plugins.
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

// Community plugins.
Bookshelf.plugin(require('bookshelf-paranoia'), {field: 'deletedAt'});
Bookshelf.plugin(require('bookshelf-scopes'));
Bookshelf.plugin(require('bookshelf-eloquent'));
Bookshelf.plugin(require('bookshelf-secure-password'));

module.exports = Bookshelf;