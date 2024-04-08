

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup);

router.get('/session', userController.session);

router.post('/login', userController.login);


router.post('/logout', userController.logout);

router.post('/enter-as-user', userController.enterAsUser);

router.post('/withdraw-user', userController.withdrawUser);

module.exports = router;
