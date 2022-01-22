const jwt = require('jsonwebtoken');
const async = require('async');
const Event = require('../models/event');
const Application = require('../models/application');
const Interview = require('../models/interview');

const verifyToken = (req, res, next) => {
  const { cookies } = req;
  if ('token' in cookies) {
    next();
  } else {
    res.sendStatus(403);
  }
};

exports.events_get = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    jwt.verify(cookies.token, 'secretKey', (err, authData) => {
      if (err) {
        res.json({ err });
      } else {
        const { user } = authData;
        Event.find({ user: user._id }).populate('user').populate('applicatoin').populate('interview')
          .exec((findingErr, events) => {
            if (findingErr) {
              res.json({ err: findingErr });
            } else {
              res.json({ events });
            }
          });
      }
    });
  },
];

exports.event_new_get = [
  verifyToken,
  (req, res) => {
    async.parallel({
      applications(callback) {
        Application.find({ user: req.userId}).exec(callback);
      },
      interviews(callback) {
        Interview.find({ user: req.userId }).exec(callback);
      },
    }, (err, results) => {
      if (err) {
        res.json({ err });
      } else {
        const { cookies } = req;
        jwt.verify(cookies.token, 'secretKey', (tokenErr) => {
          if (tokenErr) {
            res.json({ err: tokenErr });
          } else {
            res.json({ applications: results.applications, interviews: results.interviews });
          }
        });
      }
    });
  },
];

exports.event_new_post = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    jwt.verify(cookies.token, 'secretKey', (err, authData) => {
      if (err) {
        res.json({ err });
      } else {
        const { user } = authData;
        const event = new Event({
          user: user._id,
          application: req.body.application,
          date: req.body.date,
          interview: req.body.interview,
        });
        event.save().exec((savingErr) => {
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

exports.event_put = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    jwt.verify(cookies.token, 'secretKey', (err, authData) => {
      if (err) {
        res.json({ err });
      } else {
        const { user } = authData;
        const event = new Event({
          _id: req.params.id,
          user: user._id,
          application: req.body.application,
          date: req.body.date,
          interview: req.body.interview,
        });
        Event.findByIdAndUpdate(req.params, event, (updatingErr) => {
          if (updatingErr) {
            res.json({ err: updatingErr });
          } else {
            res.send('success');
          }
        });
      }
    });
  },
];

exports.event_delete = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    jwt.verify(cookies.token, 'secretKey', (err) => {
      if (err) {
        res.json({ err });
      } else {
        Event.findByIdAndRemove(req.params.id, (deletingErr) => {
          if (deletingErr) {
            res.json({ err: deletingErr });
          } else {
            res.send('success');
          }
        });
      }
    });
  },
];
