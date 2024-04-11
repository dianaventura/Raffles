

const express = require('express');
const router = express.Router();

const raffleController = require('../controllers/raffleController');

// Route for getting raffles
router.get('/get-raffles', raffleController.getRaffles);


const { body } = require('express-validator');

router.post('/create-raffle', 
    [

    body('title').trim().escape().notEmpty().withMessage('Title is required '),

    body('prize').trim().escape().notEmpty().withMessage('Prize is required '),
    
    body('drawDate') .notEmpty().withMessage('Draw date is required !! '),
    ], 
  raffleController.createRaffle
);

router.get('/get-winners',raffleController.getWinners);



module.exports = router;
