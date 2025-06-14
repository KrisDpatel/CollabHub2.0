const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/EventRegistration');
const User = require('../models/User');

// Route to get all events created by a faculty
router.get('/faculty-events/:facultyId', async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.params.facultyId });
    res.json({ success: true, events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Route to get registered students for a specific event
router.get('/event-registrations/:eventId', async (req, res) => {
  try {
    const registrations = await Registration.find({ eventId: req.params.eventId }).populate('studentId', 'name email');
    res.json({ success: true, registrations });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
