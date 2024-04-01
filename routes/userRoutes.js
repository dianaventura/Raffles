

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup);

router.get('/session', userController.session);

router.post('/login', userController.login);

// Route for user entry
//router.post('/enter-as-guest', userController.enterAsUser);

module.exports = router;
