const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const ApplicationSchema = new Schema({
  company_name: { type: String, required: true },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ['Application sent', 'No answer', 'Rejection', 'Upcoming interview', 'Offered'],
    default: 'Application sent',
  },
  location: { type: String },
  aggregator: { type: String },
  found_on: { type: Date },
  cv_sent_on: { type: Date },
  cv_path: { type: String },
  job_link: { type: String },
  answer_received: { type: Date },
  qualifications_met: {
    type: String,
    required: true,
    enum: ['Fully met', 'Most are met', 'Half are met', 'Most are unmet', 'Fully unmet'],
    default: 'Half are met',
  },
});

module.exports = mongoose.model('Application', ApplicationSchema);
