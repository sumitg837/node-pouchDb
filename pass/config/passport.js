var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');


module.exports = function(passport){
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  	User.forge({ id: jwt_payload.id })
    .fetch()
    .then(function (user) {
      return done(null, user);
    }).catch((error)=>{
      return done(null, false, { errors: 'no user found' });
    });
  })
  );
}