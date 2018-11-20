const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

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
