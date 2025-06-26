const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// --- Multer setup for profile photo upload ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/user'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// --- Update Profile Route ---
router.put('/update/:id', upload.single('profilePic'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.profilePic = `user/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates , { new: true });

    res.json({ success: true, user: updatedUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update profile." });
  }
});

module.exports = router;
