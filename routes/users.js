var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require("../models").User

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  User.findAll()
  .then((users) => res.json({users}))
  .catch((err) => res.send(err))
});

/* POST create new user. */
router.post('/create', function(req, res, next) {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin || false
  })
  .then((newUser) => {
    res.json({user: newUser})
  })
  .catch((err) => res.send(err))
});

module.exports = router;
