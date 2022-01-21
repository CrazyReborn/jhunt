const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  job: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
  date: { type: Date },
  interview: { type: Schema.Types.ObjectId, ref: 'Interview', required: false },
});

module.exports = mongoose.model('Event', EventSchema);
