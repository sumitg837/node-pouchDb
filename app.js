const express = require('express');
const cors = require('cors');
const body_parser = require('body-parser');
const config = require('./config');
const PouchDB = require('pouchdb');
const path = require('path');

// use for compress response
const compression = require('compression');

var app = express();
var port = process.env.PORT || 3000;
var db = new PouchDB('test');

/**remote**/
var remoteDB = new PouchDB('http://'+config.EnvConfig.host+':'+config.EnvConfig.serverPort+'/'+config.EnvConfig.serverDbName);




app.engine('ejs', require('express-ejs-extend'));
app.set('views', __dirname +'/app/views');
app.set('view engine', 'ejs');

app.use(compression());
app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());
app.use('/public', express.static(__dirname + '/public'));
app.use('/db', require('express-pouchdb')(db));
/***AllowCrossDomain**/
var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.use(function(error, req, res, next){
  if(error){
    console.log('ERROR:APP::'+error);
    throw(error);
  }
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {} ;

  process.on('uncaugthException', function(error){
    console.log('ERROR:PROCESS::'+error.stack);
  });
})

 const socket_server = app.listen(port, config.EnvConfig.host, function(){
    db.info().then(function(info){
      console.log(info)
      console.log('Listening on host %s port %s ' , config.EnvConfig.host, port); //Listening on port 8888
    });
});

var io = require('socket.io').listen(socket_server);





io.sockets.on('connection', function (socket) {
  console.log('coneected')
  socket.emit('connected')
  db.sync(remoteDB, {
    live: true,
    retry: true
  }).on('change', function (info) {
    socket.emit('change', {data: info})
    // yo, something changed!
  }).on('paused', function (info) {
    socket.emit('event', {data: info})
    // replication was paused, usually because of a lost connection
  }).on('denied', function (err) {
    socket.emit('event', {data: err})
      // a document failed to replicate (e.g. due to permissions)
  }).on('active', function (info) {
    socket.emit('event', {data: info})
    // replication was resumed
  }).on('complete', function (info) {
    socket.emit('event', {data: info})
      // handle complete
  }).on('error', function (err) {
    socket.emit('event', {data: err})
    // totally unhandled error (shouldn't happen)
  });

  socket.on('disconnect', function() {
    console.log('disconnected')
  });
})
// console.log(remoteDB);


module.exports = app;


const router = require('./router');
