//use controller

const User = require('../models/User');

const bcrypt = require('bcrypt');


//controller for registering usrs
exports.signup = async (req, res) => {

  const { username, password, email } = req.body;

  User.findOne({ username })

    .then(existingUser => {

      if (existingUser) {
        //if user already exists 
        return res.status(400).send('Girlie OOPS user already exists!!');
      }
      //else save user
      const user = new User({ username, password, email });
      return user.save();
    })
    .then(() => res.status(201).send('GIRLIE YAS user created successfully'))
    .catch(() => res.status(500).send('oop girlie server error'));
};


//for log in
exports.login = async (req, res) => {

    const { username, password } = req.body;
  
    User.findOne({ username })
  
      .then(user => {
  
        if (!user) {
  
          return res.status(400).send('oop invalid credentials');
        }
        //if password entered matches password in db
  
        return bcrypt.compare(password, user.password)
  
          .then(isMatch => {
  
            if (!isMatch) {
              return res.status(400).send('oop invalid credentials');
            }
            //setting user ID in session to log in :))
            req.session.userId = user._id; 
            return res.send('Yaaa Logged in successfully!!!!');
          });
      })
      .catch(() => res.status(500).send('server error'));
  };
  
