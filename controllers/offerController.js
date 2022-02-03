/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const async = require('async');
const Offer = require('../models/offer');
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

exports.offers_get = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    let user;
    jwt.verify(cookies.token, 'secretKey', (err, authData) => {
      if (err) {
        res.json({ err });
      } else {
        user = authData.user;
      }
    });
    Offer.find({ user: user._id })
      .then((offers) => {
        res.json({ offers });
      })
      .catch((err) => res.json({ err }));
  },
];

exports.offer_new_get = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    let user;
    jwt.verify(cookies.token, 'secretKey', (err, authData) => {
      if (err) {
        res.json({ err });
      } else {
        user = authData.user;
      }
    });
    Interview.find({ user: user._id }).populate('application')
      .then((interviews) => {
        res.json({ interviews });
      })
      .catch((err) => res.json({ err }));
  },
];

exports.offer_new_post = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    let user;
    jwt.verify(cookies.token, 'secretKey', (err, authData) => {
      if (err) {
        res.json({ err });
      } else {
        user = authData.user;
      }
    });
    const offer = new Offer({
      user: user._id,
      received: req.body.received,
      interview: req.body.interview,
      application: req.body.application,
    });
    offer.save()
      .then(() => res.json({ msg: 'success' }))
      .catch((err) => res.json({ err }));
  },
];

exports.offer_put = [
  verifyToken,
  (req, res) => {
    const { cookies } = req;
    let user;
    jwt.verify(cookies.token, 'secretKey', (err, authData) => {
      if (err) {
        res.json({ err });
      } else {
        user = authData.user;
      }
    });
    const offer = new Offer({
      _id: req.params.id,
      user: user._id,
      received: req.body.received,
      interview: req.body.interview,
      application: req.body.application,
    });
    Offer.findByIdAndUpdate(req.params.id, offer)
      .then(() => res.json({ msg: 'success' }))
      .catch((err) => res.json({ err }));
  },
];

// exports.event_delete = [
//   verifyToken,
//   (req, res) => {
//     const { cookies } = req;
//     jwt.verify(cookies.token, 'secretKey', (err) => {
//       if (err) {
//         res.json({ err });
//       } else {
//         Event.findByIdAndRemove(req.params.id, (deletingErr) => {
//           if (deletingErr) {
//             res.json({ err: deletingErr });
//           } else {
//             res.send('success');
//           }
//         });
//       }
//     });
//   },
// ];
