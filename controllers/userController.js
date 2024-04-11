//use controller

const User = require('../models/User');
const Entry = require('../models/Entry');
const Prize = require('../models/Prize');

const { validationResult } = require('express-validator');


const bcrypt = require('bcrypt');
const mongoose = require('mongoose');



//controller for registering usrs
exports.signup = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  try {

    let { username, password, email } = req.body;


    const existingUser = await User.findOne({ username });
    //  if user already exists
    if (existingUser) {

    return res.status(400).json({ message: 'User already Exists'});
    }

    // else ave new user

    password = await bcrypt.hash(password, 8);

    console.log(password);

    const user = new User({ username, password , email });

    const userSaved = await user.save();


    // log in user by starting session

    req.session.userId = userSaved._id;
  
    req.session.loggedIn = true;



    req.session.save();

    return res.status(201).json({ loggedIn: true, user: userSaved });


  } catch (error) {
    console.error(error);
    res.status(500).send('Oops girlie server error: ' + error.message);
  }
};

//loggin in

exports.login = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() });

  }

  try {

    const { username, password } = req.body;

    console.log(password);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('user not found ');
    }

    //check if password is right

    //need to compare hashed password with apassword entered

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: 'Wrong Password!!' });

    }

    //if user exists and password is crrect log in and start session

    req.session.userId = user._id;
    req.session.loggedIn = true;




    const prizes = await getUnclaimedPrizes(user._id);

    req.session.prizes = prizes;

    req.session.save();

    res.status(201).json({ loggedIn: true, user: user._id, prizes: prizes || [] });



  } catch (error) {

    console.error('error logging in:', error);
    res.status(500).json({ message: 'internal server error' });
  }

};


//for logging out 

exports.logout = async (req, res) => {

  req.session.destroy(err => {

    if (err) {

      console.error('destroying session error:', err);

      res.status(500).json({ message: 'logout failed' });

    } else {

      //clearing cookie from browser

      res.clearCookie('connect.sid');
      console.log('you were just logged out')
      res.json({ message: 'log out worked!!!' });

    }

  });
};

async function getUnclaimedPrizes(userId) {


  const prizes = await Prize.find({ userId: userId, claimed: false }).populate('raffleId');
 

  if(prizes && prizes.length>0){

  for (const prize of prizes) {
     

    prize.claimed = true;

    await prize.save();

  }
}


  return prizes.map(prize => ({

    raffleTitle: prize.raffleId.title,
    prize: prize.raffleId.prize,
    claimed: prize.claimed


  }));

};


//controller for sessuin info 

exports.session = async (req, res) => {


  if (req.session.userId) {

    try {

      const user = await User.findById(req.session.userId).exec();


      if (user) {



        res.json({ loggedIn: true, username: user.username, userId: user._id });
      } else {
        res.json({ loggedIn: false });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error', loggedIn: false });
    }
  } else {
    res.json({ loggedIn: false });
  }
};



exports.enterAsUser = async (req, res) => {



  if (!req.session.userId) {

    return res.status(403).json({ message: "youuuu are not logged in" });
  }

  const { raffleId } = req.body;



  const userId = req.session.userId;


  try {


    const entry = new Entry({

      raffleId,
      userId
    });



    const savedEntry = await entry.save();

    res.status(201).json(savedEntry);

  } catch (error) {

    console.error('error saving entry:', error);
    res.status(500).json({ message: "error saving entry" });
  }
};

exports.withdrawUser = async (req, res) => {



  if (!req.session.userId) {

    return res.status(403).json({ message: "youuuu are not logged in" });
  }

  const { raffleId } = req.body;



  const userId = req.session.userId;


  try {


    const deletedEntry = await Entry.deleteMany({ raffleId: raffleId, userId: userId });


    res.status(201).json(deletedEntry);

  } catch (error) {

    console.error('error deleting entry:', error);
    res.status(500).json({ message: "error deleting entry" });
  }
};






