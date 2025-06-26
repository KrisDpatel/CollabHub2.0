const mongoose = require('mongoose');

const collabRegistrationSchema = new mongoose.Schema({
  collabId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collab',
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

module.exports = mongoose.model('CollabRegistration', collabRegistrationSchema);
