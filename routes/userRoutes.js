

const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

// Route for user entry
router.post('/signup', userController.signup);

module.exports = router;
