

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const { body } = require('express-validator');


router.post('/signup', [

    body('username').trim().escape().isLength({ min: 6 }).withMessage('Username must be at least 6 characters long'),

    body('email').isEmail().withMessage('Enter a valid email PLEASE').normalizeEmail(),
    
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ], 
  userController.signup
);

router.get('/session', userController.session);

router.post('/login', [
    body('username').trim().escape(),
    body('password').trim(),
  ], 
  userController.login
);


router.post('/logout', userController.logout);

router.post('/enter-as-user', userController.enterAsUser);

router.post('/withdraw-user', userController.withdrawUser)

module.exports = router;
