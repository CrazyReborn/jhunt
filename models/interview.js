const mongoose = require('mongoose');

const { Schema } = mongoose;

const InterviewSchema = new Schema({
  date: { type: Date, required: true },
  application: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
  length: { type: Number },
  status: {
    type: String,
    required: true,
    enum: ['Finished', 'Upcoming'],
    default: 'Upcoming',
  },
  rate: { type: Number, min: 0, max: 10 },
});

module.exports = mongoose.module('Interview', InterviewSchema);
