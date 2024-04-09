

const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');


const { body } = require('express-validator');

// Route for guest entry


router.post('/enter-as-guest', [
    body('name').trim().escape(),
    body('email').isEmail().withMessage('Enter a valid email PLEASE').normalizeEmail(),
  ],
  guestController.enterAsGuest
);


module.exports = router;
