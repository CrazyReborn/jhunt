const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.user_get = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json({ user }))
    .catch((err) => res.json({ err }));
};

exports.signin_get = (req, res) => {
  
};

// signin_post here

exports.signup_get = (req, res) => {
  res.send('success');
};

exports.signup_post = [
  body('username', 'Username field should not be empty').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password field should not be empty').trim().isLength({ min: 1 }).escape(),
  (req, res) => {
    res.send('success');
  },
];
