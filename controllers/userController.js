//use controller

const User = require('../models/User');

const bcrypt = require('bcrypt');


//controller for registering usrs
exports.signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

   
    const existingUser = await User.findOne({ username });
     //  if user already exists
    if (existingUser) {
      return res.status(400).send('Girlie OOPS user already exists!!');
    }

    // else ave new user
    const user = new User({ username, password, email });
    const userSaved = await user.save();
      res.status(201).json(userSaved)

    res.status(201).send('GIRLIE YAS user created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Oops girlie server error: ' + error.message);
  }
};



  
