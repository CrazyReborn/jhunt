const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Application = require('../models/application');

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

exports.applications_get = [
  verifyToken,
  (req, res) => {
    const { userId } = req.userId;
    Application.find({ user: userId })
      .then((applications) => res.json({ applications }))
      .catch((err) => res.json({ err }));
  },
];

exports.applications_post = [
  //  Maybe exclude validation and leave only sanitization;
  body('companyName', 'Company name should not be empty').trim().isLength({ min: 1 }).escape(),
  body('position', 'Position should not be empty').trim().isLength({ min: 1 }).escape(),
  body('salary', 'Salary should not be empty').trim().isLength({ min: 1 }).escape(),
  body('location', 'Location should not be empty').trim().isLength({ min: 1 }).escape(),
  body('aggregator', 'Aggregator field should not be empty').trim().isLength({ min: 1 }).escape(),
  body('link', 'Link field should not be empty').trim().isLength({ min: 1 }).escape(),
  verifyToken,
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ err: errors });
    } else {
      const post = new Application({
        user: req.body.userId,
        company_name: req.body.companyName,
        position: req.body.position,
        salary: req.body.salary,
        status: req.body.status,
        location: req.body.location,
        aggregator: req.body.aggregator,
        found_on: req.body.foundOn,
        cv_sent_on: req.body.cvSentOn,
        cv_path: '',
        job_link: req.body.link,
        answer_received: req.body.answerReceived,
        qualifications_met: req.body.qualifications,
      });
      jwt.verify(req.token, 'secretKey', (err) => {
        if (err) {
          res.json({ err });
        } else {
          post.save((savingErr) => {
            if (savingErr) {
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
