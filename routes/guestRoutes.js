

const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

// Route for guest entry
router.post('/enter-as-guest', guestController.enterAsGuest);

module.exports = router;
