const { body, validationResult } = require('express-validator');
const Application = require('../models/application');

exports.applications_get = (req, res) => {
  Application.find()
    .then((applications) => res.json(applications))
    .catch((err) => res.status(400).send(err));
};

exports.applications_post = [
  //  Maybe exclude validation and leave only sanitization;
  body('company', 'Company name should not be empty').trim().isLength({ min: 1 }).escape(),
  body('position', 'Position should not be empty').trim().isLength({ min: 1 }).escape(),
  body('salary', 'Salary should not be empty').trim().isLength({ min: 1 }).escape(),
  body('location', 'Location should not be empty').trim().isLength({ min: 1 }).escape(),
  body('aggregator', 'Aggregator field should not be empty').trim().isLength({ min: 1 }).escape(),
  body('link', 'Link field should not be empty').trim().isLength({ min: 1 }).escape(),
];
