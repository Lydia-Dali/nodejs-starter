const express = require('express');
const router = express.Router();
const User = require("../models").User
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  function(email, password, done) {
    User.findOne({ email: email })
    .then((user) => {
      bcrypt.compare(password, user.dataValues.password, function(err, res) {
        if(res){
          return done(null, user.dataValues);
        } else {
          return done(null, false);
        }
      })
    })
    .catch(err => done(null, false))
  }
));

/* GET users listing. */
router.post('/signin', passport.authenticate('local', { session: false }),function(req, res, next) {
  const user = {
    id: req.user.id,
    email: req.user.email,
    isAdmin: req.user.isAdmin
  }
  const token = jwt.sign(user, 'your_jwt_secret');  
  res.send({user, token}); 
});

module.exports = router;
