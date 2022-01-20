const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Interview = require('../models/interview');

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

exports.inteview_get = [
  verifyToken,
  (req, res) => {
    jwt.verify(req.token, 'secretKey', (tokenErr) => {
      if (tokenErr) {
        res.json({ err: tokenErr });
      } else {
        Interview.findBydId(req.params.id).populate('application').exec((err, interview) => {
          if (err) {
            res.json({ err });
          } else {
            res.json({ interview });
          }
        });
      }
    });
  },
];

exports.interview_put = [
  body('length').trim().isLength({ min: 1 }).escape(),
  body('rate').trim().isLength({ min: 1 }).escape(),
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ err: errors });
    } else {
      jwt.verify(req.body, 'secretKey', (tokenErr) => {
        if (tokenErr) {
          res.json({ err: tokenErr });
        } else {
          const interview = new Interview({
            _id: req.params.id,
            date: req.body.date,
            application: req.body.application,
            length: req.body.length,
            status: req.body.status,
            rate: req.body.rate,
          });

          Interview.findByIdAndUpdate(req.params.id, interview, (err) => {
            if (err) {
              res.json({ err });
            } else {
              res.send('success');
            }
          });
        }
      });
    }
  },
];
