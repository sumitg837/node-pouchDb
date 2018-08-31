'use strict';

const fs = require('fs');
const path = require('path');

var Env = require('./config/config').env;
const config    = require('./config/config')[Env];

const connection = {
	client: config.db.client,
	connection: {
		host: config.db.host,
		port: config.db.port,
		user: config.db.user,
		password: config.db.password,
		database: config.db.database,
		charset: config.db.charset,
		timezone:config.db.timezone,
	},
	pool:{
		min: config.db.pool.min,
		max:config.db.pool.max
	},
	migrations:{
		directory:path.resolve(__dirname, 'migrations'),
		tableName: 'migrations',
	},
	debug:process.env.KNEX_DEBUG == 'true',
	log: {
	    warn(message) {
	    	console.log('warn', message)
	    },
	    error(message) {
	    	console.log('error', message)
	    },
	    deprecate(message) {
	    	console.log('deprecate', message)
	    },
	    debug(message) {
	    	console.log('debug', message)
	    },
	}
}
module.exports = connection;