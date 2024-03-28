

const express = require('express');
const router = express.Router();
const raffleController = require('../controllers/raffleController');

// Route for getting raffles
router.get('/get-raffles', raffleController.getRaffles);



module.exports = router;
