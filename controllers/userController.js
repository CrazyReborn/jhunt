const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.user_get = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json({ user }))
    .catch((err) => res.json({ err }));
};

exports.signin_get = (req, res) => {
  res.send('success');
};

// signin_post here
exports.signin_post = [
  body('username', 'Username field should not be empty').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password field should not be empty').trim().isLength({ min: 1 }).escape(),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ err: errors });
    } else {
      User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          res.json({ err });
        } else if (user === null) {
          res.json({ err: 'Wrong username' });
        } else {
          bcrypt.compare(req.body.password, user.password)
            .then(() => {
              const token = jwt.sign({ user }, 'secretKey');
              res.json({ token, userId: user._id });
            })
            .catch(() => res.json({ err: 'Wrong password' }));
        }
      });
    }
  },
];

exports.signup_get = (req, res) => {
  res.send('success');
};

exports.signup_post = [
  body('username', 'Username field should not be empty').trim().isLength({ min: 1 }).escape(),
  body('password', 'Password field should not be empty').trim().isLength({ min: 1 }).escape(),
  body('confirm-password').trim().isLength({ min: 1 }).escape()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ err: errors });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          res.json({ err });
        } else {
          const user = new User({
            username: req.body.username,
            password: hashedPassword,
            applications: [],
          });
          user.save((savingErr) => {
            if (err) {
              res.json({ err: savingErr });
            } else {
              res.send('success');
            }
          });
        }
      });
    }
  },
];
