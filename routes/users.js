var express = require('express');
var router = express.Router();
const User = require("../models").User

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
