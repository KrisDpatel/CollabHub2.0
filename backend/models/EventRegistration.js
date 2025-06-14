const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
