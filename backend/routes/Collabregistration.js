const express = require('express');
const router = express.Router();
const CollabRegistration = require('../models/CollabRegistration');
const Collab = require('../models/Collab');

// POST /api/register-event
router.post('/', async (req, res) => {
  console.log(req.body)
  const { collabId, studentId } = req.body;

  try {
    const alreadyRegistered = await CollabRegistration.findOne({ collabId, studentId });
    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: 'Already registered' });
    }

    const registration = new CollabRegistration({ collabId, studentId });
    await registration.save();

    res.json({ success: true, message: 'Registered successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


  // GET /api/register-event/student/:studentId
router.get('/student/:studentId', async (req, res) => {
  try {
    const registrations = await CollabRegistration.find({ studentId: req.params.studentId })
      .populate('collabId'); // fetch full event details
      
      const collabs = registrations.map(reg => reg.collabId);

    res.json({ success: true, collabs });

    // res.json({ success: true, events: registrations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
  

module.exports = router;
