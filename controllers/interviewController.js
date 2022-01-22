const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Interview = require('../models/interview');

const verifyToken = (req, res, next) => {
  const { cookies } = req;
  if ('token' in cookies) {
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
      const { cookies } = req;
      jwt.verify(cookies.token, 'secretKey', (err, authData) => {
        if (err) {
          res.json({ err });
        } else {
          const { user } = authData;
          Interview.find({ user: user._id }, (findingErr, interviews) => {
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

exports.interviews_post = [
  body('date', 'Date field should not be empty').trim().isLength({ min: 1 }).escape(),
  body('length').trim().isLength({ min: 1 }).escape(),
  body('rate').trim().isLength({ min: 1 }).escape(),
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ err: errors });
    } else {
      const { cookies } = req;
      jwt.verify(cookies.token, 'secretKey', (tokenErr, authData) => {
        if (tokenErr) {
          res.json({ err: tokenErr });
        } else {
          const { user } = authData;
          const interview = new Interview({
            user: user._id,
            date: req.body.date,
            application: req.body.application,
            length: req.body.length,
            status: req.body.status,
            rate: req.body.rate,
          });
          interview.save((err) => {
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

exports.inteview_get = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    jwt.verify(cookies.token, 'secretKey', (tokenErr) => {
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
      const { cookies } = req;
      jwt.verify(cookies.token, 'secretKey', (tokenErr, authData) => {
        if (tokenErr) {
          res.json({ err: tokenErr });
        } else {
          const { user } = authData;
          const interview = new Interview({
            _id: user._id,
            user: req.userId,
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

exports.interview_delete = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    jwt.verify(cookies.token, 'secretKey', (err) => {
      if (err) {
        res.json({ err });
      } else {
        Interview.findByIdAndRemove(req.params.id).exec((savingErr) => {
          if (savingErr) {
            res.json({ err: savingErr });
          } else {
            res.send('success');
          }
        });
      }
    });
  },
];
