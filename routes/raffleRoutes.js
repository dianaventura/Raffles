

const express = require('express');
const router = express.Router();
const raffleController = require('../controllers/raffleController');

// Route for getting raffles
router.get('/get-raffles', guestController.enterAsGuest);

module.exports = router;
