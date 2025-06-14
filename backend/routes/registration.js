const express = require('express');
const router = express.Router();
const EventRegistration = require('../models/EventRegistration');
const Event = require('../models/Event');

// POST /api/register-event
router.post('/', async (req, res) => {
  console.log(req.body)
  const { eventId, studentId } = req.body;

  try {
    const alreadyRegistered = await EventRegistration.findOne({ eventId, studentId });
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: 'Already registered' });
    }

    const registration = new EventRegistration({ eventId, studentId });
    await registration.save();

    res.json({ success: true, message: 'Registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/register-event/:eventId for feculty 
// router.get('/:eventId', async (req, res) => {
//     try {
//       const registrations = await EventRegistration.find({ eventId: req.params.eventId })
//         .populate('studentId', 'name email profilePic'); // fetch student info
  
//       res.json({ success: true, students: registrations });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Server error' });
//     }
//   });


  // GET /api/register-event/student/:studentId
router.get('/student/:studentId', async (req, res) => {
  try {
    const registrations = await EventRegistration.find({ studentId: req.params.studentId })
      .populate('eventId'); // fetch full event details
      
      const events = registrations.map(reg => reg.eventId);

    res.json({ success: true, events });

    // res.json({ success: true, events: registrations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
  

module.exports = router;
