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

module.exports = router;
