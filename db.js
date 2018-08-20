const pouchDB = require('pouchdb');
const config = require('./config');
// var app = require('./app');
// pouchDB.plugin(require('pouchdb-adapter-memory'));
// var db = new pouchDB('test', {adapter: 'memory'});
/**websqlDb**/
// pouchDB.plugin(require('pouchdb-adapter-node-websql'));
/**local**/
// var db = new pouchDB('test', {adapter: 'websql'});
var db = new pouchDB('test');
/**remote**/

var remoteDB = new pouchDB('http://'+config.EnvConfig.host+':'+config.EnvConfig.port+'/'+config.EnvConfig.serverDbName);

module.exports = {
  db: db,
  remoteDB: remoteDB
};
