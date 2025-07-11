const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Event = require('../models/Event');
const fs = require('fs');

// Create 'uploads/events' directory if it doesn't exist
const eventUploadDir = path.join(__dirname, '../uploads/event');
if (!fs.existsSync(eventUploadDir)) {
  fs.mkdirSync(eventUploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, eventUploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// Create event route
router.post('/create', upload.single('photo'), async (req, res) => {
  try {
    const { title, description, date, time, location, type,createdBy } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      type,
      photo: req.file ? `event/${req.file.filename}` : null,
      createdBy: createdBy || null // Optional: if auth is used
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// for getting or display the data
router.get('/get-events', async (req, res) => {
    try {
      const events = await Event.find().sort({ createdAt: -1 });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  });

module.exports = router;
