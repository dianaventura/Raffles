//use controller

const User = require('../models/User');

const bcrypt = require('bcrypt');


//controller for registering usrs
exports.register = async (req, res) => {

  const { username, password, email } = req.body;

  User.findOne({ username })

    .then(existingUser => {

      if (existingUser) {
        //if user already exists 
        return res.status(400).send('Girlie OOPS User already exists!!');
      }
      //else save user
      const user = new User({ username, password, email });
      return user.save();
    })
    .then(() => res.status(201).send('GIRLIE YAS user created successfully'))
    .catch(() => res.status(500).send('oop girlie server error'));
};


