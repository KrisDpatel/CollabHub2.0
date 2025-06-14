const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Event = require('../models/Event');

// Setup multer for in-memory file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle event creation
router.post('/create', upload.single('image'), async (req, res) => {
    const { name, startDateTime, endDateTime, description, type, registrationRequired, teamSize } = req.body;
    const eventImage = req.file ? req.file.buffer : null; // Get the in-memory file buffer

    // Validate inputs
    if (!name || !startDateTime || !endDateTime || !description || !type || teamSize === "") {
        return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
    }

    // If an image is provided, save it to the 'uploads/events' folder
    let eventImagePath = null;
    if (eventImage) {
        const eventUploadDir = path.join(__dirname, '../uploads/events');
        
        // Create 'uploads/events' directory if it doesn't exist
        if (!fs.existsSync(eventUploadDir)) {
            fs.mkdirSync(eventUploadDir, { recursive: true });
        }

        // Create a unique filename for the image
        const imageName = Date.now() + '-' + req.file.originalname;
        const imagePath = path.join(eventUploadDir, imageName);

        // Write the image buffer to the file system
        fs.writeFile(imagePath, eventImage, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error saving image.' });
            }
        });

        eventImagePath = `events/${imageName}`; // Relative path to be saved in the database
    }

    try {
        // Create a new event in the database
        const newEvent = new Event({
            name,
            startDateTime,
            endDateTime,
            description,
            type,
            registrationRequired: registrationRequired === 'true',
            teamSize,
            image: eventImagePath, // Save the relative file path to the database
        });

        await newEvent.save();
        return res.status(201).json({ success: true, message: 'Event created successfully.' });
    } catch (error) {
        console.error('Error creating event:', error);
        return res.status(500).json({ success: false, message: 'Error creating event.' });
    }
});

module.exports = router;
