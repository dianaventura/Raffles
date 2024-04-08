

const express = require('express');
const router = express.Router();
const raffleController = require('../controllers/raffleController');

// Route for getting raffles
router.get('/get-raffles', raffleController.getRaffles);

router.post('/create-raffle', raffleController.createRaffle);

router.get('/get-winners',raffleController.getWinners);

//router.get('/get-unclaimed-prizes', raffleController.getUnclaimedPrizes);

module.exports = router;
