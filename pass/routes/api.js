var express = require('express');

var passport = require('passport');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var router = express.Router();

/*****models***/
const User = require('../models/user');
/**transformer**/
const usersTransformer = require('../helpers/transformers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.where({email: 'asdsumit@rest.in'}).get().then((result)=>{
    usersTransformer.users_transformer(JSON.stringify(result)).then((data)=>{
	    res.send({status: 204, success: true, msg: 'Users list.', error: false, data:data}); 
    }).catch((error)=>{
      return res.send({status: 404, success: false, msg: error, error: true, data:{}});
    })
  }).catch((error)=>{
    console.log(error);
    return res.send({ status: 500, success: false, msg: 'Internal server error', error: true, data:{} });
  })
});



module.exports = router;
