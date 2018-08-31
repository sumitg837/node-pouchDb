var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');

require('../config/passport')(passport);
var router = express.Router();

var Env = require('../config/config').env;
const config    = require('../config/config')[Env];

/*****database model***/
const User = require('../models/user');

/* Save user. */
router.get('/api/register', function(req, res, next) {
  var name = req.body.name,
      email = req.body.email,
      password = req.body.password;

	var user = new User({name: name, email: email, password: password})
  user.save().then((result)=>{
  	res.send(result);
  }).catch((error)=>{
  	console.log(error);
  })
});

/* login user. */
router.get('/api/login', function(req, res, next) {
  var email = req.body.email,
      password = req.body.password;
  User.forge({ email: email })
  .fetch()
  .then(function (user) {
    if(!user){
      res.send({status: 404, success: false, msg: 'Authentication failed. User not found.', error: true, data:{}});
    }else{
      user.authenticate(password).then((result)=>{
        try{
          var token = jwt.sign(JSON.stringify(result), config.passport.secret)
          
          var data = {}
          data.name = result.attributes.name;
          data.email = result.attributes.email;
          data.id = result.id;
          data._token = 'JWT '+token;
          res.send({status: 204, success: true, msg: 'Authentication Success.', error: false, data:data});
        }catch(error){
          res.send({status: 404, success: false, msg: 'Incorrect password', error: true, data:{}})
        }
      }).catch((error)=>{
        res.send({status: 404, success: false, msg: error, error: true, data:{}})
      })
    }
    
  }).catch((error)=>{
    res.send({status: 500, success: false, msg: error, error: true, data:{}})
  })
});

router.get('/api/error', function(req, res, next) {
  res.send({status: 404, success: false, msg: 'Unauthorized Request!', error: true, data:{}})
});
module.exports = router;
