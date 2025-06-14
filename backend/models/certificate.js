const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
    studentName: String,
    eventTitle: String,
    issueDate: Date
});

module.exports = mongoose.model('Certificate', certificateSchema);
