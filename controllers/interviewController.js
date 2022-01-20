const Interview = require('../models/interview');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

exports.interviews_get = [
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ err: errors });
    } else {
      jwt.verify(req.token, 'secretKey', (err) => {
        if (err) {
          res.json({ err });
        } else {
          Interview.find().exec((findingErr, interviews) => {
            if (err) {
              res.json({ err: findingErr });
            } else {
              res.json({ interviews });
            }
          });
        }
      });
    }
  },
];
